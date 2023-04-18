import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/strategy/jwt.strategy';
import { MulterModule } from '@nestjs/platform-express';
import { CategoriesModule } from './categories/categories.module';
import { PaginationModule } from './pagination/pagination.module';
import { AppController } from './app.controler';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MulterModule.register({
      dest: '/uploads',
    }),
    PassportModule,
    UsersModule,
    AuthModule,
    PostsModule,
    CategoriesModule,
    PaginationModule,
  ],
  controllers: [AppController],
  providers: [PrismaService, JwtStrategy],
})
export class AppModule {}
