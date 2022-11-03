# Nest Starter

## 功能清单
- [x] 通用功能
  - [x] 请求参数校验
  - [x] 响应结构包装
  - [x] 异常统一处理
  - [x] 接口文档生成：访问 `/docs` 即可看到 Swagger 文档
  - [x] 统一日志收集：使用 [winston](https://github.com/winstonjs/winston)，每日切割保存
  - [x] 响应安全处理：基于 [helmet](https://helmetjs.github.io/)
  - [x] 代码风格校验
- [x] 数据存储
  - [x] MySQL + [Prisma](https://www.prisma.io/docs/concepts/components/prisma-client)
  - [x] Redis：默认启用，仅用在令牌缓存，可以轻松去除
- [x] 权限验证
  - [x] 登录校验：基于 JWT
  - [x] 角色校验
- [x] 通用接口
  - [x] 用户模块
      - [x] 新建用户
      - [x] 查找用户
      - [x] 删除用户
      - [x] 修改用户
      - [x] 登录接口
  - [x] 文件模块
      - [x] 文件上传
      - [x] 文件删除
      - [x] 文件访问
  - [x] 健康检查
      - [x] 接口健康
      - [x] 数据库健康
- [x] 消息推送：基于 [socket.io](https://socket.io/)
- [x] 定时任务：理论上定时任务应该单独拆分服务，这里演示方便和业务模块放在一起
  

## 安装依赖
```bash
$ yarn
```

## 环境变量

|  变量名       | 用处|   示例|   
|  ----         | ----  | ----  |
| DATABASE_URL  |  MYSQL 连接 |  `mysql://root:root@127.0.0.1:3006/nest_starter` 
| SERVER_PORT   |  服务端口 | `3000` | 
| REDIS_HOST    |  Redis 地址  | `127.0.0.1` | 
| REDIS_PORT    |  Redis 端口 | `31003`| 
| REDIS_PASSWORD|  Redis 密码  | `123456` | 

## 开发环境

```bash
$ yarn dev
```

> 请提前准备好 MySQL 和 Redis，可以使用 docker-compose.yaml 直接启动，并使用 [Prisma](https://www.prisma.io/docs/reference/api-reference/command-reference#prisma-migrate) 初始化 MySQL 表结构


## 生产部署
直接使用 [docker-compose.yml](./docker-compose.yml)