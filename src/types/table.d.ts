import { ModalProps } from 'antd';

export interface ITableShowedColumn {
    key: string;
    label: string;
    defaultShow?: boolean;
    alwaysShow?: boolean;
    show?: boolean;
    enabledSearch?: boolean;
}

interface IDialogShowHideColumnsProps extends ModalProps {
    open: boolean;
    onClose: () => void;
    data: ITableShowedColumn[];
    onReset: () => void;
    onSave: (value: ITableShowedColumn[]) => void;
}
