import { notificationActions } from '@/redux/notification-slice';
import { useAppDispatch } from '@/redux/store';
import SendMailService from '@/services/send-mail';
import { IField } from '@/types/common';
import { TIME_FORMAT } from '@/utils/constants';
import { Form, FormInstance, Input, ModalProps } from 'antd';
import dayjs from 'dayjs';
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
    reloadDataInit: number;
}
const Quotation = (props: ISendMailProps) => {
    const { open, setIsShowModalQuotation, data, reloadDataInit, id } = props;
    const [formQuotation] = Form.useForm();
    const [formSendMailQuotation] = Form.useForm();
    const dispatch = useAppDispatch();

    const [isShowModalSendMail, setIsShowModalSendMail] = useState<boolean>(false);
    const [valueFormQuotation, setValueFormQuotation] = useState<any>();

    const watchPrice = parseInt(Form.useWatch('price', formQuotation));
    const watchTax = parseInt(Form.useWatch('tax', formQuotation));
    const watchVAT = Form.useWatch('vat', formQuotation);

    useEffect(() => {
        if (watchPrice) {
            formQuotation.setFieldValue('untaxed', watchPrice);
        }

        if (watchPrice && watchTax) {
            formQuotation.setFieldValue('vat', (watchPrice * watchTax) / 100);
        }

        if (watchPrice && watchVAT) {
            console.log('watchPrice:', watchPrice, 'watchVAT:', watchVAT);

            formQuotation.setFieldValue('total', watchPrice + watchVAT);
        }
    }, [watchPrice, watchTax, watchVAT, formQuotation]);

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
            value: <Input placeholder="Enter product" />,
            validation: [{ required: true, message: 'Please enter the valid value' }]
        },
        {
            name: 'description',
            label: 'Description',
            value: <Input placeholder="Enter description" />
        },
        {
            name: 'price',
            label: 'Price',
            value: <Input placeholder="Enter price" addonAfter="VND" />,
            validation: [{ required: true, message: 'Please enter the valid value' }]
        },
        {
            name: 'tax',
            label: 'Tax',
            value: <Input placeholder="Enter tax" addonAfter="%" />,
            validation: [{ required: true, message: 'Please enter the valid value' }]
        },
        {
            name: 'expiration',
            label: 'Quotation valid until',
            value: <BaseDatePicker placeholder="dd/mm/yyyy" allowClear />,
            validation: [{ required: true, message: 'Please enter the valid value' }]
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
            colSpan: 12,
            validation: [{ required: true, message: 'Please enter the valid value' }]
        }
    ];

    const handleSubmit = () => {
        const dataFormQuotation = formQuotation.getFieldsValue();
        console.log('dataFormQuotation', dataFormQuotation);

        setValueFormQuotation(dataFormQuotation);
        setIsShowModalQuotation(false);
        setIsShowModalSendMail(true);
    };

    const handleCancelSubmitAddContact = () => {
        setIsShowModalQuotation(false);
    };

    const onSubmitSendMailQuotation = async () => {
        const dataFormQSendEmailQuotation = formSendMailQuotation.getFieldsValue();
        console.log('valueFormQuotation', valueFormQuotation);
        console.log('dataFormQSendEmailQuotation', dataFormQSendEmailQuotation);

        const dataFormatted = {
            ...valueFormQuotation,
            ...dataFormQSendEmailQuotation,
            address: undefined,
            company: undefined,
            expiration: dayjs(valueFormQuotation.expiration).format(TIME_FORMAT.DATE)
        };

        try {
            const res = await SendMailService.sendMailQuotation(id, dataFormatted);
            if (res) {
                dispatch(notificationActions.setNotification({ type: 'success', message: 'Send mail successfully' }));
                setIsShowModalSendMail(false);
            }
        } catch (error) {
            console.error('API error: SendMail', error);
        }
    };

    useEffect(() => {
        formQuotation.setFieldsValue(data.getFieldsValue());
    }, [data, formQuotation, reloadDataInit]);

    return (
        <>
            <DialogHaveField
                form={formQuotation}
                title="Quotation"
                isShow={open}
                onCancel={handleCancelSubmitAddContact}
                data={fieldQuotation}
                handleSubmit={handleSubmit}
                buttonRight="Send via email"
            />

            <SendMail
                name="form_send_mail_quotation"
                form={formSendMailQuotation}
                onSubmit={onSubmitSendMailQuotation}
                open={isShowModalSendMail}
                setIsShowModalSendMail={setIsShowModalSendMail}
                loadTemplate={false}
            />
        </>
    );
};

export default Quotation;
