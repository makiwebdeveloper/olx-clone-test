import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { Prisma } from '@prisma/client';
import { PaginationService } from 'src/pagination/pagination.service';
import { PrismaService } from 'src/prisma.service';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { DeleteAdvertisementDto } from './dto/delete-advertisement.dto';
import {
  AdvertisementsSortEnum,
  GetAllAdvertisementsDto,
} from './dto/get-all-advertisements.dto';
import { UpdateAdvertisementDto } from './dto/update-advertisement.dto';

@Injectable()
export class AdvertisementsService {
  constructor(
    private prisma: PrismaService,
    private paginationService: PaginationService,
  ) {}

  async getAll(dto: GetAllAdvertisementsDto = {}) {
    const { searchTerm, sort } = dto;
    const prismaSort: Prisma.AdvertisementOrderByWithRelationInput[] = [];

    if (sort === AdvertisementsSortEnum.LOW_PRICE)
      prismaSort.push({ price: 'asc' });
    else if (sort === AdvertisementsSortEnum.HIGH_PRICE)
      prismaSort.push({ price: 'desc' });
    else if (sort === AdvertisementsSortEnum.OLDEST)
      prismaSort.push({ createdAt: 'asc' });
    else prismaSort.push({ createdAt: 'desc' });

    const prismaSearchTermFilter: Prisma.AdvertisementWhereInput = searchTerm
      ? {
          OR: [
            {
              category: {
                name: {
                  contains: searchTerm,
                  mode: 'insensitive',
                },
              },
            },
            {
              title: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
            {
              description: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
          ],
        }
      : {};

    const { perPage, skip } = this.paginationService.getPagination(dto);

    const advertisements = await this.prisma.advertisement.findMany({
      where: prismaSearchTermFilter,
      orderBy: prismaSort,
      skip,
      take: perPage,
    });

    return {
      advertisements,
      length: await this.prisma.advertisement.count({
        where: prismaSearchTermFilter,
      }),
    };
  }

  async getById(id: number) {
    return this.prisma.advertisement.findUnique({
      where: {
        id,
      },
    });
  }

  async create(userId: number, dto: CreateAdvertisementDto) {
    return this.prisma.advertisement.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  async update(
    userId: number,
    dto: UpdateAdvertisementDto,
    filenames: string[],
  ) {
    const { id, ...updatedData } = dto;

    const advertisement = await this.getById(+dto.id);
    if (advertisement.userId !== userId) throw new BadRequestException();

    return this.prisma.advertisement.update({
      where: {
        id: +dto.id,
      },
      data: {
        ...updatedData,
        images: filenames,
      },
    });
  }

  async delete(userId: number, dto: DeleteAdvertisementDto) {
    const advertisement = await this.getById(dto.id);
    if (advertisement.userId !== userId) throw new BadRequestException();

    return this.prisma.advertisement.delete({
      where: {
        id: dto.id,
      },
    });
  }
}
