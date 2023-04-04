import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAdvertisementDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsNumber()
  @IsOptional()
  categoryId?: number;
}
