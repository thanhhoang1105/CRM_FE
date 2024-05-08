export interface ITemporaryIndex {
    companies: { companyId: string; companyName: string }[];
    statuses: { statusId: string; statusName: string; statusTypeId: number; totalEffort: number }[];
    units: { unitId: string; unitName: string }[];
}

export interface ITemporaryDetail {
    temporaryLeaveId: number;
    employeeId: number;
    badgeId: string;
    fullName: string;
    projectId: number;
    projectName: string;
    leaveTypeName: string;
    leaveTypeId: number;
    leaveTypeColor: string;
    startDate: string;
    endDate: string;
    actualEndDate: string;
    notes: string;
    effort: number;
}

export interface ITemporaryExport {
    temporaryLeaveIds: string[];
}
