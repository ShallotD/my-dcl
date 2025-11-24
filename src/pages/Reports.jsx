// src/pages/Reports.jsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const monthlyChecklistStats = [
  { month: "Jan", Completed: 120, Pending: 40, Deferred: 20 },
  { month: "Feb", Completed: 150, Pending: 60, Deferred: 15 },
  { month: "Mar", Completed: 200, Pending: 55, Deferred: 35 },
  { month: "Apr", Completed: 180, Pending: 50, Deferred: 20 },
  { month: "May", Completed: 240, Pending: 70, Deferred: 30 },
];

const Reports = () => {
  return (
    <div style={{ padding: 20 }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          marginBottom: 40,
        }}
      >
        <div
          style={{
            flex: 1,
            minWidth: 350,
            height: 380,
            background: "#fff",
            padding: 20,
            borderRadius: 8,
            boxShadow: "0px 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <h3 style={{ textAlign: "center", color: "#3A2A82" }}>
            Checklist Workflow Trend
          </h3>

          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyChecklistStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />

              <Area
                type="monotone"
                dataKey="Completed"
                stackId="1"
                stroke="#3A2A82"
                fill="#3A2A82"
                fillOpacity={0.4}
              />
              <Area
                type="monotone"
                dataKey="Pending"
                stackId="1"
                stroke="#C8A854"
                fill="#C8A854"
                fillOpacity={0.4}
              />
              <Area
                type="monotone"
                dataKey="Deferred"
                stackId="1"
                stroke="#FF6B3D"
                fill="#FF6B3D"
                fillOpacity={0.4}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div
          style={{
            flex: 1,
            minWidth: 350,
            height: 380,
            background: "#fff",
            padding: 20,
            borderRadius: 8,
            boxShadow: "0px 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <h3 style={{ textAlign: "center", color: "#3A2A82" }}>
            RM Checklist Performance Overview
          </h3>

          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { name: "Alice", Completed: 140, Pending: 30, Deferred: 10 },
                { name: "Bob", Completed: 90, Pending: 50, Deferred: 20 },
                { name: "Brian", Completed: 160, Pending: 40, Deferred: 15 },
                { name: "Sarah", Completed: 130, Pending: 60, Deferred: 25 },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />

              <Bar dataKey="Completed" fill="#3A2A82" />
              <Bar dataKey="Pending" fill="#C8A854" />
              <Bar dataKey="Deferred" fill="#FF6B3D" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Reports;
