import React, { useState, useEffect, useCallback } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TreeDistCharts = ({ data }) => {
  const [chartData, setChartData] = useState(null);
  const [options, setOptions] = useState(null);

  const updateChartData = useCallback(() => {
    if (!data) return;

    const speciesData = {};
    const ageData = {};
    const heightData = {};

    data.forEach(tree => {
      // Species distribution
      speciesData[tree.species] = (speciesData[tree.species] || 0) + 1;

      // Age distribution (grouped by decades)
      const ageDecade = Math.floor(tree.age / 10) * 10;
      const ageRange = `${ageDecade}-${ageDecade + 9}`;
      ageData[ageRange] = (ageData[ageRange] || 0) + 1;

      // Height distribution (grouped by 5m intervals)
      const heightInterval = Math.floor(tree.height / 5) * 5;
      const heightRange = `${heightInterval}-${heightInterval + 4}`;
      heightData[heightRange] = (heightData[heightRange] || 0) + 1;
    });

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Tree Distribution Charts'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1
          }
        }
      }
    };

    setOptions(chartOptions);

    setChartData({
      labels: ['Species', 'Age (years)', 'Height (m)'],
      datasets: [
        {
          label: 'Species Distribution',
          data: Object.values(speciesData),
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          label: 'Age Distribution',
          data: Object.values(ageData),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          label: 'Height Distribution',
          data: Object.values(heightData),
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
    });
  }, [data]);

  useEffect(() => {
    updateChartData();
  }, [updateChartData]);

  if (!chartData) return null;

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default TreeDistCharts;
