
import { ThemeProvider, createTheme } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";


const queryClient = new QueryClient();

// Create a theme with blue primary color
const theme = createTheme({
  palette: {
    primary: {
      main: "#0EA5E9",
      light: "#38bdf8",
      dark: "#0284c7",
    },
    background: {
      default: "#f8fafc",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;


// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Step1Upload from './components/Step1Upload';
// import Step2Selection from './components/Step2Selection';
// import Completion from './components/Completion';
// import BrsrFlow from './routes/brsrflow'; // We'll create this next
// import { ThemeProvider, createTheme } from "@mui/material";
// import { CssBaseline } from "@mui/material";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// const queryClient = new QueryClient();

// // Create a theme with blue primary color
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#0EA5E9",
//       light: "#38bdf8",
//       dark: "#0284c7",
//     },
//     background: {
//       default: "#f8fafc",
//     },
//   },
//   typography: {
//     fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
//   },
// });

// const App = () => {


//   return (
//     <QueryClientProvider client={queryClient}>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//           <Router>
//             <Routes>
//               <Route path="/brsrxmlupload" element={<BrsrFlow step="upload" />} />
//               <Route path="/brsrdataentry" element={<BrsrFlow step="dataentry" />} />
//               <Route path="/processcomplete" element={<BrsrFlow step="complete" />} />
//             </Routes>
//           </Router>
//       </ThemeProvider>
//     </QueryClientProvider>
//   );
// };

// export default App;
