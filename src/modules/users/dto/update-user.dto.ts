import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: '用户昵称',
    required: false,
  })
  nickname?: string;

  @ApiProperty({
    description: '登录密码',
    required: false,
  })
  password?: string;
}
