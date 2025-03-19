import React, { useState } from 'react';
import {
  IconButton,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
} from '@mui/material';
import { Edit as EditIcon, Check as CheckIcon, Close as CloseIcon } from '@mui/icons-material';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip as ChartTooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  Legend
);

interface AgeTableProps {
  data: {
    id: string;
    age: number;
    count: number;
  }[];
  onEdit: (id: string, value: number) => void;
  loading?: boolean;
}

export const AgeTable: React.FC<AgeTableProps> = ({
  data,
  onEdit,
  loading = false,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  const handleEdit = (id: string, value: number) => {
    setEditingId(id);
    setEditValue(value.toString());
  };

  const handleSave = () => {
    if (editingId && editValue) {
      onEdit(editingId, parseInt(editValue, 10));
      setEditingId(null);
      setEditValue('');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue('');
  };

  const chartData = {
    labels: data.map((item) => `${item.age} years`),
    datasets: [
      {
        label: 'Tree Count',
        data: data.map((item) => item.count),
        backgroundColor: ['#1976d2'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Tree Age Distribution',
      },
    },
  };

  return (
    <div>
      <TableContainer component={Paper}>
        {loading && <LinearProgress />}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Age (years)</TableCell>
              <TableCell>Count</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {editingId === item.id ? (
                    <TextField
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      type="number"
                      size="small"
                    />
                  ) : (
                    item.age
                  )}
                </TableCell>
                <TableCell>{item.count}</TableCell>
                <TableCell>
                  {editingId === item.id ? (
                    <>
                      <Tooltip title="Save">
                        <IconButton onClick={handleSave}>
                          <CheckIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Cancel">
                        <IconButton onClick={handleCancel}>
                          <CloseIcon />
                        </IconButton>
                      </Tooltip>
                    </>
                  ) : (
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleEdit(item.id, item.age)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ marginTop: '2rem' }}>
        <Bar options={chartOptions} data={chartData} />
      </div>
    </div>
  );
}; 