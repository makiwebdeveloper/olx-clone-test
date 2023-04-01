import { IsNumber } from 'class-validator';

export class DeleteAdvertisementDto {
  @IsNumber()
  id: number;
}
