import {
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './decorators/jwt.guard';
import { CurrentUser } from './decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('/registration')
  async registration(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: CreateUserDto,
  ) {
    const authData = await this.authService.registration(dto);
    res.cookie('refreshToken', authData.refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return authData;
  }

  @HttpCode(200)
  @Post('/login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: CreateUserDto,
  ) {
    const authData = await this.authService.login(dto);
    res.cookie('refreshToken', authData.refreshToken);
    return authData;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @CurrentUser('id') userId: number,
  ) {
    const { refreshToken } = req.cookies;
    res.clearCookie('refreshToken');
    return this.authService.logout(userId, refreshToken);
  }

  @HttpCode(200)
  @Post('/tokens')
  async getNewTokens(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: RefreshTokenDto,
  ) {
    const authData = await this.authService.getNewTokens(dto.refreshToken);
    res.cookie('refreshToken', authData.refreshToken);
    return authData;
  }
}
