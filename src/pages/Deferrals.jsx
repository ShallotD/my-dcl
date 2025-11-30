// src/pages/Deferrals.jsx
import React, { useState, useMemo } from "react";
import {
  Table,
  Input,
  Button,
  Space,
  Tag,
  Typography,
  DatePicker,
  message,
} from "antd";
import dayjs from "dayjs";

const { TextArea } = Input;
const { Text } = Typography;

const MOCK_DEFERRALS = [
  {
    _id: "D1",
    customerNo: "458921",
    workstep: "WS-1001",
    document: "Bank Statement",
    reason: "Missing transactions",
    expiryDate: "2025-12-05",
    creatorComments: "",
    status: "Deferred",
  },
  {
    _id: "D2",
    customerNo: "772194",
    workstep: "WS-1002",
    document: "Salary Slip",
    reason: "Not submitted",
    expiryDate: "2025-12-10",
    creatorComments: "",
    status: "Deferred",
  },
];

export default function Deferrals() {
  const [deferrals, setDeferrals] = useState(MOCK_DEFERRALS);
  const [filterText, setFilterText] = useState("");
  const [editingRowId, setEditingRowId] = useState(null);
  const [editingComments, setEditingComments] = useState("");
  const [editingExpiry, setEditingExpiry] = useState(null);

  // Filter deferrals based on customerNo or workstep
  const filteredDeferrals = useMemo(() => {
    const text = filterText.toLowerCase();
    return deferrals.filter(
      (d) =>
        d.customerNo.toLowerCase().includes(text) ||
        d.workstep.toLowerCase().includes(text)
    );
  }, [deferrals, filterText]);

  const startEditing = (record) => {
    setEditingRowId(record._id);
    setEditingComments(record.creatorComments || "");
    setEditingExpiry(record.expiryDate ? dayjs(record.expiryDate) : null);
  };

  const cancelEditing = () => {
    setEditingRowId(null);
    setEditingComments("");
    setEditingExpiry(null);
  };

  const saveEditing = () => {
    if (!editingExpiry) {
      message.error("Please select an expiry date.");
      return;
    }
    setDeferrals((prev) =>
      prev.map((d) =>
        d._id === editingRowId
          ? {
              ...d,
              creatorComments: editingComments,
              expiryDate: editingExpiry.format("YYYY-MM-DD"),
              status: "Reviewed",
            }
          : d
      )
    );
    message.success("Deferral updated successfully.");
    cancelEditing();
  };

  const columns = [
    {
      title: "Customer No",
      dataIndex: "customerNo",
      key: "customerNo",
      width: 120,
    },
    {
      title: "Workstep",
      dataIndex: "workstep",
      key: "workstep",
      width: 120,
    },
    {
      title: "Document",
      dataIndex: "document",
      key: "document",
      width: 150,
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
      width: 200,
    },
    {
      title: "Expiry Date",
      dataIndex: "expiryDate",
      key: "expiryDate",
      width: 140,
      render: (text, record) => {
        if (editingRowId === record._id) {
          return (
            <DatePicker
              value={editingExpiry}
              onChange={(date) => setEditingExpiry(date)}
              format="YYYY-MM-DD"
            />
          );
        }
        return text;
      },
      sorter: (a, b) =>
        new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime(),
      defaultSortOrder: "ascend",
    },
    {
      title: "Creator Comments",
      dataIndex: "creatorComments",
      key: "creatorComments",
      width: 250,
      render: (text, record) => {
        if (editingRowId === record._id) {
          return (
            <TextArea
              rows={2}
              value={editingComments}
              onChange={(e) => setEditingComments(e.target.value)}
              placeholder="Enter comments"
            />
          );
        }
        return text || <Text type="secondary">No comments</Text>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status) => {
        let color = "blue";
        if (status === "Deferred") color = "orange";
        else if (status === "Reviewed") color = "green";
        return <Tag color={color}>{status}</Tag>;
      },
      filters: [
        { text: "Deferred", value: "Deferred" },
        { text: "Reviewed", value: "Reviewed" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Action",
      key: "action",
      width: 160,
      render: (_, record) =>
        editingRowId === record._id ? (
          <Space>
            <Button type="primary" onClick={saveEditing}>
              Save
            </Button>
            <Button onClick={cancelEditing}>Cancel</Button>
          </Space>
        ) : (
          <Button onClick={() => startEditing(record)}>Review</Button>
        ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2>Deferrals Queue</h2>

      <Space style={{ marginBottom: 16 }}>
        <Input.Search
          placeholder="Search by Customer No or Workstep"
          onChange={(e) => setFilterText(e.target.value)}
          allowClear
          style={{ width: 300 }}
        />
      </Space>

      <Table
        columns={columns}
        dataSource={filteredDeferrals}
        rowKey="_id"
        pagination={{ pageSize: 6 }}
        bordered
      />
    </div>
  );
}

