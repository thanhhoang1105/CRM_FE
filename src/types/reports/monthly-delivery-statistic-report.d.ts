export interface IByDGs {
    dg: string;
    previousMonth: number;
    currentMonth: number;
    increaseDecrease: number;
    percentage: number;
}

export interface IOverviewItem {
    label: string;
    value: number;
}

export interface ISharedServicesUnit {
    sharedServicesUnit: string;
    effort: number;
    billable: number;
    nb: number;
    nbrPercentage: number;
}

export interface IStaffGradeIndex {
    dg: string;
    in: number;
    out: number;
    delta: number;
    previousMonthStaffIndex: number;
    currentMonthStaffIndex: number;
}
