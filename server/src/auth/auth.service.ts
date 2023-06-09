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
import { TokensService } from 'src/tokens/tokens.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tokensService: TokensService,
    private jwt: JwtService,
  ) {}

  async registration(dto: CreateUserDto) {
    const candidate = await this.usersService.findByEmail(dto.email);
    if (candidate) throw new BadRequestException('User already exists');

    const user = await this.usersService.createUser(dto);
    const tokens = this.tokensService.generateTokens(user);
    await this.tokensService.saveToken(user.id, tokens.refreshToken);

    return {
      user: await this.usersService.returnUserFields(user.id),
      ...tokens,
    };
  }

  async login(dto: CreateUserDto) {
    const user = await this.validateUser(dto);
    const tokens = this.tokensService.generateTokens(user);
    await this.tokensService.saveToken(user.id, tokens.refreshToken);

    return {
      user: await this.usersService.returnUserFields(user.id),
      ...tokens,
    };
  }

  async logout(userId: number, refreshToken: string) {
    return this.tokensService.removeToken(userId, refreshToken);
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwt.verifyAsync(refreshToken);
    if (!result) throw new UnauthorizedException('Invalid refresh token');

    const user = await this.usersService.findById(result.id);
    const tokens = this.tokensService.generateTokens(user);
    await this.tokensService.saveToken(user.id, tokens.refreshToken);

    return {
      user: await this.usersService.returnUserFields(user.id),
      ...tokens,
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
