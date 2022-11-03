import { Request } from 'express';
import { UserRole } from '@prisma/client';

interface IJwtRequest extends Request {
  user: {
    id: number;
    username: string;
    nickname: string;
    role: UserRole;
  };
}

interface IPagination {
  page: number;
  pageSize: number;
}

interface IResponseList<T> {
  items: T[];
  total: number;
}
