import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CurrencyType } from './create-post.dto';

export class UpdatePostDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  currency: CurrencyType;

  @IsNumber()
  @IsOptional()
  categoryId?: number;
}
