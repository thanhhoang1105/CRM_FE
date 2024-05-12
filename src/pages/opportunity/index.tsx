import DetailContent from '@/components/common/detail-common/detail-content';
import DialogImport from '@/components/common/detail-common/dialog-import/dialog-import';
import DialogHaveField from '@/components/common/dialog/dialog-have-field';
import BaseSelect from '@/components/common/select';
import ButtonsIcon from '@/components/common/table/buttons-icon';
import TableHaveAdd from '@/components/common/table/table-add';
import BaseTag from '@/components/common/tag';
import pathnames from '@/pathnames';
import { notificationActions } from '@/redux/notification-slice';
import { useAppDispatch } from '@/redux/store';
import OpportunitiesService, { IOpportunities, ISalesPerson } from '@/services/opportunities';
import StageService, { IStage } from '@/services/stages';
import UploadFileService from '@/services/upload-file';
import { IField } from '@/types/common';
import { appendFormData, formatDataTable, formatMappingKey, renderWithFallback, statusMapping } from '@/utils/common';
import icons from '@/utils/icons';
import { ButtonProps, Form, Input, Switch } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';

const OpportunityManagement = () => {
    const dispatch = useAppDispatch();
    const [formAddOpportunity] = Form.useForm();

    const [dataOpportunities, setDataOpportunities] = useState<IOpportunities[]>([]);
    const [dataStages, setDataStages] = useState<IStage[]>([]);
    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    const [isShowModalImport, setIsShowModalImport] = useState<boolean>(false);
    const [isReload, setIsReload] = useState<number>(0);

    //#region render table

    // định nghĩa các cột sẽ render ra Table
    const columnOpportunity: ColumnsType<IOpportunities> = [
        {
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
            title: 'Name',
            width: 150
        },
        {
            dataIndex: 'stage',
            key: 'stage',
            title: 'Stage',
            align: 'center',
            width: 50,
            render: (item: IStage) => {
                const statusConfig = statusMapping[formatMappingKey(item.name)];
                return <BaseTag {...statusConfig} statusName={item.name} />;
            }
        },
        {
            dataIndex: 'revenue',
            key: 'revenue',
            title: 'Expected revenue',
            width: 200
        },
        {
            dataIndex: 'description',
            key: 'description',
            title: 'Description',
            width: 200,
            render: (item: string) => renderWithFallback(item)
        },
        {
            dataIndex: 'salesperson',
            key: 'salesperson',
            title: 'Salesperson',
            width: 200,
            render: (item: ISalesPerson) => renderWithFallback(item?.fullname)
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            width: 20,
            render: (record: IOpportunities) => (
                <ButtonsIcon
                    items={[
                        {
                            icon: icons.tableAction.edit,
                            link: pathnames.opportunityManagement.edit.path + `/${record.id}`,
                            tooltip: 'Edit',
                            placement: 'top'
                        }
                    ]}
                />
            )
        }
    ];

    const fieldAddOpportunity: IField[] = [
        {
            name: 'company',
            label: 'Company name',
            value: <Input placeholder="Enter company name" />,
            validation: [{ required: true, message: 'Please enter the valid value' }]
        },
        {
            name: 'name',
            label: 'Name',
            value: <Input placeholder="Enter name" />,
            validation: [{ required: true, message: 'Please enter the valid value' }]
        },
        {
            name: 'email',
            label: 'Email',
            value: <Input placeholder="Enter email" />,
            validation: [{ required: true, message: 'Please enter the valid value' }]
        },
        {
            name: 'phone',
            label: 'Phone',
            value: <Input placeholder="Enter phone" />,
            validation: [{ required: true, message: 'Please enter the valid value' }]
        },
        {
            name: 'website',
            label: 'Website',
            value: <Input placeholder="Enter website" />,
            validation: [{ required: true, message: 'Please enter the valid value' }]
        },
        {
            name: 'address',
            label: 'Address',
            value: <Input placeholder="Enter address" />,
            validation: [{ required: true, message: 'Please enter the valid value' }]
        },
        {
            name: 'revenue',
            label: 'Experted revenue',
            value: <Input placeholder="Enter experted revenue" addonAfter="VND" />,
            validation: [{ required: true, message: 'Please enter the valid value' }]
        },
        {
            name: 'stageId',
            label: 'Stage',
            value: <BaseSelect options={dataStages.map(item => ({ label: item.name, value: item.id }))} placeholder="Select stage" />,
            validation: [{ required: true, message: 'Please enter the valid value' }]
        },
        {
            label: 'Customer',
            value: (
                <Form.Item name="customer" valuePropName="checked" className="switch-item">
                    <Switch />
                </Form.Item>
            )
        }
    ];

    const handleSubmit = async () => {
        const dataForm = formAddOpportunity.getFieldsValue();
        const dataFormatted = { ...dataForm };

        try {
            const res = await OpportunitiesService.addNewOpportunity(dataFormatted);
            if (res) {
                setIsShowModal(false);
                dispatch(notificationActions.setNotification({ type: 'success', message: 'Add activities successfully' }));
                setIsReload(isReload + 1);
            }
        } catch (error) {
            console.error('API error: handleSubmitAddActivities', error);
        }
    };

    const handleCancelSubmitAddOpportunity = () => {
        setIsShowModal(false);
    };

    //#endregion

    useEffect(() => {
        const fetchData = async () => {
            const [opportunitiesRes, stagesRes] = await Promise.all([OpportunitiesService.getOpportunities(), StageService.getStage()]);

            if (opportunitiesRes) setDataOpportunities(opportunitiesRes);
            if (stagesRes) setDataStages(stagesRes);
        };
        fetchData();
    }, [isReload]);

    const buttons: ButtonProps[] = [
        {
            onClick: () => setIsShowModalImport(true),
            type: 'text',
            children: 'Import'
        }
    ];

    const onImport = async (values: any) => {
        const formData = appendFormData(values);
        const res = await UploadFileService.uploadFile(formData);

        if (res) {
            dispatch(notificationActions.setNotification({ type: 'success', message: 'Import file successfully' }));
        } else {
            console.error('API error: onImport');
        }
    };

    return (
        <DetailContent>
            <TableHaveAdd
                title="Opportunities"
                dataSource={formatDataTable(dataOpportunities)}
                columns={columnOpportunity}
                handleAdd={() => setIsShowModal(true)}
                moreButton={buttons}
                tableScroll={dataOpportunities.length > 10 ? { x: 'max-content', y: 412 } : { x: 'max-content' }}
            />

            {/* Dialog add */}
            <DialogHaveField
                form={formAddOpportunity}
                title="Add opportunity"
                isShow={isShowModal}
                onCancel={handleCancelSubmitAddOpportunity}
                data={fieldAddOpportunity}
                handleSubmit={handleSubmit}
            />

            <DialogImport title="Import" open={isShowModalImport} onClose={() => setIsShowModalImport(false)} onImport={onImport} />
        </DetailContent>
    );
};

export default OpportunityManagement;
