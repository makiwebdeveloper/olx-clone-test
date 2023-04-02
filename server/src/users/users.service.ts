import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'argon2';
import { UpdateUserDto } from './dto/update-user.dto';
import { GiveRoleDto } from './dto/give-role.dto';
import { UserSelect, UserWithFavorites } from './return-user.object';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: await hash(dto.password),
        // roles: ['ADMIN', 'USER'],
      },
    });

    return user;
  }

  async getAllUsers() {
    return await this.prisma.user.findMany({
      select: {
        ...UserSelect,
      },
    });
  }

  async getProfile(id: number) {
    const user = await this.findById(id);
    return this.returnUserFields(user);
  }

  async updateProfile(id: number, dto: UpdateUserDto, avatarPath: string) {
    const isSameUser = await this.findByEmail(dto.email);

    if (isSameUser && id !== isSameUser.id) throw new BadRequestException();

    const user = await this.findById(id);

    const updatedUser = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        email: dto.email,
        password: dto.password ? await hash(dto.password) : user.password,
        name: dto.name,
        phone: dto.phone,
        avatarPath,
      },
      include: {
        favorites: true,
      },
    });

    return this.returnUserFields(updatedUser);
  }

  async deleteUser(id: number) {
    const user = this.prisma.user.delete({
      where: { id },
    });

    return user;
  }

  async giveRole(dto: GiveRoleDto) {
    const user = await this.findById(dto.userId);

    const roles = user.roles.includes(dto.role)
      ? user.roles
      : [...user.roles, dto.role];

    return await this.prisma.user.update({
      where: {
        id: dto.userId,
      },
      data: {
        roles,
      },
    });
  }

  async toggleFavorite(userId: number, advertisementId: number) {
    const user = await this.findById(userId);

    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        favorites: {
          [user.favorites.some((item) => item.id === advertisementId)
            ? 'disconnect'
            : 'connect']: {
            id: advertisementId,
          },
        },
      },
      include: {
        favorites: true,
      },
    });
  }

  async findById(id: number): Promise<UserWithFavorites> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        favorites: true,
      },
    });

    return user;
  }

  async findByEmail(email: string): Promise<UserWithFavorites> {
    return this.prisma.user.findUnique({
      where: { email },
      include: { favorites: true },
    });
  }

  returnUserFields(user: User) {
    const { password, ...restUser } = user;
    return restUser;
  }
}
