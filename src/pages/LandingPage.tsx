import { Box, Button, Container, Typography, Stack, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { keyframes } from "@emotion/react";

// Typography fade-up animation
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Glowing border animation
const glowPulse = keyframes`
  0% {
    box-shadow: 0 0 10px rgba(75, 165, 233, 0.4), 0 0 20px rgba(75, 165, 233, 0.3);
  }
  50% {
    box-shadow: 0 0 15px rgba(75, 165, 233, 0.6), 0 0 25px rgba(75, 165, 233, 0.4);
  }
  100% {
    box-shadow: 0 0 10px rgba(75, 165, 233, 0.4), 0 0 20px rgba(75, 165, 233, 0.3);
  }
`;

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 6,
          borderRadius: 4,
          width: "100%",
          maxWidth: 500,
          textAlign: "center",
          border: "2px solid rgba(75, 165, 233, 0.5)",
          boxShadow: `
            0 0 10px rgba(75, 165, 233, 0.4),
            0 0 20px rgba(75, 165, 233, 0.3)
          `,
          backgroundColor: "background.paper",
          animation: `${fadeInUp} 0.8s ease-out, ${glowPulse} 3s ease-in-out infinite`,
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            color: "primary.main",
            fontWeight: 600,
            animation: `${fadeInUp} 0.6s ease-out`,
          }}
        >
          Welcome to BRSR Tool
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            mb: 5,
            color: "text.secondary",
            animation: `${fadeInUp} 0.8s ease-out`,
          }}
        >
          Choose how you want to begin
        </Typography>

        <Stack spacing={3}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={() => navigate("/brsrxmlupload")}
            sx={{ borderRadius: "12px" }} 
          >
            Start from Scratch
          </Button>

          <Button
            variant="outlined"
            size="large"
            color="primary"
            onClick={() => navigate("/brsrdataentry")}
            sx={{ borderRadius: "12px" }} 
          >
            Insert Data Directly
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default LandingPage;
