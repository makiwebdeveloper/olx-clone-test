import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateAdvertisementDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  price: number;

  @IsNumber()
  categoryId: number;
}
