// src/pages/CreateDCL.jsx
import React, { useState } from "react";

const CreateDCL = () => {
  const documentCategories = [
    {
      title: "Contracts Documents Required",
      documents: [
        "Duly executed facility offer letter",
        "Board resolution of the borrower",
        "Acknowledgment by guarantor form",
        "Total cost of credit",
      ],
    },
    {
      title: "KYC Documents",
      documents: [
        "Certificate of incorporation",
        "Memorandum and articles of association",
        "Company PIN certificate",
        "CR12",
        "ID / Passport",
        "PIN certificate of the borrowers",
      ],
    },
    {
      title: "Facility Documents",
      documents: [
        "Directors personal guarantees and indemnities",
        "Borrowers to open mpesa till number linked to NCBA account",
      ],
    },
    {
      title: "Compliance Documents",
      documents: [
        "Business loan protector cover",
        "Business permits",
        "Borrowers to provide a current/valid tax compliance certificate",
      ],
    },
  ];

  const [checklist, setChecklist] = useState(
    documentCategories.map((cat) => ({
      title: cat.title,
      availableDocuments: cat.documents,
      selectedDocuments: [],
    }))
  );

  const [submitting, setSubmitting] = useState(false);
  const [newCategoryTitle, setNewCategoryTitle] = useState("");
  const [newCategoryDocs, setNewCategoryDocs] = useState("");
  const [newDocsPerCategory, setNewDocsPerCategory] = useState(
    Array(documentCategories.length).fill("")
  );

  const handleDocumentSelect = (catIdx, docName) => {
    const updated = [...checklist];
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

  const handleActionChange = (catIdx, docIdx, value) => {
    const updated = [...checklist];
    updated[catIdx].selectedDocuments[docIdx].action = value;
    updated[catIdx].selectedDocuments[docIdx].status =
      value === "Approve" ? "Submitted" : value === "Reject" ? "Pending" : "";
    setChecklist(updated);
  };

  const handleCommentChange = (catIdx, docIdx, value) => {
    const updated = [...checklist];
    updated[catIdx].selectedDocuments[docIdx].comment = value;
    setChecklist(updated);
  };

  const handleSubmitChecklist = () => {
    setSubmitting(true);
    const hasUnactioned = checklist.some((cat) =>
      cat.selectedDocuments.some((doc) => !doc.status)
    );

    if (hasUnactioned) {
      alert("Please action all documents before submitting.");
      setSubmitting(false);
      return;
    }

    console.log("Submitting Checklist:", checklist);

    setTimeout(() => {
      alert("Checklist successfully submitted to RM!");
      setSubmitting(false);
    }, 1200);
  };

  const handleAddCategory = () => {
    if (!newCategoryTitle.trim() || !newCategoryDocs.trim()) {
      alert("Please enter both category title and documents.");
      return;
    }

    const docsArray = newCategoryDocs
      .split(",")
      .map((d) => d.trim())
      .filter(Boolean);

    if (docsArray.length === 0) {
      alert("Please add at least one document.");
      return;
    }

    setChecklist([
      ...checklist,
      {
        title: newCategoryTitle.trim(),
        availableDocuments: docsArray,
        selectedDocuments: [],
      },
    ]);

    setNewCategoryTitle("");
    setNewCategoryDocs("");
    setNewDocsPerCategory((prev) => [...prev, ""]);
  };

  const handleAddDocumentToCategory = (catIdx) => {
    const newDoc = newDocsPerCategory[catIdx]?.trim();
    if (!newDoc) return;

    const updated = [...checklist];
    updated[catIdx].availableDocuments.push(newDoc);
    setChecklist(updated);

    const updatedNewDocs = [...newDocsPerCategory];
    updatedNewDocs[catIdx] = "";
    setNewDocsPerCategory(updatedNewDocs);
  };

  const getFilePreview = (file) => {
    if (!file) return "No File";

    return (
      <button
        onClick={() => window.open(URL.createObjectURL(file), "_blank")}
        className="bg-gray-700 hover:bg-gray-800 text-white text-sm px-3 py-1.5 rounded-md"
      >
        View
      </button>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">
        Create New DCL (Document Checklist)
      </h1>

      {/* Add New Category Section */}
      <section className="mb-8 bg-white p-5 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Add New Category & Documents</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Category Title"
            value={newCategoryTitle}
            onChange={(e) => setNewCategoryTitle(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Documents (comma separated)"
            value={newCategoryDocs}
            onChange={(e) => setNewCategoryDocs(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddCategory}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold transition"
          >
            Add Category
          </button>
        </div>
      </section>

      {/* Document Checklist Table */}
      <section className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-3 border border-gray-300 text-left">Category</th>
              <th className="px-6 py-3 border border-gray-300 text-left">Document</th>
              <th className="px-6 py-3 border border-gray-300 text-left">Status</th>
              <th className="px-6 py-3 border border-gray-300 text-left">Action</th>
              <th className="px-6 py-3 border border-gray-300 text-left">View</th>
              <th className="px-6 py-3 border border-gray-300 text-left">Comment</th>
              <th className="px-6 py-3 border border-gray-300 text-left">Remove</th>
            </tr>
          </thead>

          <tbody>
            {checklist.map((category, catIdx) => (
              <React.Fragment key={catIdx}>
                {/* Category Row with Add Document select */}
                <tr className="bg-gray-50 hover:bg-gray-100">
                  <td className="font-semibold px-6 py-4 border border-gray-300 align-top">
                    {category.title}
                  </td>
                  <td className="px-6 py-4 border border-gray-300 align-top">
                    <select
                      className="border border-gray-300 rounded-md px-3 py-2 w-full mb-2"
                      onChange={(e) => {
                        if (e.target.value) {
                          handleDocumentSelect(catIdx, e.target.value);
                          e.target.value = "";
                        }
                      }}
                    >
                      <option value="">Select Document</option>
                      {category.availableDocuments.map((doc, i) => (
                        <option key={i} value={doc}>
                          {doc}
                        </option>
                      ))}
                    </select>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Add document"
                        value={newDocsPerCategory[catIdx] || ""}
                        onChange={(e) => {
                          const updated = [...newDocsPerCategory];
                          updated[catIdx] = e.target.value;
                          setNewDocsPerCategory(updated);
                        }}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => handleAddDocumentToCategory(catIdx)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold transition"
                      >
                        Add
                      </button>
                    </div>
                  </td>
                  <td className="border border-gray-300">—</td>
                  <td className="border border-gray-300">—</td>
                  <td className="border border-gray-300">—</td>
                  <td className="border border-gray-300">—</td>
                  <td className="border border-gray-300">—</td>
                </tr>

                {/* Selected Documents */}
                {category.selectedDocuments.map((doc, docIdx) => (
                  <tr
                    key={`${catIdx}-${docIdx}`}
                    className="hover:bg-gray-50 border-t border-gray-200"
                  >
                    <td className="border border-gray-300"></td>
                    <td className="px-6 py-4 border border-gray-300">{doc.name}</td>

                    <td
                      className={`px-6 py-4 border border-gray-300 font-semibold ${
                        doc.status === "Submitted"
                          ? "text-green-600"
                          : doc.status === "Pending"
                          ? "text-red-600"
                          : "text-gray-400"
                      }`}
                    >
                      {doc.status || "—"}
                    </td>

                    <td className="px-6 py-4 border border-gray-300">
                      <select
                        className="border border-gray-300 rounded-md px-3 py-2 w-full"
                        value={doc.action}
                        onChange={(e) =>
                          handleActionChange(catIdx, docIdx, e.target.value)
                        }
                      >
                        <option value="">Select</option>
                        <option value="Approve">Approve</option>
                        <option value="Reject">Reject</option>
                      </select>
                    </td>

                    <td className="px-6 py-4 border border-gray-300">
                      {getFilePreview(doc.file)}
                    </td>

                    <td className="px-6 py-4 border border-gray-300">
                      <input
                        disabled={doc.status === "Submitted"}
                        className={`w-full border border-gray-300 rounded-md px-3 py-2 ${
                          doc.status === "Submitted"
                            ? "bg-gray-200 cursor-not-allowed"
                            : ""
                        }`}
                        placeholder="Add comment..."
                        value={doc.comment}
                        onChange={(e) =>
                          handleCommentChange(catIdx, docIdx, e.target.value)
                        }
                      />
                    </td>

                    <td className="px-6 py-4 border border-gray-300 text-center">
                      <button
                        onClick={() => {
                          const updated = [...checklist];
                          const removedDoc =
                            updated[catIdx].selectedDocuments[docIdx].name;
                          updated[catIdx].selectedDocuments.splice(docIdx, 1);
                          updated[catIdx].availableDocuments.push(removedDoc);
                          setChecklist(updated);
                        }}
                        className="px-4 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-md transition"
                        title="Remove document"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </section>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSubmitChecklist}
          disabled={submitting}
          className={`px-6 py-3 rounded-md font-semibold text-white transition ${
            submitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {submitting ? "Submitting..." : "Submit Checklist to RM"}
        </button>
      </div>
    </div>
  );
};

export default CreateDCL;
