import DefaultLayout from '@/components/common/layout/default-layout';
import OpportunityManagement from '@/pages/opportunity';
import pathnames from '@/pathnames';
import { IRoute } from '..';
import OpportunityEdit from '@/pages/opportunity/opportunity-edit';

const opportunityManagementRoute: IRoute[] = [
    {
        name: pathnames.opportunityManagement.main.name,
        path: pathnames.opportunityManagement.main.path,
        layout: DefaultLayout,
        element: OpportunityManagement
    },
    {
        name: pathnames.opportunityManagement.edit.name,
        path: pathnames.opportunityManagement.edit.path + '/:id',
        layout: DefaultLayout,
        element: OpportunityEdit
    }
];

export default opportunityManagementRoute;
