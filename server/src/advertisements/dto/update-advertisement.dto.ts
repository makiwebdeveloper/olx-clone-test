import { IsNumber, IsOptional, IsString, Validate } from 'class-validator';
import { IsNumberOrString } from 'src/utils/string-or-number.validator';

export class UpdateAdvertisementDto {
  @Validate(IsNumberOrString)
  id: number | string;

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
