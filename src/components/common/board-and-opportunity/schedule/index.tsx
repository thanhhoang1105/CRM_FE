import BaseDatePicker from '@/components/common/date-picker';
import DetailInfo from '@/components/common/detail-common/detail-info';
import DialogHaveField from '@/components/common/dialog/dialog-have-field';
import ButtonsIcon from '@/components/common/table/buttons-icon';
import { renderBooleanStatus } from '@/components/common/table/render-boolean-status';
import TableHaveAdd from '@/components/common/table/table-add';
import { notificationActions } from '@/redux/notification-slice';
import { useAppDispatch } from '@/redux/store';
import ActivitiesService, { IActivities, ISchedule } from '@/services/activities';
import { IField } from '@/types/common';
import { formatDataTable } from '@/utils/common';
import { TIME_FORMAT } from '@/utils/constants';
import icons from '@/utils/icons';
import { Checkbox, Form, Input } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export interface IScheduleInBoardEditProps {
    id: string;
}

const ScheduleEdit = (props: IScheduleInBoardEditProps) => {
    const { id } = props;
    const [formAddActivities] = Form.useForm();
    const dispatch = useAppDispatch();

    const [dataSchedule, setDataSchedule] = useState<ISchedule>();
    const [dataEditActivities, setDataEditActivities] = useState<IActivities>();
    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    const [isReload, setIsReload] = useState<number>(0);

    //#region render table schedule
    const handleEditSchedule = (dataEdit: IActivities) => {
        setDataEditActivities(dataEdit);
        setIsShowModal(true);
        formAddActivities.setFieldsValue({ ...dataEdit, date: dayjs(dataEdit.date, TIME_FORMAT.DATE) });
    };

    // định nghĩa các cột sẽ render ra Table
    const columnsSchedule: ColumnsType<IActivities> = [
        {
            dataIndex: 'fullname',
            key: 'fullname',
            fixed: 'left',
            title: 'Full name',
            width: 200
        },
        {
            dataIndex: 'detail',
            key: 'detail',
            title: 'Detail',
            width: 200
        },
        {
            dataIndex: 'done',
            key: 'status',
            title: 'Status',
            align: 'center',
            width: 100,
            render: (item: boolean) => renderBooleanStatus(item, 'status schedule')
        },
        {
            dataIndex: 'date',
            key: 'date',
            title: 'Date',
            width: 130,
            render: (item: string) => dayjs(item).format(TIME_FORMAT.VN_DATE)
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            width: 20,
            render: (record: IActivities) => (
                <ButtonsIcon
                    items={[
                        {
                            icon: icons.tableAction.edit,
                            onClick: () => handleEditSchedule(record),
                            tooltip: 'Edit',
                            placement: 'top'
                        }
                    ]}
                />
            )
        }
    ];

    const fieldAddActivities: IField[] = [
        {
            name: 'type',
            label: 'Activities type',
            value: <Input placeholder="Enter activities type" />,
            colSpan: dataEditActivities ? 6 : 12,
            validation: [{ required: true, message: 'Please enter the valid value' }]
        },
        {
            name: 'date',
            label: 'Due date',
            value: <BaseDatePicker placeholder="dd/mm/yyyy" allowClear />,
            colSpan: dataEditActivities ? 6 : 12,
            validation: [{ required: true, message: 'Please enter the valid value' }]
        },
        {
            label: 'Done',
            value: (
                <Form.Item name="done" valuePropName="checked">
                    <Checkbox className="checkbox-container" />
                </Form.Item>
            ),
            colSpan: 12,
            hidden: !dataEditActivities
        },
        {
            name: 'summary',
            label: 'Summary',
            value: <Input.TextArea placeholder="Enter summary" className="text-area-item" />,
            colSpan: 24
        }
    ];

    const handleSubmitAddActivities = async () => {
        const dataForm = formAddActivities.getFieldsValue();
        const dataFormatted = { ...dataForm, date: dayjs(dataForm.date).format('YYYY-MM-DD') };

        try {
            const res = await ActivitiesService.addNewActivities(id, dataFormatted);
            if (res) {
                setIsShowModal(false);
                dispatch(notificationActions.setNotification({ type: 'success', message: 'Add activities successfully' }));
                setIsReload(isReload + 1);
            }
        } catch (error) {
            console.error('API error: handleSubmitAddActivities', error);
        }
    };

    const handleSubmitEditActivities = async () => {
        const dataForm = formAddActivities.getFieldsValue();
        const dataFormatted = { ...dataForm, date: dayjs(dataForm.date).format('YYYY-MM-DD'), id: dataEditActivities?.id };

        try {
            const res = await ActivitiesService.updateActivities(dataFormatted);
            if (res) {
                setIsShowModal(false);
                dispatch(notificationActions.setNotification({ type: 'success', message: 'Update activities successfully' }));
                setIsReload(isReload + 1);
            }
        } catch (error) {
            console.error('API error: handleSubmitEditActivities', error);
        }
    };

    const handleSubmit = () => {
        if (!dataEditActivities) {
            handleSubmitAddActivities();
        } else {
            handleSubmitEditActivities();
        }
    };

    const handleCancelSubmitAddActivities = () => {
        setIsShowModal(false);
        setDataEditActivities(undefined);
    };
    //#endregion

    useEffect(() => {
        const getDataDetail = async () => {
            const [scheduleRes] = await Promise.all([ActivitiesService.getListScheduleByOpportunitiesId(id)]);

            setDataSchedule(scheduleRes);
        };

        getDataDetail();
    }, [id, isReload]);

    return (
        <>
            <DetailInfo title="Schedule activities">
                <TableHaveAdd
                    title=""
                    dataSource={formatDataTable(dataSchedule?.activities)}
                    columns={columnsSchedule}
                    handleAdd={() => setIsShowModal(true)}
                    tableScroll={dataSchedule && dataSchedule.activities.length > 10 ? { x: 'max-content', y: 200 } : { x: 'max-content' }}
                />
            </DetailInfo>

            {/* Dialog add contacts */}
            <DialogHaveField
                form={formAddActivities}
                title={dataEditActivities ? 'Edit activities' : 'Add activities'}
                isShow={isShowModal}
                onCancel={handleCancelSubmitAddActivities}
                data={fieldAddActivities}
                handleSubmit={handleSubmit}
                renderColumn={dataEditActivities ? 4 : 2}
            />
        </>
    );
};

export default ScheduleEdit;
