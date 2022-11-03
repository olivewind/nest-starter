## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn dev

# debug mode
$ yarn start:debug

# production mode
$ yarn start:prod
```

## Migrate Database
* [Prisma docs](https://www.prisma.io/docs/reference/api-reference/command-reference#prisma-migrate)

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```


## TODO LIST

- [x] 基础权限
  - [x] 登录接口
  - [x] JWT 校验
  - [x] 基础角色校验
- [x] 核心架构
  - [x] 请求参数校验
  - [x] 响应结构包装
  - [x] 异常统一处理
  - [x] 接口文档生成
  - [x] 统一日志收集
  - [x] 请求头安全处理
- [x] 通用请求
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
- [x] 数据库
  - [x] 数据库迁移脚本
  - [x] 数据库种子脚本
  - [x] 数据软删中间件


