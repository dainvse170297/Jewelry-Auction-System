import React, { useState, useEffect } from "react";
import ChartComponent from "../dashboard/data/ChartComponent";
import StatisticsCard from "../dashboard/data/StatisticsCard";
import { Grid, MenuItem, Select } from "@mui/material";
import {
  getRevenueByYear,
  getDataAccountByYear,
} from "../../services/apiService";
import JewelryPieChart from "./data/JewelryPieChart";
import "./dashboard.scss";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";

const Dashboard = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
  const [revenueData, setRevenueData] = useState({});
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [accountData, setAccountData] = useState({});

  useEffect(() => {
    const fetchRevenueData = async (year) => {
      try {
        const data = await getRevenueByYear(year);
        setRevenueData((prevData) => ({ ...prevData, [year]: data }));
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

  useEffect(() => {
    const fetchAccountData = async (year) => {
      try {
        const data = await getDataAccountByYear(year);
        setAccountData((prevData) => ({ ...prevData, [year]: data }));
      } catch (error) {
        console.error(`Error fetching account data for year ${year}:`, error);
      }
    };

    years.forEach((year) => {
      if (!accountData[year]) {
        fetchAccountData(year);
      }
    });
  }, [years, accountData]);

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

  const totalSelectedRevenue = (selectedData.revenue || []).reduce(
    (total, revenue) => total + revenue,
    0
  );

  const totalOtherYearRevenue = (otherYearData.revenue || []).reduce(
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

  const totalLotPendingPayment =
    selectedData.totalAuctionLotsPendingPayment || 0;

  const totalLotPendingPaymentPercentage = calculatePercentageChange(
    totalLotPendingPayment,
    otherYearData.totalAuctionLotsPendingPayment || 0
  );
  const isTotalLotPendingPaymentIncrease =
    totalLotPendingPaymentPercentage >= 0;
  // category
  const convertCategoryData = (categoryData) => {
    return Object.entries(categoryData).map(([name, revenue]) => ({
      name,
      revenue: revenue * 0.2,
    }));
  };

  const jewelryData = convertCategoryData(
    selectedData.getProfitByCategory ? selectedData.getProfitByCategory[0] : {}
  );

  // Account data
  const convertToChartData = (data) => {
    return Object.keys(data).map((year) => ({
      year: year,
      ...data[year],
    }));
  };

  const accountChartData = convertToChartData(accountData);

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
        <Grid container spacing={3} justifyContent="center" mt={3}>
          <Grid item xs={12} md={3}>
            <StatisticsCard
              title="Total Auction Session"
              value={selectedData.totalAuctionSession || 0}
              percentage={percentageAuctionSessionChange.toFixed(2)}
              isIncrease={isAuctionSessionIncrease}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatisticsCard
              title="Total Auction Lots"
              value={selectedData.totalAuctionLots || 0}
              percentage={percentageAuctionLotsChange.toFixed(2)}
              isIncrease={isAuctionLotsIncrease}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatisticsCard
              title="Total Lot Pending Payments"
              value={selectedData.totalAuctionLotsPendingPayment || 0}
              percentage={totalLotPendingPaymentPercentage.toFixed(2)}
              isIncrease={isTotalLotPendingPaymentIncrease}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatisticsCard
              title="Total Lot Payment Success"
              value={selectedData.totalAuctionLotsSold || 0}
              percentage={percentageAuctionLotsSoldChange.toFixed(2)}
              isIncrease={isAuctionLotsSoldIncrease}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatisticsCard
              title="Total Revenue"
              value={`$${totalSelectedRevenue}`}
              percentage={percentageRevenueChange.toFixed(2)}
              isIncrease={isRevenueIncrease}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatisticsCard
              title="Total Profit"
              value={`$${totalProfit}`}
              percentage={profitPercentage.toFixed(2)}
              isIncrease={isProfitIncrease}
            />
          </Grid>

          <hr />

          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <h3 className="text-center my-5">Profit by Jewelry Type</h3>
            </Grid>
            <Grid item xs={12} md={6}>
              <JewelryPieChart data={jewelryData} />
            </Grid>
          </Grid>
          <hr />
          <Grid item xs={12} md={10}>
            <hr />
            <h3 className="text-center mt-5">Yearly Profit Comparison</h3>
            <ChartComponent
              revenueCurrentYear={revenueData[currentYear]?.revenue || []}
              revenueBeforeYear={revenueData[currentYear - 1]?.revenue || []}
              currentYearData={revenueData[currentYear] || {}}
              beforeYearData={revenueData[currentYear - 1] || {}}
            />
          </Grid>
          <Grid item xs={12} md={10}>
            <h3 className="text-center mt-5">Account Data Over Years</h3>
            <BarChart
              width={1000}
              height={500}
              data={accountChartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalAccounts" fill="#8884d8" />
              <Bar dataKey="totalCustomers" fill="#82ca9d" />
              <Bar dataKey="totalStaffs" fill="#ffc658" />
              <Bar dataKey="customerParticipationRatio" fill="#ff8c00" />
            </BarChart>
          </Grid>

          <Grid item xs={12} md={10}>
            <h3 className="text-center mt-5">Participation Rate Over Years</h3>
            <LineChart
              width={1000}
              height={500}
              data={accountChartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="totalCusParticipatedAuction"
                stroke="#8884d8"
              />
              <Line
                type="monotone"
                dataKey="totalCusParticipatedSelling"
                stroke="#82ca9d"
              />
            </LineChart>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Dashboard;
