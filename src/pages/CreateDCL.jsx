
import React, { useState } from "react";
import { Table, Button, Select, Input, Space, Modal } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

// Loan types
const loanTypes = [
  "Buy And Build DCL",
  "Construction Loan DCL",
  "Mortgage Loan DCL",
  "Secured Loan DCL",
  "Stock Loan DCL",
];

// Loan type documents and categories
// (YOUR ORIGINAL loanTypeDocuments OBJECT — no changes)
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
  "Construction Loan DCL": [
    {
      title: "CONTRACT DOCUMENTS REQUIRED",
      documents: [
        "Duly executed facility letter dated 28/08/2025",
        "Acknowledgement by guarantor form - Bosco Mumo Kyule",
        "Statement of assets and liabilities for the directors (Annexure I)",
        "Certificate of compliance (Annexure II)",
        "Board resolution of the borrower",
        "TCC",
      ],
    },
    {
      title: "KYC DOCUMENTS",
      documents: [
        "Certified copies of National IDs/Passports and PIN Certificate for the Borrower’s directors.",
        "Certified copies of the certificate of Incorporation, PIN Certificate, Memorandum and Articles of Association of the Borrower.",
      ],
    },
    {
      title: "SECURITY DOCUMENTS",
      documents: [
        "certificate of clean title",
        "post registration search",
        "legal fees",
        "green card search",
        "Directors’ Personal Guarantee and Indemnity",
        "Deed of Assignment of rent receivables over property",
        "Business Loan Protector insurance cover to be in place with the Bank’s interest noted.",
        "Comprehensive valuation report from a valuer in the Bank’s panel over the property being offered as security to the Bank",
        "Copy of Annual Returns for the Borrower filed at the Companies Registry for the last three years together with the filing receipt, failing which the Bank reserves the right to pay directly to the relevant authorities and or departments without reference to the Borrower and debit to the Borrower’s current account such charges, fees, levies etc. together with the incidental expenses if any, so as to ensure that the Bank’s interests stand adequately protected at all times.",
        "Copies of Land Rates and Rent banking vouchers, respective receipts and land clearance certificates in respect of the properties offered as security for the last three years.",
        "Borrower to set up a till/paybill linked to NCBA account immediately",
        "Valid/Current Tax Compliance Certificate to be provided by the Borrower",
        "Current CR12 to be provided by the Borrower",
      ],
    },
  ],
  "Mortgage Loan DCL": [
    {
      title: "CONTRACT DOCUMENTS REQUIRED",
      documents: [
        "Duly executed facility letter with the dates",
        "Acknowledgment by guarantor",
        "Statement of assets and liabilities for the directors (Annexure I)",
        "Certificate of compliance (Annexure II)",
        "Board resolution of the borrower",
        "Total cost of credit",
      ],
    },
    {
      title: "KYC DOCUMENTS",
      documents: [
        "Certified copies of National IDs/Passports and PIN Certificate for the Borrower’s directors.",
        "Certified copies of the certificate of Incorporation, PIN Certificate, Memorandum and Articles of Association of the Borrower. (CR1, CR2, CR8)",
        "Borrower to provide relevant licenses and permits.",
      ],
    },
    {
      title: "SECURITY CONDITIONS",
      documents: [
        "Certificate of registration of mortgage",
        "From CR25",
        "Post registration search at companies (CR12)",
        "Legal fees",
        "post registration search",
        "Certificate of clean title",
        "Affidavit of title",
        "Deed of assignment of receivables",
        "Borrower to provide an updated CRB for the director with zero arrears before disbursement.",
      ],
    },
    {
      title: "MORTGAGE LOAN CONDITIONS",
      documents: [
        "Funds to be paid directly to the vendor’s account against a duly executed and accepted sale agreement.",
        "A duly executed and accepted sale agreement between the vendor and Borrower to be provided.",
        "Borrower to provide evidence of upfront contribution of 20% of the purchase price prior to issuance of legal undertaking to vendor/vendor’s lawyer.",
        "Evidence of borrower’s contribution to be provided prior to drawdown. payment to be upon transfer and legal charge completion",
        "Borrower to channel at least 80% of wallet through NCBA.",
        "All fees arising, commissions and charges in respect of the contractual arrangements entered with the bank will be borne by the borrower.",
        "Subject to normal bankers’ demand rights.",
      ],
    },
    {
      title: "FINANCIAL CONDITIONS",
      documents: [
        "Annual Audited accounts are to be submitted within 6 months after the end of the financial year.",
        "Quarterly management accounts plus aged list of debtors and creditors to be availed within 45 days of each quarter.",
        "Quarterly Finance covenant certificate from Managing Director, Chief Financial Officer etc.",
      ],
    },
    {
      title: "COMPLIANCE DOCUMENTS",
      documents: [
        "Borrower to provide current CR12.",
        "A current and valid tax compliance certificate to be provided.",
        "Copies of Land Rates and Rent banking vouchers, respective receipts and land clearance certificates in respect of the properties offered as security for the last three years.",
        "Copy of Annual Returns for the Borrower filed at the Companies Registry for the last three years together with the filing receipt, failing which the Bank reserves the right to pay directly to the relevant authorities and or departments without reference to the Borrower and debit to the Borrower’s current account such charges, fees, levies etc. together with the incidental expenses if any, so as to ensure that the Bank’s interests stand adequately protected at all times.",
        "Comprehensive insurance cover by an insurance company licensed by the Insurance Regulatory Authority over the assets under debenture and property offered as security to the Bank, with the bank’s interest noted on the policies as the first Loss payee. The sum insured to be for an amount not less than the insurance value of the security as advised in the professional valuation report. The Bank’s preferred insurance agent is NCBA Bancassurance Intermediary Limited.",
        "Business Loan Protector insurance cover to be in place with the bank’s interest noted.",
      ],
    },
  ],
  "Secured Loan DCL": [
    {
      title: "CONTRACT DOCUMENTS",
      documents: [
        "Duly executed Offer Letter dated 14.11.2022",
        "HR Memo",
        "TCC",
      ],
    },
    {
      title: "KYC DOCUMENTS",
      documents: ["Copy of the Borrower's PIN & ID/Passport of the Borrower"],
    },
    {
      title: "SECURITY DOCUMENTS",
      documents: [
        "Original title deed of the property to be lodged with NCBA bank",
        "Property to have a current valuation report over property",
        "Approved amount to be used to clear the education loan and the rest credited to the borrower's account",
        "Spousal consent to charge the property to be held before drawdown.",
        "Certificate from the advocate of borrower’s spouse(s) confirming having given independent legal advice – where applicable",
        "Service providers’ fees to be paid prior to disbursement.",
        "Letter of independent legal advice and waiver of borrower’s spouse(s) overriding interest and consent by the borrower’s spouse(s) in respect to charging of the property – where applicable",
        "Affidavit of Title",
      ],
    },
    {
      title: "COMPLIANCE DOCUMENTS",
      documents: [
        "Life Assurance Cover as per revised policy guidelines.",
        "Current land rent payment confirmation",
        "Current Land rates payment confirmation",
        "Post registration search",
        "Disbursement Details",
        "Certificate of clean title.",
      ],
    },
  ],
  "Stock Loan DCL": [
    {
      title: "CONTRACT DOCUMENTS",
      documents: [
        "Duly Executed Facility letter dated",
        "Acknowledgement by Guarantor",
        "Statement of assets and liabilities for the directors (Annexure I)",
        "Financial Ratios Compliance Page",
        "Accompanying Board Resolution-Borrower",
        "Total cost of credit",
      ],
    },
    {
      title: "KYC DOCUMENTS",
      documents: [
        "A copy of the Borrower’s Memorandum and Articles of Association certified as a true, complete and up-to-date copy by the company secretary, Certificate of Incorporation and PIN Certificate of the Borrower",
        "Certified copies of Identity card/Passport and PIN Certificate of the Borrower's directors",
      ],
    },
    {
      title: "FACILITIES SECURITY & DOCUMENTS",
      documents: [
        "Hire Purchase agreement, original logbook and Comprehensive Insurance Cover",
        "Credit Guarantee Scheme Endorsement Cover in the name of the borrower.",
        "Director’s Personal Guarantee and Indemnity",
        "Post registration search",
        "Certificate of clean title",
        "Legal fees",
        "Property owner’s guarantee",
        "Corporate guarantee supported by letter of commercial benefit",
      ],
    },
    {
      title: "STOCK LOAN CONDITION",
      documents: [
        "Payment to be done direct to suppliers.",
        "Bank to finance a maximum of 70% of the invoice amount.",
        "Borrower to evidence own contribution",
      ],
    },
    {
      title: "OTHER CONDITIONS",
      documents: [
        "Borrower to channel 100% share of wallet through NCBA.",
        "Security perfection before drawdown.",
        "The Borrower to ensure ALL rental income received from the property(ies) of the Security will be channelled to the Bank.",
        "If an Event of Default has occurred and is continuing, the Bank shall, at its sole discretion, appoint and engage the services of an Estate Agent to manage the property(ies) of the Security and the Borrower shall perform, comply with and observe all the covenants required to be performed under the deed of assignment of rental income over the said property(ies) and this Letter and further, all costs, charges and expenses incurred by the Bank in the appointment or replacement of the Estate Agent or in defending, maintaining and implementing any actions of the Estate Agent shall be borne by the Borrower;",
        "All arising fees, commissions and charges in respect of the contractual arrangements entered into with the bank will be borne by the borrower.",
      ],
    },
    {
      title: "COMPLIANCE DOCUMENTS",
      documents: [
        "Updated Credit Reference Bureau (CRB) report to be obtained before disbursement.",
        "Copy of Annual Returns for the Borrower filed at the Companies Registry for the last three years together with the filing receipt, failing which the Bank reserves the right to pay directly to the relevant authorities and or departments without reference to the Borrower and debit to the Borrower’s current account such charges, fees, levies etc. together with the incidental expenses if any, so as to ensure that the Bank’s interests stand adequately protected at all times.",
        "Copy of Annual Returns for the Guarantor filed at the Companies Registry for the last three years together with the filing receipt, failing which the Bank reserves the right to pay directly to the relevant authorities and or departments without reference to the Borrower and debit to the Borrower’s current account such charges, fees, levies etc. together with the incidental expenses if any, so as to ensure that the Bank’s interests stand adequately protected at all times.",
        "CR 12 for the borrower",
        "Current/Valid Tax Compliance Certificate to be provided prior to drawdown.",
        "Business loan insurance cover to be in place with the bank’s interest noted.",
        "MPC COVER",
        "Business permit to be amended to capture the Borrower's name correctly.",
        "Notice of registration under Movable Property Security Rights Act 2017.",
      ],
    },
  ],
};

// ------------------- COMPONENT START -------------------

const CreateDCL = () => {
  const navigate = useNavigate();

  const [selectedLoanType, setSelectedLoanType] = useState("");
  const [checklist, setChecklist] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newDocName, setNewDocName] = useState("");
  const [viewFile, setViewFile] = useState(null);

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
    });
    updated[catIdx].availableDocuments = updated[catIdx].availableDocuments.filter(
      (d) => d !== docName
    );
    setChecklist(updated);
  };

  const handleActionChange = (catIdx, docIdx, action) => {
    const updated = [...checklist];
    updated[catIdx].selectedDocuments[docIdx].action = action;
    updated[catIdx].selectedDocuments[docIdx].status =
      action === "Approve" ? "Submitted" : action === "Reject" ? "Pending" : "";
    setChecklist(updated);
  };

  const handleCommentChange = (catIdx, docIdx, comment) => {
    const updated = [...checklist];
    updated[catIdx].selectedDocuments[docIdx].comment = comment;
    setChecklist(updated);
  };

  const handleRemoveDocument = (catIdx, docIdx) => {
    const updated = [...checklist];
    const removedDoc = updated[catIdx].selectedDocuments[docIdx].name;
    updated[catIdx].selectedDocuments.splice(docIdx, 1);
    updated[catIdx].availableDocuments.push(removedDoc);
    setChecklist(updated);
  };

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

  // ------------------- SAVE CHECKLIST -------------------
  const handleSave = () => {
    const hasDocs = checklist.some(cat => cat.selectedDocuments.length > 0);

    if (!hasDocs) {
      alert("Please select at least one document before saving.");
      return;
    }

    // Save to localStorage for the review page
    localStorage.setItem(
      "savedChecklist",
      JSON.stringify({
        loanType: selectedLoanType,
        checklist,
      })
    );

    navigate("/checklist/review");
  };

  // ------------------- TABLE STRUCTURE -------------------

  const tableData = [];
  checklist.forEach((cat, catIdx) => {
    tableData.push({
      key: `cat-${catIdx}`,
      category: cat.title,
      isCategory: true,
      catIdx,
    });
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
            onChange={(val) =>
              handleActionChange(record.catIdx, record.docIdx, val)
            }
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
      title: "View",
      render: (_, record) =>
        !record.isCategory ? (
          <Button onClick={() => alert("No document uploaded to view")}>
            View
          </Button>
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
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Create Document Checklist
      </h1>

      <Space direction="vertical" size="large" style={{ width: "100%" }}>
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

            <Button
              type="primary"
              onClick={handleAddNewDocument}
              disabled={!newDocName.trim() || selectedCategory === null}
            >
              Add Document
            </Button>
          </Space>
        )}

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
                              onClick={() =>
                                handleSelectDocument(record.catIdx, doc)
                              }
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

        {selectedLoanType && (
          <div className="text-center">
            <Button type="primary" size="large" onClick={handleSave}>
              Review Checklist
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