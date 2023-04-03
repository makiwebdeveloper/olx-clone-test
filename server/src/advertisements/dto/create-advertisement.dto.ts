import {
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';
import { IsNumberOrString } from 'src/utils/string-or-number.validator';

export class CreateAdvertisementDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @Validate(IsNumberOrString)
  price: number | string;

  @Validate(IsNumberOrString)
  categoryId: number | string;
}
