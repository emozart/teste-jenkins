import instance, { AxiosRequestConfig,AxiosInstance } from 'axios';
import { proxyConfig } from '../config/proxy.config';
import { appConfig } from '../config/app.config';

const config: AxiosRequestConfig = {};

if(proxyConfig.user && proxyConfig.password){
    config.proxy = {
        auth: {
            password: proxyConfig.password,
            username: proxyConfig.user,
        },
        host: proxyConfig.server,
        port: parseInt(proxyConfig.port,10),
    };
}

const axiosService: AxiosInstance = instance.create(config);
axiosService.defaults.timeout = appConfig.timeout;

export default axiosService;
