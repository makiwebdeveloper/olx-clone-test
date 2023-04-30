import { IsNumber, IsEnum } from 'class-validator';

export class GiveRoleDto {
  @IsEnum(['ADMIN'])
  role: 'ADMIN';

  @IsNumber()
  userId: number;
}
