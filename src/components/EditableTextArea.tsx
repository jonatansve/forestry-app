import React, { useState } from 'react';
import {
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from '@mui/material';
import { Edit as EditIcon, Check as CheckIcon } from '@mui/icons-material';

interface EditableTextAreaProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  multiline?: boolean;
  rows?: number;
}

export const EditableTextArea: React.FC<EditableTextAreaProps> = ({
  value,
  onChange,
  label,
  multiline = true,
  rows = 4,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onChange(editValue);
    setIsEditing(false);
  };

  return (
    <TextField
      fullWidth
      multiline={multiline}
      rows={rows}
      label={label}
      value={isEditing ? editValue : value}
      onChange={(e) => setEditValue(e.target.value)}
      disabled={!isEditing}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {isEditing ? (
              <Tooltip title="Save">
                <IconButton onClick={handleSave}>
                  <CheckIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Edit">
                <IconButton onClick={handleEdit}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            )}
          </InputAdornment>
        ),
      }}
    />
  );
}; 