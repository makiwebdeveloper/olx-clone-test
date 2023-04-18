import { Module, forwardRef } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { PaginationService } from 'src/pagination/pagination.service';
import { UsersService } from 'src/users/users.service';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PrismaService, PaginationService, UsersService],
  imports: [forwardRef(() => AuthModule)],
})
export class PostsModule {}
