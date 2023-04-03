import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ReturnCategorySelect } from './return-category.object';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const categories = await this.prisma.category.findMany({
      select: ReturnCategorySelect,
    });

    return {
      categories,
      length: categories.length,
    };
  }

  async getById(id: number) {
    return this.prisma.category.findUnique({
      where: {
        id,
      },
      select: ReturnCategorySelect,
    });
  }

  async create(dto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: {
        name: dto.name,
      },
      select: ReturnCategorySelect,
    });
  }

  async update(dto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: {
        id: dto.id,
      },
      data: {
        name: dto.name,
      },
      select: ReturnCategorySelect,
    });
  }

  async delete(id: number) {
    return this.prisma.category.delete({
      where: {
        id,
      },
      select: ReturnCategorySelect,
    });
  }
}
