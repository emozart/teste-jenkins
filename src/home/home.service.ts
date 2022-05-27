import { Inject, Injectable } from '@nestjs/common'
import { RedisService } from '@liaoliaots/nestjs-redis'
import { ApiAuthenticatedService } from 'src/util/api-authenticated.service'
import { CacheService } from '../cache/cache.service';
import { KeycloakService } from '../keycloak/keycloak.service';

@Injectable()
export class HomeService extends ApiAuthenticatedService {

    constructor(readonly cacheService:CacheService,readonly keycloakService:KeycloakService){
        super(cacheService,keycloakService);
    }

}