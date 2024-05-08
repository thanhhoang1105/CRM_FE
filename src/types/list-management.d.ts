import { IBaseTableProps } from '@/components/common/table/table';
import { IQuickFilterData } from '@/types/common';
import { ITableShowedColumn } from '@/types/table';
import { FormInstance, TableColumnType } from 'antd';
import { BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { ButtonProps } from 'antd/es/button';
import { ReactNode } from 'react';
import { IFilterCount, IFilterData, IFilterExportButton, IFilterImportButton, IFilterSearchInput, IFilterSegmented } from './filter';

export interface IQuickFilterService {
    getAll: () => void;
    create: (value: IQuickFilterData) => void;
    update: (value: IQuickFilterData) => void;
    delete: (id: number) => void;
}

export interface IListManagementTable<T> extends IBaseTableProps<T> {
    data: T[];
    columns: TableColumnType<T>[];
    showedColumns: {
        data: ITableShowedColumn[];
        onChange: (value: ITableShowedColumn[]) => void;
    };
    note?: ReactNode | string;
}

export interface IListManagementFilter<T> {
    form?: FormInstance;
    data: IFilterData[];
    value: any;
    loading: boolean;
    count?: IFilterCount;
    searchInput: IFilterSearchInput;
    segmented?: IFilterSegmented;
    moreButtons?: (ButtonProps | IFilterImportButton | IFilterExportButton<T>)[];
    onChangeData: (data: IFilterData[]) => void;
    onFilter: (value: any) => void;
}

export interface IListManagementQuickFilter {
    service: IQuickFilterService;
    onChange?: (quickFilterItem: IQuickFilterData, segmentedValue?: any) => void;
}

export interface IListManagementProps<T> {
    pageTitle: string;
    breadcrumb: BreadcrumbItemType[];
    buttons?: ButtonProps[];
    quickFilter: IListManagementQuickFilter;
    filter: IListManagementFilter<T>;
    table: IListManagementTable<T>;
}
