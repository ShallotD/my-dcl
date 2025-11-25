// src/pages/CreatorReview.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Tag, Space, message, Modal, Input } from "antd";

// 🔵 MOCK DATA — replace with API later
const CHECKLIST_DATA = {
  "1": {
    applicantName: "Alice Johnson",
    loanType: "Home Loan",
    documents: [
      { name: "Employment Letter", status: "Submitted", url: "/docs/employment-letter.pdf" },
      { name: "Bank Statement", status: "Deferred", url: "/docs/bank-statement.pdf" },
    ],
  },
  "2": {
    applicantName: "Bob Smith",
    loanType: "Car Loan",
    documents: [
      { name: "Driver’s License", status: "Submitted", url: "/docs/drivers-license.pdf" },
      { name: "Income Certificate", status: "Submitted", url: "/docs/income-certificate.pdf" },
    ],
  },
  "3": {
    applicantName: "Catherine Mwangi",
    loanType: "Personal Loan",
    documents: [
      { name: "Passport", status: "Submitted", url: "/docs/passport.pdf" },
      { name: "Salary Slip", status: "Submitted", url: "/docs/salary-slip.pdf" },
    ],
  },
  "4": {
    applicantName: "Daniel Kimani",
    loanType: "Business Loan",
    documents: [
      { name: "Business Registration", status: "Pending", url: "/docs/business-reg.pdf" },
      { name: "Bank Statement", status: "Deferred", url: "/docs/bank-statement.pdf" },
    ],
  },
  "5": {
    applicantName: "Eva Njoroge",
    loanType: "Mortgage",
    documents: [
      { name: "Property Deed", status: "Submitted", url: "/docs/property-deed.pdf" },
      { name: "ID Proof", status: "Submitted", url: "/docs/id-eva.pdf" },
    ],
  },
};

const CreatorReview = () => {
  const { checklistId } = useParams(); // Use correct param
  const navigate = useNavigate();

  const checklist = CHECKLIST_DATA[checklistId];

  const [documents, setDocuments] = useState(checklist?.documents || []);
  const [rejectModal, setRejectModal] = useState({
    visible: false,
    docName: "",
    reason: "",
  });

  if (!checklist) {
    return (
      <p className="p-6 text-red-600">
        Checklist not found — invalid ID ({checklistId})
      </p>
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
    const updatedDocs = documents.map((d) =>
      d.status !== "Approved" ? { ...d, status: "Returned" } : d
    );
    setDocuments(updatedDocs);
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

  return (
    <div className="p-6">
      <Button onClick={() => navigate(-1)} style={{ marginBottom: 20 }}>
        Back
      </Button>

      <h1 className="text-2xl font-bold mb-2">Review Checklist</h1>
      <p className="text-lg text-gray-700 mb-4">
        {checklist.applicantName} — {checklist.loanType}
      </p>

      <div className="space-y-4">
        {documents.map((doc) => (
          <div
            key={doc.name}
            className="p-4 rounded bg-gray-100 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{doc.name}</p>

              <Tag
                color={
                  doc.status === "Approved"
                    ? "green"
                    : doc.status === "Rejected"
                    ? "red"
                    : doc.status === "Deferred"
                    ? "orange"
                    : doc.status === "Returned"
                    ? "blue"
                    : "gray"
                }
              >
                {doc.status}
              </Tag>

              {doc.reason && (
                <p className="text-sm text-red-600">Reason: {doc.reason}</p>
              )}
            </div>

            <Space>
              <a href={doc.url} target="_blank" rel="noreferrer">
                <Button>View</Button>
              </a>

              {doc.status === "Submitted" || doc.status === "Deferred" ? (
                <>
                  <Button type="primary" onClick={() => handleApprove(doc.name)}>
                    Approve
                  </Button>
                  <Button danger onClick={() => handleReject(doc.name)}>
                    Reject
                  </Button>
                </>
              ) : (
                <span>Reviewed</span>
              )}
            </Space>
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-4">
        <Button danger onClick={handleReturnToRM}>
          Return to RM
        </Button>
        <Button type="primary" onClick={handleForwardToChecker}>
          Forward to Checker
        </Button>
      </div>

      <Modal
        title={`Reject ${rejectModal.docName}`}
        open={rejectModal.visible}
        onOk={confirmReject}
        onCancel={() => setRejectModal({ visible: false, docName: "", reason: "" })}
      >
        <Input.TextArea
          rows={4}
          placeholder="Enter rejection reason"
          value={rejectModal.reason}
          onChange={(e) =>
            setRejectModal({ ...rejectModal, reason: e.target.value })
          }
        />
      </Modal>
    </div>
  );
};

export default CreatorReview;
