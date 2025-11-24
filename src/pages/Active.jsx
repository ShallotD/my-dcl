// src/pages/Active.jsx
import React from "react";

const Active = () => {
  const activeChecklists = [
    {
      id: 201,
      registrationNo: "Loan-123456",
      customer: "ABC Corp",
      rm: "Kelvin Otieno",
      submitted: "2025-11-10",
      status: "Pending RM Submission",
    },
    {
      id: 202,
      registrationNo: "Loan-654321",
      customer: "BlueWave Ltd",
      rm: "Sharon Muli",
      submitted: "2025-11-09",
      status: "Pending RM Submission",
    },
  ];

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Active Checklists</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Loan No.</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Relationship Manager</th>
              <th className="p-3 text-left">Date Submitted</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {activeChecklists.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3">{item.registrationNo}</td>
                <td className="p-3">{item.customer}</td>
                <td className="p-3">{item.rm}</td>
                <td className="p-3">{item.submitted}</td>
                <td className="p-3 text-yellow-600 font-semibold">{item.status}</td>
                <td className="p-3">
                  <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
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

export default Active;
