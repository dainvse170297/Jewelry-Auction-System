import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const data = [
  { name: "Rings", revenue: 5000 },
  { name: "Necklaces", revenue: 3000 },
  { name: "Bracelets", revenue: 2000 },
  { name: "Earrings", revenue: 1500 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const JewelryPieChart = () => {
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        labelLine={false}
        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        outerRadius={150}
        fill="#8884d8"
        dataKey="revenue"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default JewelryPieChart;
