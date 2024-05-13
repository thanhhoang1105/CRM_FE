import BaseDatePicker from '@/components/common/date-picker';
import DetailContent from '@/components/common/detail-common/detail-content';
import DialogHaveField from '@/components/common/dialog/dialog-have-field';
import BaseSelect from '@/components/common/select';
import ButtonsIcon from '@/components/common/table/buttons-icon';
import TableHaveAdd from '@/components/common/table/table-add';
import BaseTag from '@/components/common/tag';
import { notificationActions } from '@/redux/notification-slice';
import { useAppDispatch } from '@/redux/store';
import UsersService, { IListAllUser } from '@/services/users';
import { IField } from '@/types/common';
import { formatDataTable, formatMappingKey, renderWithFallback, statusMapping } from '@/utils/common';
import { optionGenders, optionRole, TIME_FORMAT } from '@/utils/constants';
import icons from '@/utils/icons';
import { Form, Input } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const UserManagement = () => {
    const [formAddUser] = Form.useForm();
    const dispatch = useAppDispatch();

    const [dataUsers, setDataUsers] = useState<IListAllUser[]>([]);
    const [dataEditUser, setDataEditUser] = useState<IListAllUser>();
    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    const [isReload, setIsReload] = useState<number>(0);

    //#region render table
    const handleEditUser = (dataEdit: IListAllUser) => {
        console.log('dataEdit', dataEdit);
        setIsShowModal(true);
        setDataEditUser(dataEdit);
    };
    const columnUser: ColumnsType<IListAllUser> = [
        {
            dataIndex: 'fullname',
            key: 'fullname',
            fixed: 'left',
            title: 'Name',
            width: 150
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
        },
        {
            dataIndex: 'roles',
            key: 'roles',
            title: 'Role',
            align: 'center',
            width: 50,
            render: (item: string[]) => {
                const statusConfig = statusMapping[formatMappingKey(item[0])];
                return <BaseTag {...statusConfig} statusName={item[0]} />;
            }
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            width: 20,
            render: (record: IListAllUser) => (
                <ButtonsIcon
                    items={[
                        {
                            icon: icons.tableAction.edit,
                            onClick: () => handleEditUser(record),
                            tooltip: 'Edit',
                            placement: 'top'
                        }
                    ]}
                />
            )
        }
    ];

    const fieldAddUser: IField[] = [
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
            name: 'username',
            label: 'Username',
            value: <Input placeholder="Enter username" />,
            validation: [{ required: true, message: 'Please enter the valid value' }]
        },
        {
            name: 'role',
            label: 'Role',
            value: <BaseSelect options={optionRole} placeholder="Select gender" />,
            validation: [{ required: true, message: 'Please enter the valid value' }]
        }
    ];

    const handleSubmitAddUser = async () => {
        const dataForm = formAddUser.getFieldsValue();
        const dataFormatted = { ...dataForm, role: [dataForm.role] };
        try {
            const res = await UsersService.addNewUser(dataFormatted);
            if (res) {
                setIsShowModal(false);
                dispatch(notificationActions.setNotification({ type: 'success', message: 'Add user successfully' }));
                setIsReload(isReload + 1);
            }
        } catch (error) {
            console.error('API error: handleSubmitAddUser', error);
        }
    };

    const handleSubmitEditUser = async () => {
        const dataForm = formAddUser.getFieldsValue();
        const dataFormatted = { ...dataForm, role: [dataForm.role], id: dataEditUser?.id };
        try {
            const res = await UsersService.updateUser(dataFormatted);
            if (res) {
                setIsShowModal(false);
                dispatch(notificationActions.setNotification({ type: 'success', message: 'Update user successfully' }));
                setIsReload(isReload + 1);
            }
        } catch (error) {
            console.error('API error: handleSubmitEditUser', error);
        }
    };

    const handleSubmit = () => {
        if (!dataEditUser) {
            handleSubmitAddUser();
        } else {
            handleSubmitEditUser();
        }
    };

    const handleCancelSubmitAddUser = () => {
        setIsShowModal(false);
        setDataEditUser(undefined);
    };
    //#endregion

    useEffect(() => {
        const fetchData = async () => {
            const [usersRes] = await Promise.all([UsersService.getListAllUser()]);

            if (usersRes) setDataUsers(usersRes);
        };
        fetchData();
    }, [isReload]);

    return (
        <DetailContent>
            <TableHaveAdd
                title="Users"
                dataSource={formatDataTable(dataUsers)}
                columns={columnUser}
                handleAdd={() => setIsShowModal(true)}
                tableScroll={dataUsers.length > 10 ? { x: 'max-content', y: 412 } : { x: 'max-content' }}
            />

            {/* Dialog add */}
            <DialogHaveField
                form={formAddUser}
                title={dataEditUser ? 'Edit user' : 'Add user'}
                isShow={isShowModal}
                onCancel={handleCancelSubmitAddUser}
                data={fieldAddUser}
                handleSubmit={handleSubmit}
            />
        </DetailContent>
    );
};

export default UserManagement;
