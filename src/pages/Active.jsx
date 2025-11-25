// src/pages/Active.jsx
import React, { useState, useMemo } from "react";
import { Table, Tag, Input, Space, Button, Drawer, Typography } from "antd";
import { EyeOutlined } from "@ant-design/icons";

const { Search } = Input;
const { Title, Text } = Typography;

// ---------------- MOCK DATA ----------------
const activeChecklistsMock = [
  {
    id: "LN2001",
    customerName: "Samuel Kariuki",
    loanType: "Mortgage",
    totalDocs: 5,
    checklist: [
      { name: "Employment Letter", status: "Pending RM" },
      { name: "Bank Statement", status: "Pending RM" },
      { name: "Property Deed", status: "Pending RM" },
      { name: "ID Copy", status: "Pending RM" },
      { name: "Address Proof", status: "Pending RM" },
    ],
    rm: "Anne W.",
    createdOn: "2025-11-20",
  },
  {
    id: "LN2002",
    customerName: "Jane Wanjiru",
    loanType: "SME Loan",
    totalDocs: 4,
    checklist: [
      { name: "CR12", status: "Pending RM" },
      { name: "KRA Pin", status: "Pending RM" },
      { name: "Bank Statement", status: "Pending RM" },
      { name: "Invoices", status: "Pending RM" },
    ],
    rm: "Peter K.",
    createdOn: "2025-11-21",
  },
  {
    id: "LN2003",
    customerName: "David Mwangi",
    loanType: "Car Loan",
    totalDocs: 3,
    checklist: [
      { name: "Driver's License", status: "Pending RM" },
      { name: "Insurance Certificate", status: "Pending RM" },
      { name: "Loan Agreement", status: "Pending RM" },
    ],
    rm: "Grace N.",
    createdOn: "2025-11-22",
  },
  {
    id: "LN2004",
    customerName: "Catherine Otieno",
    loanType: "Personal Loan",
    totalDocs: 4,
    checklist: [
      { name: "Passport", status: "Pending RM" },
      { name: "Salary Slip", status: "Pending RM" },
      { name: "Bank Statement", status: "Pending RM" },
      { name: "Utility Bill", status: "Pending RM" },
    ],
    rm: "David K.",
    createdOn: "2025-11-23",
  },
  {
    id: "LN2005",
    customerName: "Brian Njoroge",
    loanType: "Business Loan",
    totalDocs: 5,
    checklist: [
      { name: "Business Registration", status: "Pending RM" },
      { name: "CR12", status: "Pending RM" },
      { name: "KRA Pin", status: "Pending RM" },
      { name: "Bank Statement", status: "Pending RM" },
      { name: "Invoices", status: "Pending RM" },
    ],
    rm: "Anne W.",
    createdOn: "2025-11-24",
  },
];

const Active = () => {
  const [search, setSearch] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedChecklist, setSelectedChecklist] = useState(null);

  // ---------------- FILTER LOGIC ----------------
  const filtered = useMemo(() => {
    const s = search.toLowerCase();
    return activeChecklistsMock.filter(
      (item) =>
        item.customerName.toLowerCase().includes(s) ||
        item.id.toLowerCase().includes(s)
    );
  }, [search]);

  // ---------------- TABLE COLUMNS ----------------
  const columns = [
    {
      title: "Loan No.",
      dataIndex: "id",
      width: 120,
    },
    {
      title: "Customer",
      dataIndex: "customerName",
      width: 150,
    },
    {
      title: "Loan Type",
      dataIndex: "loanType",
      width: 130,
      render: (t) => <Tag color="purple">{t}</Tag>,
    },
    {
      title: "Documents Pending RM",
      width: 160,
      render: (_, row) => (
        <Tag color="orange">
          {row.checklist.filter((d) => d.status === "Pending RM").length} /{" "}
          {row.totalDocs || row.checklist.length}
        </Tag>
      ),
    },
    {
      title: "RM",
      dataIndex: "rm",
      width: 120,
    },
    {
      title: "Created On",
      dataIndex: "createdOn",
      width: 130,
    },
    {
      title: "Action",
      width: 110,
      render: (_, row) => (
        <Button
          size="small"
          icon={<EyeOutlined />}
          onClick={() => {
            setSelectedChecklist(row);
            setOpenDrawer(true);
          }}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div className="bg-white p-5 rounded-lg shadow">
      <Title level={4}>Active Checklists (Awaiting RM Action)</Title>

      <Space style={{ marginBottom: 12 }}>
        <Search
          placeholder="Search by Loan / Customer"
          allowClear
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 250 }}
        />
      </Space>

      <Table
        size="small"
        columns={columns}
        dataSource={filtered}
        rowKey="id"
        pagination={{ pageSize: 6 }}
      />

      {/* ---------------- DRAWER WITH CHECKLIST DETAILS ---------------- */}
      <Drawer
        open={openDrawer}
        width={420}
        onClose={() => setOpenDrawer(false)}
        title={`Checklist – ${selectedChecklist?.customerName}`}
      >
        {selectedChecklist && (
          <>
            <Text strong>Loan Number:</Text> {selectedChecklist.id}
            <br />
            <Text strong>Loan Type:</Text> {selectedChecklist.loanType}
            <br />
            <Text strong>Created On:</Text> {selectedChecklist.createdOn}
            <br />
            <Text strong>RM:</Text> {selectedChecklist.rm}

            <Title level={5} style={{ marginTop: 15 }}>
              Documents Pending RM Action
            </Title>

            {selectedChecklist.checklist.map((doc) => (
              <div
                key={doc.name}
                className="flex justify-between py-1 border-b text-sm"
              >
                <span>{doc.name}</span>
                <Tag color={doc.status === "Pending RM" ? "orange" : "gray"}>
                  {doc.status}
                </Tag>
              </div>
            ))}
          </>
        )}
      </Drawer>
    </div>
  );
};

export default Active;
