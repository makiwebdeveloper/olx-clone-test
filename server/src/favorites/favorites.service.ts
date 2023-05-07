import { Injectable } from '@nestjs/common';
import { ReturnPostSelect } from 'src/posts/return-post.object';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}
  async getFavorites(userId: number) {
    const favorites = await this.prisma.favoriteProduct.findMany({
      where: {
        userId,
      },
      select: {
        post: {
          select: ReturnPostSelect,
        },
      },
    });

    return favorites.map((fav) => fav.post);
  }

  async toggleFavorite(userId: number, postId: number) {
    const favorites = await this.prisma.favoriteProduct.findMany({
      where: { postId, userId },
      select: {
        post: true,
      },
    });

    if (favorites.some((fav) => fav.post.id === postId)) {
      await this.prisma.favoriteProduct.deleteMany({
        where: {
          postId,
        },
      });
    } else {
      await this.prisma.favoriteProduct.create({
        data: {
          userId,
          postId,
        },
      });
    }

    return this.getFavorites(userId);
  }
}
