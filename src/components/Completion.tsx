
import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

interface CompletionProps {
  onReset: () => void;
}

const Completion = ({ onReset }: CompletionProps) => {
  return (
    <Card elevation={4} sx={{ maxWidth: 600, mx: "auto" }}>
      <CardContent sx={{ p: 4, textAlign: "center" }}>
        <Box 
          sx={{ 
            width: 64, 
            height: 64, 
            borderRadius: "50%", 
            bgcolor: "success.light", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            mx: "auto",
            mb: 3,
          }}
        >
          <CheckCircleIcon sx={{ fontSize: 32, color: "success.dark" }} />
        </Box>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Process Completed Successfully
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Your data has been successfully processed and inserted into the database.
          </Typography>
        </Box>
        
        {/* <Paper 
          variant="outlined" 
          sx={{ 
            p: 2, 
            bgcolor: "primary.light", 
            color: "primary.contrastText", 
            mb: 4,
            borderRadius: 2,
            opacity: 0.9,
          }}
        >
          <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>
            Operation Summary:
          </Typography>
          <List dense disablePadding>
            <ListItem sx={{ py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 24 }}>
                <FiberManualRecordIcon sx={{ fontSize: 8, color: "primary.contrastText" }} />
              </ListItemIcon>
              <ListItemText primary="Files processed: 2" />
            </ListItem>
            <ListItem sx={{ py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 24 }}>
                <FiberManualRecordIcon sx={{ fontSize: 8, color: "primary.contrastText" }} />
              </ListItemIcon>
              <ListItemText primary="Records inserted: 87" />
            </ListItem>
            <ListItem sx={{ py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 24 }}>
                <FiberManualRecordIcon sx={{ fontSize: 8, color: "primary.contrastText" }} />
              </ListItemIcon>
              <ListItemText primary="Processing time: 3.4 seconds" />
            </ListItem>
          </List>
        </Paper> */}
        
        <Button 
          variant="contained" 
          onClick={onReset}
          sx={{ 
            minWidth: 200,
            background: "linear-gradient(90deg, #0EA5E9 0%, #38bdf8 100%)",
            "&:hover": {
              opacity: 0.9,
            },
          }}
        >
          Start New Process
        </Button>
      </CardContent>
    </Card>
  );
};

export default Completion;
