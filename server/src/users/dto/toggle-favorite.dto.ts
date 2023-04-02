import { IsNumber } from 'class-validator';

export class ToggleFavoriteDto {
  @IsNumber()
  advertisementId: number;
}
