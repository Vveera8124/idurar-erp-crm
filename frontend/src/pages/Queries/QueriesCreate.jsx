import React, { useCallback } from 'react';
import { Form, message } from 'antd';
import axios from 'axios';
import QueriesForm from '@/modules/QueriesModule/Forms/QueriesForm';
import QueryPageWrapper from '@/modules/QueriesModule/QueriesPageWrapper/QueriesPageWrapper';
import { useNavigate } from 'react-router-dom';

const QueriesCreate = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (values) => {
      try {
        const response = await axios.post('/queries', values);
        message.success(response?.data.message);
        form.resetFields();
        navigate('/queries');
      } catch (err) {
        console.error('error occured', err);
      }
    },
    [form, navigate]
  );

  const handleSubmit = useCallback(() => {
    form.submit();
  }, []);

  return (
    <QueryPageWrapper title="Create" onSubmit={handleSubmit}>
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <QueriesForm />
      </Form>
    </QueryPageWrapper>
  );
};

export default QueriesCreate;
