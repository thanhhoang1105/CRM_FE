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
        url: '/employee-transfer',
        label: 'Employee transfer'
    }
];

export default headerMenu;
