import axios from 'axios';
import {JwtService} from "../services/jwt.service";
import router from "../router";

const httpClient = axios.create()

const tokenInterceptor = (config: any) => {
    const accessToken: string | null = JwtService.getJwt();
    
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
};

const errorInterceptor = (error: any) => {
    switch (error.response.status) {
        case 401:
            router.push({ name: 'login' });
            JwtService.removeTokens();
            break;
    }

    return Promise.reject(error);
};

httpClient.interceptors.request.use(tokenInterceptor);
httpClient.interceptors.response.use(undefined, errorInterceptor);

export default httpClient
