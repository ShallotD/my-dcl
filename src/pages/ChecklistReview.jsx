import React, { useState } from "react";
import { Table, Button, Upload, message, Modal, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const ChecklistReview = () => {
  const navigate = useNavigate();

  const saved = JSON.parse(localStorage.getItem("savedChecklist"));
  const [checklist, setChecklist] = useState(saved?.checklist || []);
  const [deferralModal, setDeferralModal] = useState({
    open: false,
    catIdx: null,
    docIdx: null,
  });
  const [deferralComment, setDeferralComment] = useState("");

  if (!saved) {
    return (
      <div className="p-6">
        <h2>No checklist found.</h2>
        <Button type="primary" onClick={() => navigate("/")}>
          Back
        </Button>
      </div>
    );
  }

  const {
    loanType,
    createdBy,
    customerNumber,
    customerName,
    rmName,
    dclNumber,
  } = saved;

  // File Upload
  const handleFileUpload = (catIdx, docIdx, file) => {
    const updated = [...checklist];
    updated[catIdx].selectedDocuments[docIdx].file = file;
    setChecklist(updated);
    message.success("File uploaded");
  };

  // Deferral modal open
  const openDeferralModal = (catIdx, docIdx) => {
    setDeferralModal({ open: true, catIdx, docIdx });
    setDeferralComment("");
  };

  // Deferral submit
  const submitDeferral = () => {
    if (!deferralComment.trim()) {
      message.error("Please add a deferral comment.");
      return;
    }

    const updated = [...checklist];
    const { catIdx, docIdx } = deferralModal;

    updated[catIdx].selectedDocuments[docIdx].deferralRequested = true;
    updated[catIdx].selectedDocuments[docIdx].deferralComment = deferralComment;
    updated[catIdx].selectedDocuments[docIdx].status = "Deferred";
    updated[catIdx].selectedDocuments[docIdx].action = "Deferral";

    setChecklist(updated);
    setDeferralModal({ open: false, catIdx: null, docIdx: null });
    setDeferralComment("");

    message.success("Deferral requested");
  };

  // STATUS COLOR FUNCTION
  const statusColor = (status) =>
    status === "Submitted"
      ? "green"
      : status === "Pending"
      ? "red"
      : status === "TBO"
      ? "brown"
      : status === "Sighted"
      ? "orange"
      : status === "Waived"
      ? "gray"
      : status === "Deferred"
      ? "brown"
      : "gray";

  // Build table data
  const tableData = [];
  checklist.forEach((cat, catIdx) => {
    tableData.push({
      key: `cat-${catIdx}`,
      isCategory: true,
      category: cat.title,
    });

    cat.selectedDocuments.forEach((doc, docIdx) => {
      tableData.push({
        key: `doc-${catIdx}-${docIdx}`,
        category: "",
        docName: doc.name,
        status: doc.status || "",
        comment: doc.comment || "",
        file: doc.file,
        deferralRequested: doc.deferralRequested,
        deferralComment: doc.deferralComment,
        catIdx,
        docIdx,
      });
    });
  });

  // Table Columns
  const columns = [
    {
      title: "Document",
      dataIndex: "docName",
      render: (text, record) =>
        !record.isCategory ? (
          text
        ) : (
          <b style={{ fontSize: "15px" }}>{record.category}</b>
        ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) =>
        !record.isCategory ? (
          <span style={{ color: statusColor(text), fontWeight: 600 }}>
            {text || "—"}
          </span>
        ) : (
          ""
        ),
    },
    {
      title: "Comment",
      dataIndex: "comment",
      render: (text, record) => (!record.isCategory ? text : ""),
    },
    {
      title: "Upload",
      render: (_, record) =>
        !record.isCategory ? (
          <Upload
            beforeUpload={(file) => {
              handleFileUpload(record.catIdx, record.docIdx, file);
              return false;
            }}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        ) : (
          ""
        ),
    },
    {
      title: "Request Deferral",
      render: (_, record) =>
        !record.isCategory ? (
          <Button
            type={record.deferralRequested ? "default" : "primary"}
            disabled={record.deferralRequested}
            onClick={() => openDeferralModal(record.catIdx, record.docIdx)}
          >
            {record.deferralRequested ? "Requested" : "Request"}
          </Button>
        ) : (
          ""
        ),
    },
  ];

  const handleFinalSubmit = () => {
    // Prevent submit if any document has no action/status
    const incomplete = checklist.some((cat) =>
      cat.selectedDocuments.some((doc) => !doc.status || doc.status === "")
    );

    if (incomplete) {
      message.error(
        "Cannot submit checklist. All selected documents must have an action/status."
      );
      return;
    }

    message.success("Checklist submitted successfully!");
    localStorage.removeItem("savedChecklist");
    navigate("/");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Review Document Checklist</h1>

      <h2 className="text-lg font-semibold mb-4">
        Loan Type: <span className="text-blue-600">{loanType}</span>
      </h2>

      {/* User info display */}
      <div className="mb-6">
        <p>
          <strong>Created By:</strong> {createdBy}
        </p>
        <p>
          <strong>Customer Number:</strong> {customerNumber}
        </p>
        <p>
          <strong>Customer Name:</strong> {customerName}
        </p>
        <p>
          <strong>RM Name:</strong> {rmName}
        </p>
        <p>
          <strong>DCL Number:</strong> {dclNumber}
        </p>
      </div>

      <Table columns={columns} dataSource={tableData} pagination={false} bordered />

      <div className="text-center mt-8">
        <Button onClick={() => navigate("/")} size="large">
          Edit Checklist
        </Button>
        <Button
          type="primary"
          size="large"
          className="ml-4"
          onClick={handleFinalSubmit}
        >
          Submit to RM
        </Button>
      </div>

      {/* DEFERRAL MODAL */}
      <Modal
        title="Request Deferral"
        open={deferralModal.open}
        onCancel={() => setDeferralModal({ open: false })}
        footer={[
          <Button
            key="cancel"
            onClick={() => setDeferralModal({ open: false })}
          >
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={submitDeferral}>
            Submit
          </Button>,
        ]}
      >
        <p>Please enter a reason for requesting the deferral:</p>
        <Input.TextArea
          rows={3}
          value={deferralComment}
          onChange={(e) => setDeferralComment(e.target.value)}
          placeholder="Enter comment here..."
        />
      </Modal>
    </div>
  );
};

export default ChecklistReview;



