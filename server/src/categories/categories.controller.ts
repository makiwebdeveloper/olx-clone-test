import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  UseGuards,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/decorators/jwt.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/decorators/roles.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { DeleteCategoryDto } from './dto/delete-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.categoriesService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':categoryId')
  getCategory(@Param('categoryId') id: string) {
    return this.categoriesService.getById(+id);
  }

  @HttpCode(200)
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  createCategory(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.create(dto);
  }

  @HttpCode(200)
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put()
  updateCategory(@Body() dto: UpdateCategoryDto) {
    return this.categoriesService.update(dto);
  }

  @HttpCode(200)
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete()
  deleteCategory(@Body() dto: DeleteCategoryDto) {
    return this.categoriesService.delete(dto.id);
  }
}
