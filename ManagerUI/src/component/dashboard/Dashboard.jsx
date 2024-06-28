import React, { useState, useEffect } from "react";
import ChartComponent from "../dashboard/data/ChartComponent";
import StatisticsCard from "../dashboard/data/StatisticsCard";
import { Grid, Button } from "@mui/material";
import { getRevenueByYear } from "../../services/apiService";

const Dashboard = () => {
  const currentYear = new Date().getFullYear();
  const [revenueCurrentYear, setRevenueCurrentYear] = useState([]);
  const [revenueBeforeYear, setRevenueBeforeYear] = useState([]);
  const [currentYearData, setCurrentYearData] = useState({});
  const [beforeYearData, setBeforeYearData] = useState({});
  const [selectedYear, setSelectedYear] = useState(currentYear);

  useEffect(() => {
    const fetchRevenueCurrentYear = async () => {
      try {
        const data = await getRevenueByYear(currentYear);
        setRevenueCurrentYear(data.revenue);
        setCurrentYearData(data);
      } catch (error) {
        console.error("Error fetching current year revenue", error);
      }
    };

    const fetchRevenueBeforeYear = async () => {
      try {
        const data = await getRevenueByYear(currentYear - 1);
        setRevenueBeforeYear(data.revenue);
        setBeforeYearData(data);
      } catch (error) {
        console.error("Error fetching revenue for previous year:", error);
      }
    };

    fetchRevenueCurrentYear();
    fetchRevenueBeforeYear();
  }, [currentYear]);

  const calculatePercentageChange = (current, previous) => {
    if (previous === 0) {
      return current > 0 ? 100 : 0;
    }
    return ((current - previous) / previous) * 100;
  };

  const totalRevenueCurrentYear = revenueCurrentYear.reduce(
    (total, revenue) => total + revenue,
    0
  );

  const totalRevenueBeforeYear = revenueBeforeYear.reduce(
    (total, revenue) => total + revenue,
    0
  );

  const handleToggleYear = () => {
    setSelectedYear((prevYear) =>
      prevYear === currentYear ? currentYear - 1 : currentYear
    );
  };

  const selectedData =
    selectedYear === currentYear ? currentYearData : beforeYearData;
  const selectedRevenue =
    selectedYear === currentYear ? revenueCurrentYear : revenueBeforeYear;

  const otherYearData =
    selectedYear === currentYear ? beforeYearData : currentYearData;
  const otherYearRevenue =
    selectedYear === currentYear ? revenueBeforeYear : revenueCurrentYear;

  const percentageRevenueChange = calculatePercentageChange(
    selectedRevenue.reduce((total, revenue) => total + revenue, 0),
    otherYearRevenue.reduce((total, revenue) => total + revenue, 0)
  );
  const isRevenueIncrease = percentageRevenueChange >= 0;

  const percentageAuctionSessionChange = calculatePercentageChange(
    selectedData.totalAuctionSession || 0,
    otherYearData.totalAuctionSession || 0
  );
  const isAuctionSessionIncrease = percentageAuctionSessionChange >= 0;

  const percentageAuctionLotsChange = calculatePercentageChange(
    selectedData.totalAuctionLots || 0,
    otherYearData.totalAuctionLots || 0
  );
  const isAuctionLotsIncrease = percentageAuctionLotsChange >= 0;

  const percentageAuctionLotsSoldChange = calculatePercentageChange(
    selectedData.totalAuctionLotsSold || 0,
    otherYearData.totalAuctionLotsSold || 0
  );
  const isAuctionLotsSoldIncrease = percentageAuctionLotsSoldChange >= 0;

  return (
    <div className="home">
      <div
        className="row"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 className="text-center" style={{ flexGrow: 1 }}>
          Dashboard
        </h2>
        <Button
          variant="contained"
          onClick={handleToggleYear}
          style={{ fontSize: "0.8rem" }}
        >
          Show{" "}
          {selectedYear === currentYear
            ? beforeYearData.year
            : currentYearData.year}
        </Button>
      </div>
      <div className="mainContent mt-3">
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={3}>
            <StatisticsCard
              title="Total Revenue"
              value={`$${selectedRevenue.reduce(
                (total, revenue) => total + revenue,
                0
              )}`}
              percentage={percentageRevenueChange.toFixed(2)}
              isIncrease={isRevenueIncrease}
              className="mb-3"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatisticsCard
              title="Total Auction Session"
              value={selectedData.totalAuctionSession || 0}
              percentage={percentageAuctionSessionChange.toFixed(2)}
              isIncrease={isAuctionSessionIncrease}
              className="mb-3"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatisticsCard
              title="Total Auction Lots"
              value={selectedData.totalAuctionLots || 0}
              percentage={percentageAuctionLotsChange.toFixed(2)}
              isIncrease={isAuctionLotsIncrease}
              className="mb-3"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatisticsCard
              title="Total Lot Sold"
              value={selectedData.totalAuctionLotsSold || 0}
              percentage={percentageAuctionLotsSoldChange.toFixed(2)}
              isIncrease={isAuctionLotsSoldIncrease}
              className="mb-3"
            />
          </Grid>

          <Grid item xs={12} md={10}>
            <ChartComponent
              revenueCurrentYear={revenueCurrentYear}
              revenueBeforeYear={revenueBeforeYear}
              currentYearData={currentYearData}
              beforeYearData={beforeYearData}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Dashboard;
