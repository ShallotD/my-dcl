import React, { useState, useEffect } from "react";
import {
  FileText,
  Clock,
  CheckCircle,
  ClipboardList,
  Users,
  PlusCircle,
} from "lucide-react";

const Hero = ({
  showModal,
  setShowModal,
  activeTab,
  setActiveTab,
  defaultTab,
}) => {
  const [selectedChecklist, setSelectedChecklist] = useState(null);

  const NCBA_BLUE = "#3A2A82";

  const [dclList] = useState([
    {
      id: "DCL-001",
      customer: "ABC Manufacturers Ltd",
      rm: "Sarah Johnson",
      submitted: "2024-11-06 10:14",
      status: "Pending Review",
    },
    {
      id: "DCL-002",
      customer: "Prime Logistics",
      rm: "Michael Chen",
      submitted: "2024-11-07 09:50",
      status: "Pending Review",
    },
  ]);

  const deferrals = [
    {
      id: 1,
      title: "Audited Financial Statements 2024",
      client: "ABC Corporation",
      rm: "Sarah Johnson",
      requestedDate: "2025-11-08",
      reason:
        "Auditor is finalizing the report. Expected November 25, 2025. Will be submitted immediately upon receipt.",
      linkedDCL: "DCL-001",
    },
    {
      id: 2,
      title: "Board Resolution",
      client: "Tech Solutions Ltd",
      rm: "Michael Chen",
      requestedDate: "2025-11-10",
      reason:
        "Board meeting scheduled for Dec 20, 2025. Resolution will be submitted 2 days after meeting.",
      linkedDCL: "DCL-002",
    },
  ];

  const dashboardCards = [
    {
      title: "Checklists Created",
      value: 14,
      icon: <FileText size={26} className="text-[#3A2A82]" />,
    },
    {
      title: "Pending RM Submissions",
      value: 4,
      icon: <Users size={26} className="text-blue-500" />,
    },
    {
      title: "Pending Reviews",
      value: dclList.length,
      icon: <Clock size={26} className="text-orange-500" />,
    },
    {
      title: "Completed Checklists",
      value: 9,
      icon: <CheckCircle size={26} className="text-green-600" />,
    },
  ];

  const openChecklistDetails = (linkedDCL) => {
    const checklist = dclList.find((c) => c.id === linkedDCL);
    if (checklist) {
      setSelectedChecklist(checklist);
    }
  };

  // Use defaultTab to set active tab on mount or when defaultTab prop changes
  useEffect(() => {
    if (defaultTab && defaultTab !== activeTab) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab, activeTab, setActiveTab]);

  return (
    <section className="bg-[#F4F7FC] px-6 py-6 rounded-xl shadow-sm animate-fadeIn">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Credit Officer Dashboard
      </h2>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        {dashboardCards.map((card) => (
          <div
            key={card.title}
            className="
              backdrop-blur-xl bg-white/60
              border border-white/40
              shadow-lg rounded-xl p-6
              transition-all hover:shadow-xl hover:bg-white/70
            "
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-700 font-semibold">{card.title}</p>
              {card.icon}
            </div>
            <p className="text-3xl font-bold text-gray-800">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Create New Document Checklist */}
      <div className="mt-8">
        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2.5 rounded-lg text-white shadow-md font-medium flex items-center gap-2 transition"
          style={{ backgroundColor: NCBA_BLUE }}
        >
          <PlusCircle size={18} />
          Create New Document Checklist
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-3 mt-8">
        {[
          { id: "active", label: "Active" },
          { id: "deferrals", label: "Deferrals", badge: deferrals.length },
          { id: "completed", label: "Completed" },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border transition-all ${
                isActive
                  ? "bg-[#3A2A82] text-white border-[#3A2A82]"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {tab.label}
              {tab.badge && (
                <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="mt-8">
        {activeTab === "active" && (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Users size={20} className="text-blue-600" />
                Pending RM Submissions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                <div className="bg-white border rounded-xl p-5 shadow-sm">
                  <h4 className="font-semibold text-gray-900">XYZ Holdings</h4>
                  <p className="text-gray-700 text-sm mt-1">RM: Kelvin Otieno</p>
                  <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                    View Checklist
                  </button>
                </div>
                <div className="bg-white border rounded-xl p-5 shadow-sm">
                  <h4 className="font-semibold text-gray-900">
                    BlueWave Industries
                  </h4>
                  <p className="text-gray-700 text-sm mt-1">RM: Sharon Muli</p>
                  <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                    View Checklist
                  </button>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <ClipboardList size={20} className="text-[#3A2A82]" />
              Document Checklists Pending Review
            </h3>

            {dclList.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900">
                      {item.customer}
                    </h4>
                    <p className="text-gray-700 mt-1">
                      RM: {item.rm} • Submitted: {item.submitted}
                    </p>
                  </div>
                  <span className="bg-blue-100 text-blue-700 border border-blue-300 px-3 py-1 rounded-full text-xs font-semibold">
                    {item.status}
                  </span>
                </div>
                <button
                  onClick={() => openChecklistDetails(item.id)}
                  className="mt-4 bg-[#3A2A82] hover:bg-[#2A1F63] text-white px-5 py-2.5 rounded-lg font-medium shadow"
                >
                  Review Checklist
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "deferrals" && (
          <div className="space-y-6 mt-4">
            {deferrals.map((item) => (
              <div
                key={item.id}
                className="bg-[#FFFCF5] border border-yellow-300 rounded-xl p-6 shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-gray-700 mt-1">
                      Client: {item.client} • RM: {item.rm}
                    </p>
                  </div>
                  <span className="bg-yellow-100 text-yellow-700 border border-yellow-300 px-3 py-1 rounded-full text-xs font-semibold">
                    Pending Review
                  </span>
                </div>

                <p className="text-gray-700 font-medium mt-4">
                  Requested: {item.requestedDate}
                </p>

                <div className="mt-4 bg-white border border-yellow-300 rounded-lg p-4">
                  {item.reason}
                </div>

                <button
                  onClick={() => openChecklistDetails(item.linkedDCL)}
                  className="mt-6 bg-[#3A2A82] hover:bg-[#2A1F63] text-white px-5 py-2.5 rounded-lg font-medium shadow"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "completed" && (
          <div className="bg-[#F2FCF6] border border-green-300 rounded-xl p-6 shadow-sm relative">
            <h3 className="text-xl font-semibold text-gray-800">
              XYZ Enterprises
            </h3>
            <p className="text-gray-600 text-sm mt-1">Completed on 2024-11-05</p>

            <span className="absolute top-6 right-6 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Completed
            </span>

            <div className="mt-6 flex items-center gap-3 text-green-700 font-medium text-lg">
              <CheckCircle size={22} className="text-green-600" />
              All 6 documents approved
            </div>
          </div>
        )}
      </div>

      {/* Modals … same as before */}
      {selectedChecklist && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-lg p-6 rounded-xl shadow-xl animate-fadeIn">
            <h2 className="text-xl font-semibold text-gray-900">Deferral Details</h2>
            <div className="mt-4 space-y-2 text-gray-800 text-sm">
              <p><strong>Checklist ID:</strong> {selectedChecklist.id}</p>
              <p><strong>Client Name:</strong> {selectedChecklist.customer}</p>
              <p><strong>Relationship Manager:</strong> {selectedChecklist.rm}</p>
              <p><strong>Deferred Document:</strong> {deferrals.find((d) => d.linkedDCL === selectedChecklist.id)?.title}</p>
              <p><strong>Requested On:</strong> {deferrals.find((d) => d.linkedDCL === selectedChecklist.id)?.requestedDate}</p>
              <div className="mt-3">
                <p className="font-semibold">Reason for Deferral:</p>
                <p className="mt-1 bg-gray-100 p-3 rounded-lg">{deferrals.find((d) => d.linkedDCL === selectedChecklist.id)?.reason}</p>
              </div>
              <p className="mt-2"><strong>Status:</strong> Pending RM Action</p>
            </div>
            <div className="flex justify-end mt-6">
              <button onClick={() => setSelectedChecklist(null)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Close</button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-lg p-6 rounded-xl shadow-xl animate-fadeIn">
            <h2 className="text-xl font-semibold text-gray-900">
              Create New Document Checklist
            </h2>
            <div className="mt-4 space-y-4">
              <input type="text" placeholder="Client Name" className="w-full p-3 border rounded-lg" />
              <input type="text" placeholder="Relationship Manager" className="w-full p-3 border rounded-lg" />
              <textarea placeholder="Description" className="w-full p-3 border rounded-lg h-24"></textarea>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Cancel</button>
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-[#3A2A82] text-white rounded-lg hover:bg-[#2A1F63]">Save</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.22s ease-out;
        }
      `}</style>
    </section>
  );
};

export default Hero;







