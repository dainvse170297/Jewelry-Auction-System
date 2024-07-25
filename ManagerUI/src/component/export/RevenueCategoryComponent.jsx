import React, { useState, useEffect } from "react";
import { Paper, Grid, Typography, IconButton } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import axios from "axios";

const RevenueExportCategoryComponent = () => {
  const [revenueData, setRevenueData] = useState([]);

  // Function to fetch revenue data for the last five years
  const fetchRevenueData = async () => {
    try {
      const currentYear = new Date().getFullYear();
      const years = Array.from(
        { length: 5 },
        (_, index) => currentYear - index
      );

      const responses = await Promise.all(
        years.map((year) =>
          axios.get(
            `https://fuja.azurewebsites.net/dashboard/dataRevenue/${year}`
          )
        )
      );

      const data = responses.map((response) => response.data);
      setRevenueData(data);
    } catch (error) {
      console.error("Error fetching revenue data:", error);
    }
  };

  const exportToExcel = () => {
    if (revenueData.length > 0) {
      // Create a new workbook
      const wb = XLSX.utils.book_new();

      revenueData.forEach((item) => {
        const monthlyData = item.getProfitByCategory || [];

        // Prepare monthly data rows
        const monthlyRows = monthlyData.map((monthData, i) => ({
          Month: new Date(0, i).toLocaleString("en-US", { month: "long" }),
          "Profit Earrings":
            Math.round((monthData.Earrings || 0) * 0.2 * 100) / 100,
          "Profit Necklaces":
            Math.round((monthData.Necklaces || 0) * 0.2 * 100) / 100,
          "Profit Bracelets":
            Math.round((monthData.Bracelets || 0) * 0.2 * 100) / 100,
          "Profit Rings": Math.round((monthData.Rings || 0) * 0.2 * 100) / 100,
        }));

        // Calculate yearly totals
        const yearlyTotals = monthlyData.reduce(
          (acc, monthData) => {
            acc["Profit Earrings"] +=
              Math.round((monthData.Earrings || 0) * 0.2 * 100) / 100;
            acc["Profit Necklaces"] +=
              Math.round((monthData.Necklaces || 0) * 0.2 * 100) / 100;
            acc["Profit Bracelets"] +=
              Math.round((monthData.Bracelets || 0) * 0.2 * 100) / 100;
            acc["Profit Rings"] +=
              Math.round((monthData.Rings || 0) * 0.2 * 100) / 100;
            return acc;
          },
          {
            Month: "Total",
            "Profit Earrings": 0,
            "Profit Necklaces": 0,
            "Profit Bracelets": 0,
            "Profit Rings": 0,
          }
        );

        // Combine monthly data and yearly total
        const sheetData = [...monthlyRows, yearlyTotals];

        // Convert the combined data to a sheet
        const ws = XLSX.utils.json_to_sheet(sheetData, {
          header: [
            "Month",
            "Profit Earrings",
            "Profit Necklaces",
            "Profit Bracelets",
            "Profit Rings",
          ],
        });

        // Append sheet to workbook
        XLSX.utils.book_append_sheet(wb, ws, `RevenueData ${item.year}`);
      });

      // Write the Excel file and save it
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
