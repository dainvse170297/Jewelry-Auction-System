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

  const exportToExcel = () => {
    const currentYearFile = new Date().getFullYear();
    if (revenueData) {
      const mappedData = revenueData.map((item, index) => {
        const earringsProfit =
          item.getProfitByCategory && item.getProfitByCategory.length > 0
            ? Math.round(
              (item.getProfitByCategory[0]?.Earrings || 0) * 0.2 * 100
            ) / 100
            : 0;
        const necklacesProfit =
          item.getProfitByCategory && item.getProfitByCategory.length > 0
            ? Math.round(
              (item.getProfitByCategory[0]?.Necklaces || 0) * 0.2 * 100
            ) / 100
            : 0;
        const braceletsProfit =
          item.getProfitByCategory && item.getProfitByCategory.length > 0
            ? Math.round(
              (item.getProfitByCategory[0]?.Bracelets || 0) * 0.2 * 100
            ) / 100
            : 0;
        const ringsProfit =
          item.getProfitByCategory && item.getProfitByCategory.length > 0
            ? Math.round(
              (item.getProfitByCategory[0]?.Rings || 0) * 0.2 * 100
            ) / 100
            : 0;

        return {
          Year: (item.year || currentYearFile - index).toString(),
          "Total Revenue":
            Math.round((item.totalRevenue * 0.2 || 0) * 100) / 100,
          "Profit Earrings": earringsProfit,
          "Profit Necklaces": necklacesProfit,
          "Profit Bracelets": braceletsProfit,
          "Profit Rings": ringsProfit,
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
