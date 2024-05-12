import axiosClient from '../axios-client';

const apiStages = '/stages';

export interface IStage {
    id: string;
    name: string;
    revenue: number;
    code: number;
}

const StageService = {
    // gọi API lấy ra Stage
    getStage: (): Promise<IStage[]> => {
        const url = apiStages + '/all';
        return axiosClient.get(url);
    }
};

export default StageService;
