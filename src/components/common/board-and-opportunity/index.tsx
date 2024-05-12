import ActivitiesEdit from '@/components/common/board-and-opportunity/activities';
import ContactEdit from '@/components/common/board-and-opportunity/contact';
import ScheduleEdit from '@/components/common/board-and-opportunity/schedule';
import DetailContent from '@/components/common/detail-common/detail-content';
import DetailFields from '@/components/common/detail-common/detail-field';
import DetailHeader from '@/components/common/detail-common/detail-header';
import DetailInfo from '@/components/common/detail-common/detail-info';
import DialogHaveField from '@/components/common/dialog/dialog-have-field';
import RequiredMark from '@/components/common/form/required-mark';
import BaseSelect from '@/components/common/select';
import pathnames from '@/pathnames';
import { selectAuth } from '@/redux/auth-slice';
import { notificationActions } from '@/redux/notification-slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import OpportunitiesService, { IOpportunities } from '@/services/opportunities';
import StageService, { IStage } from '@/services/stages';
import UsersService, { IListAllUser } from '@/services/users';
import { IField, IInfoSection, IOption } from '@/types/common';
import { ButtonProps, Form, Input, Rate, Select, Switch } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export interface IBoardAndOpportunityProps {
    title: string;
    goBack: () => void;
}

const BoardAndOpportunity = (props: IBoardAndOpportunityProps) => {
    const { title, goBack } = props;
    const { id = '' } = useParams();
    const navigation = useNavigate();
    const [form] = Form.useForm();
    const [formEditSalesperson] = Form.useForm();
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector(selectAuth).currentUser;

    const roleAdmin = currentUser?.user.roles[0].includes('ROLE_ADMIN');

    const [dataEdit, setDataEdit] = useState<IOpportunities>();
    const [dataStages, setDataStages] = useState<IStage[]>([]);
    const [dataListUser, setDataListUser] = useState<IListAllUser[]>([]);
    const [showNoteLost, setShowNoteLost] = useState<boolean>(false);
    const [isShowModalEditSalesperson, setIsShowModalEditSalesperson] = useState<boolean>(false);
    const [isReload, setIsReload] = useState<number>(0);

    //#region Edit salesperson
    const fieldEditSalesperson: IField[] = [
        {
            name: 'salespersonId',
            label: 'User',
            value: <BaseSelect options={dataListUser.map(item => ({ label: item.fullname, value: item.id }))} placeholder="Select user" />,
            validation: [{ required: true, message: 'Please enter the valid value' }]
        }
    ];

    const handleSubmitSalesperson = async () => {
        const dataForm = formEditSalesperson.getFieldsValue();

        try {
            const res = await OpportunitiesService.updateSalesperson(id, dataForm.salespersonId);
            if (res) {
                setIsShowModalEditSalesperson(false);
                dispatch(notificationActions.setNotification({ type: 'success', message: 'Update salesperson successfully' }));
                setIsReload(isReload + 1);
            }
        } catch (error) {
            console.error('API error: handleSubmitSalesperson', error);
        }
    };

    const handleCancelSubmitEditSalesperson = () => {
        setIsShowModalEditSalesperson(false);
    };
    //#endregion

    //#region Button top header
    const handleSaveInfoBoard = async () => {
        const dataForm = form.getFieldsValue();
        const dataFormatted = {
            ...dataEdit,
            ...dataForm,
            salesperson: { ...dataEdit?.salesperson },
            priority: dataForm.priority - 1,
            stage: {
                id: dataForm.stage
            }
        };

        try {
            const res = await OpportunitiesService.updateBoard(dataFormatted);
            if (res) {
                dispatch(notificationActions.setNotification({ type: 'success', message: 'Update board successfully' }));
                navigation(pathnames.boardManagement.main.path);
            }
        } catch (error) {
            console.error('API error: handleSubmitSalesperson', error);
        }
    };

    const buttons: ButtonProps[] = [
        {
            onClick: () => console.log('edit'),
            children: 'Send mail'
        },
        {
            onClick: () => setIsShowModalEditSalesperson(true),
            children: 'Edit salesperson',
            hidden: !roleAdmin
        },
        {
            onClick: () => handleSaveInfoBoard(),
            type: 'primary',
            children: 'Save'
        }
    ];
    //#endregion

    const renderBoxFormGroup = (data: IInfoSection[]) => {
        return data.map((item, index) => {
            const { title, columns } = item;

            return (
                <DetailInfo title={title} key={index}>
                    <DetailFields data={columns} />
                </DetailInfo>
            );
        });
    };

    //#region render field input information board edit
    const onChange = (value: IOption) => {
        setShowNoteLost(value.label.toLowerCase() === 'lost');
    };

    // định nghĩa các field sẽ render thành các field để input data
    const dataInfo: IField[] = [
        {
            name: 'name',
            label: 'Opportunity name',
            value: <Input placeholder="Enter opportunity name" />
        },
        {
            name: 'revenue',
            label: 'Expected revenue',
            value: <Input placeholder="Enter expected revenue" addonAfter="VND" />
        },
        {
            name: 'probability',
            label: 'Probability',
            value: <Input placeholder="Enter expected revenue" addonAfter="%" />
        },
        {
            name: 'company',
            label: 'Company',
            value: <Input placeholder="Enter company name" />
        },
        {
            name: 'email',
            label: 'Email',
            value: <Input placeholder="Enter email" />
        },
        {
            name: 'phone',
            label: 'Phone',
            value: <Input placeholder="Enter phone" />
        },
        {
            name: 'salespersonFullName',
            label: 'Salesperson',
            value: <Input disabled placeholder="Enter salesperson" />
        },
        {
            name: 'address',
            label: 'Address',
            value: <Input placeholder="Enter address" />
        },
        {
            name: 'website',
            label: 'Website',
            value: <Input placeholder="Enter website" />
        },
        {
            label: 'Customer',
            value: (
                <Form.Item name="customer" valuePropName="checked" className="switch-item">
                    <Switch />
                </Form.Item>
            )
        },
        {
            name: 'priority',
            label: 'Priority',
            value: <Rate count={3} tooltips={['MEDIUM', 'HIGHT', 'VERY HIGHT']} className="checkbox-container" />
        },
        {
            name: 'stage',
            label: 'Status',
            value: (
                <Select
                    showSearch
                    placeholder="Select stage"
                    optionFilterProp="children"
                    onChange={(_, option: any) => onChange(option)}
                    filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                    options={dataStages.map(item => ({ label: item.name, value: item.id }))}
                    allowClear
                />
            ),
            validation: [{ required: true, message: 'Please enter the valid value' }]
        },
        {
            name: 'description',
            label: 'Description',
            value: <Input.TextArea placeholder="Enter description" className="text-area-item" />,
            hidden: showNoteLost
        },
        {
            name: 'lostReason',
            label: 'Lost reason',
            value: <Input.TextArea placeholder="Enter lost reason" className="text-area-item" />,
            hidden: !showNoteLost
        }
    ];
    //#endregion

    // call API
    useEffect(() => {
        const getDataDetail = async () => {
            const [stagesRes, opportunitiesDetailRes, listUserRes] = await Promise.all([
                StageService.getStage(),
                OpportunitiesService.getOpportunityDetail(id),
                UsersService.getListAllUser()
            ]);

            setDataEdit(opportunitiesDetailRes);
            setDataStages(stagesRes);
            setDataListUser(listUserRes);
        };

        getDataDetail();
    }, [id, isReload]);

    // đưa dữ liệu ban đầu vào form để data được đổ vào cái field
    useEffect(() => {
        if (dataEdit) {
            const mappingPriority: { [key: string]: number } = {
                VERY_HIGH: 3,
                HIGH: 2,
                MEDIUM: 1
            };

            const priorityValue = mappingPriority[dataEdit.priority];
            form.setFieldsValue({
                ...dataEdit,
                salespersonFullName: dataEdit?.salesperson?.fullname,
                stage: dataEdit?.stage?.id,
                priority: priorityValue
            });
            setShowNoteLost(dataEdit.stage.name.toLowerCase() === 'lost');
        }
    }, [dataEdit, form]);

    return (
        <DetailContent rootClassName="board_detail-content">
            <DetailHeader pageTitle={title} buttons={buttons} goBack={goBack} />

            <div className="box-content-container">
                <Form form={form} name="board_detail" layout="vertical" onFinish={handleSaveInfoBoard} requiredMark={RequiredMark}>
                    {renderBoxFormGroup([{ title: 'Information', columns: dataInfo }])}
                </Form>
                <ContactEdit id={id} />
                <ScheduleEdit id={id} />
                <ActivitiesEdit id={id} />
            </div>

            {/* Dialog edit salesperson */}
            <DialogHaveField
                form={formEditSalesperson}
                title="Edit salesperson"
                isShow={isShowModalEditSalesperson}
                onCancel={handleCancelSubmitEditSalesperson}
                data={fieldEditSalesperson}
                handleSubmit={handleSubmitSalesperson}
            />
        </DetailContent>
    );
};

export default BoardAndOpportunity;
