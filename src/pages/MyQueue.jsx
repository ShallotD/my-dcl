// src/pages/MyQueue.jsx
import React, { useState, useMemo } from "react";
import { Table, Tag, Button, Input, Select, Space, Progress, Dropdown, message } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Search } = Input;

const MOCK_CHECKLISTS = [
  {
    _id: "1",
    loanNo: "LN1001",
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
    loanNo: "LN1002",
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
    loanNo: "LN1003",
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
    loanNo: "LN1004",
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
    loanNo: "LN1005",
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
    loanNo: "LN1006",
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
    loanNo: "LN1007",
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
    loanNo: "LN1008",
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

  const filteredData = useMemo(() => {
    return checklists
      .filter(item => {
        if (!searchText) return true;
        return (
          item.applicantName.toLowerCase().includes(searchText.toLowerCase()) ||
          item.loanNo.toLowerCase().includes(searchText.toLowerCase())
        );
      })
      .filter(item => (rmFilter ? item.rmId._id === rmFilter : true))
      .filter(item => {
        if (!statusFilter) return true;
        // Example: match status filter — you may refine logic as needed
        const docs = item.documents;
        const allApproved = docs.every(d => d.status === "Approved");
        const anyDeferred = docs.some(d => d.status === "Deferred");
        const anyPending = docs.some(d => d.status === "Pending");
        let status = allApproved ? "Ready" : anyDeferred || anyPending ? "Pending" : "New";
        return status === statusFilter;
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

  const handleApproveAll = row => {
    const allReady = row.documents.every(
      d => d.status === "Submitted" || d.status === "Deferred"
    );
    if (!allReady) {
      message.warning("Some documents are not ready to approve.");
      return;
    }
    setChecklists(prev =>
      prev.map(item =>
        item._id === row._id
          ? {
              ...item,
              documents: item.documents.map(d => ({ ...d, status: "Approved" })),
            }
          : item
      )
    );
    message.success(`All documents for ${row.applicantName} approved and forwarded to Checker.`);
  };

  const handleReturnToRM = row => {
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

  const columns = [
    {
      title: "Loan No.",
      dataIndex: "loanNo",
      key: "loanNo",
      width: 120,
    },
    {
      title: "Applicant",
      key: "applicant",
      render: (_, row) => <div>{row.applicantName}</div>,
      width: 180,
    },
    {
      title: "Loan Type",
      dataIndex: "loanType",
      key: "loanType",
      width: 130,
      render: v => <Tag color="purple">{v}</Tag>,
    },
    {
      title: "Progress",
      key: "progress",
      width: 140,
      render: (_, row) => {
        const docs = row.documents;
        const approved = docs.filter(d => d.status === "Approved").length;
        const percent = Math.round((approved / docs.length) * 100);
        return <Progress percent={percent} size="small" />;
      },
    },
    {
      title: "RM",
      key: "rm",
      width: 150,
      render: (_, row) => `${row.rmId.firstName} ${row.rmId.lastName}`,
    },
    {
      title: "Status",
      key: "status",
      width: 120,
      render: (_, row) => {
        const docs = row.documents;
        if (docs.every(d => d.status === "Approved")) return "Ready";
        if (docs.some(d => d.status === "Deferred" || d.status === "Pending"))
          return "Pending";
        return "New";
      },
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (_, row) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "view",
                label: "Review Checklist",
                onClick: () => navigate(`/creator/review/${row._id}`),
              },
              {
                key: "approve",
                label: "Approve All",
                onClick: () => handleApproveAll(row),
              },
              {
                key: "return",
                label: "Return to RM",
                onClick: () => handleReturnToRM(row),
              },
            ],
          }}
          trigger={["click"]}
        >
          <Button icon={<MoreOutlined />} size="small" />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="bg-white p-5 rounded-lg shadow">
      <h2 style={{ marginBottom: 16 }}>My Queue</h2>

      <Space style={{ marginBottom: 16 }} wrap>
        <Search
          placeholder="Search by Loan / Customer"
          allowClear
          onChange={e => setSearchText(e.target.value)}
          style={{ width: 220 }}
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
            { label: "Ready", value: "Ready" },
            { label: "Pending", value: "Pending" },
            { label: "New", value: "New" },
          ]}
          onChange={setStatusFilter}
        />
      </Space>

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="_id"
        size="small"
        bordered
        pagination={{ pageSize: 6 }}
      />
    </div>
  );
};

export default MyQueue;
