import DefaultLayout from '@/components/common/layout/default-layout';
import UserManagement from '@/pages/user';
import pathnames from '@/pathnames';
import { IRoute } from '..';

const userManagementRoute: IRoute[] = [
    {
        name: pathnames.usersManagement.main.name,
        path: pathnames.usersManagement.main.path,
        layout: DefaultLayout,
        element: UserManagement
    }
];

export default userManagementRoute;
