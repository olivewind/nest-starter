import { UserRole } from '@prisma/client';

export class PayloadDto {
  id: number;
  username: string;
  nickname: string;
  role: UserRole;
  iat: number;
  exp: number;
}
