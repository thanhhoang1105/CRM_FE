import { IDialogImportProps } from '@/components/common/dialog/dialog-import/dialog-import';
import BaseSelect from '@/components/common/form/select';
import TreeSelect from '@/components/common/form/tree-select';
import FilterDateRange from '@/components/common/list-management/filter/filter-date-range';
import { IFilterSegmentedOption } from '@/types/filter';
import { ButtonProps, Checkbox, FormInstance, FormItemProps, Input, ModalProps, Radio } from 'antd';
import { SegmentedProps } from 'antd/es/segmented';
import { ReactElement, ReactNode } from 'react';
import { IDialogShowHideColumnsProps } from './table';
import DatePicker from '@/components/common/form/date-picker';

export interface IFilterOption {
    label: string;
    value: string | number;
}
interface IFilterDataBase extends FormItemProps {
    key: string;
    name?: undefined;
    forColumns: string[];
    defaultShow?: boolean;
    alwaysShow?: boolean;
    colSpan?: number;
    show?: boolean;
    children?: undefined;
    control:
        | ReactElement<typeof Input>
        | ReactElement<typeof BaseSelect>
        | ReactElement<typeof TreeSelect>
        | ReactElement<typeof Checkbox>
        | ReactElement<typeof Radio>
        | ReactElement<typeof FilterDateRange>
        | ReactElement<typeof DatePicker>;
}
export type IFilterData = IFilterDataBase;

export interface IFilterCount {
    value: number;
    setValue: (value: number) => void;
}

export interface IFilterControlProps<T> {
    groupKey: string;
    data: T;
    renderFilterItems: (data: IFilterData[], groupKey: string) => ReactNode[];
    onChangeValue: (groupKey: string, value: any) => void;
}

export interface IDialogShowMoreFilterProps extends ModalProps {
    open: boolean;
    onClose: () => void;
    data: IFilterData[];
    onReset: () => void;
    onSave: (value: IFilterData[]) => void;
}

export interface IFilterSegmentedOption {
    value: any;
    label: string;
}

export interface IFilterSearchInput {
    value: string;
    placeholder: string;
    onChange: (value: string) => void;
}

export interface IFilterSegmentedOption {
    value: any;
    label: string;
}

export interface IFilterSegmented {
    name: string;
    value: any;
    options: IFilterSegmentedOption[];
    onChange: (value: any) => void;
}

export interface IFilterExportButton<T> extends ButtonProps {
    name: 'exportFile';
    service: any;
    fileName: string;
    onExport: (data: T[]) => any;
}

export interface IFilterImportButton extends ButtonProps {
    name: 'importFile';
    service: any;
}

export interface IFilterProps {
    form: FormInstance<any>;
    data: IFilterData[];
    loading: boolean;
    count: number;
    moreButtons?: ButtonProps[];
    showContent: boolean;
    setShowContent: (value: boolean) => void;
    onChangeValue: () => void;

    // Search
    searchInput: IFilterSearchInput;

    // More filter
    moreFilterButton?: ButtonProps | false;
    moreFilterModal?: IDialogShowMoreFilterProps | false;

    // Segmented
    segmented?: IFilterSegmented;

    // Import, export
    importModal?: IDialogImportProps | false;
    onShowImportModal: () => void;
    exportLoading: boolean;
    onExport: () => void;

    // Bottom buttons
    applyButton: ButtonProps;
    resetButton: ButtonProps;
    quickFilterAddButton: ButtonProps;

    // Segmented and more buttons
    segmented?: SegmentedProps | false;

    // Table showed columns
    tableShowedColumnsButton?: ButtonProps | false;
    tableShowedColumnsModal?: IDialogShowHideColumnsProps | false;
}
