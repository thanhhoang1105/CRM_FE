import pathnames from '@/pathnames';
import { selectAuth } from '@/redux/auth-slice';
import { useAppSelector } from '@/redux/store';
import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LayoutContainer = ({ children, requiredLogin }: { children: ReactNode; requiredLogin: boolean }) => {
    const currentUser = useAppSelector(selectAuth).currentUser;
    const navigation = useNavigate();

    const [checkedLogin, setCheckedLogin] = useState(false);

    useEffect(() => {
        if (!currentUser && requiredLogin) {
            navigation(pathnames.login.path);
            setCheckedLogin(true);
        } else {
            setCheckedLogin(true);
        }
    }, [currentUser, navigation, requiredLogin]);

    return checkedLogin && children;
};

export default LayoutContainer;
