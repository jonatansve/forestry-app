import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import React from 'react';

export interface ButtonProps extends MuiButtonProps {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <MuiButton
      variant="contained"
      color="primary"
      size="medium"
      {...props}
    >
      {children}
    </MuiButton>
  );
}; 