import DetailContent from '@/components/common/detail-common/detail-content';
import BaseTable from '@/components/common/table/table';
import ContactsService, { IContacts } from '@/services/contacts/contacts';
import { formatDataTable, renderWithFallback } from '@/utils/common';
import { TIME_FORMAT } from '@/utils/constants';
import { ColumnsType } from 'antd/es/table';
import Title from 'antd/es/typography/Title';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const ContactManagement = () => {
    const [dataContacts, setDataContacts] = useState<IContacts[]>([]);
    //#region render table
    // định nghĩa các cột sẽ render ra Table
    const columnContact: ColumnsType<IContacts> = [
        {
            dataIndex: 'fullname',
            key: 'fullname',
            fixed: 'left',
            title: 'Name',
            width: 150
        },
        {
            dataIndex: 'jobPosition',
            key: 'jobPosition',
            title: 'Job position',
            width: 200,
            render: (item: string) => renderWithFallback(item)
        },
        {
            dataIndex: 'email',
            key: 'email',
            title: 'Email',
            width: 200,
            render: (item: string) => renderWithFallback(item)
        },
        {
            dataIndex: 'phone',
            key: 'phone',
            title: 'Phone',
            width: 200,
            render: (item: string) => renderWithFallback(item)
        },
        {
            dataIndex: 'birthday',
            key: 'birthday',
            title: 'Birthday',
            width: 200,
            render: (item: string) => renderWithFallback(dayjs(item).format(TIME_FORMAT.VN_DATE))
        },
        {
            dataIndex: 'gender',
            key: 'gender',
            title: 'Gender',
            width: 200,
            render: (item: string) => renderWithFallback(item)
        }
    ];
    //#endregion

    useEffect(() => {
        const fetchData = async () => {
            const [contactsRes] = await Promise.all([ContactsService.getListAllContact()]);

            if (contactsRes) setDataContacts(contactsRes);
        };
        fetchData();
    }, []);

    return (
        <DetailContent>
            <Title level={3}>Contacts</Title>
            <BaseTable dataSource={formatDataTable(dataContacts)} columns={columnContact} />
        </DetailContent>
    );
};

export default ContactManagement;
