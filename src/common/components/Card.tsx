import { Card as MuiCard, CardContent, CardProps as MuiCardProps } from '@mui/material';
import React from 'react';

export interface CardProps extends MuiCardProps {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, ...props }) => {
  return (
    <MuiCard {...props}>
      <CardContent>{children}</CardContent>
    </MuiCard>
  );
}; 