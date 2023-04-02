import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/pagination/pagination.dto';

export enum AdvertisementsSortEnum {
  HIGH_PRICE = 'high-price',
  LOW_PRICE = 'low-price',
  NEWEST = 'newest',
  OLDEST = 'oldest',
}

export class GetAllAdvertisementsDto extends PaginationDto {
  @IsOptional()
  @IsEnum(AdvertisementsSortEnum)
  sort?: AdvertisementsSortEnum;

  @IsOptional()
  @IsString()
  searchTerm?: string;
}
