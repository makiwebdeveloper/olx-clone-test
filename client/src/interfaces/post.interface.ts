import { ICategory } from "./category.interface";
import { IUser } from "./user.interface";

export interface IPost {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: ICategory;
  user: IUser;
}
