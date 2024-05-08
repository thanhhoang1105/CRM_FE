import { selectNotification } from '@/redux/notification-slice';
import { useAppSelector } from '@/redux/store';
import { notification } from 'antd';
import { ReactNode, useEffect } from 'react';

const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const notificationRedux = useAppSelector(selectNotification);
    const [api, contextHolder] = notification.useNotification({ maxCount: 2, placement: 'bottomRight' });

    useEffect(() => {
        if (notificationRedux) {
            const openNotification = () => {
                const { type = 'error', message = '', duration = 3 } = notificationRedux;
                const icon = <img src={`/media/icons/notification/notification-${type}.svg`} />;

                // Show notification
                api[type]({ message, duration, icon });
            };

            openNotification();
        }
    }, [notificationRedux, api]);

    return (
        <>
            {children}
            {contextHolder}
        </>
    );
};

export default NotificationProvider;
