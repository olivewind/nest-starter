import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: '登录账号',
    required: true,
  })
  @IsNotEmpty()
  username: string;
  @ApiProperty({
    description: '登录密码',
    required: true,
  })
  @IsNotEmpty()
  password: string;
}
