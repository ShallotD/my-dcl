import React from "react";
import {
  Drawer,
  Table,
  Select,
  Input,
  Button,
  message,
  Checkbox,
  Typography,
  Divider,
} from "antd";

const { Text } = Typography;

const ChecklistSubmitRM = ({ checklist, onClose }) => {
  if (!checklist) return null;

  // Mock update function (replace with your API call)
  const updateDoc = async (index, field, value) => {
    const updated = [...checklist.categories[0].documents];
    updated[index][field] = value;

    // Here you would call your API
    console.log("Updated document:", updated[index]);
    message.success("Document updated");
  };

  const submitChecklist = () => {
    // Here you would call your API to update checklist status
    console.log("Submitting checklist:", checklist._id);
    message.success("Checklist submitted to CO");
    onClose();
  };

  const columns = [
    {
      title: "",
      dataIndex: "checked",
      width: 40,
      render: (_, doc, i) => (
        <Checkbox
          checked={doc.checked || false}
          onChange={(e) => updateDoc(i, "checked", e.target.checked)}
        />
      ),
    },
    {
      title: "Document",
      dataIndex: "name",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Status",
      render: (_, doc, i) => (
        <Select
          value={doc.status || "Pending"}
          style={{ width: 130 }}
          onChange={(v) => updateDoc(i, "status", v)}
        >
          <Select.Option value="Pending">Pending</Select.Option>
          <Select.Option value="Submitted">Submitted</Select.Option>
          <Select.Option value="Deferred">Deferred</Select.Option>
        </Select>
      ),
    },
    // Removed Upload column here
    {
      title: "Comment",
      render: (_, doc, i) => (
        <Input
          placeholder="Add comment"
          value={doc.comment || ""}
          onChange={(e) => updateDoc(i, "comment", e.target.value)}
        />
      ),
    },
  ];

  return (
    <Drawer
      open={!!checklist}
      onClose={onClose}
      width={800}
      title={`Checklist for ${checklist.applicantName}`}
    >
      <Divider>Documents</Divider>
      <Table
        pagination={false}
        dataSource={checklist.categories[0].documents.map((d, i) => ({
          ...d,
          key: i,
        }))}
        columns={columns}
        bordered
      />

      <Button
        type="primary"
        block
        style={{ marginTop: 16 }}
        onClick={submitChecklist}
      >
        Submit to RM
      </Button>
    </Drawer>
  );
};

export default ChecklistSubmitRM;

