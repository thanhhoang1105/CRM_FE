import BoardAndOpportunity from '@/components/common/board-and-opportunity';
import pathnames from '@/pathnames';
import { useNavigate } from 'react-router-dom';

const BoardEdit = () => {
    const navigation = useNavigate();

    const goBack = () => {
        navigation(pathnames.boardManagement.main.path);
    };
    return <BoardAndOpportunity title={pathnames.boardManagement.edit.name} goBack={goBack} />;
};

export default BoardEdit;
