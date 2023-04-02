import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { verify } from 'argon2';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwt: JwtService) {}

  async registration(dto: CreateUserDto) {
    const candidate = await this.usersService.findByEmail(dto.email);
    if (candidate) throw new BadRequestException('User already exists');

    const user = await this.usersService.createUser(dto);
    const tokens = await this.issueTokens(user);

    return {
      user: this.usersService.returnUserFields(user),
      ...tokens,
    };
  }

  async login(dto: CreateUserDto) {
    const user = await this.validateUser(dto);
    const tokens = await this.issueTokens(user);

    return {
      user: this.usersService.returnUserFields(user),
      ...tokens,
    };
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwt.verifyAsync(refreshToken);
    if (!result) throw new UnauthorizedException('Invalid refresh token');

    const user = await this.usersService.findById(result.id);
    const tokens = await this.issueTokens(user);

    return {
      user: this.usersService.returnUserFields(user),
      ...tokens,
    };
  }

  private async issueTokens(user: User) {
    const data = { id: user.id, email: user.email, roles: user.roles };

    const accessToken = this.jwt.sign(data, {
      expiresIn: '1h',
    });

    const refreshToken = this.jwt.sign(data, {
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  private async validateUser(dto: CreateUserDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) throw new NotFoundException('User not found');

    const isValid = await verify(user.password, dto.password);
    if (!isValid) throw new UnauthorizedException('Invalid password');

    return user;
  }
}
