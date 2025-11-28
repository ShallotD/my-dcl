// src/pages/CreatorReview.jsx
import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Table,
  Button,
  Tag,
  Space,
  message,
  Modal,
  Input,
  Typography,
  Divider,
} from "antd";

const { Text, Title } = Typography;

const STATUS_COLOR = {
  Approved: "green",
  Rejected: "red",
  Deferred: "orange",
  Returned: "blue",
  Pending: "gold",
  Submitted: "cyan",
};

const CreatorReview = () => {
  const { checklistId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const checklist = location.state?.checklist || null;
  const [documents, setDocuments] = useState(checklist?.documents || []);
  const [rejectModal, setRejectModal] = useState({
    visible: false,
    docName: "",
    reason: "",
  });

  if (!checklist) {
    return (
      <div style={{ padding: 24 }}>
        <Text type="danger" strong>
          Checklist not found — invalid ID ({checklistId})
        </Text>
        <br />
        <Button style={{ marginTop: 16 }} onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </div>
    );
  }

  const updateDocumentStatus = (docName, status, reason = "") => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.name === docName ? { ...doc, status, reason } : doc
      )
    );
  };

  const handleApprove = (docName) => {
    updateDocumentStatus(docName, "Approved");
    message.success(`${docName} approved`);
  };

  const handleReject = (docName) => {
    setRejectModal({ visible: true, docName, reason: "" });
  };

  const confirmReject = () => {
    const { docName, reason } = rejectModal;
    if (!reason) {
      message.error("Please provide a reason for rejection");
      return;
    }
    updateDocumentStatus(docName, "Rejected", reason);
    message.warning(`${docName} rejected`);
    setRejectModal({ visible: false, docName: "", reason: "" });
  };

  const handleReturnToRM = () => {
    setDocuments((prev) =>
      prev.map((d) => (d.status !== "Approved" ? { ...d, status: "Returned" } : d))
    );
    message.warning("Checklist returned to RM for correction.");
    navigate("/myqueue");
  };

  const handleForwardToChecker = () => {
    const pending = documents.filter((d) => d.status !== "Approved");
    if (pending.length > 0) {
      message.error("Cannot forward — all documents must be approved.");
      return;
    }
    message.success("Checklist forwarded to Checker.");
    navigate("/myqueue");
  };

  // Table columns definition
  const columns = [
    {
      title: "Document",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <>
          <Text strong>{text}</Text>
          {record.reason && (
            <Text type="danger" style={{ display: "block", marginTop: 4 }}>
              Reason: {record.reason}
            </Text>
          )}
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={STATUS_COLOR[status] || "default"} style={{ fontWeight: "bold" }}>
          {status}
        </Tag>
      ),
    },
    {
      title: "View Document",
      dataIndex: "url",
      key: "url",
      render: (url) =>
        url ? (
          <Button type="link" href={url} target="_blank" rel="noreferrer">
            View
          </Button>
        ) : (
          <Text type="secondary">N/A</Text>
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) =>
        record.status === "Submitted" || record.status === "Deferred" ? (
          <Space>
            <Button type="primary" onClick={() => handleApprove(record.name)}>
              Approve
            </Button>
            <Button danger onClick={() => handleReject(record.name)}>
              Reject
            </Button>
          </Space>
        ) : (
          <Text>Reviewed</Text>
        ),
    },
  ];

  // Row selection config (checkboxes)
  const rowSelection = {
    selectedRowKeys: [],
    // Optional: add onChange if you want to track selections
  };

  return (
    <div style={{ padding: 24, maxWidth: 1000, margin: "auto" }}>
      <Button onClick={() => navigate(-1)} style={{ marginBottom: 24 }}>
        Back
      </Button>

      <Title level={3}>Review Checklist</Title>
      <Text strong style={{ fontSize: 18 }}>
        {checklist.applicantName}
      </Text>
      <br />
      <Text type="secondary" style={{ fontSize: 16 }}>
        {checklist.loanType}
      </Text>

      <Divider />

      <Table
        dataSource={documents}
        columns={columns}
        rowKey="name"
        pagination={false}
        rowSelection={rowSelection}
      />

      <Divider />

      <Space size="large">
        <Button danger onClick={handleReturnToRM}>
          Return to RM
        </Button>
        <Button type="primary" onClick={handleForwardToChecker}>
          Forward to Checker
        </Button>
      </Space>

      <Modal
        title={`Reject ${rejectModal.docName}`}
        open={rejectModal.visible}
        onOk={confirmReject}
        onCancel={() => setRejectModal({ visible: false, docName: "", reason: "" })}
        okText="Reject"
        cancelText="Cancel"
      >
        <Input.TextArea
          rows={4}
          placeholder="Enter rejection reason"
          value={rejectModal.reason}
          onChange={(e) =>
            setRejectModal((prev) => ({ ...prev, reason: e.target.value }))
          }
        />
      </Modal>
    </div>
  );
};

export default CreatorReview;
