// src/pages/Dashboard.jsx
import React, { useState } from "react";
import {
  FileText,
  Clock,
  CheckCircle,
  Users,
  ClipboardList,
  CheckSquare,
  Activity,
} from "lucide-react";

const Dashboard = () => {
  // Example data — you can replace/fetch from API later
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

  const recentActivity = [
    { id: 1, action: "Checklist DCL-001 submitted", time: "2 hours ago" },
    { id: 2, action: "Checklist DCL-002 approved", time: "1 day ago" },
    { id: 3, action: "Checklist DCL-003 deferred", time: "3 days ago" },
  ];

  const myTasks = [
    { id: 1, task: "Review checklist DCL-001", due: "Today" },
    { id: 2, task: "Follow up on deferral for DCL-004", due: "Tomorrow" },
  ];

  const pipeline = [
    { status: "Pending Review", count: dclList.length },
    { status: "Deferrals", count: 2 },
    { status: "Completed", count: 9 },
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

  return (
    <section className="p-6 bg-[#F4F7FC] min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">
        Credit Officer Dashboard
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {dashboardCards.map((card) => (
          <div
            key={card.title}
            className="backdrop-blur-xl bg-white/60 border border-white/40 shadow-lg rounded-xl p-6 transition-all hover:shadow-xl hover:bg-white/70"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-700 font-semibold">{card.title}</p>
              {card.icon}
            </div>
            <p className="text-3xl font-bold text-gray-800">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
          <Activity size={24} className="text-[#3A2A82]" />
          Recent Activity
        </h2>
        <ul className="bg-white rounded-lg shadow p-4 space-y-3">
          {recentActivity.map((item) => (
            <li
              key={item.id}
              className="flex justify-between border-b last:border-b-0 border-gray-200 pb-2"
            >
              <span>{item.action}</span>
              <time className="text-gray-500 text-sm">{item.time}</time>
            </li>
          ))}
        </ul>
      </div>

      {/* My Tasks */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
          <CheckSquare size={24} className="text-[#3A2A82]" />
          My Tasks
        </h2>
        <ul className="bg-white rounded-lg shadow p-4 space-y-3">
          {myTasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between border-b last:border-b-0 border-gray-200 pb-2"
            >
              <span>{task.task}</span>
              <time className="text-gray-500 text-sm">{task.due}</time>
            </li>
          ))}
        </ul>
      </div>

      {/* Pipeline */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
          <ClipboardList size={24} className="text-[#3A2A82]" />
          DCL Pipeline Overview
        </h2>
        <ul className="bg-white rounded-lg shadow p-4 space-y-3">
          {pipeline.map(({ status, count }, idx) => (
            <li
              key={idx}
              className="flex justify-between border-b last:border-b-0 border-gray-200 pb-2"
            >
              <span>{status}</span>
              <span className="font-semibold">{count}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Dashboard;
