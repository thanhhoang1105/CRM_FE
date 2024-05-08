export interface IEmployeeTransfer {
    employeeId: number;
    badgeId: string;
    fullName: string;
    workEmail: string;
    fromProjectName: string;
    toProjectName: string;
    transferStatusName: string;
    statusColor: string;
    transferDate: string;
    companyName: string;
    positionName: string;
    pendingApproveFullName: string;
    pendingApproveEmail: string;
    transferStatusColor: string;

    employeeId: number;
    fromProjectId: IEmployeeInfo.projectId;
    toProjectId: number;
    transferDate: string;
    fromLocation: IEmployeeInfo.employeeBuildingName;
    toLocation: string;
    beharfOffNotes: IEmployeeInfo.managerWorkEmail;
    transferNotes: string;
    revokeNotes: string;
    isSameCustomer: boolean;
    isDifferentCustomer: boolean;
    itActionNote: string;
    isKeepHDD: boolean;
    keepHDDReason: string;
    maillingList: string;
    removeMaillingList: string;
    revokeLabName: string;
    revokeWorkingRoomName: string;
    revokeRestrictRoomName: string;
    revokeConfidentialCabinetName: string;
    revokeOther: string;
    grantLabName: string;
    grantWorkingRoomName: string;
    grantRestrictRoomName: string;
    grantConfidentialCabinetName: string;
    grantOther: string;
}

export interface IMailingList {
    flagTransfer: string;
    flagDisableTransfer: number;
    label: string;
    value: string;
}

export interface IEmployeeInfo {
    badgeId: string;
    employeeBuildingName: string;
    employeeId: number;
    employeeImageUrl: string;
    fullName: string;
    locationId: number;
    managerBUId: number;
    managerBUUsername: string;
    managerBUWorkEmail: string;
    managerDCId: number;
    managerDCUsername: string;
    managerDCWorkEmail: string;
    managerDGId: number;
    managerDGUsername: string;
    managerDGWorkEmail: string;
    managerId: number;
    managerProgramId: number;
    managerProgramUsername: string;
    managerProgramWorkEmail: string;
    managerUsername: string;
    managerWorkEmail: string;
    projectId: number;
    projectName: string;
    username: string;
    workEmail: string;
}
