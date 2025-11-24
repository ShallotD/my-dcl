// import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";

// import TopToolbar from "../components/cochecker/Layout/TopToolbar";
// import SideQueuePanel from "../components/cochecker/Layout/SideQueuePanel";
// import LoanTable from "../components/cochecker/Loans/LoanTable";
// import LoanModal from "../components/cochecker/Loans/LoanModal";

// function Hero() {
//   const [loans, setLoans] = useState([
//     {
//       id: 101,
//       registrationNo: "Loan-293614",
//       name: "John Doe",
//       amount: 50000,
//       status: "Pending Review",
//       entryDate: "2025-10-09 16:58:23",
//       tatRemaining: "09d:06h:26m",
//       tatConsumed: "09d:06h:26m",
//       workStep: "Docs_Pending",
//       firstName: "JOHN",
//       surname: "DOE",
//     },
//     {
//       id: 102,
//       registrationNo: "Loan-292160",
//       name: "Mary Smith",
//       amount: 25000,
//       status: "Pending Deferral",
//       entryDate: "2025-09-26 18:36:08",
//       tatRemaining: "13d:00h:25m",
//       tatConsumed: "13d:00h:25m",
//       workStep: "Pending_Deferral",
//       firstName: "MARY",
//       surname: "SMITH",
//     },
//     {
//       id: 103,
//       registrationNo: "Loan-291032",
//       name: "James Brown",
//       amount: 40000,
//       status: "Submitted",
//       entryDate: "2025-10-24 12:06:58",
//       tatRemaining: "—",
//       tatConsumed: "—",
//       workStep: "Submitted",
//       firstName: "JAMES",
//       surname: "BROWN",
//     },
//   ]);

//   const [openedLoan, setOpenedLoan] = useState(null);
//   const [search, setSearch] = useState("");

//   const statusOptions = ["Pending Review", "Pending Deferral", "Submitted"];
//   const workStepOptions = ["Docs_Pending", "Pending_Deferral", "Submitted"];

//   const filteredLoans = loans.filter(
//     (loan) =>
//       loan.registrationNo.toLowerCase().includes(search.toLowerCase()) ||
//       loan.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const updateLoanStatus = (id, newStatus) => {
//     setLoans((prev) =>
//       prev.map((loan) =>
//         loan.id === id ? { ...loan, status: newStatus } : loan
//       )
//     );
//     setOpenedLoan(null);
//   };

//   const updateWorkStep = (id, newStep) => {
//     setLoans((prev) =>
//       prev.map((loan) =>
//         loan.id === id ? { ...loan, workStep: newStep } : loan
//       )
//     );
//     setOpenedLoan(null);
//   };

// //   const navigate = useNavigate();
// //   const openChecklist = () => {
// //     navigate("/cl");
// //   };

//   return (
//     <div className="min-h-screen bg-gray-100 text-gray-700">
//       <TopToolbar />

//       <div className="flex">
//         <SideQueuePanel />

//         <div className="flex-1 p-6">
//           <h2 className="text-xl font-bold text-[#0052B1] mb-4">
//             My Search Queue
//           </h2>

//           <input
//             type="text"
//             placeholder="Search…"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="border px-3 py-2 rounded mb-4 w-72"
//           />

//           <LoanTable loans={filteredLoans} onOpen={setOpenedLoan} />

//           {openedLoan && (
//             <LoanModal
//               loan={openedLoan}
//               statusOptions={statusOptions}
//               workStepOptions={workStepOptions}
//               onStatusUpdate={updateLoanStatus}
//               onStepUpdate={updateWorkStep}
//               onClose={() => setOpenedLoan(null)}
//             />
//           )}
//         </div>
//       </div>
//       {/* <div>
//         <button onClick={openChecklist}>checklist</button>
//       </div> */}
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MyQueue() {
  // --- Loan data and functions ---
  const [loans, setLoans] = useState([
    {
      id: 101,
      registrationNo: "Loan-293614",
      name: "John Doe",
      amount: 50000,
      status: "Pending Review",
      entryDate: "2025-10-09 16:58:23",
      tatRemaining: "09d:06h:26m",
      tatConsumed: "09d:06h:26m",
      workStep: "Docs_Pending",
      firstName: "JOHN",
      surname: "DOE"
    },
    {
      id: 102,
      registrationNo: "Loan-292160",
      name: "Mary Smith",
      amount: 25000,
      status: "Pending Deferral",
      entryDate: "2025-09-26 18:36:08",
      tatRemaining: "13d:00h:25m",
      tatConsumed: "13d:00h:25m",
      workStep: "Pending_Deferral",
      firstName: "MARY",
      surname: "SMITH"
    },
    {
      id: 103,
      registrationNo: "Loan-291032",
      name: "James Brown",
      amount: 40000,
      status: "Submitted",
      entryDate: "2025-10-24 12:06:58",
      tatRemaining: "—",
      tatConsumed: "—",
      workStep: "Submitted",
      firstName: "JAMES",
      surname: "BROWN"
    }
  ]);

  const [openedLoan, setOpenedLoan] = useState(null);
  const [search, setSearch] = useState("");

  // Sorting State
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const statusOptions = ["Pending Review", "Pending Deferral", "Submitted"];
  const workStepOptions = ["Docs_Pending", "Pending_Deferral", "Submitted"];

  // Sorting function
  const sortData = (key) => {
    let direction = "asc";

    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });

    const sorted = [...loans].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setLoans(sorted);
  };

  const filteredLoans = loans.filter((loan) =>
    loan.registrationNo.toLowerCase().includes(search.toLowerCase()) ||
    loan.name.toLowerCase().includes(search.toLowerCase())
  );

  const updateLoanStatus = (id, newStatus) => {
    const updated = loans.map((ln) =>
      ln.id === id ? { ...ln, status: newStatus } : ln
    );
    setLoans(updated);
    setOpenedLoan(null);
  };

  const updateWorkStep = (id, newStep) => {
    const updated = loans.map((ln) =>
      ln.id === id ? { ...ln, workStep: newStep } : ln
    );
    setLoans(updated);
    setOpenedLoan(null);
  };

  const getArrow = (key) => {
    if (sortConfig.key !== key) return "↕";
    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  const getWorkStepColor = (workStep) => {
    switch (workStep) {
      case "Docs_Pending":
        return "bg-black text-white";
      case "Pending_Deferral":
        return "bg-orange-100 text-orange-700 border border-orange-300";
      case "Submitted":
        return "bg-red-100 text-red-700 border border-red-300";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const navigate = useNavigate();

  const openChecklist = () => {
    navigate("/cl");
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-700">

      {/* MAIN CONTENT */}
      <div className="p-6 w-full">

        {/* Title */}
        <h2 className="text-xl font-bold text-[#0052B1] mb-4">
          My Queue
        </h2>

        {/* SEARCH BAR */}
        <input
          type="text"
          placeholder="Search…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded mb-4 w-72"
        />

        {/* Table */}
        <div className="bg-white shadow rounded overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr className="text-left text-gray-600">

                <th className="py-3 px-4 cursor-pointer" onClick={() => sortData("registrationNo")}>
                  Registration No {getArrow("registrationNo")}
                </th>

                <th className="py-3 px-4 cursor-pointer" onClick={() => sortData("entryDate")}>
                  Entry Date Time {getArrow("entryDate")}
                </th>

                <th className="py-3 px-4 cursor-pointer" onClick={() => sortData("tatRemaining")}>
                  TAT Remaining {getArrow("tatRemaining")}
                </th>

                <th className="py-3 px-4 cursor-pointer" onClick={() => sortData("tatConsumed")}>
                  TAT Consumed {getArrow("tatConsumed")}
                </th>

                <th className="py-3 px-4 cursor-pointer" onClick={() => sortData("workStep")}>
                  Workstep {getArrow("workStep")}
                </th>

                <th className="py-3 px-4 cursor-pointer" onClick={() => sortData("firstName")}>
                  FName {getArrow("firstName")}
                </th>

                <th className="py-3 px-4 cursor-pointer" onClick={() => sortData("surname")}>
                  SName {getArrow("surname")}
                </th>

                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredLoans.map((loan) => (
                <tr
                  key={loan.id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                  onClick={openChecklist}
                >
                  <td className="py-3 px-4 text-red-600 font-semibold">{loan.registrationNo}</td>
                  <td className="py-3 px-4">{loan.entryDate}</td>
                  <td className="py-3 px-4">{loan.tatRemaining}</td>
                  <td className="py-3 px-4 text-red-500">{loan.tatConsumed}</td>

                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getWorkStepColor(loan.workStep)}`}>
                      {loan.workStep}
                    </span>
                  </td>

                  <td className="py-3 px-4">{loan.firstName}</td>
                  <td className="py-3 px-4">{loan.surname}</td>

                  <td className="py-3 px-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // stops row click
                        setOpenedLoan(loan);
                      }}
                      className="bg-[#FFCD00] text-[#0052B1] px-3 py-1 rounded font-semibold hover:bg-yellow-400"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {openedLoan && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-96">

              <h3 className="text-xl font-bold text-[#0052B1] mb-4">
                Update {openedLoan.registrationNo}
              </h3>

              <p><strong>Name:</strong> {openedLoan.name}</p>
              <p><strong>Amount:</strong> Ksh {openedLoan.amount.toLocaleString()}</p>

              <div className="mt-4">
                <label className="font-semibold">Status</label>
                <select
                  className="border w-full px-3 py-2 rounded mt-1"
                  defaultValue={openedLoan.status}
                  onChange={(e) => updateLoanStatus(openedLoan.id, e.target.value)}
                >
                  {statusOptions.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="mt-4">
                <label className="font-semibold">Work Step</label>
                <select
                  className="border w-full px-3 py-2 rounded mt-1"
                  defaultValue={openedLoan.workStep}
                  onChange={(e) => updateWorkStep(openedLoan.id, e.target.value)}
                >
                  {workStepOptions.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setOpenedLoan(null)}
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default MyQueue;
