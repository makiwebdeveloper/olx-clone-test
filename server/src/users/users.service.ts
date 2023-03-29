import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'argon2';
import { UpdateUserDto } from './dto/update-user.dto';
import { GiveRoleDto } from './dto/give-role.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: await hash(dto.password),
      },
    });

    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
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
    });

    return updatedUser;
  }

  async deleteUser(id: number) {
    const user = this.prisma.user.delete({
      where: { id },
    });

    return user;
  }

  async giveRole(dto: GiveRoleDto) {
    const user = await this.findById(+dto.userId);

    const roles = user.roles.includes(dto.role)
      ? user.roles
      : [...user.roles, dto.role];

    return await this.prisma.user.update({
      where: {
        id: +dto.userId,
      },
      data: {
        roles,
      },
    });
  }

  async findById(id: number): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  returnUserFields(user: User) {
    const { password, ...restUser } = user;
    return restUser;
  }
}
