import { Prisma } from '@prisma/client';
import { ReturnCategorySelect } from 'src/categories/return-category.object';
import { ReturnUserSelect } from 'src/users/return-user.object';

export const ReturnAdvertisementSelect: Prisma.AdvertisementSelect = {
  id: true,
  createdAt: true,
  updatedAt: true,
  title: true,
  description: true,
  price: true,
  images: true,
  category: {
    select: ReturnCategorySelect,
  },
  user: {
    select: ReturnUserSelect,
  },
};
