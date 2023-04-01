import { IsString, IsNumber } from 'class-validator';

export class GiveRoleDto {
  @IsString()
  role: string;

  @IsNumber()
  userId: number;
}
