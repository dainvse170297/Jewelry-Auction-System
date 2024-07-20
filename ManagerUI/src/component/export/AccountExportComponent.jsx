import React, { useState, useEffect } from "react";
import { Paper, Grid, Typography, IconButton } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import axios from "axios";

const AccountExportComponent = () => {
  const [accountData, setAccountData] = useState([]);

  // Function to fetch account data for the last five years
  const fetchAccountData = async () => {
    try {
      const currentYear = new Date().getFullYear();
      const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
      const responses = await Promise.all(
        years.map((year) =>
          axios.get(
            `https://fuja.azurewebsites.net/dashboard/dataAccount/${year}`
          )
        )
      );

      const data = responses.map((response) => response.data);
      setAccountData(data);
    } catch (error) {
      console.error("Error fetching account data:", error);
    }
  };

  const exportToExcel = () => {
    if (accountData.length > 0) {
      // Create a new workbook
      const wb = XLSX.utils.book_new();

      accountData.forEach((item) => {
        // Prepare monthly data rows
        const monthlyRows = item.totalAccounts.map((_, i) => ({
          Month: new Date(0, i).toLocaleString("en-US", { month: "long" }),
          "Total Accounts": item.totalAccounts[i],
          "Total Customers": item.totalCustomers[i],
          "Total Staffs": item.totalStaffs[i],
          "Total Participated Selling": item.totalParticipatedSelling[i],
        }));

        // Calculate yearly totals
        const yearlyTotals = {
          Month: "Total",
          "Total Accounts": item.totalAccounts.reduce(
            (acc, val) => acc + val,
            0
          ),
          "Total Customers": item.totalCustomers.reduce(
            (acc, val) => acc + val,
            0
          ),
          "Total Staffs": item.totalStaffs.reduce((acc, val) => acc + val, 0),
          "Total Participated Selling": item.totalParticipatedSelling.reduce(
            (acc, val) => acc + val,
            0
          ),
        };

        // Combine monthly data and yearly total
        const sheetData = [...monthlyRows, yearlyTotals];

        // Convert the combined data to a sheet
        const ws = XLSX.utils.json_to_sheet(sheetData, {
          header: [
            "Month",
            "Total Accounts",
            "Total Customers",
            "Total Staffs",
            "Total Participated Selling",
          ],
        });

        // Append sheet to workbook
        XLSX.utils.book_append_sheet(wb, ws, `AccountData ${item.year}`);
      });

      // Write the Excel file and save it
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const dataBlob = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });
      saveAs(dataBlob, `AccountData.xlsx`);
    }
  };

  // Fetch account data on component mount
  useEffect(() => {
    fetchAccountData();
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4}>
          <Typography variant="subtitle1" fontWeight="bold">
            File Title:
          </Typography>
          <Typography variant="body1">Account Data</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="subtitle1" fontWeight="bold">
            File Name:
          </Typography>
          <Typography variant="body1">AccountData</Typography>
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

export default AccountExportComponent;
