// src/pages/MyQueue.jsx
import React, { useState, useMemo } from "react";
import { Table, Tag, Input, Select, Space, Progress } from "antd";
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
    documents: [
      { name: "Passport", status: "Submitted", url: "/docs/passport.pdf" },
      { name: "Salary Slip", status: "Submitted", url: "/docs/salary-slip.pdf" },
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
      { name: "Business Registration", status: "Pending", url: "/docs/business-reg.pdf" },
      { name: "Bank Statement", status: "Deferred", url: "/docs/bank-statement.pdf" },
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
      { name: "Property Deed", status: "Submitted", url: "/docs/property-deed.pdf" },
      { name: "ID Proof", status: "Submitted", url: "/docs/id-eva.pdf" },
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
      { name: "KRA Pin", status: "Submitted", url: "/docs/kra-pin.pdf" },
      { name: "CR12", status: "Pending", url: "/docs/cr12.pdf" },
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
      { name: "Driver’s License", status: "Deferred", url: "/docs/license.pdf" },
      { name: "Insurance Document", status: "Submitted", url: "/docs/insurance.pdf" },
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
      { name: "ID Proof", status: "Submitted", url: "/docs/id-proof.pdf" },
      { name: "Salary Slip", status: "Submitted", url: "/docs/salary-slip.pdf" },
      { name: "Bank Statement", status: "Pending", url: "/docs/bank-statement.pdf" },
    ],
  },
];

const MyQueue = () => {
  const navigate = useNavigate();
  const [checklists] = useState(MOCK_CHECKLISTS);
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
        const docs = item.documents;
        const allApproved = docs.every(d => d.status === "Approved");
        const anyDeferred = docs.some(d => d.status === "Deferred");
        const anyPending = docs.some(d => d.status === "Pending");
        const status = allApproved
          ? "Ready"
          : (anyDeferred || anyPending ? "Pending" : "New");
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

  const columns = [
    { title: "Loan No.", dataIndex: "loanNo", key: "loanNo", width: 120 },
    { title: "Applicant", key: "applicant", render: (_, row) => <div>{row.applicantName}</div>, width: 180 },
    { title: "Loan Type", dataIndex: "loanType", key: "loanType", width: 130, render: v => <Tag color="purple">{v}</Tag> },
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
    { title: "RM", key: "rm", width: 150, render: (_, row) => `${row.rmId.firstName} ${row.rmId.lastName}` },
    {
      title: "Status",
      key: "status",
      width: 120,
      render: (_, row) => {
        const docs = row.documents;
        if (docs.every(d => d.status === "Approved")) return "Ready";
        if (docs.some(d => d.status === "Deferred" || d.status === "Pending")) return "Pending";
        return "New";
      },
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
