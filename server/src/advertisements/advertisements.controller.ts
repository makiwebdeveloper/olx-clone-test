import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  UseGuards,
  Param,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/decorators/jwt.guard';
import { AdvertisementsService } from './advertisements.service';

@Controller('advertisements')
export class AdvertisementsController {
  constructor(private readonly advertisementsService: AdvertisementsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.advertisementsService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':advertisementId')
  getOne(@Param('advertisements') id: string) {
    return this.advertisementsService.getById(+id);
  }
}
