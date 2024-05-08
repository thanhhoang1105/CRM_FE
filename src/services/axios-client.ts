import pathnames from '@/pathnames';
import axios from 'axios';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

const handleExpiredToken = () => {
    Cookies.remove('token');
    localStorage.removeItem('user');
    window.location.href = pathnames.login.path;
};

export interface TokenDecodeModel {
    exp: number;
}

export const getToken = () => {
    const token: string = Cookies.get('token') || '';

    if (token) {
        // Check expired token
        const tokenDecode: TokenDecodeModel = jwtDecode(token);
        const exp = tokenDecode.exp * 1000;
        const now = new Date().getTime();
        const isExpired = exp - now <= 0;

        if (isExpired) return handleExpiredToken();
    }

    return token;
};

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: { 'content-type': 'application/json;' }
});

axiosClient.interceptors.request.use(async config => {
    const token = getToken();

    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
});

axiosClient.interceptors.response.use(
    // Successfully
    response => response?.data,

    // Failed
    error => {
        const { status } = error.response;
        const response = { ...error.response.data, status: status };

        // Unauthorized
        if (status === 401) return handleExpiredToken();
        return response;
    }
);

export default axiosClient;
