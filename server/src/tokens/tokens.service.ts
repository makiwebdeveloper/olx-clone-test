import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TokensService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  generateTokens(user: User) {
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

  async saveToken(userId: number, refreshToken: string) {
    const tokenData = await this.prisma.token.findUnique({ where: { userId } });

    if (tokenData) {
      return this.prisma.token.update({
        where: { userId },
        data: {
          refreshToken,
        },
      });
    }

    return this.prisma.token.create({
      data: {
        refreshToken,
        userId,
      },
    });
  }

  async removeToken(userId: number, refreshToken: string) {
    const tokenData = await this.prisma.token.delete({
      where: { userId },
    });

    return tokenData.refreshToken;
  }
}
