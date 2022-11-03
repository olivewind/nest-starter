import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/client';

import { SetMetadata } from '@nestjs/common';

export const USER_ROLE_KEY = 'user_role';
export const RequiredUserRole = (role: UserRole) => SetMetadata(USER_ROLE_KEY, role);
export const IsAdmin = () => SetMetadata(USER_ROLE_KEY, 'ADMIN');

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredUserRole = this.reflector.getAllAndOverride<UserRole>(USER_ROLE_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredUserRole) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return requiredUserRole === user.role;
  }
}
