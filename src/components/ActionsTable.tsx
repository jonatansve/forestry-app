import React, { useState, useEffect } from 'react';
import {
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { getCollection, deleteDocument } from '../utils/firestore';

interface Action {
  id: string;
  name: string;
  description: string;
  date: string;
  status: string;
}

interface ActionsTableProps {
  onEdit: (action: Action) => void;
  loading?: boolean;
}

export const ActionsTable: React.FC<ActionsTableProps> = ({
  onEdit,
  loading = false,
}) => {
  const [actions, setActions] = useState<Action[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActions = async () => {
      try {
        const data = await getCollection('actions');
        setActions(data as Action[]);
      } catch (err) {
        setError('Failed to fetch actions');
        console.error(err);
      }
    };

    fetchActions();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteDocument('actions', id);
      setActions(actions.filter(action => action.id !== id));
    } catch (err) {
      setError('Failed to delete action');
      console.error(err);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <TableContainer component={Paper}>
      {loading && <LinearProgress />}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {actions.map((action) => (
            <TableRow key={action.id}>
              <TableCell>{action.name}</TableCell>
              <TableCell>{action.description}</TableCell>
              <TableCell>{action.date}</TableCell>
              <TableCell>{action.status}</TableCell>
              <TableCell>
                <Tooltip title="Edit">
                  <IconButton onClick={() => onEdit(action)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton onClick={() => handleDelete(action.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}; 