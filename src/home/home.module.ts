import { Module } from '@nestjs/common';
import { keycloakModule } from '../keycloak/keycloak.module';
import { CacheModule } from '../cache/cache.module';
import { HomeResolver } from './home.resolve';

@Module({
    exports:[
        HomeResolver
    ],
    imports: [
        CacheModule,
        keycloakModule
    ],
    providers:[
        HomeResolver
    ]
})
export class HomeModule {}