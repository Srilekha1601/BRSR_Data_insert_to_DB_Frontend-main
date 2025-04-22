import React, { useState, useRef } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Alert
} from "@mui/material";
import FileUpload, { FileUploadRef } from "./FileUpload";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import StorageIcon from "@mui/icons-material/Storage";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Step1Props {
  onBack: () => void;
  onNext: () => void;
}

const Step1Upload = ({ onNext, onBack }: Step1Props) => {
  const [xmlFile, setXmlFile] = useState<File | null>(null);
  const [excelTemplate, setExcelTemplate] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasProcessed, setHasProcessed] = useState(false);
  const [processingError, setProcessingError] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusDetails, setStatusDetails] = useState<{
    message: string;
    details?: string;
  } | null>(null);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [showMessage, setShowMessage] = useState(false);
  const [showSectionInfo, setShowSectionInfo] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File[]>([]);
  const xmlFileUploadRef = useRef<FileUploadRef>(null);
  const excelFileUploadRef = useRef<FileUploadRef>(null);
  const [exitDialogOpen, setExitDialogOpen] = useState(false);

  const handleReset = () => {
    // Reset only XML file upload component
    if (xmlFileUploadRef.current) {
      xmlFileUploadRef.current.reset();
    }

    // Reset only XML related states
    setXmlFile(null);
    setSelectedFiles([]);
    setSelectedFile([]);
    setStatus("idle");
    setStatusDetails(null);
    setResponseMessage(null);
    setShowMessage(false);
    setShowSectionInfo(false);
    setProcessingError(null);
    setHasProcessed(false);
    setIsProcessing(false);
  };

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

  const handleExitConfirm = () => {
    setExitDialogOpen(false);
    onBack();
  };

  const handleExitCancel = () => {
    setExitDialogOpen(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 1, color: '#005c99' }}>
        Step 1: Upload XML
      </Typography>
      <Accordion sx={{ mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="body1" sx={{ color: '#005c99',fontWeight: 'bold' }}>
            Need help with uploading files?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" sx={{ color: '#005c99' }}>
            Upload the <strong>XML file</strong> and the <strong>Section Template Excel file</strong>, then click the <strong>Process Files</strong> button to begin.
            <br /><br />
            If you want to continue to Step 2 and insert data into the database, press <strong>Next Step</strong>. Otherwise, click <strong>Reset XML File</strong> to upload a new XML file.
            <br /><br />
            In Step 2, you can view all the company names from the processed XML files in the <strong>Select Excel File</strong> dropdown.
            <br /><br />
            <em>Note:</em> You only need to upload the Section Template Excel file once — it will be used for all XML files.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 3
      }}>
        <Box sx={{ flex: 1 }}>
          <FileUpload
            ref={xmlFileUploadRef}
            fileType="XML"
            accept=".xml"
            onFileSelected={(file) => setXmlFile(file)}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <FileUpload
            ref={excelFileUploadRef}
            fileType="Excel Template"
            accept=".xlsx,.xls"
            onFileSelected={(file) => setExcelTemplate(file)}
          />
        </Box>
      </Box>

      <Card elevation={3}>
        <CardContent sx={{ p: 3 }}>
          {/* <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6">Process Files</Typography>
            <Typography variant="body2" color="text.secondary">
              {xmlFile && excelTemplate
                ? "Ready to process"
                : "Upload files to continue"}
            </Typography>
          </Box> */}

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

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
              mt: 3,
            }}
          >
            {/* Left Group: Back and Reset */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button variant="outlined" onClick={() => setExitDialogOpen(true)}>
                Exit
              </Button>
              <Dialog
                open={exitDialogOpen}
                onClose={handleExitCancel}
                aria-labelledby="exit-dialog-title"
                PaperProps={{
                  sx: {
                    background: "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)",
                    borderRadius: 2,
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                    minWidth: "400px",
                  }
                }}
              >
                <DialogTitle
                  id="exit-dialog-title"
                  sx={{
                    background: "linear-gradient(90deg, #0EA5E9 0%, #38bdf8 100%)",
                    color: "white",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <ErrorOutlineIcon />
                  Confirm Exit
                </DialogTitle>
                <DialogContent sx={{ py: 3 }}>
                  <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    p: 2,
                  }}>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      Are you sure you want to exit?
                    </Typography>
                  </Box>
                </DialogContent>
                <DialogActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    onClick={handleExitCancel}
                    variant="outlined"
                    sx={{
                      color: "#0EA5E9",
                      borderColor: "#0EA5E9",
                      "&:hover": {
                        borderColor: "#0EA5E9",
                        backgroundColor: "rgba(14, 165, 233, 0.04)",
                      },
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleExitConfirm}
                    variant="contained"
                    sx={{
                      background: "linear-gradient(90deg, #0EA5E9 0%, #38bdf8 100%)",
                      "&:hover": {
                        opacity: 0.9,
                      },
                    }}
                  >
                    Yes, Exit
                  </Button>
                </DialogActions>
              </Dialog>
              <Button variant="outlined" onClick={handleReset}>
                Reset XML File
              </Button>
            </Box>

            {/* Right Group: Process and Next */}
            <Box sx={{ display: "flex", gap: 2 }}>
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
                  background: !hasProcessed ? "#d1d5db" : "linear-gradient(90deg, #1E3A8A 0%, #3B82F6 100%)",
                  color: !hasProcessed ? "#6b7280" : "black",
                  "&:hover": {
                    background: !hasProcessed ? "#d1d5db" : "linear-gradient(90deg, #1E40AF 0%, #60A5FA 100%)",
                    opacity: 0.9,
                  },
                  fontSize: "1rem",
                  padding: "10px 20px",
                }}
              >
                Next Step
              </Button>
            </Box>
          </Box>

        </CardContent>
      </Card>
    </Box>
  );
};

export default Step1Upload;
