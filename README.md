# Nest Starter

## 已有特性
- [x] 核心架构
  - [x] 请求参数校验
  - [x] 响应结构包装
  - [x] 异常统一处理
  - [x] 接口文档生成（访问 `/docs` 即可看到 Swagger 文档）
  - [x] 统一日志收集
  - [x] 响应头安全处理
- [x] 数据存储
  - [x] MySQL（默认启用）
  - [x] Redis（默认启用，仅用在令牌缓存，可以轻松去除）
- [x] 基础权限
  - [x] 登录接口（Redis 缓存）
  - [x] JWT 校验
  - [x] 基础角色校验
- [x] 通用接口
  - [x] 用户模块
      - [x] 新建用户
      - [x] 查找用户
      - [x] 删除用户
      - [x] 修改用户
  - [x] 文件模块
      - [x] 文件上传
      - [x] 文件删除
      - [x] 文件访问
  - [x] 健康检查
      - [x] 接口健康
      - [x] 数据库健康
- [x] 定时任务（理论上定时任务应该单独拆分服务，这里演示方便和业务模块放在一起）
  



## 安装依赖
```bash
$ yarn
```

## 环境变量

|  变量名       | 用处|   示例|   
|  ----         | ----  | ----  |
| DATABASE_URL  |  MYSQL 连接地址 |  `mysql://root:root@127.0.0.1:3006/nest_starter` 
| SERVER_PORT   |  服务端口 | `3000` | 
| REDIS_HOST    |  Redis 地址  | `172.16.200.176` | 
| REDIS_PORT    |  Redis 端口 | `31003`| 
| REDIS_PASSWORD|  Redis 密码  | `123456` | 

## 开发环境

```bash
$ yarn dev
```

> 请提前准备好 MySQL 和 Redis，可以使用 docker-compose.yaml 直接启动，并使用 [Prisma](https://www.prisma.io/docs/reference/api-reference/command-reference#prisma-migrate) 初始化 MySQL 表结构


## 生产部署
直接使用 [docker-compose.yml](./docker-compose.yml)