import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('/registration')
  async registration(@Body() dto: CreateUserDto) {
    return this.authService.registration(dto);
  }

  @HttpCode(200)
  @Post('/login')
  async login(@Body() dto: CreateUserDto) {
    return this.authService.login(dto);
  }

  @HttpCode(200)
  @Post('/tokens')
  async getNewTokens(@Body() dto: RefreshTokenDto) {
    return this.authService.getNewTokens(dto.refreshToken);
  }
}
