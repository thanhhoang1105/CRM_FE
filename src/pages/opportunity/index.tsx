import DetailContent from '@/components/common/detail-common/detail-content';
import ButtonsIcon from '@/components/common/table/buttons-icon';
import TableHaveAdd from '@/components/common/table/table-add';
import BaseTag from '@/components/common/tag';
import pathnames from '@/pathnames';
import OpportunitiesService, { IOpportunities, ISalesPerson } from '@/services/opportunities';
import { IStage } from '@/services/stages';
import { formatDataTable, formatMappingKey, renderWithFallback, statusMapping } from '@/utils/common';
import icons from '@/utils/icons';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';

const OpportunityManagement = () => {
    const [dataOpportunities, setDataOpportunities] = useState<IOpportunities[]>([]);
    const [isShowModalAdd, setIsShowModal] = useState<boolean>(false);

    //#region render table
    // định nghĩa các cột sẽ render ra Table
    const columnContacts: ColumnsType<IOpportunities> = [
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
                        },
                        {
                            icon: icons.tableAction.delete,
                            // onClick: () => handleEditContact(record),
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
        const fetchData = async () => {
            const [opportunitiesRes] = await Promise.all([OpportunitiesService.getOpportunities()]);

            if (opportunitiesRes) setDataOpportunities(opportunitiesRes);
        };
        fetchData();
    }, []);

    return (
        <DetailContent>
            <TableHaveAdd
                title="Opportunities"
                dataSource={formatDataTable(dataOpportunities)}
                columns={columnContacts}
                handleAdd={() => setIsShowModal(true)}
                tableScroll={dataOpportunities.length > 10 ? { x: 'max-content', y: 200 } : { x: 'max-content' }}
            />
        </DetailContent>
    );
};

export default OpportunityManagement;
