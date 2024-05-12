import pathnames from '@/pathnames';

export interface HeaderMenu {
    label: string;
    url?: string;
    children?: HeaderMenu[];
}

const headerMenu: HeaderMenu[] = [
    {
        url: '/board-management',
        label: pathnames.boardManagement.main.name
    },
    {
        url: '/opportunity-management',
        label: 'Opportunity'
    },
    {
        url: '/contact-management',
        label: 'Contact'
    },
    {
        url: '/user-management',
        label: 'User'
    }
];

export default headerMenu;
