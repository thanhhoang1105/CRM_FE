import DetailInfo from '@/components/common/detail-common/detail-info';
import ButtonsIcon from '@/components/common/table/buttons-icon';
import { renderBooleanStatus } from '@/components/common/table/render-boolean-status';
import BaseTable from '@/components/common/table/table';
import ActivitiesService, { IActivities, ISchedule } from '@/services/activities';
import { formatDataTable } from '@/utils/common';
import { TIME_FORMAT } from '@/utils/constants';
import icons from '@/utils/icons';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export interface IScheduleInBoardEditProps {
    id: string;
}

const ScheduleInBoardEdit = (props: IScheduleInBoardEditProps) => {
    const { id } = props;
    const [dataSchedule, setDataSchedule] = useState<ISchedule>();

    //#region render table schedule
    const handleEditSchedule = (dataEdit: IActivities) => {
        console.log('handleEditSchedule', dataEdit);
    };

    const handleDeleteSchedule = (dataDelete: IActivities) => {
        console.log('handleDeleteSchedule', dataDelete);
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
                        },
                        {
                            icon: icons.tableAction.delete,
                            onClick: () => handleDeleteSchedule(record),
                            tooltip: 'Delete',
                            placement: 'top'
                        }
                    ]}
                />
            )
        }
    ];
    //#endregion

    useEffect(() => {
        const getDataDetail = async () => {
            const [scheduleRes] = await Promise.all([ActivitiesService.getListScheduleByOpportunitiesId(id)]);

            setDataSchedule(scheduleRes);
        };

        getDataDetail();
    }, [id]);

    return (
        <DetailInfo title="Schedule activities">
            <BaseTable dataSource={formatDataTable(dataSchedule?.activities)} columns={columnsSchedule} />
        </DetailInfo>
    );
};

export default ScheduleInBoardEdit;
