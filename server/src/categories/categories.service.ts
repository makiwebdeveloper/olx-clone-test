import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const categories = await this.prisma.category.findMany();

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
    });
  }

  async create(dto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: {
        name: dto.name,
      },
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
    });
  }

  async delete(id: number) {
    return this.prisma.category.delete({
      where: {
        id,
      },
    });
  }
}
