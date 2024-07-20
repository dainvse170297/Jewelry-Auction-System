import React, { useState, useEffect } from "react";
import { Paper, Grid, Typography, IconButton } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import axios from "axios";

const RevenueExportComponent = () => {
  const [revenueData, setRevenueData] = useState(null);

  // Function to fetch revenue data for the last five years
  const fetchRevenueData = async () => {
    try {
      const currentYear = new Date().getFullYear();
      const years = Array.from(
        { length: 5 },
        (_, index) => currentYear - index
      );

      const promises = years.map(async (year) => {
        const response = await axios.get(
          `https://fuja.azurewebsites.net/dashboard/dataRevenue/${year}`
        );
        return response.data;
      });

      const data = await Promise.all(promises);
      setRevenueData(data);
    } catch (error) {
      console.error("Error fetching revenue data:", error);
    }
  };

  // Function to handle export to Excel for revenue data
  const exportToExcel = () => {
    const currentYearFile = new Date().getFullYear();
    if (revenueData) {
      const mappedData = revenueData.map((item, index) => {
        const year = item.year || currentYearFile - index;
        const months = item.revenue || Array(12).fill(0);

        return {
          Year: year.toString(),
          "January ": months[0] + months[0] * 0.2,
          "February ": months[1] + months[1] * 0.2,
          "March ": months[2] + months[2] * 0.2,
          "April ": months[3] + months[3] * 0.2,
          "May ": months[4] + months[4] * 0.2,
          "June ": months[5] + months[5] * 0.2,
          "July ": months[6] + months[6] * 0.2,
          "August ": months[7] + months[7] * 0.2,
          "September ": months[8] + months[8] * 0.2,
          "October ": months[9] + months[9] * 0.2,
          "November ": months[10] + months[10] * 0.2,
          "December ": months[11] + months[11] * 0.2,
          "Total Revenue ": item.totalRevenue + item.totalRevenue * 0.2 || 0,
          "Total Profit": item.totalRevenue * 0.2 || 0,
          "Total Auction Session": item.totalAuctionSession || 0,
          "Total Auction Lots": item.totalAuctionLots || 0,
          "Total Auction Lots Pending Payment":
            item.totalAuctionLotsPendingPayment || 0,
          "Total Auction Lots Payment Success": item.totalAuctionLotsSold || 0,
        };
      });

      const ws = XLSX.utils.json_to_sheet(mappedData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "RevenueData");
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const dataBlob = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });
      saveAs(dataBlob, `RevenueData.xlsx`);
    }
  };

  // Fetch revenue data on component mount
  useEffect(() => {
    fetchRevenueData();
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4}>
          <Typography variant="subtitle1" fontWeight="bold">
            File Title:
          </Typography>
          <Typography variant="body1">Revenue Data</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="subtitle1" fontWeight="bold">
            File Name:
          </Typography>
          <Typography variant="body1">RevenueData</Typography>
        </Grid>
        <Grid item xs={12} sm={4} textAlign="center">
          <IconButton color="primary" onClick={exportToExcel}>
            <FileDownloadIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RevenueExportComponent;
