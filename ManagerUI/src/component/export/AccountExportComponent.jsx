import React, { useState, useEffect } from "react";
import { Paper, Grid, Typography, IconButton } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import axios from "axios";
import { getDataAccountByYear } from "../../services/apiService";

const AccountExportComponent = () => {
  const [accountData, setAccountData] = useState(null);

  // Function to fetch account data for the last five years
  const fetchAccountData = async () => {
    try {
      const currentYear = new Date().getFullYear();
      const years = Array.from(
        { length: 5 },
        (_, index) => currentYear - index
      );

      const promises = years.map(async (year) => {
        const response = await axios.get(
          `http://localhost:8080/dashboard/dataAccount/${year}`
        );
        return response.data;
      });

      const data = await Promise.all(promises);
      setAccountData(data);
    } catch (error) {
      console.error("Error fetching account data:", error);
    }
  };

  // Function to handle export to Excel for account data
  const exportToExcel = () => {
    if (accountData) {
      const mappedData = accountData.map((item) => ({
        Year: item.year,
        "Total Accounts": item.totalAccounts,
        "Total Customers": item.totalCustomers,
        "Total Staffs": item.totalStaffs,
        "Total Managers": item.totalManagers,
        "Total Customer Participated Auction": item.totalCusParticipatedAuction,
        "Total Customer Participated Selling": item.totalCusParticipatedSelling,
      }));

      const ws = XLSX.utils.json_to_sheet(mappedData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "AccountData");
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
