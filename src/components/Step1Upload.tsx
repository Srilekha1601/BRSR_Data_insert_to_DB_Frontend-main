import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Alert
} from "@mui/material";
import FileUpload from "./FileUpload";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

interface Step1Props {
  onNext: () => void;
}

const Step1Upload = ({ onNext }: Step1Props) => {
  const [xmlFile, setXmlFile] = useState<File | null>(null);
  const [excelTemplate, setExcelTemplate] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasProcessed, setHasProcessed] = useState(false);
  const [processingError, setProcessingError] = useState<string | null>(null);

  // const handleProcessFiles = async () => {
  //   if (!xmlFile || !excelTemplate) {
  //     return;
  //   }

  //   setIsProcessing(true);
  //   setHasProcessed(false);
  //   setProcessingError(null);

  //   try {
  //     // Simulate API call to backend
  //     await new Promise((resolve, reject) => {
  //       // 80% chance of success, 20% chance of error for demonstration
  //       setTimeout(() => {
  //         if (Math.random() > 0.2) {
  //           resolve(true);
  //         } else {
  //           reject(new Error("Failed to process files. Please try again."));
  //         }
  //       }, 2000);
  //     });

  //     setHasProcessed(true);
  //   } catch (error) {
  //     setProcessingError(
  //       error instanceof Error ? error.message : "An unknown error occurred"
  //     );
  //   } finally {
  //     setIsProcessing(false);
  //   }
  // };


  const handleProcessFiles = async () => {
    if (!xmlFile || !excelTemplate) {
      return;
    }

    setIsProcessing(true);
    setHasProcessed(false);
    setProcessingError(null);

    const formData = new FormData();
    formData.append("xml", xmlFile);
    formData.append("template", excelTemplate);

    try {
      const response = await fetch("http://192.168.1.142:8000//api/process/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to process files");
      }

      // If response is 200, mark processing as successful
      setHasProcessed(true);
    } catch (error) {
      setProcessingError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsProcessing(false);
    }
  };



  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 3
      }}>
        <Box sx={{ flex: 1 }}>
          <FileUpload
            fileType="XML"
            accept=".xml"
            onFileSelected={(file) => setXmlFile(file)}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <FileUpload
            fileType="Excel Template"
            accept=".xlsx,.xls"
            onFileSelected={(file) => setExcelTemplate(file)}
          />
        </Box>
      </Box>

      <Card elevation={3}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6">Process Files</Typography>
            <Typography variant="body2" color="text.secondary">
              {xmlFile && excelTemplate
                ? "Ready to process"
                : "Upload files to continue"}
            </Typography>
          </Box>

          {processingError && (
            <Alert
              severity="error"
              sx={{ mb: 2 }}
              icon={<ErrorOutlineIcon />}
            >
              <Typography variant="subtitle2">Processing Error</Typography>
              <Typography variant="body2">{processingError}</Typography>
            </Alert>
          )}

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Button
              variant="outlined"
              onClick={handleProcessFiles}
              disabled={!xmlFile || !excelTemplate || isProcessing || hasProcessed}
              startIcon={isProcessing && <CircularProgress size={20} />}
            >
              {isProcessing ? "Processing..." : "Process Files"}
            </Button>

            <Button
              variant="contained"
              onClick={onNext}
              disabled={!hasProcessed}
              endIcon={<ArrowForwardIcon />}
              sx={{
                background: !hasProcessed ? "#d1d5db" : "linear-gradient(90deg, #1E3A8A 0%, #3B82F6 100%)", // Gray when disabled
                color: !hasProcessed ? "#6b7280" : "black", // Dark gray text when disabled
                "&:hover": {
                  background: !hasProcessed ? "#d1d5db" : "linear-gradient(90deg, #1E40AF 0%, #60A5FA 100%)", // Hover effect
                  opacity: 0.9,
                },
                fontSize: "1rem",
                padding: "10px 20px",
              }}
            >
              Next Step
            </Button>

            {/* <Button
              variant="contained"
              onClick={onNext}
              disabled={!hasProcessed}
              endIcon={<ArrowForwardIcon />}
              sx={{
                background: "linear-gradient(90deg, #0EA5E9 0%, #38bdf8 100%)",
                "&:hover": {
                  opacity: 0.9,
                },
              }}
            >
              Next Step
            </Button> */}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Step1Upload;
