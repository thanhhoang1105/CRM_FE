export interface IKpiReports {
    startDate: string;
    endDate: string;
    weekNumber: number;
    kpiUnitsReports: kpiUnitsReports[];
    kpiReportInformation: IKpiReportsInformation[];
}

export interface IKpiReportsUnit {
    unitId: number;
    unitName: string;
    unitTypeName: string;
    parent: number;
    totalAttrition: any;
    kpiChildUnitsReports: IKpiReportsUnit[];
}

export interface IKpiReportsInformation {
    dcId: number;
    dcName: string;
    dgId: number;
    dgName: string;
    fullName: number;
    projectId: number;
    projectName: number;
    applyDate: string;
    resignDate: string;
}
