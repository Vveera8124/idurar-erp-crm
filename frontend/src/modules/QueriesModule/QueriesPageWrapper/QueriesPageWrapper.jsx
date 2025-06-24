import React, { useCallback, useMemo } from 'react';
import { PageHeader } from '@ant-design/pro-layout';
import { Button } from 'antd';
import {
  ArrowLeftOutlined,
  CloseCircleOutlined,
  PlusOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { ErpLayout } from '@/layout';
import PageLoader from '@/components/PageLoader';

const QueryPageWrapper = ({
  title,
  onSubmit,
  children,
  isEdit = false,
  isRead = false,
  isLoading = false,
}) => {
  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    navigate('/queries');
  }, [navigate]);

  const buttonLabel = isEdit ? 'Update' : isRead ? 'Edit' : 'Save';

  const extraButtons = useMemo(
    () => [
      <Button key="cancel" onClick={handleBack} icon={<CloseCircleOutlined />}>
        Cancel
      </Button>,
      <Button
        key="submit"
        onClick={onSubmit}
        icon={!isRead ? <PlusOutlined /> : <EditOutlined />}
        type="primary"
      >
        {buttonLabel}
      </Button>,
    ],
    [handleBack, onSubmit, isEdit]
  );
  if (isLoading) {
    return (
      <ErpLayout>
        <PageLoader />
      </ErpLayout>
    );
  }
  return (
    <ErpLayout>
      <PageHeader
        onBack={handleBack}
        backIcon={<ArrowLeftOutlined />}
        title={title}
        ghost={false}
        extra={extraButtons}
        style={{ padding: '20px 0px' }}
      />
      {children}
    </ErpLayout>
  );
};

export default QueryPageWrapper;
