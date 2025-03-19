import React, { useState } from 'react';
import {
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from '@mui/material';
import { Edit as EditIcon, Check as CheckIcon } from '@mui/icons-material';

const EditableTextArea = ({ value, onChange, label, rows = 4 }) => {
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
      multiline
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

export default EditableTextArea;
