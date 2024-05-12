import BoardAndOpportunity from '@/components/common/board-and-opportunity';
import pathnames from '@/pathnames';
import { useNavigate } from 'react-router-dom';

const OpportunityEdit = () => {
    const navigation = useNavigate();

    const goBack = () => {
        navigation(pathnames.opportunityManagement.main.path);
    };
    return <BoardAndOpportunity title={pathnames.opportunityManagement.edit.name} goBack={goBack} />;
};

export default OpportunityEdit;
