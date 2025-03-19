import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableProps as MuiTableProps,
} from '@mui/material';
import React from 'react';

export interface Column<T> {
  id: keyof T;
  label: string;
  render?: (value: T[keyof T]) => React.ReactNode;
}

export interface TableProps<T> extends MuiTableProps {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
}

export function Table<T>({ columns, data, onRowClick, ...props }: TableProps<T>) {
  return (
    <TableContainer component={Paper}>
      <MuiTable {...props}>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={String(column.id)}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              onClick={() => onRowClick?.(row)}
              sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
            >
              {columns.map((column) => (
                <TableCell key={String(column.id)}>
                  {column.render
                    ? column.render(row[column.id])
                    : String(row[column.id])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
} 