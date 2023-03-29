import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AdvertisementsService {
  constructor(private prisma: PrismaService) {}

  async getAll() {}

  async getById(id: number) {}
}
