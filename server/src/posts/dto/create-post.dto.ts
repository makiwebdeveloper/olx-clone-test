import { IsOptional, IsString, Validate } from 'class-validator';
import { IsNumberOrString } from 'src/utils/string-or-number.validator';
import { Currency } from '@prisma/client';

export type CurrencyType = (typeof Currency)[keyof typeof Currency];

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @Validate(IsNumberOrString)
  price: number | string;

  @IsString()
  @IsOptional()
  currency: CurrencyType;

  @Validate(IsNumberOrString)
  categoryId: number | string;
}
