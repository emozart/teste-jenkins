import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TerminusModule, } from '@nestjs/terminus';
import { RedisHealthModule } from '@liaoliaots/nestjs-redis/health';
import { HealthCheckController } from './health-check.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { dbConfig } from '../config/db.config';

@Module({
    imports: [
        HttpModule,
        TerminusModule,
        RedisHealthModule,
        SequelizeModule.forRoot({
            dialect: 'mysql',
            host: dbConfig.HOST,
            port: Number(dbConfig.port) || 3308,
            username: dbConfig.USER, 
            password: dbConfig.PASSWORD,
            database: dbConfig.DB
          }),
    ],
    controllers:[HealthCheckController],
    providers:[
    ]
})
export class HealthCheckModule {}