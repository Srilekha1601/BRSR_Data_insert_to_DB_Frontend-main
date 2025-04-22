import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';

const ConfirmationDialog = ({ open, title, message, onConfirm, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirmation-dialog-title"
      PaperProps={{
        sx: {
          background: "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)",
          borderRadius: 2,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          minWidth: "400px",
        }
      }}
    >
      <DialogTitle id="confirmation-dialog-title"
        sx={{
          background: "linear-gradient(90deg, #0EA5E9 0%, #38bdf8 100%)",
          color: "white",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}>
        {title}
      </DialogTitle>
      <DialogContent sx={{ py: 3 }}>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 2,
        }}>
          <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: 18 }}>{message}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>No</Button>
        <Button onClick={onConfirm} sx={{
          background: "linear-gradient(90deg, #0EA5E9 0%, #38bdf8 100%)",
          "&:hover": {
            opacity: 0.9,
          },
        }} variant="contained">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
