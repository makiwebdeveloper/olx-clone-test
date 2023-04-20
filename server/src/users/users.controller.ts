import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
  Param,
  UploadedFile,
  Res,
  HttpCode,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/decorators/jwt.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/decorators/roles.guard';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { editFileName, imageFileFilter } from 'src/utils/file-upload.utils';
import { GiveRoleDto } from './dto/give-role.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getCurrentUserProfile(@CurrentUser('id') id: number) {
    return this.usersService.getProfile(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile/:userId')
  getProfile(@Param('userId') id: string) {
    return this.usersService.getProfile(+id);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Put('/profile')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  updateProfile(
    @CurrentUser('id') id: number,
    @Body() dto: UpdateUserDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.usersService.updateProfile(id, dto, file?.filename);
  }

  @HttpCode(200)
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':userId')
  deleteUser(@Param('userId') userId: string) {
    return this.usersService.deleteUser(+userId);
  }

  @HttpCode(200)
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/role/:userId')
  giveRole(@Param('userId') userId: string, @Body() dto: GiveRoleDto) {
    return this.usersService.giveRole(+userId, dto.role);
  }

  @HttpCode(200)
  @Put('/favorites/:postId')
  @UseGuards(JwtAuthGuard)
  toggleFavorite(
    @CurrentUser('id') id: number,
    @Param('postId') postId: string,
  ) {
    return this.usersService.toggleFavorite(id, +postId);
  }
}
