import { Module } from '@nestjs/common';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { cacheConfig } from '../config/cache.config';
import { CacheService } from './cache.service';

@Module({
    exports:[
        CacheService
    ],
    imports: [
        RedisModule.forRoot({
            readyLog: true,
            config: {
                host: cacheConfig.redisHost,
                port: parseInt(cacheConfig.redisPort,10),
                password: cacheConfig.redisPassword
            }
        }),
    ],
    providers:[
        CacheService
    ]
})
export class CacheModule {}