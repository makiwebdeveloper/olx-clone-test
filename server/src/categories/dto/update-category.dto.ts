import { IsNumber, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  name: string;

  @IsNumber()
  id: number;
}
