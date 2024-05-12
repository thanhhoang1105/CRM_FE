import { IDialogCommonProps } from '@/types/common';
import { Button, Modal } from 'antd';
import { useState } from 'react';
import './dialog-common.scss';
import icons from '@/utils/icons';

const DialogCommon = (props: IDialogCommonProps) => {
    const {
        open,
        onClose,
        title,
        content,
        icon,
        buttonType,
        buttonLeft,
        buttonRight,
        hiddenButtonLeft = false,
        hiddenButtonRight = false,
        buttonLeftClick,
        buttonRightClick,
        ...otherProps
    } = props;

    const [loading, setLoading] = useState(false);

    const handleOk = async () => {
        setLoading(true);
        if (buttonRightClick) await buttonRightClick();
        setLoading(false);
    };

    const handleCancel = () => {
        if (buttonLeftClick) buttonLeftClick();
    };

    // Define CSS classes for the left and right buttons based on the buttonType prop
    let classButtonRight: string;

    switch (buttonType) {
        case 'default-primary':
            classButtonRight = 'ant-btn-primary';
            break;
        case 'default-danger':
            classButtonRight = 'ant-btn-dangerous';
            break;
        default:
            classButtonRight = '';
            break;
    }

    return (
        <Modal
            open={open}
            closable={false}
            onCancel={onClose}
            centered
            className="dialog-common"
            footer={[
                <div key="link" className="dialog-common-footer-container">
                    {!hiddenButtonLeft && (
                        <Button key="back" onClick={handleCancel} disabled={loading}>
                            {buttonLeft || 'Cancel'}
                        </Button>
                    )}
                    {!hiddenButtonRight && (
                        <Button key="submit" loading={loading} onClick={handleOk} className={classButtonRight}>
                            {buttonRight || 'Delete'}
                        </Button>
                    )}
                </div>
            ]}
            {...otherProps}
        >
            <div className="icon-dialog-common">
                <img src={icon || icons.dialog.delete} alt="SVG Icon" />
            </div>
            <div className="content-dialog-common">
                <h1 className="content-dialog-common-title">{title}</h1>
                <div>{content}</div>
            </div>
        </Modal>
    );
};

export default DialogCommon;
