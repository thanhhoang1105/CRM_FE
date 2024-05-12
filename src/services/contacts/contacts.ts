import axiosClient from '../axios-client';

export interface IContacts {
    id: string;
    firstname: string;
    lastname: string;
    fullname: string;
    email: string;
    phone: string;
    birthday: string;
    gender: string;
    jobPosition: string;
}

const apiURL = '/contacts';

const ContactsService = {
    getListAllContact: (): Promise<IContacts[]> => {
        const url = apiURL + `/all`;
        return axiosClient.get(url);
    },
    // gọi API lấy ra dữ liệu chi tiết của contact theo opportunities id
    getListContactsByOpportunitiesId: (id: string): Promise<IContacts[]> => {
        const url = apiURL + `/opportunity/${id}`;
        return axiosClient.get(url);
    },

    // create new contact
    addNewContact: (params: IContacts): Promise<IContacts> => {
        const url = apiURL + `/opportunity/${params.id}`;
        return axiosClient.post(url, params);
    },

    // update contact
    updateContact: (params: IContacts): Promise<IContacts> => {
        const url = apiURL + `/${params.id}`;
        return axiosClient.put(url, params);
    }
};

export default ContactsService;
