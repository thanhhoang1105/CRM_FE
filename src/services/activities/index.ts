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
    detail: string;
    date: string;
    done: boolean;
}

const apiActivities = '/activities';

const ActivitiesService = {
    // gọi API lấy ra dữ liệu của activities theo opportunities id
    getListScheduleByOpportunitiesId: (id: string): Promise<ISchedule> => {
        const url = apiActivities + `/schedule/${id}`;
        return axiosClient.get(url);
    },

    // gọi API lấy ra dữ liệu của activities theo opportunities id
    getListActivitiesByOpportunitiesId: (id: string): Promise<ISchedule> => {
        const url = apiActivities + `/auto/${id}`;
        return axiosClient.get(url);
    }
};

export default ActivitiesService;
