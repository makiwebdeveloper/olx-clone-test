import { IsString, IsEnum } from 'class-validator';

export class GiveRoleDto {
  @IsString()
  role: string;

  @IsString()
  userId: string;
}
