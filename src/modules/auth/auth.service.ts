import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from '@database/database.service';
import { encrypt } from '@utils/encrypt';
import { LoginDto } from './dto';
import { RedisService } from '@database/redis.service';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private databaseService: DatabaseService, private redisService: RedisService) {}

  async login(params: LoginDto) {
    const user = await this.databaseService.user.findFirst({
      where: {
        username: params.username,
        password: encrypt(params.password),
      },
    });
    if (!user) {
      throw new HttpException(`username or password incorrect`, HttpStatus.FORBIDDEN);
    }
    const accessToken = this.jwtService.sign({
      username: user.username,
      nickname: user.nickname,
      id: user.id,
      role: user.role,
    });

    this.redisService.setAuthToken(user.id, accessToken);
    return {
      accessToken,
    };
  }
}
