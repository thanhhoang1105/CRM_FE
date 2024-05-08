import Navigation from '@/components/common/navigation';
import { HRMTheme } from '@/utils/theme';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import NotificationProvider from './components/common/notification-provider';
import store from './redux/store';

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <ConfigProvider theme={HRMTheme}>
                    <NotificationProvider>
                        <Navigation />
                    </NotificationProvider>
                </ConfigProvider>
            </BrowserRouter>
        </Provider>
    );
};

export default App;
