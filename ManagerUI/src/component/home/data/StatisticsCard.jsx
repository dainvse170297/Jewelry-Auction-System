import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";

const StatisticsCard = ({ title, value, percentage, isIncrease }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h4">{value}</Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CircularProgress
            variant="determinate"
            value={percentage}
            size={50}
            thickness={5}
            sx={{ marginRight: 1 }}
          />
          <Typography color={isIncrease ? "green" : "red"}>
            {isIncrease ? "↑" : "↓"} {percentage}%
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatisticsCard;
