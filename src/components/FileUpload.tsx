
import React, { useState, useRef } from "react";
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  LinearProgress,
  IconButton
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useTheme } from "@mui/material/styles";

interface FileUploadProps {
  fileType: string;
  accept: string;
  onFileSelected: (file: File) => void;
}

const FileUpload = ({ fileType, accept, onFileSelected }: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      processFile(selectedFile);
    }
  };

  const processFile = (selectedFile: File) => {
    setFile(selectedFile);
    setIsUploading(true);
    setIsUploaded(false);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setIsUploaded(true);
          onFileSelected(selectedFile);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setIsUploaded(false);
    setUploadProgress(0);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card 
      elevation={3}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            border: 2,
            borderStyle: "dashed",
            borderRadius: 2,
            borderColor: isDragging ? "primary.main" : "grey.300",
            p: 3,
            textAlign: "center",
            flex: 1,
            backgroundColor: isUploaded ? "success.light" : (isDragging ? `${theme.palette.primary.light}10` : "transparent"),
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            transition: "all 0.2s ease"
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {!file ? (
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <Box 
                sx={{ 
                  width: 48, 
                  height: 48, 
                  borderRadius: "50%", 
                  backgroundColor: "primary.light", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  opacity: 0.8
                }}
              >
                <UploadFileIcon sx={{ color: "white" }} />
              </Box>
              <Box>
                <Typography variant="h6">{fileType} Upload</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  Drag & drop your {fileType.toLowerCase()} file or{" "}
                  <Box 
                    component="span"
                    sx={{ 
                      color: "primary.main", 
                      cursor: "pointer", 
                      "&:hover": { textDecoration: "underline" }
                    }}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    browse
                  </Box>
                </Typography>
              </Box>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept={accept}
                onChange={handleFileChange}
              />
              <Button 
                variant="outlined" 
                color="primary"
                onClick={() => fileInputRef.current?.click()}
              >
                Select {fileType} File
              </Button>
            </Box>
          ) : (
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <Box 
                    sx={{ 
                      width: 40, 
                      height: 40, 
                      borderRadius: "50%", 
                      backgroundColor: "primary.light", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center",
                      opacity: 0.8
                    }}
                  >
                    <InsertDriveFileIcon sx={{ color: "white" }} />
                  </Box>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="body1" noWrap sx={{ fontWeight: 500 }}>
                      {file.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {(file.size / 1024).toFixed(2)} KB
                    </Typography>
                  </Box>
                </Box>
                <IconButton 
                  size="small" 
                  onClick={handleRemoveFile}
                  sx={{ color: "grey.500", "&:hover": { color: "error.main" } }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
              
              {isUploading && (
                <Box sx={{ width: "100%" }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={uploadProgress} 
                    sx={{ height: 8, borderRadius: 4 }} 
                  />
                  <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 0.5 }}>
                    <Typography variant="caption" color="text.secondary">
                      {uploadProgress}%
                    </Typography>
                  </Box>
                </Box>
              )}
              
              {isUploaded && (
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.5, color: "success.main" }}>
                  <CheckCircleIcon fontSize="small" />
                  <Typography variant="body2">Upload complete</Typography>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default FileUpload;
