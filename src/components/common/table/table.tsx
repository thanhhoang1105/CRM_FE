import { Select, Table } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { TableProps } from 'antd/es/table';
import { TablePaginationConfig } from 'antd/es/table/interface';
import { useState } from 'react';

export interface IBaseTableProps<T> extends TableProps<T> {
    dataSource?: T[];
    rowClassName?: (record: T, index: number) => string;
}

const BaseTable = <T extends AnyObject>(props: IBaseTableProps<T>) => {
    const { scroll: scrollProp, rowClassName: rowClassNameProp, pagination: paginationProp, ...otherProps } = props;
    const totalItems = props.dataSource?.length;

    // Scroll
    const scrollDefault = props.dataSource && props.dataSource.length < 10 ? { x: 'max-content' } : { x: 'max-content', y: 400 };

    const scroll = scrollProp ?? scrollDefault;

    // Row class name
    const rowClassNameDefault = (_: T, index: number) => (index % 2 === 0 ? 'table-row-light' : 'table-row-dark');
    const rowClassName = rowClassNameProp ?? rowClassNameDefault;

    // Pagination
    const [pageSize, setPageSize] = useState(10);
    const pageSizeOptions = ['10', '50', '100'];
    const defaultPagination: TablePaginationConfig = {
        total: totalItems,
        pageSize: pageSize,
        showTotal: total => (
            <>
                <span className="total-text-display">Display</span>
                <Select
                    size="small"
                    className="total-select"
                    value={pageSize}
                    onChange={value => setPageSize(value)}
                    options={pageSizeOptions.map(option => ({ label: option, value: option }))}
                    getPopupContainer={triggerNode => triggerNode.parentNode}
                />
                <span className="total-items">in {total}</span>
            </>
        ),
        responsive: true,
        showSizeChanger: false
    };
    const pagination = paginationProp ?? defaultPagination;

    return <Table {...otherProps} pagination={pagination} scroll={scroll} showSorterTooltip={false} rowClassName={rowClassName} />;
};

export default BaseTable;
