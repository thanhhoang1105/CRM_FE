export interface ICurrentUser {
    user: IUser;
    token: string;
}

export interface IUser {
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
    avatar: {
        id: string;
        name: string;
        type: string;
        physicalPath: string;
    };
}

export interface Auth {
    loading: boolean;
    currentUser: ICurrentUser | null;
    expiredToken: boolean;
}

export interface Login {
    email: string;
    password: string;
    isRemember?: boolean;
}
