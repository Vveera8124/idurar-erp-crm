import React from 'react';
import { Table } from 'antd';
const QueryTable = React.memo(({ data, loading, pagination, onChange, columns }) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={
        pagination
          ? {
              current: pagination.current,
              pageSize: 10,
              total: pagination.total,
              showTotal: (total) => `Total ${total} items`,
            }
          : false
      }
      onChange={onChange && onChange}
      rowKey="_id"
    />
  );
});

export default QueryTable;
