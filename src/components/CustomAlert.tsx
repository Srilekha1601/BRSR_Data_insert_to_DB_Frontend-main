import React from 'react';
import { Snackbar, Alert as MuiAlert, AlertColor } from '@mui/material';

interface CustomAlertProps {
  open: boolean;
  message: string;
  onClose: () => void;
  severity?: AlertColor; // <- This is the correct type
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  open,
  message,
  onClose,
  severity = "success",
}) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <MuiAlert severity={severity} onClose={onClose} variant="filled">
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default CustomAlert;
