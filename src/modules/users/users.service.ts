import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from '@database/database.service';
import { ListOrder } from '@constants/list';
import { encrypt } from '@utils/encrypt';
import { IPagination } from 'src/types/global';
import { Prisma } from '@prisma/client';
import { EventsGateway } from '@gateways/events.gateway';
import { CreateUserDto, UpdateUserDto } from './dto';
import { RedisService } from '@database/redis.service';

const USER_SELECT = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  username: true,
  nickname: true,
  role: true,
  createdAt: true,
  updatedAt: true,
});

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService, private eventsGateway: EventsGateway, private redisService: RedisService) {}

  async createUser(data: CreateUserDto) {
    const user = await this.databaseService.user.findUnique({
      where: {
        username: data.username,
      },
    });
    if (user) {
      throw new HttpException(`user which username is '${data.username}' was exist`, HttpStatus.FORBIDDEN);
    }
    this.eventsGateway.refresh();
    const res = await this.databaseService.user.create({
      data: {
        username: data.username,
        nickname: data.nickname,
        password: encrypt(data.password),
      },
      select: USER_SELECT,
    });
    return res;
  }

  async getUsers(pagination: IPagination, keyword: string) {
    const [items, total] = await this.databaseService.$transaction([
      this.databaseService.user.findMany({
        where: {
          nickname: {
            contains: keyword,
          },
        },
        orderBy: {
          updatedAt: ListOrder.Desc,
        },
        select: USER_SELECT,
        take: pagination.pageSize,
        skip: (pagination.page - 1) * pagination.pageSize,
      }),
      this.databaseService.user.count({
        where: {
          nickname: {
            contains: keyword,
          },
        },
      }),
    ]);
    return {
      items,
      total,
    };
  }

  async getUser(id: number) {
    const user = await this.databaseService.user.findUnique({
      where: {
        id,
      },
      select: USER_SELECT,
    });
    if (!user) {
      throw new HttpException(`user which id is '${id}' was not found`, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async updateUser(id: number, data: UpdateUserDto) {
    const oldUser = await this.getUser(id);
    const newUser: UpdateUserDto = {
      nickname: data.nickname || oldUser.nickname,
    };
    if (data.password) {
      newUser.password = encrypt(data.password);
    }
    return await this.databaseService.user.update({
      where: {
        id,
      },
      data: newUser,
      select: USER_SELECT,
    });
  }

  async removeUser(id: number) {
    await this.redisService.removeAuthToken(id);
    await this.databaseService.user.delete({
      where: {
        id,
      },
    });
    return 'ok';
  }
}
