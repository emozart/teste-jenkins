import { Module } from '@nestjs/common';
import { KeycloakService } from './keycloak.service';
import { keycloackConfig } from '../config/keycloak.config';
import { CacheModule } from '../cache/cache.module';
import { APP_GUARD } from '@nestjs/core';
import {
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
  AuthGuard,
} from 'nest-keycloak-connect';

@Module({
    exports:[
        KeycloakService
    ],
    imports: [
        CacheModule,
        KeycloakConnectModule.register({
            authServerUrl: keycloackConfig.authServerUrl,
            realm: keycloackConfig.realm,
            clientId: keycloackConfig.clientID,
            secret: keycloackConfig.clientSecret,
            // optional if you want to retrieve JWT from cookie
            cookieKey: 'KEYCLOAK_JWT',
        }),
    ],
    providers:[
        KeycloakService,
    // These are in order, see https://docs.nestjs.com/guards#binding-guards
    // for more information
 
    // This adds a global level authentication guard, you can also have it scoped
    // if you like.
    //
    // Will return a 401 unauthorized when it is unable to
    // verify the JWT token or Bearer header is missing.
    {
        provide: APP_GUARD,
        useClass: AuthGuard,
      },
      // This adds a global level resource guard, which is permissive.
      // Only controllers annotated with @Resource and methods with @Scopes
      // are handled by this guard.
      {
        provide: APP_GUARD,
        useClass: ResourceGuard,
      },
      // New in 1.1.0
      // This adds a global level role guard, which is permissive.
      // Used by `@Roles` decorator with the optional `@AllowAnyRole` decorator for allowing any
      // specified role passed.
      {
        provide: APP_GUARD,
        useClass: RoleGuard,
      },
    ]
})
export class keycloakModule {}