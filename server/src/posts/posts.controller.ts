import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  UseGuards,
  Param,
  Body,
  Query,
  UseInterceptors,
  UploadedFiles,
  HttpCode,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/decorators/jwt.guard';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/utils/file-upload.utils';
import { GetAllPostsDto } from './dto/get-all-posts.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getAll(@Query() dto: GetAllPostsDto) {
    return this.postsService.getAll(dto);
  }

  @Get(':postId')
  getOne(@Param('postId') id: string) {
    return this.postsService.getById(Number(id));
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FilesInterceptor('images', 4, {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @Post()
  create(
    @CurrentUser('id') userId: number,
    @Body() dto: CreatePostDto,
    @UploadedFiles() files?: Array<Express.Multer.File>,
  ) {
    const filenames: string[] = files.map((file) => file.filename);
    return this.postsService.create(userId, dto, filenames);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FilesInterceptor('images', 4, {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @Put(':postId')
  update(
    @CurrentUser('id') userId: number,
    @Param('postId') postId: string,
    @Body() dto: UpdatePostDto,
    @UploadedFiles() files?: Array<Express.Multer.File>,
  ) {
    const filenames: string[] = files.map((file) => file.filename);
    return this.postsService.update(userId, +postId, dto, filenames);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Delete(':postId')
  delete(@CurrentUser('id') id: number, @Param('postId') postId: string) {
    return this.postsService.delete(id, +postId);
  }
}
