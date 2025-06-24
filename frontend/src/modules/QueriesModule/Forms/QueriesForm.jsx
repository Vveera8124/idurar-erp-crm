import React from 'react';
import { Row, Col, Form, Input, Select, Divider, Button } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import AutoCompleteAsync from '@/components/AutoCompleteAsync';
import QueryTable from '../QueriesTableModule/QueryTable';

const QueriesForm = React.memo(({ mode = 'create', ...props }) => {
  const isUpdate = mode === 'update' ? true : false;

  return (
    <>
      <Form.Item name="_id" style={{ display: 'none' }}>
        <Input type="hidden" />
      </Form.Item>
      <Form.Item
        name="customerName"
        label="Customer Name"
        rules={[{ required: true, message: 'Please select a customer' }]}
        style={{ marginBottom: 20 }}
      >
        {mode === 'create' ? (
          <AutoCompleteAsync
            entity="client"
            displayLabels={['name']}
            searchFields="name"
            redirectLabel="Add New Client"
            withRedirect
            outputValue="name"
            urlToRedirect="/customer"
          />
        ) : (
          <Input readOnly={isUpdate} />
        )}
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: 'Please enter a description' }]}
        style={{ marginBottom: 20 }}
      >
        <Input placeholder="Enter query description" readOnly={isUpdate} />
      </Form.Item>
      <Form.Item
        name="status"
        label="Status"
        rules={[{ required: true, message: 'Please select a status' }]}
        initialValue="Open"
        style={{ marginBottom: 20 }}
      >
        <Select
          options={[
            { value: 'Open', label: 'Open' },
            { value: 'InProgress', label: 'In Progress' },
            { value: 'Closed', label: 'Closed' },
          ]}
          placeholder="Select status"
        />
      </Form.Item>
      <Form.Item name="resolution" label="Resolution" style={{ marginBottom: 0 }}>
        <Input.TextArea
          placeholder="Enter resolution details (optional)"
          autoSize={{ minRows: 3, maxRows: 6 }}
          maxLength={100}
        />
      </Form.Item>

      {!isUpdate ? (
        <Form.List name="notes">
          {(fields, { add, remove }) => (
            <>
              <Divider style={{ fontWeight: 'bold' }}>Notes</Divider>
              {fields.map(({ key, name, ...restField }) => (
                <Row key={key} gutter={8} align="middle" style={{ marginBottom: 8 }}>
                  <Col flex="auto">
                    <Form.Item
                      {...restField}
                      name={[name, 'content']}
                      rules={[{ required: true, message: 'Please enter a note' }]}
                      style={{ marginBottom: 0 }}
                    >
                      <Input placeholder="Enter note" />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Button icon={<DeleteOutlined />} onClick={() => remove(name)} danger />
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add Note
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      ) : (
        <>
          <Divider dashed style={{ fontWeight: 'bold' }}>
            Notes
          </Divider>
          <Row gutter={8} style={{ marginBottom: 20 }}>
            <Col flex="auto">
              <Form.Item name="note" style={{ marginBottom: 0 }}>
                <Input placeholder="Add a note" />
              </Form.Item>
            </Col>
            <Col>
              <Button
                type="primary"
                onClick={() => props.handleNote('add', null)}
                icon={<PlusOutlined />}
              >
                Add
              </Button>
            </Col>
          </Row>
          <QueryTable data={props.notes} columns={props.columns} />
        </>
      )}
    </>
  );
});
export default QueriesForm;
