import { Button, Flex, Form, FormInstance, Input, ModalProps, Switch } from 'antd';
import { Dispatch, SetStateAction } from 'react';
import DialogDefault from '../../dialog/default';
import BaseDivider from '../../divider';
import RequiredMark from '../../form/required-mark';
import './index.scss';

export interface ISendMailProps extends ModalProps {
    setIsShowModalSendMail: Dispatch<SetStateAction<boolean>>;
    form: FormInstance;
    name: string;
    onSubmit: (value: any) => void;
    loadTemplate?: boolean;
}
const SendMail = (props: ISendMailProps) => {
    const { form, open, name, onSubmit, setIsShowModalSendMail, loadTemplate = true } = props;

    const renderContent = () => {
        return (
            <Form form={form} name={name} onFinish={onSubmit} requiredMark={RequiredMark} className="form-send-mail">
                <Form.Item
                    label="Recipient"
                    name="recipient"
                    className="form-send-mail-item"
                    rules={[{ required: true, message: 'Please enter the valid value' }]}
                >
                    <Input placeholder="Enter recipient" />
                </Form.Item>
                <Form.Item label="Subject" name="subject" className="form-send-mail-item">
                    <Input placeholder="Enter subject" />
                </Form.Item>

                <Form.Item name="message" className="form-send-mail-item">
                    <Input.TextArea className="text-area-item" />
                </Form.Item>
                {loadTemplate && (
                    <Form.Item label="Load cold email template" name="loadTemplate" className="form-send-mail-item-switch" valuePropName="checked">
                        <Switch />
                    </Form.Item>
                )}

                <BaseDivider margin="0 0 16px 0" />
                <Flex justify="center" align="center" gap={16}>
                    <Button type="default" onClick={onCloseModal} className="btn">
                        Cancel
                    </Button>
                    <Button type="primary" htmlType="submit" className="btn btn--submit">
                        Send
                    </Button>
                </Flex>
            </Form>
        );
    };

    const onCloseModal = () => {
        setIsShowModalSendMail(false);
        form.resetFields();
    };

    return (
        <DialogDefault
            title="Send email"
            open={open}
            content={renderContent()}
            onCancel={() => onCloseModal()}
            rootClassName="dialog-info-chart-root"
            className="dialog-info-employee__chart"
            width={1000}
            footer={null}
        />
    );
};

export default SendMail;
