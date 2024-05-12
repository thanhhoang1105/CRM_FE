import { formatSizeUnits } from '@/utils/common';
import { Button, Flex, Form, Modal, ModalProps, Progress } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import Dragger from 'antd/es/upload/Dragger';
import { useEffect, useState } from 'react';
import BaseDivider from '../../divider';
import './dialog-import.scss';

export interface IDialogImportProps<T> extends ModalProps {
    title: string;
    dataSource?: T[];
    open: boolean;
    onClose: () => void;
    onImport: (values: any) => Promise<void>;
}

const DialogImport = <T extends AnyObject>(props: IDialogImportProps<T>) => {
    const { open, onClose, title, onImport, ...otherProps } = props;
    const [loading, setLoading] = useState(false);

    const handleOk = async (values: any) => {
        form.validateFields();
        setLoading(true);
        await onImport(values);
        onClose();
        setLoading(false);
    };

    const [form] = Form.useForm();
    const watchFile = Form.useWatch('file', form);

    const onRemoveFile = () => {
        form.setFieldValue('file', undefined);
    };

    const onChangeFile = (value: UploadChangeParam<UploadFile<any>>) => {
        const extension = value && value.file.name.split('.')?.[1];
        if (extension !== 'xlsx' && extension !== 'csx') {
            form.setFieldValue('file', undefined);
            form.submit();
            return;
        }

        form.setFieldValue('file', !value.fileList.length ? undefined : value.file);
        setPercentLoadingFile(0);
        setIsLoadingFile(true);
    };

    const [percentLoadingFile, setPercentLoadingFile] = useState(0);
    const [isLoadingFile, setIsLoadingFile] = useState(false);

    useEffect(() => {
        const handleLoading = setTimeout(() => {
            if (open) {
                setPercentLoadingFile(percentLoadingFile + 10);

                if (percentLoadingFile >= 100) {
                    setIsLoadingFile(false);
                }
            }
        }, 100);

        return () => clearTimeout(handleLoading);
    }, [percentLoadingFile, isLoadingFile, open]);

    // Update field
    useEffect(() => {
        if (!open) {
            form.setFieldValue('file', undefined);
            setIsLoadingFile(false);
            setPercentLoadingFile(0);
        }
    }, [open, form]);

    return (
        <Modal
            open={open}
            closable={false}
            onCancel={onClose}
            centered
            className="dialog-import"
            title={title || 'Import'}
            footer={null}
            {...otherProps}
        >
            <Form form={form} onFinish={handleOk}>
                <BaseDivider margin="16px 0 16px 0" />
                <div>
                    <Form.Item
                        name="file"
                        className="ant-form-item-file"
                        valuePropName="file"
                        rules={[{ required: true, message: 'File is invalid' }]}
                        hidden={watchFile}
                    >
                        <Dragger
                            name="file"
                            className="drop-and-drag-container"
                            maxCount={1}
                            showUploadList={false}
                            beforeUpload={() => false}
                            onChange={onChangeFile}
                        >
                            <div className="ant-upload-drag-icon">
                                <img src="/media/icons/upload-gray.svg" alt="upload" />
                            </div>
                            <div className="ant-upload-text">
                                <div>Drag and drop</div>
                                <div>
                                    or <a className="font-weight-600 color-text-primary">choose file</a>
                                </div>
                            </div>
                            <div className="ant-upload-hint">csv or xlsx</div>
                        </Dragger>
                    </Form.Item>

                    {isLoadingFile && (
                        <div className="dialog-import-file-loading-container">
                            <Progress
                                type="circle"
                                percent={percentLoadingFile}
                                strokeWidth={10}
                                size={133.34}
                                format={(percent = 0) => (
                                    <div className="dialog-import-file-loading">
                                        <div className="dialog-import-file-loading-percent">{percent}%</div>
                                        <div className="dialog-import-file-loading-message">{percent < 100 ? 'Loading...' : 'Done'}</div>
                                    </div>
                                )}
                            ></Progress>
                        </div>
                    )}

                    {watchFile && !isLoadingFile && (
                        <Flex gap={16} className="dialog-import-file">
                            <img src="/media/icons/file-gray.svg" className="dialog-import-file-icon" />
                            <div className="dialog-import-file-content">
                                <div className="dialog-import-file-name">{watchFile.name}</div>
                                <div className="dialog-import-file-size">{formatSizeUnits(watchFile.size)}</div>
                                <img src="/media/icons/close-gray.svg" className="dialog-import-file-close" onClick={onRemoveFile} />
                            </div>
                        </Flex>
                    )}
                </div>
                <BaseDivider margin="24px 0 16px 0" />

                {/* Footer */}
                <div key="link" className="dialog-import-footer-container">
                    <Button key="back" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button key="submit" htmlType="submit" type="primary" loading={loading} disabled={isLoadingFile}>
                        Import
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default DialogImport;
