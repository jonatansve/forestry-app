import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@mui/material';
import React from 'react';

export interface TextFieldProps extends MuiTextFieldProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextField: React.FC<TextFieldProps> = ({ label, value, onChange, ...props }) => {
  return (
    <MuiTextField
      label={label}
      value={value}
      onChange={onChange}
      variant="outlined"
      fullWidth
      {...props}
    />
  );
}; 