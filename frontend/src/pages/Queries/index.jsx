import React, { useEffect, useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import { Card, Button, Flex, Select, Dropdown } from 'antd';
import { PlusOutlined, EditOutlined, EllipsisOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import QueryTable from '@/modules/QueriesModule/QueriesTableModule/QueryTable';

const Queries = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [pagination, setPagination] = useState({ current: 1, total: 0 });
  const navigate = useNavigate();
  useEffect(() => {
    fetchQueries();
  }, [filter, pagination.current]);

  const fetchQueries = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/queries?page=${pagination.current}&limit=${10}&filter=${filter}`
      );
      setQueries(data?.result);
      setPagination({ current: data?.pagination.page, total: data?.pagination.count });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTableChange = useCallback((pagination) => {
    setPagination((prev) => ({
      ...prev,
      current: pagination.current,
    }));
  });

  const handleChange = useCallback((value) => {
    setFilter(value);
    setPagination((prev) => ({ ...prev, current: 1 }));
  });

  const handleAction = useCallback(
    (action, id) => {
      if (action == 'edit') {
        navigate(`/queries/update/${id}`);
      } else if (action == 'show') {
        navigate(`/queries/read/${id}`);
      }
    },
    [navigate]
  );

  const handleCreate = () => {
    navigate(`/queries/create`);
  };

  const columns = useMemo(
    () => [
      {
        title: 'Customer Name',
        dataIndex: 'customerName',
      },
      {
        title: 'Description',
        dataIndex: 'description',
      },
      {
        title: 'Creation Date',
        dataIndex: 'createdAt',
        render: (date) => new Date(date).toLocaleDateString(),
      },
      {
        title: 'Status',
        dataIndex: 'status',
      },
      {
        title: 'Resolution',
        dataIndex: 'resolution',
        ellipsis: true,
      },
      {
        title: '',
        key: 'action',
        fixed: 'right',
        width: 80,
        render: (_, record) => (
          <Dropdown
            menu={{
              items: [
                { label: 'Show', key: 'show', icon: <EyeOutlined /> },
                {
                  label: 'Edit',
                  key: 'edit',
                  icon: <EditOutlined />,
                },
              ],
              onClick: ({ key }) => {
                handleAction(key, record?._id);
              },
            }}
          >
            <EllipsisOutlined
              style={{ cursor: 'pointer', fontSize: '24px' }}
              onClick={(e) => e.preventDefault()}
            />
          </Dropdown>
        ),
      },
    ],
    [handleAction]
  );
  return (
    <Card
      title="Queries List"
      extra={
        <Flex gap={'small'} wrap>
          <span style={{ alignSelf: 'center' }}>Filter by Status:</span>
          <Select
            value={filter}
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: 'Open', label: 'Open' },
              { value: 'InProgress', label: 'In Progress' },
              { value: 'Closed', label: 'Closed' },
              { value: 'All', label: 'All' },
            ]}
          />{' '}
          <Button type="primary" onClick={handleCreate}>
            <PlusOutlined />
            Add Query
          </Button>
        </Flex>
      }
      className="whiteBox shadow layoutPadding"
      style={{
        margin: '30px auto',
        width: '100%',
        maxWidth: '1100px',
        minHeight: '600px',
      }}
    >
      <QueryTable
        data={queries}
        columns={columns}
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
      />
    </Card>
  );
};

export default Queries;
