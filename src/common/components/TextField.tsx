import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@mui/material';
import React from 'react';

export interface TextFieldProps extends Omit<MuiTextFieldProps, 'label' | 'value' | 'onChange'> {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextField: React.FC<TextFieldProps> = (props) => {
  return <MuiTextField {...props} />;
}; 