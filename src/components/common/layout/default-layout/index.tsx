import { authActions, selectAuth } from '@/redux/auth-slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { Avatar, Button, Dropdown, Layout, Menu } from 'antd';
import { ItemType, MenuItemType } from 'antd/es/menu/hooks/useItems';
import { ReactNode, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import headerMenu, { HeaderMenu } from './header-menu-data';
import './index.scss';
const { Header, Content } = Layout;

export interface DefaultLayoutProps {
    children: ReactNode;
}

const dropdownIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.64645 5.64645C3.84171 5.45118 4.15829 5.45118 4.35355 5.64645L8 9.29289L11.6464 5.64645C11.8417 5.45118 12.1583 5.45118 12.3536 5.64645C12.5488 5.84171 12.5488 6.15829 12.3536 6.35355L8.35355 10.3536C8.15829 10.5488 7.84171 10.5488 7.64645 10.3536L3.64645 6.35355C3.45118 6.15829 3.45118 5.84171 3.64645 5.64645Z"
            fill="#848484"
        />
    </svg>
);

const DefaultLayout = (props: DefaultLayoutProps) => {
    const { children } = props;

    const currentUser = useAppSelector(selectAuth).currentUser;
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(authActions.setCurrentUser(null));
    };

    const userMenu = {
        items: [{ key: '1', label: 'Logout', onClick: () => handleLogout() }]
    };

    const pathname = useLocation().pathname;
    const [activeMenuIds, setActiveMenuIds] = useState<string[]>([]);

    // Update activeMenuIds by pathnames
    useEffect(() => {
        const updateActiveMenus = () => {
            const newActiveMenus: string[] = [];

            // Get activeMenuIds by pathnames
            const getActiveMenuIds = (menus: HeaderMenu[], parentId: string) => {
                menus.forEach((menu, id) => {
                    const currentId = (parentId ? `${parentId}-` : '') + id;

                    // If pathname starts with menu url then menu is active
                    if (menu.url && pathname.startsWith(menu.url)) {
                        if (newActiveMenus.findIndex(item => item === currentId) !== null) {
                            newActiveMenus.push(currentId);
                        }
                    }

                    // If menu have children then check children
                    if (menu.children && menu.children.length > 0) {
                        getActiveMenuIds(menu.children, currentId);
                    }
                });
            };

            getActiveMenuIds(headerMenu, '');
            setActiveMenuIds(newActiveMenus);
        };

        updateActiveMenus();
    }, [pathname]);

    // Render sub menu
    const renderSubMenu = (subMenus: HeaderMenu[] = [], parentId: string): ItemType<MenuItemType>[] => {
        return subMenus.map((subMenu, id) => {
            const currentId = parentId + '-' + id;
            const isActive = activeMenuIds.findIndex(item => item === currentId.toString() || item.startsWith(currentId + '-')) >= 0;

            let newSubMenu: ItemType<MenuItemType> = {
                key: parentId + '-' + id,
                label: <Link to={subMenu.url || ''}>{subMenu.label}</Link>,
                className: isActive ? ' ant-menu-item-selected' : ''
            };
            if (subMenu.children && subMenu.children.length > 0)
                newSubMenu = {
                    ...newSubMenu,
                    children: renderSubMenu(subMenu.children, currentId)
                };

            return newSubMenu;
        });
    };

    const renderHeaderMenu = headerMenu.map((menu, id) => {
        const isActive = activeMenuIds.findIndex(item => item === id.toString() || item.startsWith(id + '-')) >= 0;
        const menuItemClassName = 'header-menu-item' + (isActive ? ' ant-menu-submenu-selected' : '');

        let newMenu: ItemType<MenuItemType> = {
            key: id.toString(),
            label: (
                <>
                    <Link to={menu.url || ''}>{menu.label}</Link>
                    {menu.children && dropdownIcon}
                </>
            ),
            className: menuItemClassName,
            popupClassName: 'header-sub-menu'
        };
        if (menu.children && menu.children.length > 0)
            newMenu = { ...newMenu, children: renderSubMenu(menu.children, id.toString()) } as ItemType<MenuItemType>;

        return newMenu;
    });

    return (
        <Layout className="layout">
            <Header className="header">
                <div className="header-start">
                    <div className="header-site">
                        <Link to="/">
                            <img className="header-site-logo" src="/media/logo.png" height={32} alt="logo" />
                        </Link>
                    </div>
                    <div className="header-line" />
                    <Menu mode="horizontal" items={renderHeaderMenu} selectedKeys={[]} className="header-menu" />
                </div>
                <Dropdown menu={userMenu} trigger={['click']}>
                    <Button type="text" className="header-user">
                        <Avatar src={currentUser?.employeeImageUrl} size={36} />
                        <div>{currentUser?.firstName}</div>
                        {dropdownIcon}
                    </Button>
                </Dropdown>
            </Header>

            <Content className="body" id="id-body">
                {children}
            </Content>
        </Layout>
    );
};

export default DefaultLayout;
