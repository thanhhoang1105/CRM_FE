import { DatePicker as AntDatePicker, DatePickerProps } from 'antd';
import dayjs from 'dayjs';

export interface IDatePicker extends DatePickerProps {
    status?: '' | 'error' | 'warning' | undefined;
    hashId?: string | undefined;
    popupClassName?: string | undefined;
    rootClassName?: string | undefined;
    onChange?: (date: dayjs.Dayjs, dateString: any) => void;
}

const BaseDatePicker = (props: IDatePicker) => {
    const { suffixIcon, format } = props;
    const dateFormat = format ? format : 'DD/MM/YYYY';
    const pickerIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.33333 0.833344C5.60948 0.833344 5.83333 1.0572 5.83333 1.33334V2.16668H10.1667V1.33334C10.1667 1.0572 10.3905 0.833344 10.6667 0.833344C10.9428 0.833344 11.1667 1.0572 11.1667 1.33334V2.16668H12.6667C13.6792 2.16668 14.5 2.98749 14.5 4.00001V13.3333C14.5 14.3459 13.6792 15.1667 12.6667 15.1667H3.33333C2.32081 15.1667 1.5 14.3459 1.5 13.3333V4.00001C1.5 2.98749 2.32081 2.16668 3.33333 2.16668H4.83333V1.33334C4.83333 1.0572 5.05719 0.833344 5.33333 0.833344ZM4.83333 3.16668H3.33333C2.8731 3.16668 2.5 3.53977 2.5 4.00001V6.16668H13.5V4.00001C13.5 3.53977 13.1269 3.16668 12.6667 3.16668H11.1667V4.00001C11.1667 4.27615 10.9428 4.50001 10.6667 4.50001C10.3905 4.50001 10.1667 4.27615 10.1667 4.00001V3.16668H5.83333V4.00001C5.83333 4.27615 5.60948 4.50001 5.33333 4.50001C5.05719 4.50001 4.83333 4.27615 4.83333 4.00001V3.16668ZM13.5 7.16668H2.5V13.3333C2.5 13.7936 2.8731 14.1667 3.33333 14.1667H12.6667C13.1269 14.1667 13.5 13.7936 13.5 13.3333V7.16668Z"
                fill="#848484"
            ></path>
        </svg>
    );

    return (
        <AntDatePicker
            {...props}
            format={dateFormat}
            suffixIcon={suffixIcon || pickerIcon}
            // Dropdown
            getPopupContainer={triggerNode => triggerNode.parentNode as HTMLElement}
        />
    );
};

export default BaseDatePicker;
