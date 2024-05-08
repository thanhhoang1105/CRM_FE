import DefaultLayout, { DefaultLayoutProps } from '@/components/common/layout/default-layout';
import Home from '@/pages';
import NotFoundPage from '@/pages/404';
import LoginPage from '@/pages/login';
import pathnames from '@/pathnames';
import boardManagementRoute from './board-management';

export interface IRoute {
    name: string;
    path: string;
    layout?: (props: DefaultLayoutProps) => JSX.Element;
    requiredLogin?: boolean; // Default: true
    element: <T>(props?: T) => JSX.Element;
}

const homeRoute: IRoute = {
    name: pathnames.home.name,
    path: pathnames.home.path,
    layout: DefaultLayout,
    element: Home
};

const loginRoute: IRoute = {
    name: pathnames.login.name,
    path: pathnames.login.path,
    requiredLogin: false,
    element: LoginPage
};

const notFoundRoute: IRoute = {
    name: pathnames.notFound.name,
    path: '*',
    requiredLogin: false,
    element: NotFoundPage
};

const routes: IRoute[] = [homeRoute, ...boardManagementRoute, notFoundRoute, loginRoute];

export default routes;
