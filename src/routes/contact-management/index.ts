import DefaultLayout from '@/components/common/layout/default-layout';
import ContactManagement from '@/pages/contact';
import pathnames from '@/pathnames';
import { IRoute } from '..';

const contactManagementRoute: IRoute[] = [
    {
        name: pathnames.contactManagement.main.name,
        path: pathnames.contactManagement.main.path,
        layout: DefaultLayout,
        element: ContactManagement
    }
];

export default contactManagementRoute;
