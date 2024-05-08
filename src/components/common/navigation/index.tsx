import routes from '@/routes';
import { ReactNode, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import LayoutContainer from '../layout/layout-container';
import LoadingPage from '../loading/loading-page';

const NoLayout = ({ children }: { children: ReactNode }) => {
    return <>{children}</>;
};

const Navigation = () => {
    return (
        <Suspense fallback={<LoadingPage />}>
            <Routes>
                {routes.map(route => {
                    const { layout: Layout = NoLayout, element: Element, requiredLogin = true, ...item } = route;

                    return (
                        <Route
                            key={item.name}
                            path={item.path}
                            element={
                                <LayoutContainer requiredLogin={requiredLogin}>
                                    <Layout>
                                        <Element />
                                    </Layout>
                                </LayoutContainer>
                            }
                        />
                    );
                })}
            </Routes>
        </Suspense>
    );
};

export default Navigation;
