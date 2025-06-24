import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { message, Descriptions, Tag, List, Divider, Card, Typography } from 'antd';

import axios from 'axios';

import QueryPageWrapper from '@/modules/QueriesModule/QueriesPageWrapper/QueriesPageWrapper';

const { Paragraph } = Typography;

const statusColors = {
  Open: 'blue',
  InProgress: 'orange',
  Closed: 'green',
};

const QueriesRead = () => {
  const [queryData, setQueryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleEdit = useCallback(() => {
    navigate(`/queries/update/${id}`);
  }, [navigate, id]);

  useEffect(() => {
    fetchQuery();
  }, [id]);

  const fetchQuery = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`/queries/${id}`);
      setQueryData(data?.result);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      message.error('Failed to fetch query');
      console.error('Failed to fetch query', err);
    }
  };

  return (
    <QueryPageWrapper title={'Query Detail'} onSubmit={handleEdit} isLoading={isLoading} isRead>
      <>
        <Descriptions
          column={1}
          bordered
          size="middle"
          labelStyle={{ width: 160, fontWeight: 500 }}
        >
          <Descriptions.Item label="Customer Name">{queryData.customerName}</Descriptions.Item>
          <Descriptions.Item label="Description">
            <Paragraph>{queryData.description}</Paragraph>
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            <Tag color={statusColors[queryData.status] || 'default'}>{queryData.status}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Resolution">
            <Paragraph>{queryData.resolution}</Paragraph>
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            {new Date(queryData.createdAt).toLocaleDateString()}
          </Descriptions.Item>
        </Descriptions>
        <Divider orientation="left" style={{ marginTop: 32 }}>
          Notes
        </Divider>
        <List
          dataSource={queryData.notes}
          locale={{ emptyText: 'No notes available' }}
          itemLayout="horizontal"
          style={{ marginTop: 0 }}
          renderItem={(note) => (
            <List.Item style={{ padding: '4px 0', border: 'none' }}>
              <span style={{ marginRight: 8, fontSize: 18, lineHeight: 1 }}>&bull;</span>
              <Paragraph style={{ marginBottom: 0, flex: 1 }}>{note.content}</Paragraph>
            </List.Item>
          )}
        />
      </>
    </QueryPageWrapper>
  );
};

export default QueriesRead;
