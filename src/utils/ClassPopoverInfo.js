import React from 'react';
import {
  Card,
  CardContent,
  Popover,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Info as InfoIcon } from '@mui/icons-material';

const ClassPopoverInfo = ({ info, anchorEl, onClose }) => {
  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Card>
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {info}
          </Typography>
        </CardContent>
      </Card>
    </Popover>
  );
};

export const InfoButton = ({ info }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="More information">
        <IconButton onClick={handleClick} size="small">
          <InfoIcon />
        </IconButton>
      </Tooltip>
      <ClassPopoverInfo
        info={info}
        anchorEl={anchorEl}
        onClose={handleClose}
      />
    </>
  );
};

export default ClassPopoverInfo;
