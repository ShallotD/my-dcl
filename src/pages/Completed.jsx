// src/pages/Completed.jsx
import React from "react";

const Completed = () => {
  const completedChecklists = [
    {
      id: 301,
      registrationNo: "Loan-789123",
      customer: "XYZ Enterprises",
      completedOn: "2024-11-05",
      approvedDocs: 6,
      status: "Completed",
    },
    {
      id: 302,
      registrationNo: "Loan-321987",
      customer: "Omega Traders",
      completedOn: "2025-10-20",
      approvedDocs: 5,
      status: "Completed",
    },
  ];

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Completed Checklists</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Loan No.</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Completed On</th>
              <th className="p-3 text-left">Approved Documents</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {completedChecklists.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3">{item.registrationNo}</td>
                <td className="p-3">{item.customer}</td>
                <td className="p-3">{item.completedOn}</td>
                <td className="p-3">{item.approvedDocs}</td>
                <td className="p-3 text-green-600 font-semibold">{item.status}</td>
                <td className="p-3">
                  <button className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Completed;
