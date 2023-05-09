import {
  Controller,
  HttpCode,
  Put,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from 'src/auth/decorators/jwt.guard';
import { CurrentUser } from 'src/auth/decorators/user.decorator';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getFavorites(@CurrentUser('id') userId: number) {
    return this.favoritesService.getFavorites(userId);
  }

  @HttpCode(200)
  @Put(':postId')
  @UseGuards(JwtAuthGuard)
  toggleFavorite(
    @CurrentUser('id') id: number,
    @Param('postId') postId: string,
  ) {
    return this.favoritesService.toggleFavorite(id, +postId);
  }
}
