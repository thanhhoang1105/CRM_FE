import DetailInfo from '@/components/common/detail-common/detail-info';
import BaseTable from '@/components/common/table/table';
import ActivitiesService, { IActivities, ISchedule } from '@/services/activities';
import { formatDataTable } from '@/utils/common';
import { TIME_FORMAT } from '@/utils/constants';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export interface IActivitiesInBoardEditProps {
    id: string;
}

const ActivitiesInBoardEdit = (props: IActivitiesInBoardEditProps) => {
    const { id } = props;
    const [dataActivities, setDataActivities] = useState<ISchedule>();

    //#region render table activities
    const columnsActivities: ColumnsType<IActivities> = [
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
            title: 'Change',
            width: 200
        },
        {
            dataIndex: 'date',
            key: 'date',
            title: 'Date',
            width: 130,
            render: (item: string) => dayjs(item).format(TIME_FORMAT.VN_DATE)
        }
    ];
    //#endregion

    // call API
    useEffect(() => {
        const getDataDetail = async () => {
            const [activitiesRes] = await Promise.all([ActivitiesService.getListActivitiesByOpportunitiesId(id)]);

            setDataActivities(activitiesRes);
        };

        getDataDetail();
    }, [id]);

    return (
        <DetailInfo title="Activities logs">
            <BaseTable dataSource={formatDataTable(dataActivities?.activities)} columns={columnsActivities} />
        </DetailInfo>
    );
};

export default ActivitiesInBoardEdit;
