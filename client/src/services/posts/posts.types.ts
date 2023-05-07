import { CurrencyEnum } from "@/interfaces/post.interface";

export type DataType = {
  title?: string;
  description?: string;
  price?: number;
  currency?: CurrencyEnum;
  categoryId?: number;
  files?: File[];
};

export type DataFiltersType = {
  searchTerm?: string;
  sort?: PostsSortEnum;
  categoryId?: number;
  page?: string | number;
  perPage?: string | number;
};

export enum PostsSortEnum {
  HIGH_PRICE = "high-price",
  LOW_PRICE = "low-price",
  NEWEST = "newest",
  OLDEST = "oldest",
}
