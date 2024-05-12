import axiosClient from '../axios-client';

export interface IStage {
    id: string;
    name: string;
    revenue: number;
    code: number;
}

const apiURL = '/stages';

const StageService = {
    // gọi API lấy ra Stage
    getStage: (): Promise<IStage[]> => {
        const url = apiURL + '/all';
        return axiosClient.get(url);
    }
};

export default StageService;
