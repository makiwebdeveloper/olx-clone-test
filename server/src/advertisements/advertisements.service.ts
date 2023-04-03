import { HttpStatus, Injectable } from '@nestjs/common';
import { BadRequestException, HttpException } from '@nestjs/common/exceptions';
import { Advertisement, Prisma } from '@prisma/client';
import { PaginationService } from 'src/pagination/pagination.service';
import { PrismaService } from 'src/prisma.service';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { DeleteAdvertisementDto } from './dto/delete-advertisement.dto';
import {
  AdvertisementsSortEnum,
  GetAllAdvertisementsDto,
} from './dto/get-all-advertisements.dto';
import { UpdateAdvertisementDto } from './dto/update-advertisement.dto';
import { UsersService } from 'src/users/users.service';
import { ReturnAdvertisementSelect } from './return-advertisement.object';

@Injectable()
export class AdvertisementsService {
  constructor(
    private prisma: PrismaService,
    private paginationService: PaginationService,
    private usersService: UsersService,
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
      select: ReturnAdvertisementSelect,
    });

    return {
      advertisements,
      length: await this.prisma.advertisement.count({
        where: prismaSearchTermFilter,
      }),
    };
  }

  async getById(id: number) {
    const advertisement = await this.prisma.advertisement.findUnique({
      where: {
        id,
      },
      select: ReturnAdvertisementSelect,
    });

    return advertisement;
  }

  async create(
    userId: number,
    dto: CreateAdvertisementDto,
    filenames: string[] = [],
  ) {
    return this.prisma.advertisement.create({
      data: {
        title: dto.title,
        description: dto.description,
        price: +dto.price,
        categoryId: +dto.categoryId,
        userId,
        images: filenames,
      },
      select: ReturnAdvertisementSelect,
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
      select: ReturnAdvertisementSelect,
    });
  }

  async delete(userId: number, dto: DeleteAdvertisementDto) {
    const advertisement = await this.getById(dto.id);
    const user = await this.usersService.findById(userId);

    if (advertisement.userId === userId || user.roles.includes('ADMIN')) {
      return this.prisma.advertisement.delete({
        where: {
          id: dto.id,
        },
        select: ReturnAdvertisementSelect,
      });
    } else {
      throw new HttpException('No access', HttpStatus.FORBIDDEN);
    }
  }
}
