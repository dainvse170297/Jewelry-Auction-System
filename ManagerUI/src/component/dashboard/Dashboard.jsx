import React, { useState, useEffect } from "react";
import ChartComponent from "../dashboard/data/ChartComponent";
import StatisticsCard from "../dashboard/data/StatisticsCard";
import { Grid, Button, MenuItem, Select } from "@mui/material";
import { getRevenueByYear } from "../../services/apiService";
import ExportExcel from "../../services/ExportExcel";
import JewelryPieChart from "./data/JewelryPieChart";
import JewelryBarChart from "./data/JewelryBarChart";

const Dashboard = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
  const [revenueData, setRevenueData] = useState({});
  const [selectedYear, setSelectedYear] = useState(currentYear);

  useEffect(() => {
    const fetchRevenueData = async (year) => {
      try {
        const data = await getRevenueByYear(year);
        setRevenueData((prevData) => ({ ...prevData, [year]: data }));
        console.log(">>> revenue data", data);
      } catch (error) {
        console.error(`Error fetching revenue for year ${year}:`, error);
      }
    };

    years.forEach((year) => {
      if (!revenueData[year]) {
        fetchRevenueData(year);
      }
    });
  }, [years, revenueData]);

  const handleChangeYear = (event) => {
    setSelectedYear(event.target.value);
  };

  const calculatePercentageChange = (current, previous) => {
    if (previous === 0) {
      return current > 0 ? 100 : 0;
    }
    return ((current - previous) / previous) * 100;
  };

  const selectedData = revenueData[selectedYear] || {};
  const otherYearData = revenueData[selectedYear - 1] || {};

  const selectedRevenue = selectedData.revenue || [];
  const otherYearRevenue = otherYearData.revenue || [];

  const totalSelectedRevenue = selectedRevenue.reduce(
    (total, revenue) => total + revenue,
    0
  );

  const totalOtherYearRevenue = otherYearRevenue.reduce(
    (total, revenue) => total + revenue,
    0
  );

  const percentageRevenueChange = calculatePercentageChange(
    totalSelectedRevenue,
    totalOtherYearRevenue
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

  const totalProfit = totalSelectedRevenue * 0.2 || 0; // 20% profit of Payment method
  const profitPercentage = calculatePercentageChange(
    totalProfit,
    totalOtherYearRevenue * 0.2
  );
  const isProfitIncrease = profitPercentage >= 0;
  console.log("total profits ", totalProfit);

  const totalLotPendingPayment =
    selectedData.totalAuctionLotsPendingPayment || 0;
  console.log(
    "totalLotPendingPayment",
    selectedData.totalAuctionLotsPendingPayment
  );

  const totalLotPendingPaymentPercentage = calculatePercentageChange(
    totalLotPendingPayment,
    otherYearData.totalAuctionLotsPendingPayment || 0
  );
  const isTotalLotPendingPaymentIncrease =
    totalLotPendingPaymentPercentage >= 0;

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
        <h1 className="text-center" style={{ flexGrow: 1 }}>
          Dashboard
        </h1>
        <Select
          value={selectedYear}
          onChange={handleChangeYear}
          style={{ fontSize: "0.8rem" }}
        >
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
        <div className="mainContent mt-3">
          <h3 className="text-center mt-5" style={{ flexGrow: 1 }}>
            Past Auction
          </h3>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={3}>
              <StatisticsCard
                title="Total Revenue"
                value={`$${totalSelectedRevenue}`}
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

            <Grid item xs={12} md={3}>
              <StatisticsCard
                title="Total Profit"
                value={`$${totalProfit}`}
                percentage={profitPercentage.toFixed(2)}
                isIncrease={isProfitIncrease}
                className="mb-3"
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <StatisticsCard
                title="Total Lot Pending Payments"
                value={selectedData.totalAuctionLotsPendingPayment || 0}
                percentage={totalLotPendingPaymentPercentage.toFixed(2)}
                isIncrease={isTotalLotPendingPaymentIncrease}
                className="mb-3"
              />
            </Grid>

            <Grid item xs={12} md={10}>
              <hr />
              <h3 className="text-center mt-5" style={{ flexGrow: 1 }}>
                Yearly Profit Comparison
              </h3>
              <ChartComponent
                revenueCurrentYear={revenueData[currentYear]?.revenue || []}
                revenueBeforeYear={revenueData[currentYear - 1]?.revenue || []}
                currentYearData={revenueData[currentYear] || {}}
                beforeYearData={revenueData[currentYear - 1] || {}}
              />
            </Grid>
            <hr />
            <h3 className="text-center my-5" style={{ flexGrow: 1 }}>
              Yearly Profit Comparison / dont' finish
            </h3>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <JewelryPieChart />
              </Grid>
              <Grid item xs={12} md={6}>
                <JewelryBarChart />
              </Grid>
            </Grid>
            {/* <Grid item xs={12} md={6}>
              <JewelryBarChart />
            </Grid> */}
          </Grid>

          <hr />
          <h3 className="text-center my-5" style={{ flexGrow: 1 }}>
            Account upcoming soon....
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
