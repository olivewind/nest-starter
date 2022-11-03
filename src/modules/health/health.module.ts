import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { DatabaseHealthIndicator, ApiHealthIndicator, RedisHealthIndicator } from './health.indicator';

@Module({
  imports: [HttpModule, TerminusModule],
  controllers: [HealthController],
  providers: [ApiHealthIndicator, DatabaseHealthIndicator, RedisHealthIndicator],
})
export class HealthModule {}
