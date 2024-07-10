import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "Rings", revenue: 5000 },
  { name: "Necklaces", revenue: 3000 },
  { name: "Bracelets", revenue: 2000 },
  { name: "Earrings", revenue: 1500 },
];

const JewelryBarChart = () => {
  return (
    <BarChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="revenue" fill="#8884d8" />
    </BarChart>
  );
};

export default JewelryBarChart;
