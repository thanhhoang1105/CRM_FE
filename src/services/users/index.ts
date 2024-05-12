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
    roles: string[];
    avatar: IAvatar;
}

const apiUsers = '/users';

const UsersService = {
    // gọi API lấy ra dữ liệu list user
    getListAllUser: (): Promise<IListAllUser[]> => {
        const url = apiUsers + '/all';
        return axiosClient.get(url);
    }
};

export default UsersService;
