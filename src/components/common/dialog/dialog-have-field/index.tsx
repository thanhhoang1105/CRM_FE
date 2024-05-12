import { Button, Col, Flex, Form, FormInstance, Row } from 'antd';
import BaseDivider from '../../divider';
import RequiredMark from '../../form/required-mark';
import DialogDefault from '../default';

interface IDialogAddCommonProps<T> {
    form: FormInstance;
    name?: string;
    title: string;
    isShow: boolean;
    onCancel: () => void;
    data: T[];
    handleSubmit: (data: any) => void;
    renderColumn?: number;
}

const DialogHaveField = <T extends Record<string, any>>(props: IDialogAddCommonProps<T>) => {
    const { form, name, title, isShow, onCancel, handleSubmit, data, renderColumn = 4, ...otherProps } = props;

    // Submit form reset field
    const onFinish = (values: any) => {
        handleSubmit(values);
        form.resetFields();
    };

    // Reset form when close dialog
    const handleCancel = () => {
        form.resetFields();
        onCancel();
    };

    const renderContent = () => {
        const rows = [];
        for (let i = 0; i < data.length; i += renderColumn) {
            const rowData = data.slice(i, i + renderColumn);

            const formItems = rowData.map((item: any, index: number) => {
                const { name, label, value, validation, colSpan = 6, hidden } = item;

                if (hidden) {
                    return null;
                }

                return (
                    <Col span={colSpan} key={index}>
                        <Form.Item name={name} label={label} rules={validation} className="dialog-information__item w-100">
                            {value}
                        </Form.Item>
                    </Col>
                );
            });

            const row = (
                <Row key={i} gutter={[24, 24]} style={{ marginBottom: '24px' }}>
                    {formItems}
                </Row>
            );

            rows.push(row);
        }

        return (
            <Form form={form} name={name} onFinish={onFinish} requiredMark={RequiredMark}>
                <div className="dialog-information__container">{rows}</div>
                <BaseDivider margin="24px 0 16px 0" />
                <Flex justify="center" align="center" gap={16}>
                    <Button type="default" onClick={handleCancel} className="btn">
                        Cancel
                    </Button>
                    <Button type="primary" htmlType="submit" className="btn btn--submit">
                        Save
                    </Button>
                </Flex>
            </Form>
        );
    };

    return (
        <DialogDefault
            title={title}
            isShow={isShow}
            onCancel={handleCancel}
            content={renderContent()}
            className="dialog-information w-auto"
            footer={null}
            {...otherProps}
        />
    );
};

export default DialogHaveField;
