import axiosClient from '../axios-client';

export interface ISchedule {
    totalItems: number;
    activities: IActivities[];
    totalPages: number;
    currentPages: number;
}

export interface IActivities {
    id: string;
    fullname: string;
    type: string;
    summary: string;
    date: string;
    detail: string;
    done: boolean;
}

const apiURL = '/activities';

const ActivitiesService = {
    // gọi API lấy ra dữ liệu của activities theo opportunities id
    getListScheduleByOpportunitiesId: (id: string): Promise<ISchedule> => {
        const url = apiURL + `/schedule/${id}`;
        return axiosClient.get(url);
    },

    // gọi API lấy ra dữ liệu của activities theo opportunities id
    getListActivitiesByOpportunitiesId: (id: string): Promise<ISchedule> => {
        const url = apiURL + `/auto/${id}`;
        return axiosClient.get(url);
    },

    addNewActivities: (id: string, params: IActivities): Promise<IActivities> => {
        const url = apiURL + `/opportunity/${id}`;
        return axiosClient.post(url, params);
    },
    updateActivities: (params: IActivities): Promise<IActivities> => {
        const url = apiURL + `/${params.id}`;
        return axiosClient.put(url, params);
    }
};

export default ActivitiesService;
