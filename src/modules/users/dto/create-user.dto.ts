import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: '登录账号',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: '登录密码',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: '用户昵称',
  })
  @IsNotEmpty()
  nickname: string;
}
