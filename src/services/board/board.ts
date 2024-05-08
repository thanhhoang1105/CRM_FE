import axiosClient from '../axios-client';

export interface IStage {
    id: string;
    name: string;
    revenue: number;
    code: number;
}

const apiStages = '/stages';

const BoardService = {
    getStage: (): Promise<IStage[]> => {
        const url = apiStages + '/all';
        return axiosClient.get(url);
    }
};

export default BoardService;
