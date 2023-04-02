import { Advertisement, User } from '@prisma/client';

export type UserWithFavorites = User & {
  favorites: Advertisement[];
};

export const UserSelect = {
  id: true,
  createdAt: true,
  updatedAt: true,
  email: true,
  name: true,
  avatarPath: true,
  phone: true,
  roles: true,
  favorites: true,
};
