import { Tabs } from 'antd';
import { ITabProps } from '.';
import './sub-tab.scss';

const SubTab = (props: ITabProps) => {
    const { items, className, activeKey, onChangeTabs } = props;

    return (
        <Tabs
            defaultActiveKey={activeKey}
            activeKey={activeKey}
            onTabClick={(key: string) => onChangeTabs && onChangeTabs(key)}
            items={items}
            className={`sub-tab ${className}`}
        />
    );
};

export default SubTab;
