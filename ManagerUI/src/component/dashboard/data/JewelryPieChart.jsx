import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Function to check if all values are zero
const hasNonZeroData = (data) => {
  return data.some((entry) => entry.revenue > 0);
};

const JewelryPieChart = ({ data }) => {
  return (
    <div style={{ textAlign: "center" }}>
      {data && data.length > 0 && hasNonZeroData(data) ? (
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx={200}
            cy={200}
            labelLine={false}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={150}
            fill="#8884d8"
            dataKey="revenue"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      ) : (
        <h3>No Data</h3>
      )}
    </div>
  );
};

export default JewelryPieChart;
