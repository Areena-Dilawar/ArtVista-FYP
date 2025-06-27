import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  LineChart,
  PieChart,
} from '@mui/x-charts';
import { styled } from '@mui/material/styles';

const StyledChartContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2), // Reduced padding
  marginBottom: theme.spacing(2), // Reduced margin
  height: '300px', // Fixed container height
}));

const Reports = () => {
  // Chart data
  const salesData = [
    { data: [4500, 5200, 4800, 6100, 7300, 8200], label: 'Sales 2023' },
  ];
  const xAxis = [
    { data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], scaleType: 'band' },
  ];
  const userGrowthData = [
    { data: [120, 190, 150, 210, 280, 320], label: 'New Users', area: true },
  ];
  const revenueData = [
    { id: 0, value: 35, label: 'Paintings' },
    { id: 1, value: 25, label: 'Sculptures' },
    { id: 2, value: 20, label: 'Photography' },
    { id: 3, value: 15, label: 'Digital Art' },
    { id: 4, value: 5, label: 'Other' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4" // Grid layout
    >
      {/* Sales Report - Compact */}
      <StyledChartContainer>
        <h2 className="text-lg font-semibold mb-2">Sales Report</h2>
        <BarChart
          series={salesData}
          xAxis={xAxis}
          colors={['#3b82f6']}
          height={250}
          margin={{ top: 20, bottom: 30, left: 40, right: 10 }}
        />
      </StyledChartContainer>

      {/* User Growth - Compact */}
      <StyledChartContainer>
        <h2 className="text-lg font-semibold mb-2">User Growth</h2>
        <LineChart
          series={userGrowthData}
          xAxis={xAxis}
          colors={['#10b981']}
          height={250}
          margin={{ top: 20, bottom: 30, left: 40, right: 10 }}
        />
      </StyledChartContainer>

      {/* Revenue by Category - Compact */}
      <StyledChartContainer className="md:col-span-2"> // Wider span for pie chart
        <h2 className="text-lg font-semibold mb-2">Revenue by Category</h2>
        <div className="flex justify-center">
          <PieChart
            series={[{ data: revenueData, innerRadius: 20 }]}
            colors={['#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef']}
            height={250}
            width={400}
            margin={{ top: 0, bottom: 80, left: 0, right: 0 }}
            slotProps={{
              legend: { 
                direction: 'row',
                position: { vertical: 'bottom', horizontal: 'middle' },
                padding: 0,
              }
            }}
          />
        </div>
      </StyledChartContainer>
    </motion.div>
  );
};

export default Reports;