// src/pages/Dashboard.jsx
import React, { useState } from "react";
import { Row, Col, Card, Typography } from "antd";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const { Title, Text } = Typography;

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

  // Cards data same as Reports.jsx with colors matching
  const cardsData = [
    {
      title: "Total Checklists",
      value: 695,
      subText: "+12% this month",
      borderColor: "#3A2A82",
      textColor: "#3A2A82",
    },
    {
      title: "Pending Checklists",
      value: 180,
      subText: "RM follow-up required",
      borderColor: "#C8A854",
      textColor: "#C8A854",
    },
    {
      title: "Deferred Requests",
      value: 95,
      subText: "Awaiting additional docs",
      borderColor: "#FF6B3D",
      textColor: "#FF6B3D",
    },
  ];

  const pieData = [
    { name: "Completed", value: 420 },
    { name: "Pending", value: 180 },
    { name: "Deferred", value: 95 },
  ];

  const COLORS = ["#3A2A82", "#C8A854", "#FF6B3D"];

  return (
    <section className="p-6 bg-[#F4F7FC] min-h-screen">
      {/* Cards styled like Reports.jsx */}
      <Row gutter={16} style={{ marginBottom: 30 }}>
        {cardsData.map(({ title, value, subText, borderColor, textColor }) => (
          <Col key={title} span={8}>
            <Card
              style={{
                borderLeft: `5px solid ${borderColor}`,
                borderRadius: 8,
                background: "#fff",
              }}
            >
              <Text type="secondary">{title}</Text>
              <Title level={3} style={{ margin: 0 }}>
                {value}
              </Title>
              <Text strong style={{ color: textColor }}>
                {subText}
              </Text>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pie Chart under cards */}
      <div
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 8,
          boxShadow: "0px 2px 8px rgba(0,0,0,0.06)",
          maxWidth: 700,
          marginBottom: 40,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <h3 style={{ textAlign: "center", color: "#3A2A82", marginBottom: 20 }}>
          Checklist Status Breakdown
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default Dashboard;
