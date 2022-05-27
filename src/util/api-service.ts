import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { CacheService } from '../cache/cache.service';
import axiosService  from './axios-service';

@Injectable()
export class ApiService {
  constructor(public cacheService:CacheService){}

  async onRequest({
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
    try {
      // return await axiosService({
      //   data,
      //   method,
      //   url,
      //   ...config,
      // });
      let result =  await axiosService({
        data,
        method,
        url,
        ...config,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}
