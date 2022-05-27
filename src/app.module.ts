import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from './cache/cache.module';
import { HealthCheckModule } from './health-check/health-check.module';
import { HomeModule } from './home/home.module';
import { keycloakModule } from './keycloak/keycloak.module';
import { PhotosModule } from './photos/photos.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule,
    keycloakModule,
    HomeModule,
    HealthCheckModule,
    UsersModule,
    PhotosModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      context:({ req })=>({ req })
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
