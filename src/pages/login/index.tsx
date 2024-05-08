import RequiredMark from '@/components/common/form/required-mark';
import pathnames from '@/pathnames';
import { authActions } from '@/redux/auth-slice';
import { notificationActions } from '@/redux/notification-slice';
import { useAppDispatch } from '@/redux/store';
import authApi from '@/services/auth';
import { Login } from '@/types/auth';
import { Alert, Button, Form, Input } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.scss';
import eyeOnIcon from '/media/icons/eye-gray.svg';
import eyeOffIcon from '/media/icons/eye-hide-gray.svg';
import errorIcon from '/media/icons/notification/notification-error.svg';

const LoginPage = () => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const navigation = useNavigate();

    const [loginError, setLoginError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onFinish = async (values: Login) => {
        setLoginError(false);
        setIsLoading(true);

        try {
            const response = await authApi.login(values as Login);

            if (response) {
                const userData = { ...response };
                dispatch(authActions.setCurrentUser(userData));
                navigation(pathnames.boardManagement.main.path);
            } else {
                setLoginError(true);
            }
        } catch (error) {
            dispatch(notificationActions.setNotification({ type: 'error', message: 'Login fail' }));
        }

        setIsLoading(false);
    };

    return (
        <div className="login-container">
            <div className="login-content">
                <div className="login-left-content">
                    <Form
                        name="basic"
                        form={form}
                        initialValues={{ isRemember: true }}
                        onFinish={onFinish}
                        requiredMark={RequiredMark}
                        className="login-form"
                    >
                        <div className="login-header-logo">
                            <img src="/media/logo.png" alt="logo" />
                        </div>
                        <div className="login-header-title">Welcome back!</div>

                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                            className="form-user-name"
                        >
                            <Input placeholder="Enter username" />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                            className="form-user-password"
                        >
                            <Input.Password
                                className="login-password"
                                placeholder="Enter your password"
                                iconRender={(visible: any) =>
                                    visible ? <img src={eyeOffIcon} alt="eye-off" /> : <img src={eyeOnIcon} alt="eye-on" />
                                }
                            />
                        </Form.Item>

                        {loginError && (
                            <Alert message="Incorrect username or password" type="error" showIcon icon={<img src={errorIcon} alt="error" />} />
                        )}

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="form-user-login" loading={isLoading}>
                                Login
                            </Button>
                        </Form.Item>

                        <div className="login-forgot-password">
                            <span>Forgot password</span>
                        </div>
                    </Form>
                </div>
                <div className="login-right-content">
                    <img src="/media/images/side-login-right.png" alt="logo" />
                </div>
            </div>

            <div className="login-footer-image">
                <img src="/media/images/rectangle-login.svg" alt="logo" />
            </div>
        </div>
    );
};

export default LoginPage;
