import React from "react";
import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Chart } from 'primereact/chart';

const ChartContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
}));

const TreeDistCharts = ({ data }) => {
  const chartData = {
    labels: ["Gran", "Tall", "Ordinära lövträd"],
    datasets: [
      {
        data: [
          data.fir || 0,
          data.pine || 0,
          data.leaf || 0,
        ],
        backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
        hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Tree Distribution',
      },
    },
  };

  return (
    <Grid item xs={12} sm={6}>
      <ChartContainer>
        <Typography variant="h6" gutterBottom>
          Tree Distribution
        </Typography>
        <Chart type="pie" data={chartData} options={options} />
      </ChartContainer>
    </Grid>
  );
};

export default TreeDistCharts;
