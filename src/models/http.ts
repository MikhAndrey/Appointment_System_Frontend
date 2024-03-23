import axios from 'axios';
import {JwtService} from "../services/jwt.service";
import {AccountService} from "../services/account.service";

const httpClient = axios.create()

const accessTokenInterceptor = (config: any) => {
    const accessToken: string | null = JwtService.getJwt();
    
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
};

const errorInterceptor = async(error: any) => {
    switch (error.response?.status) {
        case 401:
            const originalConfig = error.config;
            if (originalConfig.url !== "/token" && error.response) {
                if (!originalConfig._retry) {
                    originalConfig._retry = true;

                    const accountService: AccountService = new AccountService();
                    if (JwtService.isTokenExpired()) {
                        const refreshToken: string | null = JwtService.getRefresh();
                        if (refreshToken !== null) {
                            try {
                                const tokenResponse = await accountService.refreshTokens(refreshToken);
                                JwtService.setTokens(tokenResponse.data);
                                originalConfig.headers['Authorization'] = `Bearer ${tokenResponse.data.access}`;
                                return httpClient(originalConfig);
                            } catch (error) {
                                accountService.logout().then(() => {
                                    JwtService.removeTokens();
                                });
                                return Promise.reject(error);
                            }
                        } else {
                            JwtService.removeTokens();
                            return Promise.reject(new Error('No refresh token available'));
                        }
                    }
                }
            }
            break;
    }

    return Promise.reject(error);
};

httpClient.interceptors.request.use(accessTokenInterceptor);
httpClient.interceptors.response.use(undefined, errorInterceptor);

export default httpClient
