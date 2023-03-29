import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/strategy/jwt.strategy';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MulterModule.register({
      dest: '/uploads',
    }),
    PassportModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [PrismaService, JwtStrategy],
})
export class AppModule {}
