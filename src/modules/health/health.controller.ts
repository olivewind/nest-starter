import { Public } from '@core/guards/jwt-auth.guard';
import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HealthCheck } from '@nestjs/terminus';
import { ApiHealthIndicator, DatabaseHealthIndicator, RedisHealthIndicator } from './health.indicator';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private apiHealthIndicator: ApiHealthIndicator,
    private databaseHealthIndicator: DatabaseHealthIndicator,
    private redisHealthIndicator: RedisHealthIndicator, // private elasticsearchHealthIndicator: ElasticsearchHealthIndicator,
  ) {}

  @Public()
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.apiHealthIndicator.isHealthy(),
      () => this.databaseHealthIndicator.isHealthy(),
      () => this.redisHealthIndicator.isHealthy(),
      // () => this.elasticsearchHealthIndicator.isHealthy(),
    ]);
  }
}
