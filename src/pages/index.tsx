import pathnames from '@/pathnames';
import { selectAuth } from '@/redux/auth-slice';
import { useAppSelector } from '@/redux/store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const currentUser = useAppSelector(selectAuth).currentUser;

    useEffect(() => {
        if (currentUser) navigate(pathnames.boardManagement.main.path);
    }, [navigate, currentUser]);
    return <></>;
};

export default Home;
