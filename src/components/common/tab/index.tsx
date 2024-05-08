import { Tabs, TabsProps } from 'antd';

export interface ITabProps {
    className?: string;
    items: TabsProps['items'];
    onChangeTabs?: (key: string) => void;
    activeKey?: string;
}

const Tab = (props: ITabProps) => {
    const { items, onChangeTabs } = props;

    return <Tabs type="card" className="tabs-detail" items={items} onChange={onChangeTabs} />;
};

export default Tab;
