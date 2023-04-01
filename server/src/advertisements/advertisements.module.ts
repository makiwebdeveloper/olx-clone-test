import { Module, forwardRef } from '@nestjs/common';
import { AdvertisementsService } from './advertisements.service';
import { AdvertisementsController } from './advertisements.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { PaginationService } from 'src/pagination/pagination.service';

@Module({
  controllers: [AdvertisementsController],
  providers: [AdvertisementsService, PrismaService, PaginationService],
  imports: [forwardRef(() => AuthModule)],
})
export class AdvertisementsModule {}
