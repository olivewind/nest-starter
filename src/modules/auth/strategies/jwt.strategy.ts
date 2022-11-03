import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AUTH_SECRET } from '@constants/auth';
import { PayloadDto } from '../dto/payload.dto';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from '@database/redis.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private redisService: RedisService, private jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: AUTH_SECRET,
    });
  }

  async validate(payload: PayloadDto) {
    const cacheToken = await this.redisService.getAuthToken(payload.id);
    if (!cacheToken) {
      throw new HttpException(`token invalid`, HttpStatus.UNAUTHORIZED);
    }
    const cachePayload: PayloadDto = this.jwtService.decode(cacheToken) as PayloadDto;
    if (cachePayload.iat !== payload.iat || cachePayload.exp !== payload.exp) {
      throw new HttpException(`token expired`, HttpStatus.UNAUTHORIZED);
    }
    // const user = await this.databaseService.user.findUnique({
    //   where: {
    //     id: toNumber(payload.id),
    //   },
    // });
    // if (!user) {
    //   throw new HttpException(`token invalid, user which id is ${payload.id} not exist`, HttpStatus.UNAUTHORIZED);
    // }
    return {
      id: payload.id,
      username: payload.username,
      nickname: payload.nickname,
      role: payload.role,
    };
  }
}
