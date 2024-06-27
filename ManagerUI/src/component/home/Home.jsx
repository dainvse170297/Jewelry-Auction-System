import React from "react";
import Navbar from "../layout/navbar/Navbar";
import Sidebar from "../layout/sidebar/Sidebar";
import ChartComponent from "./data/ChartComponent";
import StatisticsCard from "./data/StatisticsCard";
import { Grid } from "@mui/material";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />

        <div className="header">
          <div className="title">Dashboard</div>
          <div className="year">Year: 2024</div>
        </div>

        <div className="mainContent mt-3">
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={3}>
              <StatisticsCard
                title="Total Revenue"
                value="$36,358"
                percentage={9}
                isIncrease={true}
                className="mb-3"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <StatisticsCard
                title="Total Auction Session"
                value="$6,820"
                percentage={-9}
                isIncrease={false}
                className="mb-3"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <StatisticsCard
                title="Total Auction Lots"
                value="$6,820"
                percentage={-9}
                isIncrease={false}
                className="mb-3"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <StatisticsCard
                title="Total Lot Sold"
                value="$6,820"
                percentage={-9}
                isIncrease={false}
                className="mb-3"
              />
            </Grid>

            <Grid item xs={12} md={10}>
              <ChartComponent />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Home;
