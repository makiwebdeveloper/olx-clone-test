import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ReturnCategorySelect } from './return-category.object';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.category.findMany({
      select: ReturnCategorySelect,
    });
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

  async update(categoryId: number, name: string) {
    return this.prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name,
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
