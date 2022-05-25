import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { CacheService } from '../cache/cache.service';
import { ApiService } from './api-service';
import axiosService  from './axios-service';
import { KeycloackService } from '../keycloack/keycloak.service';

@Injectable()
export class ApiAuthenticatedService extends ApiService {
  constructor(public cacheService:CacheService,public keycloackService:KeycloackService){
    super(cacheService);
  }

  async onRequestAuthenticated({
    url,
    method,
    data,
    config,
  }:{
    url: string;
    method: string;
    data ?: string | Record<string,unknown>;
    config: AxiosRequestConfig; 
  }
  ){
    const token = await this.keycloackService.getKeycloakToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      ...(config?.headers || {}),
    }
    try {
      return await axiosService({
        data,
        method,
        url,
        ...config,
        headers,
      })
    } catch (error) {
      throw error;
    }
  }
}
