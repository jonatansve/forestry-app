import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Chart } from 'primereact/chart';
import { getCollection } from "../utils/firestore.js";

const Root = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const SummaryComponent = ({ selectedArea }) => {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Area Distribution',
        data: [],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
        ],
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionData = await getCollection("areas");
        setData(collectionData);

        const labels = collectionData.map((item) => {
          switch (item.areaID) {
            case "100":
              return "Myr";
            case "200":
              return "Inägomark";
            case "166":
              return "16B";
            default:
              return `Bestånd ${item.areaID}`;
          }
        });
        const values = collectionData.map((item) => item.area);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Area Distribution',
              data: values,
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40',
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
              ],
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Area Distribution',
      },
    },
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Root>
            <Typography variant="h4" gutterBottom>
              Summary
            </Typography>
            {selectedArea && (
              <Typography variant="h6" gutterBottom>
                Selected Area: {selectedArea.label} ({selectedArea.area} ha)
              </Typography>
            )}
            <Chart type="pie" data={chartData} options={options} />
          </Root>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SummaryComponent;
