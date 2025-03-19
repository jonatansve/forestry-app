import { Alert, AlertTitle, Box } from '@mui/material';
import React from 'react';

export interface ErrorProps {
  title?: string;
  message: string;
}

export const Error: React.FC<ErrorProps> = ({ title = 'Error', message }) => {
  return (
    <Box p={2}>
      <Alert severity="error">
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Box>
  );
}; 