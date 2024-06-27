import React from "react";
import { Bar } from "react-chartjs-2";
import { Card, CardContent, Typography, Box } from "@mui/material";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ChartComponent = () => {
  const data = {
    labels: [
      "01/01",
      "01/02",
      "01/02",
      "01/03",
      "01/04",
      "01/05",
      "01/06",
      "01/07",
      "01/08",
      "01/09",
      "01/10",
      "01/11",
      "01/12",
    ],
    datasets: [
      {
        label: "2023",
        data: [300, 200, 300, 400, 300, 200, 300, 300, 200, 300, 400, 300, 90],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "2024",
        data: [200, 100, 200, 300, 200, 100, 200, 200, 700, 200, 300, 200, 100],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Sales Overview",
      },
    },
  };

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Monthly Total Revenue</Typography>
          <Typography variant="body2">March 2023</Typography>
        </Box>
        <Bar data={data} options={options} />
      </CardContent>
    </Card>
  );
};

export default ChartComponent;
