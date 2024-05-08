export interface ISpanOfControlReport {
    title: string;
    data: IData[];
}

export interface IData {
    type: string;
    value: number;
}
