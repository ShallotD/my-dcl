// src/pages/Deferrals.jsx
import React from "react";

const Deferrals = () => {
  // Sample data – replace with your API or state data
  const deferrals = [
    {
      id: 101,
      registrationNo: "Loan-993214",
      name: "John Doe",
      amount: 50000,
      reason: "Missing documents",
      status: "Deferred",
    },
    {
      id: 102,
      registrationNo: "Loan-778312",
      name: "Mary Wanjiru",
      amount: 120000,
      reason: "Awaiting approval",
      status: "Deferred",
    },
  ];

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Deferrals Queue
      </h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Loan No.</th>
              <th className="p-3 text-left">Customer Name</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Reason</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {deferrals.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3">{item.registrationNo}</td>
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.amount.toLocaleString()}</td>
                <td className="p-3">{item.reason}</td>
                <td className="p-3 text-yellow-600 font-semibold">
                  {item.status}
                </td>
                <td className="p-3">
                  <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                    Review
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

export default Deferrals;
