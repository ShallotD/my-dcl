// src/pages/CreateDCL.jsx
import React, { useState, useMemo } from "react";
import { Table, Button, Select, Input, Tooltip, Space } from "antd";

const { Option } = Select;
const { Search } = Input;

const loanTypes = [
  "Buy And Build DCL",
  "Construction Loan DCL",
  "Mortgage Loan DCL",
  "Secured Loan DCL",
  "Stock Loan DCL",
];

const loanTypeDocuments = {
  "Buy And Build DCL": [
    {
      title: "CONTRACT DOCUMENTS",
      documents: [
        "Duly executed Offer Letter dated 06th January 2021",
        "Duly executed Affidavit of Title",
      ],
    },
    {
      title: "KYC DOCUMENTS",
      documents: ["Copy of the Borrower's PIN & ID/Passport of the Borrower"],
    },
    {
      title: "MORTGAGE FACILITY- SECURITY DOCUMENTS",
      documents: [
        "Original title over the above property",
        "Pre construction Valuation report",
        "Full Salary to be channelled through the NCBA account for the duration of the facility",
        "Environmental Impact Assessment License issued by NEMA",
        "Bills of Quantities",
        "QS proof of registration with BORAQs",
        "Architect proof of registration with BORAQs",
        "Contractor proof of registration with NCA",
        "NCA project approvals/submission proof",
        "NCA Compliance certificate",
        "Construction plan and drawings",
        "Duly executed contractor contract",
        "All risk insurance policy during construction",
        "Contractor performance bond",
        "Disbursements tied to project progress",
        "Moratorium on principal during construction",
        "Bank right of representation on project team",
        "Property insurance noting NCBA as first loss payee",
        "Final valuation report",
        "Acceptable performance bond of 10%",
        "Duly executed sale agreement",
        "Borrower contribution injected first",
        "Copy of Mortgagor's Marriage Certificate",
        "Certified copy of spouse's PIN & ID",
        "Independent legal advice letter",
        "Advocate confirmation of spouse legal advice",
        "Spousal consent",
        "Domestic Package Insurance Cover",
        "Mortgage Protection Insurance",
        "TCC",
      ],
    },
  ],
  // ... other loan types same as your original data
};

const CreateDCL = () => {
  const [selectedLoanType, setSelectedLoanType] = useState("");
  const [checklist, setChecklist] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newDocName, setNewDocName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Initialize checklist when loan type changes
  const handleLoanTypeChange = (value) => {
    setSelectedLoanType(value);
    if (!value) {
      setChecklist([]);
      return;
    }
    const cats = loanTypeDocuments[value] || [];
    setChecklist(
      cats.map((cat) => ({
        title: cat.title,
        availableDocuments: cat.documents,
        selectedDocuments: [],
      }))
    );
  };

  // Select a document from available documents
  const handleSelectDocument = (catIdx, docName) => {
    const updated = [...checklist];
    if (
      updated[catIdx].selectedDocuments.find((d) => d.name === docName) ||
      !docName
    )
      return;
    updated[catIdx].selectedDocuments.push({
      name: docName,
      status: "",
      action: "",
      comment: "",
      file: null,
    });
    updated[catIdx].availableDocuments = updated[catIdx].availableDocuments.filter(
      (d) => d !== docName
    );
    setChecklist(updated);
  };

  // Handle action change for a selected document
  const handleActionChange = (catIdx, docIdx, action) => {
    const updated = [...checklist];
    updated[catIdx].selectedDocuments[docIdx].action = action;
    updated[catIdx].selectedDocuments[docIdx].status =
      action === "Approve" ? "Submitted" : action === "Reject" ? "Pending" : "";
    setChecklist(updated);
  };

  // Handle comment change
  const handleCommentChange = (catIdx, docIdx, comment) => {
    const updated = [...checklist];
    updated[catIdx].selectedDocuments[docIdx].comment = comment;
    setChecklist(updated);
  };

  // Remove a selected document
  const handleRemoveDocument = (catIdx, docIdx) => {
    const updated = [...checklist];
    const removedDoc = updated[catIdx].selectedDocuments[docIdx].name;
    updated[catIdx].selectedDocuments.splice(docIdx, 1);
    updated[catIdx].availableDocuments.push(removedDoc);
    setChecklist(updated);
  };

  // Add a new document to available documents in category
  const handleAddNewDocument = () => {
    if (!newDocName.trim() || selectedCategory === null) return;
    const updated = [...checklist];
    if (
      updated[selectedCategory].availableDocuments.includes(newDocName.trim()) ||
      updated[selectedCategory].selectedDocuments.find(
        (d) => d.name === newDocName.trim()
      )
    ) {
      alert("Document already exists in this category.");
      return;
    }
    updated[selectedCategory].availableDocuments.push(newDocName.trim());
    setChecklist(updated);
    setNewDocName("");
  };

  // Submit checklist after validation
  const handleSubmit = () => {
    setSubmitting(true);

    // Check if all selected documents have an action/status
    const incomplete = checklist.some((cat) =>
      cat.selectedDocuments.some((doc) => !doc.status)
    );

    if (incomplete) {
      alert("Please approve or reject all selected documents before submitting.");
      setSubmitting(false);
      return;
    }

    console.log("Submitting checklist:", checklist);

    setTimeout(() => {
      alert("Checklist submitted successfully!");
      setSubmitting(false);
    }, 1200);
  };

  // Flatten checklist for AntD Table with category info
  const tableData = [];
  checklist.forEach((cat, catIdx) => {
    // Category row (non-selectable)
    tableData.push({
      key: `cat-${catIdx}`,
      category: cat.title,
      isCategory: true,
      catIdx,
    });

    // Selected documents rows
    cat.selectedDocuments.forEach((doc, docIdx) => {
      tableData.push({
        key: `doc-${catIdx}-${docIdx}`,
        category: "",
        docName: doc.name,
        status: doc.status || "—",
        action: doc.action || "",
        comment: doc.comment || "",
        catIdx,
        docIdx,
      });
    });
  });

  // Columns for AntD Table
  const columns = [
    {
      title: "Category",
      dataIndex: "category",
      render: (text, record) =>
        record.isCategory ? (
          <strong style={{ color: "#1890ff" }}>{text}</strong>
        ) : (
          ""
        ),
    },
    {
      title: "Document",
      dataIndex: "docName",
      render: (text, record) => (!record.isCategory ? text : ""),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) =>
        !record.isCategory ? (
          <span
            style={{
              color:
                text === "Submitted"
                  ? "green"
                  : text === "Pending"
                  ? "orange"
                  : "gray",
              fontWeight: 600,
            }}
          >
            {text}
          </span>
        ) : (
          ""
        ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) =>
        !record.isCategory ? (
          <Select
            value={text}
            onChange={(val) => handleActionChange(record.catIdx, record.docIdx, val)}
            placeholder="Select action"
            style={{ width: 120 }}
            allowClear
          >
            <Option value="Approve">Approve</Option>
            <Option value="Reject">Reject</Option>
          </Select>
        ) : (
          ""
        ),
    },
    {
      title: "Comment",
      dataIndex: "comment",
      render: (text, record) =>
        !record.isCategory ? (
          <Input.TextArea
            value={text}
            onChange={(e) =>
              handleCommentChange(record.catIdx, record.docIdx, e.target.value)
            }
            rows={1}
            placeholder="Add comment"
          />
        ) : (
          ""
        ),
    },
    {
      title: "Remove",
      render: (_, record) =>
        !record.isCategory ? (
          <Button
            danger
            onClick={() => handleRemoveDocument(record.catIdx, record.docIdx)}
          >
            Remove
          </Button>
        ) : (
          ""
        ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Create Document Checklist</h1>

      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* Loan Type Selector */}
        <Select
          placeholder="Select Loan Type"
          value={selectedLoanType || undefined}
          onChange={handleLoanTypeChange}
          style={{ maxWidth: 350 }}
          allowClear
        >
          {loanTypes.map((lt) => (
            <Option key={lt} value={lt}>
              {lt}
            </Option>
          ))}
        </Select>

        {/* Add New Document Input & Select Category */}
        {selectedLoanType && (
          <Space>
            <Select
              placeholder="Select Category"
              value={selectedCategory}
              onChange={setSelectedCategory}
              style={{ minWidth: 250 }}
            >
              {checklist.map((cat, i) => (
                <Option key={i} value={i}>
                  {cat.title}
                </Option>
              ))}
            </Select>

            <Input
              placeholder="New document name"
              value={newDocName}
              onChange={(e) => setNewDocName(e.target.value)}
              style={{ width: 300 }}
              onPressEnter={handleAddNewDocument}
            />

            <Button type="primary" onClick={handleAddNewDocument} disabled={!newDocName.trim() || selectedCategory === null}>
              Add Document
            </Button>
          </Space>
        )}

        {/* Checklist Table */}
        {selectedLoanType && (
          <Table
            columns={columns}
            dataSource={tableData}
            pagination={false}
            rowClassName={(record) =>
              record.isCategory ? "ant-table-row-level-0 category-row" : ""
            }
            expandable={{
              expandedRowRender: (record) => {
                if (!record.isCategory) return null;
                const cat = checklist[record.catIdx];
                return (
                  <div>
                    <b>Available Documents:</b>
                    <ul>
                      {cat.availableDocuments.length > 0 ? (
                        cat.availableDocuments.map((doc, i) => (
                          <li key={i}>
                            {doc}{" "}
                            <Button
                              size="small"
                              type="link"
                              onClick={() => handleSelectDocument(record.catIdx, doc)}
                            >
                              Add
                            </Button>
                          </li>
                        ))
                      ) : (
                        <i>No available documents</i>
                      )}
                    </ul>
                  </div>
                );
              },
              rowExpandable: (record) => record.isCategory,
              expandIconColumnIndex: 1,
            }}
          />
        )}

        {/* Submit Button */}
        {selectedLoanType && (
          <div className="text-center">
            <Button
              type="primary"
              size="large"
              onClick={handleSubmit}
              loading={submitting}
            >
              Submit Checklist
            </Button>
          </div>
        )}
      </Space>

      <style jsx>{`
        .category-row {
          background-color: #e6f7ff !important;
          font-weight: 700;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default CreateDCL;
