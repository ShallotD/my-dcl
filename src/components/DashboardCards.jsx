// src/components/DashboardCards.jsx
import React from "react";
import {
  FileText,
  Users,
  Clock,
  CheckCircle,
} from "lucide-react";

const DashboardCards = ({ dclList }) => {
  const cards = [
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
      {cards.map((card) => (
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
  );
};

export default DashboardCards;
