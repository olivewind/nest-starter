import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
// import { ElasticsearchService } from './elasticsearch.service';
import { RedisService } from './redis.service';

@Global()
@Module({
  imports: [],
  providers: [DatabaseService, RedisService],
  exports: [DatabaseService, RedisService],
})
export class DatabaseModule {}
