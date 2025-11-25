// src/pages/MyQueue.jsx
import React, { useState, useMemo } from "react";
import { Table, Tag, Button, Input, Select, Space, Progress, Dropdown, message } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Search } = Input;

// ---------------- MOCK DATA ----------------
const MOCK_CHECKLISTS = [
  {
    _id: "1",
    applicantName: "Alice Johnson",
    loanType: "Home Loan",
    createdAt: new Date().toISOString(),
    rmId: { _id: "rm1", firstName: "John", lastName: "Mwangi" },
    documents: [
      { name: "Employment Letter", status: "Submitted" },
      { name: "Bank Statement", status: "Deferred" },
    ],
  },
  {
    _id: "2",
    applicantName: "Bob Smith",
    loanType: "Car Loan",
    createdAt: new Date().toISOString(),
    rmId: { _id: "rm2", firstName: "Sarah", lastName: "Kamau" },
    documents: [
      { name: "Driver’s License", status: "Submitted" },
      { name: "Income Certificate", status: "Submitted" },
    ],
  },
  {
    _id: "3",
    applicantName: "Catherine Mwangi",
    loanType: "Personal Loan",
    createdAt: new Date().toISOString(),
    rmId: { _id: "rm3", firstName: "David", lastName: "Otieno" },
    documents: [
      { name: "Passport", status: "Submitted" },
      { name: "Salary Slip", status: "Submitted" },
    ],
  },
  {
    _id: "4",
    applicantName: "Daniel Kimani",
    loanType: "Business Loan",
    createdAt: new Date().toISOString(),
    rmId: { _id: "rm4", firstName: "Grace", lastName: "Njeri" },
    documents: [
      { name: "Business Registration", status: "Pending" },
      { name: "Bank Statement", status: "Deferred" },
    ],
  },
  {
    _id: "5",
    applicantName: "Eva Njoroge",
    loanType: "Mortgage",
    createdAt: new Date().toISOString(),
    rmId: { _id: "rm5", firstName: "Peter", lastName: "Mwangi" },
    documents: [
      { name: "Property Deed", status: "Submitted" },
      { name: "ID Proof", status: "Submitted" },
    ],
  },
  {
    _id: "6",
    applicantName: "Frank Otieno",
    loanType: "SME Loan",
    createdAt: new Date().toISOString(),
    rmId: { _id: "rm6", firstName: "Lydia", lastName: "Ndegwa" },
    documents: [
      { name: "KRA Pin", status: "Submitted" },
      { name: "CR12", status: "Pending" },
    ],
  },
  {
    _id: "7",
    applicantName: "Grace Wanjiru",
    loanType: "Car Loan",
    createdAt: new Date().toISOString(),
    rmId: { _id: "rm2", firstName: "Sarah", lastName: "Kamau" },
    documents: [
      { name: "Driver’s License", status: "Deferred" },
      { name: "Insurance Document", status: "Submitted" },
    ],
  },
  {
    _id: "8",
    applicantName: "Henry Kariuki",
    loanType: "Home Loan",
    createdAt: new Date().toISOString(),
    rmId: { _id: "rm1", firstName: "John", lastName: "Mwangi" },
    documents: [
      { name: "ID Proof", status: "Submitted" },
      { name: "Salary Slip", status: "Submitted" },
      { name: "Bank Statement", status: "Pending" },
    ],
  },
];

const MyQueue = () => {
  const navigate = useNavigate();
  const [checklists, setChecklists] = useState(MOCK_CHECKLISTS);
  const [searchText, setSearchText] = useState("");
  const [rmFilter, setRmFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);

  // ---------------- FILTERED DATA ----------------
  const filteredData = useMemo(() => {
    return checklists
      .filter(item =>
        searchText ? item.applicantName.toLowerCase().includes(searchText.toLowerCase()) : true
      )
      .filter(item => (rmFilter ? item.rmId?._id === rmFilter : true))
      .filter(item => {
        if (!statusFilter) return true;
        return item.documents.some(d => d.status === statusFilter);
      });
  }, [checklists, searchText, rmFilter, statusFilter]);

  const rmOptions = [
    ...new Map(
      checklists.map(i => [
        i.rmId._id,
        { label: `${i.rmId.firstName} ${i.rmId.lastName}`, value: i.rmId._id },
      ])
    ).values(),
  ];

  // ---------------- ACTIONS ----------------
  const handleApproveAll = (row) => {
    const allReady = row.documents.every(d => d.status === "Submitted" || d.status === "Deferred");
    if (!allReady) {
      message.warning("Some documents are not ready to approve.");
      return;
    }

    setChecklists(prev =>
      prev.map(item =>
        item._id === row._id
          ? { ...item, documents: item.documents.map(d => ({ ...d, status: "Approved" })) }
          : item
      )
    );
    message.success(`All documents for ${row.applicantName} approved and forwarded to Checker.`);
  };

  const handleReturnToRM = (row) => {
    setChecklists(prev =>
      prev.map(item =>
        item._id === row._id
          ? {
              ...item,
              documents: item.documents.map(d =>
                d.status !== "Approved" ? { ...d, status: "Returned" } : d
              ),
            }
          : item
      )
    );
    message.info(`Checklist for ${row.applicantName} returned to RM for action.`);
  };

  // ---------------- TABLE COLUMNS ----------------
  const columns = [
    {
      title: "Applicant",
      render: (_, row) => (
        <div style={{ fontWeight: 600 }}>
          {row.applicantName}
          <div style={{ fontSize: 12, color: "#888" }}>
            RM: {row.rmId.firstName} {row.rmId.lastName}
          </div>
        </div>
      ),
    },
    {
      title: "Loan Type",
      render: (_, row) => <Tag color="purple">{row.loanType}</Tag>,
    },
    {
      title: "Progress",
      render: (_, row) => {
        const docs = row.documents;
        const approved = docs.filter(d => d.status === "Approved").length;
        const percent = Math.round((approved / docs.length) * 100);
        return <Progress percent={percent} size="small" />;
      },
    },
    {
      title: "Deferred",
      render: (_, row) => {
        const deferred = row.documents.filter(d => d.status === "Deferred").length;
        return <Tag color="orange">{deferred}</Tag>;
      },
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      render: date => new Date(date).toLocaleString(),
    },
    {
      title: "Actions",
      render: (_, row) => (
        <Dropdown
          menu={{
            items: [
              { key: "view", label: "Review Checklist", onClick: () => navigate(`/creator/review/${row._id}`) },
              { key: "approve", label: "Approve All", onClick: () => handleApproveAll(row) },
              { key: "return", label: "Return to RM", onClick: () => handleReturnToRM(row) },
            ],
          }}
          trigger={["click"]}
        >
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-bold mb-4">My Queue</h1>

      <Space className="mb-4">
        <Search
          placeholder="Search applicant"
          allowClear
          onChange={e => setSearchText(e.target.value)}
          style={{ width: 200 }}
        />
        <Select
          placeholder="Filter by RM"
          allowClear
          style={{ width: 180 }}
          options={rmOptions}
          onChange={setRmFilter}
        />
        <Select
          placeholder="Filter by Status"
          allowClear
          style={{ width: 180 }}
          options={[
            { label: "Submitted", value: "Submitted" },
            { label: "Pending", value: "Pending" },
            { label: "Deferred", value: "Deferred" },
            { label: "Approved", value: "Approved" },
            { label: "Returned", value: "Returned" },
          ]}
          onChange={setStatusFilter}
        />
      </Space>

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="_id"
        bordered
        pagination={{ pageSize: 6 }}
      />
    </div>
  );
};

export default MyQueue;
