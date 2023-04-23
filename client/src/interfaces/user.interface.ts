export interface IFavorite {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  price: number;
  images: string[];
  categoryId: number;
  userId: number;
}

export interface IUser {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  name: string;
  avatarPath: string;
  phone: string;
  roles: string;
  favorites: IFavorite[];
}
