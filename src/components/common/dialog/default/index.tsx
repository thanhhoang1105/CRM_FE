import { Modal, ModalProps } from 'antd';
import { ReactNode } from 'react';
import './index.scss';

interface IDialogDefault extends ModalProps {
    title: string;
    className?: string;
    content: ReactNode;
    onSubmit?: () => void;
}

const DialogDefault = (props: IDialogDefault) => {
    const { title, open, className: classNameProp, onSubmit, content, centered = true, ...otherProps } = props;
    let className = 'dialog-default';
    if (classNameProp) className += ' ' + classNameProp;

    return (
        <Modal centered={centered} title={title} open={open} onOk={onSubmit} className={className} closable={false} {...otherProps}>
            {content}
        </Modal>
    );
};

export default DialogDefault;
