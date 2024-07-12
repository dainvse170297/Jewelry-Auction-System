import React from "react";
import { Grid, Typography } from "@mui/material";
import RevenueExportComponent from "./RevenueExportComponent";
import AccountExportComponent from "./AccountExportComponent";
import RevenueExportCategoryComponent from "./RevenueCategoryComponent";

const Export = () => {
  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h4" align="center" gutterBottom>
          Export Data Options
        </Typography>
      </Grid>
      <Grid item xs={12} md={8}>
        <RevenueExportComponent />
        <AccountExportComponent />
        <RevenueExportCategoryComponent />
      </Grid>
    </Grid>
  );
};

export default Export;
