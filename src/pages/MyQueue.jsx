// src/pages/MyQueue.jsx
import React, { useState, useMemo } from "react";
import { Table, Tag, Input, Select, Space, Button, Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const { Search } = Input;
const { TabPane } = Tabs;

// Updated MOCK data with explicit status per checklist (Creator workflow status)
const MOCK_CHECKLISTS = [
  {
    _id: "1",
    loanNo: "LN1001",
    applicantName: "Alice Johnson",
    loanType: "Home Loan",
    createdAt: new Date().toISOString(),
    rmId: { _id: "rm1", firstName: "John", lastName: "Mwangi" },
    status: "pending_creator_review",
    documents: [
      { name: "Employment Letter", status: "Submitted", url: "/docs/employment-letter.pdf" },
      { name: "Bank Statement", status: "Deferred", url: "/docs/bank-statement.pdf" },
    ],
  },
  {
    _id: "2",
    loanNo: "LN1002",
    applicantName: "Bob Smith",
    loanType: "Car Loan",
    createdAt: new Date().toISOString(),
    rmId: { _id: "rm2", firstName: "Sarah", lastName: "Kamau" },
    status: "returned_by_checker",
    documents: [
      { name: "Driver’s License", status: "Submitted", url: "/docs/drivers-license.pdf" },
      { name: "Income Certificate", status: "Submitted", url: "/docs/income-certificate.pdf" },
    ],
  },
  {
    _id: "3",
    loanNo: "LN1003",
    applicantName: "Catherine Mwangi",
    loanType: "Personal Loan",
    createdAt: new Date().toISOString(),
    rmId: { _id: "rm3", firstName: "David", lastName: "Otieno" },
    status: "pending_creator_review",
    documents: [
      { name: "Passport", status: "Submitted", url: "/docs/passport.pdf" },
      { name: "Salary Slip", status: "Submitted", url: "/docs/salary-slip.pdf" },
    ],
  },
];

const MyQueue = () => {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [rmFilter, setRmFilter] = useState(null);
  const [activeTab, setActiveTab] = useState("current");

  const [checklists] = useState(MOCK_CHECKLISTS);

  const filteredData = useMemo(() => {
    return checklists.filter(item => {
      if (
        searchText &&
        !(
          item.applicantName.toLowerCase().includes(searchText.toLowerCase()) ||
          item.loanNo.toLowerCase().includes(searchText.toLowerCase())
        )
      ) {
        return false;
      }
      if (rmFilter && item.rmId._id !== rmFilter) return false;

      if (activeTab === "current") {
        return item.status === "pending_creator_review";
      }
      if (activeTab === "previous") {
        return item.status === "returned_by_checker";
      }
      return false;
    });
  }, [checklists, searchText, rmFilter, activeTab]);

  const rmOptions = [
    ...new Map(
      checklists.map(i => [
        i.rmId._id,
        { label: `${i.rmId.firstName} ${i.rmId.lastName}`, value: i.rmId._id },
      ])
    ).values(),
  ];

  const columns = [
    {
      title: "Customer No",
      dataIndex: "loanNo",
      key: "loanNo",
      width: 120,
      sorter: (a, b) => a.loanNo.localeCompare(b.loanNo),
    },
    {
      title: "DCL No",
      dataIndex: "_id",
      key: "dclNo",
      width: 140,
      render: id => id.toUpperCase(),
    },
    {
      title: "Customer Name",
      key: "customerName",
      render: (_, row) => <div>{row.applicantName}</div>,
      width: 180,
      sorter: (a, b) => a.applicantName.localeCompare(b.applicantName),
    },
    {
      title: "Product",
      dataIndex: "loanType",
      key: "product",
      width: 130,
      render: v => <Tag color="purple">{v}</Tag>,
      sorter: (a, b) => a.loanType.localeCompare(b.loanType),
    },
    {
      title: "Document Status",
      key: "documentsStatus",
      width: 180,
      render: (_, row) => {
        const submitted = row.documents.filter(d => d.status === "Submitted").length;
        const deferred = row.documents.filter(d => d.status === "Deferred").length;
        const pending = row.documents.filter(d => d.status === "Pending").length;
        return (
          <Space>
            <Tag color="green">Submitted: {submitted}</Tag>
            <Tag color="orange">Deferred: {deferred}</Tag>
            <Tag color="blue">Pending: {pending}</Tag>
          </Space>
        );
      },
    },
    {
      title: "RM",
      key: "rm",
      width: 150,
      render: (_, row) => `${row.rmId.firstName} ${row.rmId.lastName}`,
      filters: rmOptions,
      onFilter: (value, record) => record.rmId._id === value,
    },
    {
      title: "Action",
      key: "action",
      width: 120,
      render: (_, row) => (
        <Button
          type="primary"
          onClick={e => {
            e.stopPropagation();
            navigate(`/creator/review/${row._id}`, { state: { checklist: row } });
          }}
        >
          Review
        </Button>
      ),
    },
  ];

  return (
    <div className="bg-white p-5 rounded-lg shadow">
      <h2 style={{ marginBottom: 16 }}>My Queue</h2>

      <Space style={{ marginBottom: 16 }} wrap>
        <Search
          placeholder="Search by Customer No or Name"
          allowClear
          onChange={e => setSearchText(e.target.value)}
          style={{ width: 240 }}
        />
        <Select
          placeholder="Filter by RM"
          allowClear
          style={{ width: 200 }}
          options={rmOptions}
          onChange={setRmFilter}
          value={rmFilter}
        />
      </Space>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="Current Queue" key="current" />
        <TabPane tab="Previous Queue" key="previous" />
      </Tabs>

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="_id"
        size="small"
        bordered
        pagination={{ pageSize: 6 }}
        onRow={record => ({
          onClick: () => {
            navigate(`/creator/review/${record._id}`, { state: { checklist: record } });
          },
          style: { cursor: "pointer" },
        })}
      />
    </div>
  );
};

export default MyQueue;
