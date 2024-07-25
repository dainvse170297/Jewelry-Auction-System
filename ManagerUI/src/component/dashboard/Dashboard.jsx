import React, { useState, useEffect } from "react";
import ChartComponent from "../dashboard/data/ChartComponent";
import StatisticsCard from "../dashboard/data/StatisticsCard";
import { Grid, MenuItem, Select, Button } from "@mui/material";
import { Link } from "react-router-dom";
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
  // year
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
  // month
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const [selectedMonth, setSelectedMonth] = useState(1); // Default to January
  const [revenueData, setRevenueData] = useState({});
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [accountData, setAccountData] = useState({});

  // revenue
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
  //account
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

  const handleChangeMonth = (event) => {
    setSelectedMonth(event.target.value);
  };
  // caculate %
  const calculatePercentageChange = (current, previous) => {
    if (previous === 0) {
      return current > 0 ? 100 : 0;
    }
    return ((current - previous) / previous) * 100;
  };

  //year handle
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

  //Total Auction Session %
  const percentageAuctionSessionChange = calculatePercentageChange(
    selectedData.totalAuctionSession || 0,
    otherYearData.totalAuctionSession || 0
  );
  // Total Auction Session Increase
  const isAuctionSessionIncrease = percentageAuctionSessionChange >= 0;

  //  Total Auction Lots %
  const percentageAuctionLotsChange = calculatePercentageChange(
    selectedData.totalAuctionLots || 0,
    otherYearData.totalAuctionLots || 0
  );
  // Total Auction Lots Increase
  const isAuctionLotsIncrease = percentageAuctionLotsChange >= 0;

  // total lot payment success %
  const percentageAuctionLotsSoldChange = calculatePercentageChange(
    selectedData.totalAuctionLotsSold || 0,
    otherYearData.totalAuctionLotsSold || 0
  );
  // Total Lot Payment Success Increase
  const isAuctionLotsSoldIncrease = percentageAuctionLotsSoldChange >= 0;

  // Total  = 20% of total revenue
  const totalProfit = totalSelectedRevenue * 0.2 || 0; // 20% profit of Payment method
  // % of total profit
  const profitPercentage = calculatePercentageChange(
    totalProfit,
    totalOtherYearRevenue * 0.2
  );
  // Total Profit Increase
  const isProfitIncrease = profitPercentage >= 0;

  // Total Lot Pending Payment
  const totalLotPendingPayment =
    selectedData.totalAuctionLotsPendingPayment || 0;

  // Total Lot Pending Payment %
  const totalLotPendingPaymentPercentage = calculatePercentageChange(
    totalLotPendingPayment,
    otherYearData.totalAuctionLotsPendingPayment || 0
  );
  // Total Lot Pending Payment Increase
  const isTotalLotPendingPaymentIncrease =
    totalLotPendingPaymentPercentage >= 0;

  // ----month handle---
  const monthlyRevenue = selectedData.revenue || [];
  //Total Revenue By Month
  const totalSelectedMonthRevenue = monthlyRevenue[selectedMonth - 1] || 0; // -1 for index
  // Total Revenue By before Month
  const totalOtherMonthRevenue = monthlyRevenue[selectedMonth - 2] || 0; // revenue of month in other year

  // % of total revenue  By Month
  const revenuePercentageMonth = calculatePercentageChange(
    totalSelectedMonthRevenue,
    totalOtherMonthRevenue
  );
  // Total Profit Increase By Month
  const isRevenueIncreaseMonth = revenuePercentageMonth >= 0;

  // Total profit By Month
  const totalProfitByMonth = totalSelectedMonthRevenue * 0.2 || 0; // 20% profit of Payment method
  // % of total profit By Month
  const profitPercentageMonth = calculatePercentageChange(
    totalProfitByMonth,
    totalOtherMonthRevenue * 0.2
  );
  // Total Profit Increase By Month
  const isProfitIncreaseMonth = profitPercentageMonth >= 0;

  // Convert category data for jewelry pie chart

  const monthlyRevenueCategory = selectedData.getProfitByCategory || [];
  const SelectedMonthCategoryData =
    monthlyRevenueCategory[selectedMonth - 1] || {}; // -1 for index

  console.log(">>> SelectedMonthCategoryData", SelectedMonthCategoryData);

  const convertCategoryData = (categoryData) => {
    return Object.entries(categoryData).map(([name, revenue]) => ({
      name,
      revenue: Math.round(revenue * 0.2 * 100) / 100,
    }));
  };

  const jewelryData = convertCategoryData(SelectedMonthCategoryData);

  // Convert monthly data for charts
  const convertMonthlyDataToChartData = (data, selectedYear) => {
    const yearData = data[selectedYear] || {};
    return months.map((month, index) => ({
      month,
      totalAccounts: yearData.totalAccounts ? yearData.totalAccounts[index] : 0,
      totalCustomers: yearData.totalCustomers
        ? yearData.totalCustomers[index]
        : 0,
      totalStaffs: yearData.totalStaffs ? yearData.totalStaffs[index] : 0,
      totalManagers: yearData.totalManagers ? yearData.totalManagers[index] : 0,
      totalCusParticipatedAuction: yearData.totalCusParticipatedAuction
        ? yearData.totalCusParticipatedAuction[index]
        : 0,
      totalParticipatedSelling: yearData.totalParticipatedSelling
        ? yearData.totalParticipatedSelling[index]
        : 0,
    }));
  };

  const monthlyAccountChartData = convertMonthlyDataToChartData(
    accountData,
    selectedYear
  );

  return (
    <div className="home">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h1 className="text-center">Dashboard</h1>
          <div className="mb-2">
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/export"
            >
              Go to Export
            </Button>
          </div>
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
          </Select>{" "}
          Year
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
            value={`$${(totalSelectedRevenue + totalProfit).toFixed(2)}`}
            percentage={percentageRevenueChange.toFixed(2)}
            isIncrease={isRevenueIncrease}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatisticsCard
            title="Total Profit"
            value={`$${totalProfit.toFixed(2)}`}
            percentage={profitPercentage.toFixed(2)}
            isIncrease={isProfitIncrease}
          />
        </Grid>
        <hr />

        <Grid item xs={12}>
          <Select
            value={selectedMonth}
            onChange={handleChangeMonth}
            style={{ fontSize: "0.8rem", marginLeft: "10px" }}
          >
            {months.map((month) => (
              <MenuItem key={month} value={month}>
                {month}
              </MenuItem>
            ))}
          </Select>{" "}
          Month
        </Grid>

        <Grid item xs={12} md={6}>
          <StatisticsCard
            title="Total Revenue By Month"
            value={`$${(totalSelectedMonthRevenue + totalProfitByMonth).toFixed(
              2
            )}`} //select by month and year is selected above
            percentage={revenuePercentageMonth.toFixed(2)}
            isIncrease={isRevenueIncreaseMonth}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <StatisticsCard
            title="Total Profit By Month"
            value={`$${totalProfitByMonth.toFixed(2)}`} //select by month
            percentage={profitPercentageMonth.toFixed(2)}
            isIncrease={isProfitIncreaseMonth}
          />
        </Grid>

        <hr />
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

        {/* Monthly Account Data Chart */}
        <Grid item xs={12} md={6}>
          <h3 className="text-center mt-5">Account Data Over Month </h3>
          <div className="chart-container">
            <BarChart
              width={600}
              height={300}
              data={monthlyAccountChartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
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
              <Bar dataKey="totalStaffs" fill="#ffc658" name="Total Staffs" />
              {/* <Bar dataKey="totalManagers" fill="#ff8042" />
              <Bar dataKey="totalCusParticipatedAuction" fill="#8dd1e1" />
              <Bar dataKey="totalCusParticipatedSelling" fill="#a4de6c" /> */}
            </BarChart>
          </div>
        </Grid>
        {/*  Valuation Request Data Over Month */}
        <Grid item xs={12} md={6}>
          <h3 className="text-center mt-5">
            Valuation Request Data Over Month{" "}
          </h3>
          <div className="chart-container">
            <LineChart
              width={600}
              height={300}
              data={monthlyAccountChartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              {/* <Line type="monotone" dataKey="totalAccounts" stroke="#8884d8" />
              <Line type="monotone" dataKey="totalCustomers" stroke="#82ca9d" />
              <Line type="monotone" dataKey="totalStaffs" stroke="#ffc658" />
              <Line type="monotone" dataKey="totalManagers" stroke="#ff8042" /> */}
              {/* <Line
                type="monotone"
                name="Total Customer Participated Auction"
                dataKey="totalCusParticipatedAuction"
                stroke="#8dd1e1"
              /> */}
              <Line
                type="monotone"
                name="Total Participated Selling"
                dataKey="totalParticipatedSelling"
                stroke="#a4de6c"
              />
            </LineChart>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
