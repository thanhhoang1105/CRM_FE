import { useAppDispatch } from '@/redux/store';
import { IField } from '@/types/common';
import { Form, FormInstance, Input, ModalProps } from 'antd';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import BaseDatePicker from '../../date-picker';
import DialogHaveField from '../../dialog/dialog-have-field';
import SendMail from '../send-mail';
import './index.scss';

export interface ISendMailProps extends ModalProps {
    setIsShowModalQuotation: Dispatch<SetStateAction<boolean>>;
    id: string;
    open: boolean;
    data: FormInstance;
}
const Quotation = (props: ISendMailProps) => {
    const { open, setIsShowModalQuotation, data, id } = props;
    const [formQuotation] = Form.useForm();
    const [formSendMailQuotation] = Form.useForm();
    const dispatch = useAppDispatch();

    const [isShowModalSendMail, setIsShowModalSendMail] = useState<boolean>(false);

    const fieldQuotation: IField[] = [
        {
            name: 'company',
            label: 'Company',
            value: <Input placeholder="Enter company" />
        },
        {
            name: 'address',
            label: 'Address',
            value: <Input placeholder="Enter address" />
        },
        {
            name: 'product',
            label: 'Product',
            value: <Input placeholder="Enter product" />
            // validation: [{ required: true, message: 'Please enter the valid value' }]
        },
        {
            name: 'description',
            label: 'Description',
            value: <Input placeholder="Enter description" />
        },
        {
            name: 'price',
            label: 'Price',
            value: <Input placeholder="Enter price" addonAfter="VND" />
            // validation: [{ required: true, message: 'Please enter the valid value' }]
        },
        {
            name: 'tax',
            label: 'Tax',
            value: <Input placeholder="Enter tax" addonAfter="%" />
            // validation: [{ required: true, message: 'Please enter the valid value' }]
        },
        {
            name: 'expiration',
            label: 'Quotation valid until',
            value: <BaseDatePicker placeholder="dd/mm/yyyy" allowClear />
            // validation: [{ required: true, message: 'Please enter the valid value' }]
        },
        {
            name: 'untaxed',
            label: 'Untaxed Amount',
            value: <Input placeholder="Enter untaxed" addonAfter="VND" />
        },
        {
            name: 'vat',
            label: 'VAT',
            value: <Input placeholder="Enter vat" addonAfter="VND" />
        },
        {
            name: 'total',
            label: 'Total',
            value: <Input placeholder="Enter total" addonAfter="VND" />
        },
        {
            name: 'condition',
            label: 'Payment terms and Conditions',
            value: <Input.TextArea placeholder="Enter payment terms and conditions" className="text-area-item" />,
            colSpan: 12
            // validation: [{ required: true, message: 'Please enter the valid value' }]
        }
    ];

    const handleSubmit = () => {
        setIsShowModalQuotation(false);
        setIsShowModalSendMail(true);
    };

    const handleCancelSubmitAddContact = () => {
        setIsShowModalQuotation(false);
    };

    const onSubmitSendMailQuotation = () => {};

    useEffect(() => {
        console.log('data', data.getFieldsValue());

        formQuotation.setFieldsValue(data.getFieldsValue());
    }, [data]);

    return (
        <>
            <DialogHaveField
                form={formQuotation}
                title="Quotation"
                isShow={open}
                onCancel={handleCancelSubmitAddContact}
                data={fieldQuotation}
                handleSubmit={handleSubmit}
                buttonRight="Sent via email"
            />

            <SendMail
                form={formSendMailQuotation}
                onSubmit={onSubmitSendMailQuotation}
                open={isShowModalSendMail}
                setIsShowModalSendMail={setIsShowModalSendMail}
            />
        </>
    );
};

export default Quotation;
