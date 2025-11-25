// src/pages/Active.jsx
import React, { useState, useMemo } from "react";
import {
  Table,
  Tag,
  Button,
  Input,
  Select,
  Space,
  Tooltip,
  Progress,
  Dropdown,
} from "antd";
import { MoreOutlined } from "@ant-design/icons";
import ChecklistSubmitRM from "../components/ChecklistSubmitRM";

const { Search } = Input;

// ---------- MOCKED DATA ----------
const MOCK_CHECKLISTS = [
  {
    _id: "1",
    applicantName: "Alice Johnson",
    loanType: "Home Loan",
    createdAt: new Date().toISOString(),
    rmId: { _id: "rm1", firstName: "John", lastName: "Mwangi" },
    categories: [
      {
        documents: [
          { name: "ID Proof", status: "Submitted" },
          { name: "Address Proof", status: "Deferred" },
        ],
      },
    ],
  },
  {
    _id: "2",
    applicantName: "Bob Smith",
    loanType: "Car Loan",
    createdAt: new Date().toISOString(),
    rmId: { _id: "rm2", firstName: "Sarah", lastName: "Kamau" },
    categories: [
      {
        documents: [
          { name: "ID Proof", status: "Pending" },
          { name: "Income Proof", status: "Submitted" },
        ],
      },
    ],
  },
  {
    _id: "3",
    applicantName: "Charlie Davis",
    loanType: "Personal Loan",
    createdAt: new Date().toISOString(),
    rmId: null,
    categories: [
      {
        documents: [{ name: "ID Proof", status: "Not Actioned" }],
      },
    ],
  },
];

const Active = () => {
  const [page, setPage] = useState(1);
  const [rmFilter, setRmFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [drawerChecklist, setDrawerChecklist] = useState(null);

  const checklists = MOCK_CHECKLISTS;

  // FILTER + SEARCH
  const filteredData = useMemo(() => {
    return checklists
      .filter((item) =>
        searchText
          ? item.applicantName.toLowerCase().includes(searchText.toLowerCase())
          : true
      )
      .filter((item) => (rmFilter ? item.rmId?._id === rmFilter : true))
      .filter((item) => {
        if (!statusFilter) return true;
        const docs = item?.categories?.[0]?.documents || [];
        return docs.some((d) => d.status === statusFilter);
      });
  }, [checklists, rmFilter, statusFilter, searchText]);

  const rmOptions = Array.from(
    new Map(
      checklists
        .filter((i) => i.rmId)
        .map((i) => [
          i.rmId._id,
          {
            label: `${i.rmId.firstName} ${i.rmId.lastName}`,
            value: i.rmId._id,
          },
        ])
    ).values()
  );

  const columns = [
    {
      title: "Applicant",
      sorter: (a, b) => a.applicantName.localeCompare(b.applicantName),
      render: (_, row) => (
        <div style={{ fontWeight: 600 }}>
          {row.applicantName}
          <div style={{ fontSize: 12, color: "#8c8c8c" }}>
            RM: {row.rmId ? `${row.rmId.firstName} ${row.rmId.lastName}` : "Unknown RM"}
          </div>
        </div>
      ),
    },

    {
      title: "Loan Type",
      dataIndex: "loanType",
      sorter: (a, b) => a.loanType.localeCompare(b.loanType),
      render: (type) => (
        <Tag color="purple" style={{ fontWeight: 600 }}>
          {type}
        </Tag>
      ),
    },

    {
      title: "Progress",
      render: (_, row) => {
        const docs = row.categories?.[0]?.documents || [];
        const submitted = docs.filter((d) => d.status === "Submitted").length;
        const percent = docs.length
          ? Math.round((submitted / docs.length) * 100)
          : 0;

        return <Progress percent={percent} size="small" strokeColor="#1890ff" />;
      },
    },

    {
      title: "Deferred Docs",
      render: (_, row) => {
        const docs = row.categories?.[0]?.documents || [];
        const deferred = docs.filter((d) => d.status === "Deferred").length;

        return (
          <Tooltip title="Documents requested later">
            <Tag color="orange" style={{ fontWeight: 600 }}>
              {deferred}
            </Tag>
          </Tooltip>
        );
      },
    },

    {
      title: "Created",
      dataIndex: "createdAt",
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (d) => new Date(d).toLocaleString(),
    },

    {
      title: "Assign",
      render: () => (
        <Select
          placeholder="Assign RM"
          style={{ width: 170 }}
          options={[
            { label: "John Mwangi", value: "john" },
            { label: "Sarah Kamau", value: "sarah" },
          ]}
        />
      ),
    },

    {
      title: "Actions",
      render: (_, row) => (
        <Dropdown
          trigger={["click"]}
          menu={{
            items: [
              {
                key: "view",
                label: "View Checklist",
                onClick: () => setDrawerChecklist(row), // Open Drawer here
              },
              { key: "approve", label: "Approve" },
              { key: "reject", label: "Reject" },
              { key: "return", label: "Return to RM" },
            ],
          }}
        >
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const expandedRowRender = (row) => {
    const docs = row.categories?.[0]?.documents || [];

    return (
      <div style={{ padding: 16, background: "#f9f9fb", borderRadius: 8 }}>
        <strong style={{ display: "block", marginBottom: 8 }}>Documents</strong>

        {docs.map((d) => (
          <div
            key={d.name}
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid #f0f0f0",
              padding: "6px 0",
            }}
          >
            <span>{d.name}</span>

            <Tag
              color={
                d.status === "Submitted"
                  ? "green"
                  : d.status === "Pending"
                  ? "gold"
                  : "default"
              }
              style={{ fontWeight: 600 }}
            >
              {d.status}
            </Tag>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Active Checklists</h1>

      {/* Search + Filters */}
      <Space className="mb-4" wrap>
        <Search
          placeholder="Search applicant..."
          allowClear
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 200 }}
        />

        <Select
          placeholder="Filter by RM"
          style={{ width: 180 }}
          allowClear
          onChange={setRmFilter}
          options={rmOptions}
        />

        <Select
          placeholder="Filter by Status"
          allowClear
          style={{ width: 180 }}
          onChange={setStatusFilter}
          options={[
            { label: "Submitted", value: "Submitted" },
            { label: "Pending", value: "Pending" },
            { label: "Not Actioned", value: "Not Actioned" },
          ]}
        />
      </Space>

      {/* TABLE */}
      <Table
        columns={columns}
        rowKey="_id"
        expandable={{ expandedRowRender }}
        dataSource={filteredData}
        pagination={{
          current: page,
          pageSize: 6,
          onChange: setPage,
        }}
        bordered
        rowClassName={(record, index) =>
          index % 2 === 0 ? "bank-table-row-light" : "bank-table-row-dark"
        }
      />

      {/* Checklist Drawer */}
      <ChecklistSubmitRM checklist={drawerChecklist} onClose={() => setDrawerChecklist(null)} />

      <style jsx>{`
        .bank-table-row-light {
          background: #ffffff;
        }
        .bank-table-row-dark {
          background: #f5f5f7;
        }
        .ant-table-thead > tr > th {
          background: #f0f5ff !important;
          font-weight: 600;
          color: #001529;
        }
        .ant-table-tbody > tr:hover > td {
          background: #e6f7ff !important;
        }
      `}</style>
    </div>
  );
};

export default Active;
