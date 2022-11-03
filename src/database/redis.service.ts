import { AUTH_TOKEN_EXPIRED_TIME } from '@constants/auth';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

class RedisClient extends Redis {
  constructor() {
    super({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT as any as number,
      password: process.env.REDIS_PASSWORD,
    });
  }
}

@Injectable()
export class RedisService extends RedisClient {
  async setAuthToken(userId: number, token: string) {
    return this.setex(`access-token:${userId}`, AUTH_TOKEN_EXPIRED_TIME, token);
  }
  async getAuthToken(userId: number) {
    return this.get(`access-token:${userId}`);
  }
  async removeAuthToken(userId: number) {
    return this.del(`access-token:${userId}`);
  }
}
