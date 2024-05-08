import { ICurrentUser, Login } from '../types/auth';
import axiosClient from './axios-client';

const apiURL = '/auth';

const authApi = {
    login(params: Login): Promise<ICurrentUser> {
        const url = apiURL + '/login';
        return axiosClient.post(url, params);
    }
};

export default authApi;
