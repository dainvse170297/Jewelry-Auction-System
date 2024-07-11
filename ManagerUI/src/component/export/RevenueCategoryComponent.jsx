import React, { useState, useEffect } from "react";
import { Paper, Grid, Typography, IconButton } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import axios from "axios";

const RevenueExportCategoryComponent = () => {
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
          `http://localhost:8080/dashboard/dataRevenue/${year}`
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
  // Function to handle export to Excel for revenue data
  const exportToExcel = () => {
    const currentYearFile = new Date().getFullYear();
    if (revenueData) {
      const mappedData = revenueData.map((item, index) => {
        const earringsProfit =
          item.getProfitByCategory && item.getProfitByCategory.length > 0
            ? (item.getProfitByCategory[0]?.Earrings || 0) * 0.2
            : 0;
        const necklacesProfit =
          item.getProfitByCategory && item.getProfitByCategory.length > 0
            ? (item.getProfitByCategory[0]?.Necklaces || 0) * 0.2
            : 0;
        const braceletsProfit =
          item.getProfitByCategory && item.getProfitByCategory.length > 0
            ? (item.getProfitByCategory[0]?.Bracelets || 0) * 0.2
            : 0;
        const ringsProfit =
          item.getProfitByCategory && item.getProfitByCategory.length > 0
            ? (item.getProfitByCategory[0]?.Rings || 0) * 0.2
            : 0;

        return {
          Year: (item.year || currentYearFile - index).toString(),
          "Total Revenue": (item.totalRevenue * 0.2 || 0).toString(),
          "Profit Earrings": earringsProfit.toString(),
          "Profit Necklaces": necklacesProfit.toString(),
          "Profit Bracelets": braceletsProfit.toString(),
          "Profit Rings": ringsProfit.toString(),
        };
      });

      const ws = XLSX.utils.json_to_sheet(mappedData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "RevenueData");
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const dataBlob = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });
      saveAs(dataBlob, `RevenueCategoryData.xlsx`);
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
          <Typography variant="body1">Revenue Category Data</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="subtitle1" fontWeight="bold">
            File Name:
          </Typography>
          <Typography variant="body1">RevenueCategoryData</Typography>
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

export default RevenueExportCategoryComponent;
