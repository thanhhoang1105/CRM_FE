import axiosClient from '../axios-client';

export interface IStage {
    id: string;
    name: string;
    revenue: number;
    code: number;
}

export interface ISalesPerson {
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

export interface IOpportunities {
    id: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    address: string;
    website: string;
    description: string;
    revenue: number;
    priority: string;
    probability: number;
    lostReason: null;
    stage: IStage;
    salesperson: ISalesPerson;
    customer: boolean;
    column: any;
}

const apiStages = '/stages';
const apiOpportunities = '/opportunities';

const BoardService = {
    // gọi API lấy ra Stage
    getStage: (): Promise<IStage[]> => {
        const url = apiStages + '/all';
        return axiosClient.get(url);
    },

    // gọi API lấy ra Opportunities
    getOpportunities: (): Promise<IOpportunities[]> => {
        const url = apiOpportunities + '/all';
        return axiosClient.get(url);
    },

    // API cập nhật lại vị trí và thông tin chi tiết của Opportunities
    updateBoard: (params: IOpportunities): Promise<IOpportunities> => {
        const url = apiOpportunities + `/${params.id}?stageId=${params.stage.id}`;
        return axiosClient.put(url, params);
    }
};

export default BoardService;
