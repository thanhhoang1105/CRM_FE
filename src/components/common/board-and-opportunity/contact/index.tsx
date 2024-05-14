import BaseDatePicker from '@/components/common/date-picker';
import DetailInfo from '@/components/common/detail-common/detail-info';
import DialogHaveField from '@/components/common/dialog/dialog-have-field';
import BaseSelect from '@/components/common/select';
import ButtonsIcon from '@/components/common/table/buttons-icon';
import TableHaveAdd from '@/components/common/table/table-add';
import ContactsService, { IContacts } from '@/services/contacts/contacts';
import { IField } from '@/types/common';
import { formatDataTable } from '@/utils/common';
import icons from '@/utils/icons';
import { Form, Input } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useAppDispatch } from '@/redux/store';
import { notificationActions } from '@/redux/notification-slice';
import { optionGenders, TIME_FORMAT } from '@/utils/constants';

export interface IContactInBoardEditProps {
    id: string;
}

const ContactEdit = (props: IContactInBoardEditProps) => {
    const { id } = props;
    const [formAddContact] = Form.useForm();
    const dispatch = useAppDispatch();

    const [dataContacts, setDataContacts] = useState<IContacts[]>([]);
    const [dataEditContacts, setDataEditContacts] = useState<IContacts>();
    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    const [isReload, setIsReload] = useState<number>(0);

    //#region render table contact
    const handleEditContact = (dataEdit: IContacts) => {
        setIsShowModal(true);
        setDataEditContacts(dataEdit);
        formAddContact.setFieldsValue({ ...dataEdit, birthday: dayjs(dataEdit.birthday, TIME_FORMAT.DATE) });
    };

    // định nghĩa các cột sẽ render ra Table
    const columnContacts: ColumnsType<IContacts> = [
        {
            dataIndex: 'fullname',
            key: 'fullname',
            fixed: 'left',
            title: 'Full name',
            width: 200
        },
        {
            dataIndex: 'email',
            key: 'email',
            title: 'Email',
            width: 200
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            width: 20,
            render: (record: IContacts) => (
                <ButtonsIcon
                    items={[
                        {
                            icon: icons.tableAction.edit,
                            onClick: () => handleEditContact(record),
                            tooltip: 'Edit',
                            placement: 'right'
                        }
                    ]}
                />
            )
        }
    ];

    const fieldAddContacts: IField[] = [
        {
            name: 'firstname',
            label: 'First name',
            value: <Input placeholder="Enter first name" />,
            validation: [{ required: true, message: 'Please enter the valid value' }]
        },
        {
            name: 'lastname',
            label: 'Last name',
            value: <Input placeholder="Enter last name" />,
            validation: [{ required: true, message: 'Please enter the valid value' }]
        },
        {
            name: 'fullname',
            label: 'Full name',
            value: <Input placeholder="Enter full name" />,
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
            name: 'birthday',
            label: 'Birthday',
            value: <BaseDatePicker placeholder="dd/mm/yyyy" allowClear />,
            validation: [{ required: true, message: 'Please enter the valid value' }]
        },
        {
            name: 'gender',
            label: 'Gender',
            value: <BaseSelect options={optionGenders} placeholder="Select gender" />,
            validation: [{ required: true, message: 'Please enter the valid value' }]
        },
        {
            name: 'jobPosition',
            label: 'Job position',
            value: <Input placeholder="Enter job position" />,
            validation: [{ required: true, message: 'Please enter the valid value' }]
        }
    ];

    const handleSubmitAddContact = async () => {
        const dataForm = formAddContact.getFieldsValue();
        const dataFormatted = { ...dataForm, birthday: dayjs(dataForm.birthday).format('YYYY-MM-DD'), id };

        try {
            const res = await ContactsService.addNewContact(dataFormatted);
            if (res) {
                setIsShowModal(false);
                dispatch(notificationActions.setNotification({ type: 'success', message: 'Add contact successfully' }));
                setIsReload(isReload + 1);
            }
        } catch (error) {
            console.error('API error: handleSubmitAddContact', error);
        }
    };

    const handleSubmitEditContact = async () => {
        const dataForm = formAddContact.getFieldsValue();
        const dataFormatted = { ...dataForm, birthday: dayjs(dataForm.birthday).format('YYYY-MM-DD'), id: dataEditContacts?.id };

        try {
            const res = await ContactsService.updateContact(dataFormatted);
            if (res) {
                setIsShowModal(false);
                dispatch(notificationActions.setNotification({ type: 'success', message: 'Update contact successfully' }));
                setIsReload(isReload + 1);
            }
        } catch (error) {
            console.error('API error: handleSubmitAddContact', error);
        }
    };

    const handleSubmit = () => {
        if (!dataEditContacts) {
            handleSubmitAddContact();
        } else {
            handleSubmitEditContact();
        }
    };

    const handleCancelSubmitAddContact = () => {
        setIsShowModal(false);
        setDataEditContacts(undefined);
    };

    //#endregion

    // call API
    useEffect(() => {
        const getDataDetail = async () => {
            const [contactsRes] = await Promise.all([ContactsService.getListContactsByOpportunitiesId(id)]);
            setDataContacts(contactsRes.contacts);
        };
        getDataDetail();
    }, [id, isReload]);

    return (
        <>
            <DetailInfo title="Contacts">
                <TableHaveAdd
                    title=""
                    dataSource={formatDataTable(dataContacts)}
                    columns={columnContacts}
                    handleAdd={() => setIsShowModal(true)}
                    tableScroll={dataContacts.length > 10 ? { x: 'max-content', y: 200 } : { x: 'max-content' }}
                />
            </DetailInfo>

            {/* Dialog add contacts */}
            <DialogHaveField
                form={formAddContact}
                title={dataEditContacts ? 'Edit contacts' : 'Add contact'}
                isShow={isShowModal}
                onCancel={handleCancelSubmitAddContact}
                data={fieldAddContacts}
                handleSubmit={handleSubmit}
            />
        </>
    );
};

export default ContactEdit;
