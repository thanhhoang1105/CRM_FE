import boardManagement from './board-management';
import opportunityManagement from './opportunity-management';
import { getPathnames } from './use-pathnames';

const pathnamesBase = {
    home: {
        name: 'Home',
        path: '/'
    },
    notFound: {
        name: 'Not Found',
        path: '/404'
    },
    login: {
        name: 'Login',
        path: '/login'
    },
    boardManagement,
    opportunityManagement
};

const pathnames = getPathnames(pathnamesBase) as typeof pathnamesBase;

export default pathnames;
