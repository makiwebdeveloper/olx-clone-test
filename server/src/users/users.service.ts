import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'argon2';
import { UpdateUserDto } from './dto/update-user.dto';
import { ReturnUserSelect } from './return-user.object';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(dto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        email: dto.email,
        password: await hash(dto.password),
        // roles: ['ADMIN', 'USER'],
      },
    });
  }

  async getAllUsers() {
    return this.prisma.user.findMany({ select: ReturnUserSelect });
  }

  async getProfile(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      select: ReturnUserSelect,
    });
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
      select: ReturnUserSelect,
    });

    return updatedUser;
  }

  async deleteUser(id: number) {
    return this.prisma.user.delete({
      where: { id },
      select: ReturnUserSelect,
    });
  }

  async giveRole(userId: number, role: string) {
    const user = await this.findById(userId);

    const roles = user.roles.includes(role)
      ? user.roles
      : [...user.roles, role];

    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        roles,
      },
      select: ReturnUserSelect,
    });
  }

  async findById(id: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async returnUserFields(userId: number) {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: ReturnUserSelect,
    });
  }
}
