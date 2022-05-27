import { Controller, Get } from '@nestjs/common';
import { HealthCheck,HealthCheckService,HttpHealthIndicator,SequelizeHealthIndicator } from '@nestjs/terminus';
import { RedisHealthIndicator } from '@liaoliaots/nestjs-redis/health';
import IORedis from 'ioredis';
import { cacheConfig } from '../config/cache.config';
import { healthConfig } from '../config/health.config';
import { dbConfig } from '../config/db.config';

@Controller('health')
export class HealthCheckController {
  constructor(
      private healthCheckService: HealthCheckService,
      private http: HttpHealthIndicator,
      private readonly redisHealthIndicator: RedisHealthIndicator,
      private db: SequelizeHealthIndicator) {}

  @Get()
  @HealthCheck()
  checkHealth(){
    const client = new IORedis({
        host: cacheConfig.redisHost,
        port: parseInt(cacheConfig.redisPort,10),
        password: cacheConfig.redisPassword,
    });

    return this.healthCheckService.check([
        ()=> this.http.pingCheck('Basic Check',`http://${healthConfig.nodeDockerHost}:${healthConfig.nodeDockerPort}`),
        ()=> this.redisHealthIndicator.checkHealth('redis',{type:'redis', client: client}),
        ()=> this.db.pingCheck('database'),
    ]);
  }
}
