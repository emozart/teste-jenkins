import { Injectable } from '@nestjs/common';
import qs from 'qs';
import atob from 'atob';
import { keycloackConfig } from "../config/keycloak.config"
import { ApiService } from '../util/api-service';
import { RequestBody } from './interfaces/request-body';


@Injectable()
export class KeycloackService extends ApiService {

    private async getKeycloakServiceArgs(){
        const cacheRefreshToken: string = (await this.cacheService.get(keycloackConfig.clientRefreshToken)) as string;

        if(!cacheRefreshToken){
            return [keycloackConfig.clientCredentions,null];
        }

        return [keycloackConfig.clientRefreshToken,cacheRefreshToken];
    }

    private async cacheToken(token:string, cachekey:string){
        const {exprationTime,iat} = JSON.parse(atob(token.split('.')[1]));
        const tokenExprationTime = exprationTime - iat - 30;

        if(
            (cachekey === keycloackConfig.clientRefreshToken && tokenExprationTime > 300)
            || (cachekey === keycloackConfig.clientRefreshToken && tokenExprationTime > 60) 
        ){
            await this.cacheService.set(cachekey,token,{ ttl: tokenExprationTime,})
        }
    }

    private async updateKeycloakServiceCache(){

        const [grantType,cacheRefreshToken] = await this.getKeycloakServiceArgs();
        const [accessToken,refreshToken] = await this.getKeycloakServiceToken(grantType,cacheRefreshToken);
        try {
            await this.cacheToken(accessToken,keycloackConfig.clientToken);
            await this.cacheToken(refreshToken,keycloackConfig.clientRefreshToken);
        } catch (error) {
            return accessToken;
        }

    }

    private async getKeycloakServiceToken(grantType:string,cacheRefreshToken=''): Promise<string[]>{

        const paylod = {
            client_id: keycloackConfig.clientID,
            client_secret: keycloackConfig.clientSecret,
            grant_type: keycloackConfig.grant_type,
        } as RequestBody

        if(grantType !== '' && grantType === keycloackConfig.clientRefreshToken){
            paylod.refresh_token = cacheRefreshToken;
        } else {
            paylod.grant_type = keycloackConfig.grant_type;
        }

        const{
            data: { access_token, refresh_token}, 
        } = await this.onRequest(
                {
                    config:{
                        headers:{
                        'content-type':'applicationx-www-form-urlencoded'
                        },
                    },
                    data: qs.stringify(paylod),
                    method:'post',
                    url:`${keycloackConfig.clientURL}/protocol/openid-connect/token`,
                }
            );
        return [access_token,refresh_token] as Array<string>;
    }

    async getKeycloakToken(){
        let token: string = (await this.cacheService.get(keycloackConfig.clientToken)) as string;
        if(!token) {
            token = await this.updateKeycloakServiceCache();
        }
        return token;
    }
}
