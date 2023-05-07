import { ICategory } from "./category.interface";
import { IUser } from "./user.interface";

export enum CurrencyEnum {
  USD = "USD",
  EUR = "EUR",
  UAH = "UAH",
}

export interface IPost {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  price: number;
  currency: CurrencyEnum;
  images: string[];
  category: ICategory;
  user: IUser;
}
