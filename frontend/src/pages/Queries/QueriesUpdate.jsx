import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Form, message, Popconfirm, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import axios from 'axios';

import QueryPageWrapper from '@/modules/QueriesModule/QueriesPageWrapper/QueriesPageWrapper';
import QueriesForm from '@/modules/QueriesModule/Forms/QueriesForm';

const QueriesUpdate = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuery();
  }, [id]);

  const fetchQuery = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`/queries/${id}`);
      setNotes(data?.result.notes);
      form.setFieldsValue(data?.result);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      message.error('Failed to fetch query');
      console.error('Failed to fetch query', err);
    }
  };

  const onSubmit = useCallback(
    async (values) => {
      try {
        const response = await axios.put(`/queries/${values._id}`, values);
        message.success(response?.data.message);
        form.resetFields();
        navigate('/queries');
      } catch (err) {
        console.error('error occured', err);
        message.error('Failed to update query');
      }
    },
    [form, navigate]
  );

  const handleSubmit = useCallback(() => {
    form.submit();
  }, []);

  const handleNote = useCallback(async (action = 'add', noteId) => {
    const queryId = form.getFieldValue('_id');
    try {
      let response;
      if (action !== 'add') {
        response = await axios.delete(`/queries/${queryId}/notes/${noteId}`);
      } else {
        const noteContent = form.getFieldValue('note');
        if (!noteContent?.trim()) {
          message.warning('Please enter a note');
          return;
        }
        response = await axios.post(`/queries/${queryId}/notes`, {
          content: noteContent,
        });
        form.setFieldsValue({ note: '' });
      }
      message.success(response.data?.message);
      setNotes(response?.data?.result || []);
    } catch (err) {
      console.log('error in the handle removeNote fn', err);
      message.error('Failed to update notes');
    }
  });

  const columns = useMemo(
    () => [
      {
        title: 'Note',
        dataIndex: 'content',
        key: 'content',
        ellipsis: true,
      },
      {
        title: 'Created Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: 140,
        render: (date) => new Date(date).toLocaleDateString(),
      },
      {
        title: 'Action',
        key: 'action',
        width: 80,
        render: (_, record) => (
          <Popconfirm
            title="Delete this note?"
            onConfirm={() => handleNote('delete', record?._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger size="small" icon={<DeleteOutlined />}></Button>
          </Popconfirm>
        ),
      },
    ],
    [handleNote]
  );
  return (
    <QueryPageWrapper title="Update" onSubmit={handleSubmit} isLoading={isLoading} isEdit>
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <QueriesForm mode="update" notes={notes} columns={columns} handleNote={handleNote} />
      </Form>
    </QueryPageWrapper>
  );
};

export default QueriesUpdate;
