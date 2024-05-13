import axiosClient from '../axios-client';
import { IAvatar } from '../opportunities';

export interface IListAllUser {
    id: string;
    firstname: string;
    lastname: string;
    fullname: string;
    email: string;
    phone: string;
    birthday: string;
    gender: string;
    username: string;
    role: string[];
    avatar: IAvatar;
}

const apiURL = '/users';

const UsersService = {
    // gọi API lấy ra dữ liệu list user
    getListAllUser: (): Promise<IListAllUser[]> => {
        const url = apiURL + '/all';
        return axiosClient.get(url);
    },

    addNewUser: (params: IListAllUser): Promise<IListAllUser> => {
        const url = apiURL;
        return axiosClient.post(url, params);
    },

    updateUser: (params: IListAllUser): Promise<IListAllUser> => {
        const url = apiURL + `/${params.id}`;
        return axiosClient.put(url, params);
    }
};

export default UsersService;
