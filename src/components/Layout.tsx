
import React from "react";
import { Container, Box, Typography } from "@mui/material";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box sx={{ minHeight: "100vh", py: 4, px: 2 }}>
      <Container maxWidth="lg">
        <Box component="header" sx={{ mb: 5, textAlign: "center" }}>
          <Typography
            variant="h3"
            component="h1"
            fontWeight="bold"
            sx={{
              background: "linear-gradient(90deg, #0EA5E9 0%, #38bdf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            BRSRSync
          </Typography>

          <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
            Effortless BRSR data integration, from XML to database.
          </Typography>
        </Box>
        <Box component="main" sx={{ width: "100%" }}>
          {children}
        </Box>
        <Box component="footer" sx={{ mt: 8, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} BRSRSync. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Layout;
