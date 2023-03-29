import { Module, forwardRef } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, PrismaService],
  imports: [forwardRef(() => AuthModule)],
})
export class CategoriesModule {}
