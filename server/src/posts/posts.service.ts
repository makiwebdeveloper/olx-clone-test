import { HttpStatus, Injectable } from '@nestjs/common';
import { BadRequestException, HttpException } from '@nestjs/common/exceptions';
import { Prisma } from '@prisma/client';
import { PaginationService } from 'src/pagination/pagination.service';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { GetAllPostsDto, PostsSortEnum } from './dto/get-all-posts.dto';
import { ReturnPostSelect } from './return-post.object';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    private prisma: PrismaService,
    private paginationService: PaginationService,
    private usersService: UsersService,
  ) {}

  async getAll(dto: GetAllPostsDto = {}) {
    const { searchTerm, sort, categoryId, userId } = dto;
    const prismaSort: Prisma.PostOrderByWithRelationInput[] = [];

    if (sort === PostsSortEnum.LOW_PRICE) prismaSort.push({ price: 'asc' });
    else if (sort === PostsSortEnum.HIGH_PRICE)
      prismaSort.push({ price: 'desc' });
    else if (sort === PostsSortEnum.OLDEST)
      prismaSort.push({ createdAt: 'asc' });
    else prismaSort.push({ createdAt: 'desc' });

    const prismaSearchTermFilter: Prisma.PostWhereInput = {
      title:
        {
          contains: searchTerm,
          mode: 'insensitive',
        } || undefined,
      categoryId: +categoryId || undefined,
      userId: +userId || undefined,
    };

    const { perPage, skip } = this.paginationService.getPagination(dto);

    const posts = await this.prisma.post.findMany({
      where: prismaSearchTermFilter,
      orderBy: prismaSort,
      skip,
      take: perPage,
      select: ReturnPostSelect,
    });

    return {
      posts,
      length: await this.prisma.post.count({
        where: prismaSearchTermFilter,
      }),
    };
  }

  async getById(id: number) {
    const post = await this.prisma.post.findUnique({
      where: {
        id,
      },
      select: ReturnPostSelect,
    });

    return post;
  }

  async create(userId: number, dto: CreatePostDto, filenames: string[] = []) {
    return this.prisma.post.create({
      data: {
        title: dto.title,
        description: dto.description,
        price: +dto.price,
        categoryId: +dto.categoryId,
        userId,
        images: filenames,
      },
      select: ReturnPostSelect,
    });
  }

  async update(
    userId: number,
    postId: number,
    dto: UpdatePostDto,
    filenames: string[],
  ) {
    const post = await this.getById(postId);
    if (post.userId !== userId) throw new BadRequestException();

    return this.prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        ...dto,
        images: filenames,
      },
      select: ReturnPostSelect,
    });
  }

  async delete(userId: number, postId: number) {
    const post = await this.getById(postId);
    const user = await this.usersService.findById(userId);

    if (post.userId === userId || user.roles.includes('ADMIN')) {
      return this.prisma.post.delete({
        where: {
          id: postId,
        },
        select: ReturnPostSelect,
      });
    } else {
      throw new HttpException('No access', HttpStatus.FORBIDDEN);
    }
  }
}
