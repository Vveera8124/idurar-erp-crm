import React, { useState } from 'react';
import { Button, Divider, Typography, message } from 'antd';
import axios from 'axios';

const { Paragraph } = Typography;

const SummaryBox = ({ notes }) => {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const generateSummary = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post('/ai/summary', notes);
      setSummary(data?.result);
    } catch (err) {
      message.error(err?.response?.data?.message || 'Failed to generate summary');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {summary ? (
        <>
          <Divider orientation="left" style={{ marginTop: 32 }}>
            Summary
          </Divider>
          <Paragraph
            style={{
              background: '#f6ffed',
              border: '1px solid #b7eb8f',
              borderRadius: 4,
              padding: 16,
              marginBottom: 0,
            }}
          >
            {summary}
          </Paragraph>
        </>
      ) : (
        <Button type="primary" onClick={generateSummary} loading={loading} disabled={loading}>
          Generate Summary
        </Button>
      )}
    </>
  );
};

export default SummaryBox;
