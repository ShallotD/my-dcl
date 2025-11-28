import React, { useState } from "react";
import { Table, Button, Upload, message, Modal, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const ChecklistReview = () => {
  const navigate = useNavigate();

  const saved = JSON.parse(localStorage.getItem("savedChecklist"));
  const [checklist, setChecklist] = useState(saved?.checklist || []);
  const [deferralModal, setDeferralModal] = useState({ open: false, catIdx: null, docIdx: null });
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

  const { loanType } = saved;

  // File Upload
  const handleFileUpload = (catIdx, docIdx, file) => {
    const updated = [...checklist];
    updated[catIdx].selectedDocuments[docIdx].file = file;

    setChecklist(updated);
    message.success("File uploaded");
  };

  // Open deferral modal
  const openDeferralModal = (catIdx, docIdx) => {
    setDeferralModal({ open: true, catIdx, docIdx });
    setDeferralComment("");
  };

  // Save deferral with comment
  const submitDeferral = () => {
    if (!deferralComment.trim()) {
      message.error("Please add a deferral comment.");
      return;
    }

    const updated = [...checklist];
    const { catIdx, docIdx } = deferralModal;

    updated[catIdx].selectedDocuments[docIdx].deferralRequested = true;
    updated[catIdx].selectedDocuments[docIdx].deferralComment = deferralComment;

    setChecklist(updated);

    setDeferralModal({ open: false, catIdx: null, docIdx: null });
    setDeferralComment("");

    message.success("Deferral requested");
  };

  // Build Table
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

        // Convert Approve/Reject to Submitted/Pending
        action: doc.action === "Approve" ? "Submitted" : "Pending",

        comment: doc.comment,
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
        !record.isCategory ? text : <b style={{ fontSize: "15px" }}>{record.category}</b>,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) =>
        !record.isCategory ? (
          <span
            style={{
              color: text === "Submitted" ? "green" : "red",
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

      <Table columns={columns} dataSource={tableData} pagination={false} bordered />

      <div className="text-center mt-8">
        <Button onClick={() => navigate("/")} size="large">
          Edit Checklist
        </Button>

        <Button type="primary" size="large" className="ml-4" onClick={handleFinalSubmit}>
          Submit to RM
        </Button>
      </div>

      {/* DEFERRAL MODAL */}
      <Modal
        title="Request Deferral"
        open={deferralModal.open}
        onCancel={() => setDeferralModal({ open: false })}
        footer={[
          <Button key="cancel" onClick={() => setDeferralModal({ open: false })}>
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