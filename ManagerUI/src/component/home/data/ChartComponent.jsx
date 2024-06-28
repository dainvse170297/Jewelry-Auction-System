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

const ChartComponent = ({
  revenueCurrentYear,
  revenueBeforeYear,
  currentYearData,
  beforeYearData,
}) => {
  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: beforeYearData.year,
        data: revenueBeforeYear,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: currentYearData.year,
        data: revenueCurrentYear,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Monthly Total Revenue",
      },
    },
    scales: {
      x: {
        stacked: false,
      },
      y: {
        stacked: false,
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
          <Typography variant="body2">
            Year: {beforeYearData.year} - {currentYearData.year}
          </Typography>
        </Box>
        <Bar data={data} options={options} />
      </CardContent>
    </Card>
  );
};

export default ChartComponent;
