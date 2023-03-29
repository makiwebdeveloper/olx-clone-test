import { IsString } from 'class-validator';

export class DeleteCategoryDto {
  @IsString()
  id: string;
}
