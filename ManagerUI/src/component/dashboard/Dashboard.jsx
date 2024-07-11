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

  // Convert category data for jewelry pie chart
  const convertCategoryData = (categoryData) => {
    return Object.entries(categoryData).map(([name, revenue]) => ({
      name,
      revenue: revenue * 0.2,
    }));
  };

  const jewelryData = convertCategoryData(
    selectedData.getProfitByCategory &&
      selectedData.getProfitByCategory.length > 0
      ? selectedData.getProfitByCategory[0]
      : {}
  );

  // Convert account data for bar and line charts
  const convertToChartData = (data) => {
    return Object.keys(data).map((year) => ({
      year: year,
      ...data[year],
    }));
  };

  const accountChartData = convertToChartData(accountData);

  return (
    <div className="home">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h1 className="text-center">Dashboard</h1>
          <Select
            value={selectedYear}
            onChange={handleChangeYear}
            style={{ fontSize: "0.8rem", marginLeft: "10px" }}
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        {/* Statistics Cards */}
        <Grid item xs={12} md={4}>
          <StatisticsCard
            title="Total Auction Session"
            value={selectedData.totalAuctionSession || 0}
            percentage={percentageAuctionSessionChange.toFixed(2)}
            isIncrease={isAuctionSessionIncrease}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatisticsCard
            title="Total Auction Lots"
            value={selectedData.totalAuctionLots || 0}
            percentage={percentageAuctionLotsChange.toFixed(2)}
            isIncrease={isAuctionLotsIncrease}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatisticsCard
            title="Total Lot Pending Payments"
            value={selectedData.totalAuctionLotsPendingPayment || 0}
            percentage={totalLotPendingPaymentPercentage.toFixed(2)}
            isIncrease={isTotalLotPendingPaymentIncrease}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatisticsCard
            title="Total Lot Payment Success"
            value={selectedData.totalAuctionLotsSold || 0}
            percentage={percentageAuctionLotsSoldChange.toFixed(2)}
            isIncrease={isAuctionLotsSoldIncrease}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatisticsCard
            title="Total Revenue"
            value={`$${totalSelectedRevenue}`}
            percentage={percentageRevenueChange.toFixed(2)}
            isIncrease={isRevenueIncrease}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatisticsCard
            title="Total Profit"
            value={`$${totalProfit}`}
            percentage={profitPercentage.toFixed(2)}
            isIncrease={isProfitIncrease}
          />
        </Grid>

        {/* Jewelry Pie Chart */}
        <Grid item xs={12} md={4}>
          <h3 className="text-center my-5">Profit by Jewelry Type</h3>
          <JewelryPieChart data={jewelryData} />
        </Grid>

        {/* Yearly Profit Comparison Chart */}
        <Grid item xs={12} md={7}>
          <h3 className="text-center mt-5">Yearly Profit Comparison</h3>
          <ChartComponent
            revenueCurrentYear={revenueData[currentYear]?.revenue || []}
            revenueBeforeYear={revenueData[currentYear - 1]?.revenue || []}
            currentYearData={revenueData[currentYear] || {}}
            beforeYearData={revenueData[currentYear - 1] || {}}
          />
        </Grid>

        {/* Account Data Over Years Bar Chart */}
        <Grid item xs={12} md={6}>
          <div className="chart-container">
            <h3 className="text-center mt-5">Account Data Over Years</h3>
            <BarChart
              width={500}
              height={300}
              data={accountChartData}
              margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="totalAccounts"
                fill="#8884d8"
                name="Total Accounts"
              />
              <Bar
                dataKey="totalCustomers"
                fill="#82ca9d"
                name="Total Customers"
              />
              <Bar dataKey="totalStaffs" fill="#DC0083" name="Total Staffs" />
              <Bar
                dataKey="totalManagers"
                fill="#ffc658"
                name="Total Managers"
              />
            </BarChart>
          </div>
        </Grid>

        {/* Participation Rate Over Years Line Chart */}
        <Grid item xs={12} md={6}>
          <div className="chart-container">
            <h3 className="text-center mt-5">Participation Rate Over Years</h3>
            <LineChart
              width={500}
              height={300}
              data={accountChartData}
              margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="totalCusParticipatedAuction"
                name="Total Customer Participated Auction"
                stroke="#8884d8"
              />
              <Line
                type="monotone"
                dataKey="totalCusParticipatedSelling"
                name="Total Customer Participated Selling"
                stroke="#82ca9d"
              />
            </LineChart>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
