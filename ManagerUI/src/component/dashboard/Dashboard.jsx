import React from "react";
import ChartComponent from "../home/data/ChartComponent";
import StatisticsCard from "../home/data/StatisticsCard";
import { Grid } from "@mui/material";

const Dashboard = () => {
  return (
    <div className="home">
      <div className="row">
        <h2 className="text-center">Dashboard</h2>
      </div>
      <div className="mainContent mt-3">
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={3}>
            <StatisticsCard
              title="Yearly Breakup"
              value="$36,358"
              percentage={9}
              isIncrease={true}
              className="mb-3"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatisticsCard
              title="Monthly Earnings"
              value="$6,820"
              percentage={-9}
              isIncrease={false}
              className="mb-3"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatisticsCard
              title="Monthly Earnings"
              value="$6,820"
              percentage={-9}
              isIncrease={false}
              className="mb-3"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatisticsCard
              title="Monthly Earnings"
              value="$6,820"
              percentage={-9}
              isIncrease={false}
              className="mb-3"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatisticsCard
              title="Yearly Breakup"
              value="$36,358"
              percentage={9}
              isIncrease={true}
              className="mb-3"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatisticsCard
              title="Monthly Earnings"
              value="$6,820"
              percentage={-9}
              isIncrease={false}
              className="mb-3"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatisticsCard
              title="Monthly Earnings"
              value="$6,820"
              percentage={-9}
              isIncrease={false}
              className="mb-3"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatisticsCard
              title="Monthly Earnings"
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
  );
};

export default Dashboard;
