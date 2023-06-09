import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { JwtModule } from '@nestjs/jwt/dist';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from 'src/config/jwt.config';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { PostsModule } from 'src/posts/posts.module';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { TokensService } from 'src/tokens/tokens.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    UsersService,
    JwtStrategy,
    TokensService,
  ],
  imports: [
    ConfigModule,
    forwardRef(() => UsersModule),
    forwardRef(() => CategoriesModule),
    forwardRef(() => PostsModule),
    forwardRef(() => FavoritesModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
