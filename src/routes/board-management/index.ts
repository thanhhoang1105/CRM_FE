import DefaultLayout from '@/components/common/layout/default-layout';
import BoardManagement from '@/pages/board';
import pathnames from '@/pathnames';
import { IRoute } from '..';

const boardManagementRoute: IRoute = {
    name: pathnames.boardManagement.main.name,
    path: pathnames.boardManagement.main.path,
    layout: DefaultLayout,
    element: BoardManagement
};

const hrManagementRoutes: IRoute[] = [boardManagementRoute];

export default hrManagementRoutes;
