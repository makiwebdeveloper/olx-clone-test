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
import { AdvertisementsService } from './advertisements.service';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { GetAllAdvertisementsDto } from './dto/get-all-advertisements.dto';
import { UpdateAdvertisementDto } from './dto/update-advertisement.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/utils/file-upload.utils';

@Controller('advertisements')
export class AdvertisementsController {
  constructor(private readonly advertisementsService: AdvertisementsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllAdvertisements(@Query() dto: GetAllAdvertisementsDto) {
    return this.advertisementsService.getAll(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':advertisementId')
  getOneAdvertisement(@Param('advertisementId') id: string) {
    return this.advertisementsService.getById(Number(id));
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
  createAdvertisement(
    @CurrentUser('id') userId: number,
    @Body() dto: CreateAdvertisementDto,
    @UploadedFiles() files?: Array<Express.Multer.File>,
  ) {
    const filenames: string[] = files.map((file) => file.filename);
    return this.advertisementsService.create(userId, dto, filenames);
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
  @Put(':advertisementId')
  updateAdvertisement(
    @CurrentUser('id') userId: number,
    @Param('advertisementId') advertisementId: string,
    @Body() dto: UpdateAdvertisementDto,
    @UploadedFiles() files?: Array<Express.Multer.File>,
  ) {
    const filenames: string[] = files.map((file) => file.filename);
    return this.advertisementsService.update(
      userId,
      +advertisementId,
      dto,
      filenames,
    );
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Delete(':advertisementId')
  deleteAdvertisement(
    @CurrentUser('id') id: number,
    @Param('advertisementId') advertisementId: string,
  ) {
    return this.advertisementsService.delete(id, +advertisementId);
  }
}
