import React, { useState, useEffect } from "react";
import ChartComponent from "../home/data/ChartComponent";
import StatisticsCard from "../home/data/StatisticsCard";
import { Grid } from "@mui/material";
import axios from "axios";

const Dashboard = () => {
  const currentYear = new Date().getFullYear();
  const [revenueCurrentYear, setRevenueCurrentYear] = useState([]);
  const [revenueBeforeYear, setRevenueBeforeYear] = useState([]);

  useEffect(() => {
    const fetchRevenueCurrentYear = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/dashboard/data/${currentYear}`
        );
        setRevenueCurrentYear(response.data.revenue);
      } catch (error) {
        console.error("Error fetching current year revenue", error);
      }
    };

    const fetchRevenueBeforeYear = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/dashboard/data/${currentYear - 1}`
        );
        setRevenueBeforeYear(response.data.revenue);
      } catch (error) {
        console.error("Error fetching revenue for previous year:", error);
      }
    };

    // Call both fetch functions on component mount
    fetchRevenueCurrentYear();
    fetchRevenueBeforeYear();
  }, [currentYear]);

  const totalRevenueCurrentYear = revenueCurrentYear.reduce(
    (total, revenue) => total + revenue,
    0
  );

  const totalRevenueBeforeYear = revenueBeforeYear.reduce(
    (total, revenue) => total + revenue,
    0
  );

  const totalAuctionSession =
    revenueCurrentYear.length > 0 ? revenueCurrentYear[4] : 0;
  const totalAuctionLots =
    revenueCurrentYear.length > 0 ? revenueCurrentYear[5] : 0;
  const totalAuctionLotsSold =
    revenueCurrentYear.length > 0 ? revenueCurrentYear[6] : 0;

  return (
    <div className="home">
      <div className="row">
        <h2 className="text-center">Dashboard</h2>
      </div>
      <div className="mainContent mt-3">
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={3}>
            <StatisticsCard
              title="Total Revenue"
              value={`$${totalRevenueCurrentYear}`}
              percentage={9}
              isIncrease={true}
              className="mb-3"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatisticsCard
              title="Total Auction Session"
              value={`$${totalAuctionSession}`}
              percentage={-9}
              isIncrease={false}
              className="mb-3"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatisticsCard
              title="Total Auction Lots"
              value={`$${totalAuctionLots}`}
              percentage={-9}
              isIncrease={false}
              className="mb-3"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatisticsCard
              title="Total Lot Sold"
              value={`$${totalAuctionLotsSold}`}
              percentage={-9}
              isIncrease={false}
              className="mb-3"
            />
          </Grid>

          <Grid item xs={12} md={10}>
            <ChartComponent
              revenueCurrentYear={revenueCurrentYear}
              revenueBeforeYear={revenueBeforeYear}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Dashboard;
