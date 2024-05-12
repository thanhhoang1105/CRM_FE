import axiosClient from '../axios-client';
import { IStage } from '../stages';

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
    avatar: IAvatar;
}

export interface IAvatar {
    id: string;
    name: string;
    type: string;
    physicalPath: string;
}

const apiOpportunities = '/opportunities';

const OpportunitiesService = {
    // gọi API lấy ra Opportunities
    getOpportunities: (): Promise<IOpportunities[]> => {
        const url = apiOpportunities + '/all';
        return axiosClient.get(url);
    },

    // gọi API lấy ra dữ liệu chi tiết theo id
    getOpportunitiesDetail: (id: string): Promise<IOpportunities> => {
        const url = apiOpportunities + `/${id}`;
        return axiosClient.get(url);
    },

    // API cập nhật lại vị trí và thông tin chi tiết của Opportunities
    updateBoard: (params: IOpportunities): Promise<IOpportunities> => {
        const url = apiOpportunities + `/${params.id}?stageId=${params.stage.id}`;
        return axiosClient.put(url, params);
    },

    // API cập nhật lại salesperson
    updateSalesperson: (opportunityId: string, salespersonId: string): Promise<IOpportunities> => {
        const url = apiOpportunities + `/${opportunityId}/salesperson/${salespersonId}`;
        return axiosClient.put(url);
    }
};

export default OpportunitiesService;
