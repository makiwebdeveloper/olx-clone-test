import { Module } from '@nestjs/common';
import { AdvertisementsService } from './advertisements.service';
import { AdvertisementsController } from './advertisements.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AdvertisementsController],
  providers: [AdvertisementsService, PrismaService],
})
export class AdvertisementsModule {}
