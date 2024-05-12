import DefaultLayout from '@/components/common/layout/default-layout';
import BoardManagement from '@/pages/board';
import BoardEdit from '@/pages/board/board-edit';
import pathnames from '@/pathnames';
import { IRoute } from '..';

const boardManagementRoute: IRoute[] = [
    {
        name: pathnames.boardManagement.main.name,
        path: pathnames.boardManagement.main.path,
        layout: DefaultLayout,
        element: BoardManagement
    },
    {
        name: pathnames.boardManagement.edit.name,
        path: pathnames.boardManagement.edit.path + '/:id',
        layout: DefaultLayout,
        element: BoardEdit
    }
];

const hrManagementRoutes: IRoute[] = [...boardManagementRoute];

export default hrManagementRoutes;
