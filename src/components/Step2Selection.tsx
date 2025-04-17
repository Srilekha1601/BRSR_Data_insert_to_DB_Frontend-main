// import React, { useState } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   MenuItem,
//   FormControl,
//   Select,
//   InputLabel,
//   Alert,
//   CircularProgress,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import StorageIcon from "@mui/icons-material/Storage";
// import TableViewIcon from "@mui/icons-material/TableView";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
// import InfoIcon from "@mui/icons-material/Info";
// import FileUpload from "./FileUpload";

// interface Step2Props {
//   onBack: () => void;
//   onComplete: () => void;
//   processedSections: string[];
//   setProcessedSections: (sections: string[]) => void;
// }

// // Mock data for sections
// const SECTIONS = [

//   {
//     id: "all",
//     name: "All Sections"
//   },
//   {
//     id: "A",
//     name: "Section A",
//     file: "dummy_template_sectionA.xlsx",
//     templatePath: "/templates/dummy_template_sectionA.xlsx"
//   },
//   // { 
//   //   id: "A", 
//   //   name: "Section A", 
//   //   file: "Data_insert_using_template_BRSR_dev_SectionA.xlsx",
//   //   templatePath: "/templates/Data_insert_using_template_BRSR_dev_SectionA.xlsx"
//   // },
//   {
//     id: "B",
//     name: "Section B",
//     file: "dummy_template_sectionB.xlsx",
//     templatePath: "/templates/dummy_template_sectionB.xlsx"
//   },
//   {
//     id: "C Principle 1",
//     name: "Section C Princliple 1",
//     file: "dummy_template_sectionC.xlsx",
//     templatePath: "/templates/dummy_template_sectionC.xlsx"
//   },
//   // {
//   //   id: "C Principle 2",
//   //   name: "Section C Princliple 2",
//   //   file: "Data_insert_using_template_BRSR_dev_SectionC_P2.xlsx",
//   //   templatePath: "/templates/Data_insert_using_template_BRSR_dev_SectionC_P2.xlsx"
//   // },
//   // {
//   //   id: "C Principle 3",
//   //   name: "Section C Princliple 3",
//   //   file: "Data_insert_using_template_BRSR_dev_SectionC_P3.xlsx",
//   //   templatePath: "/templates/Data_insert_using_template_BRSR_dev_SectionC_P3.xlsx"
//   // },
//   // {
//   //   id: "C Principle 4,5",
//   //   name: "Section C Princliple 4 and 5",
//   //   file: "Data_insert_using_template_BRSR_dev_SectionC_P4,P5.xlsx",
//   //   templatePath: "/templates/Data_insert_using_template_BRSR_dev_SectionC_P4,P5.xlsx"
//   // },
//   // {
//   //   id: "C Principle 6",
//   //   name: "Section C Princliple 6",
//   //   file: "Data_insert_using_template_BRSR_dev_SectionC_P6.xlsx",
//   //   templatePath: "/templates/Data_insert_using_template_BRSR_dev_SectionC_P6.xlsx"
//   // },
//   // {
//   //   id: "C Principle 7,8,9",
//   //   name: "Section C Princliple 7,8 and 9",
//   //   file: "Data_insert_using_template_BRSR_dev_SectionC_P7,P8,P9.xlsx",
//   //   templatePath: "/templates/Data_insert_using_template_BRSR_dev_SectionC_P7,P8,P9.xlsx"
//   // },
// ];

// const Step2Selection = ({
//   onBack,
//   onComplete,
//   processedSections,
//   setProcessedSections
// }: Step2Props) => {
//   const [selectedSection, setSelectedSection] = useState<string>("");
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
//   const [statusDetails, setStatusDetails] = useState<{
//     message: string;
//     details?: string;
//   } | null>(null);
//   const [responseMessage, setResponseMessage] = useState<string | null>(null);
//   const [showMessage, setShowMessage] = useState(false);
//   const [showSectionInfo, setShowSectionInfo] = useState(false);

//   const handleSectionChange = async (event: any) => {
//     const sectionId = event.target.value;
//     setSelectedSection(sectionId);

//     const section = SECTIONS.find((s) => s.id === sectionId);
//     if (!section) return;

//     try {
//       const res = await fetch(section.templatePath);
//       const blob = await res.blob();
//       const file = new File([blob], section.file, { type: blob.type });
//       setSelectedFile(file);
//     } catch (error) {
//       console.error("Error loading file:", error);
//     }
//   };

//   const isAllSelected = selectedSection === "all";
//   const isIndividualSelected = selectedSection && selectedSection !== "all";

//   const handleSubmit = async () => {
//     if (!selectedSection) {
//       setShowSectionInfo(true);
//       return;
//     }

//     setIsProcessing(true);
//     setResponseMessage(null);

//     try {
//       const formData = new FormData();
//       if (selectedSection === "all") {
//         formData.append("process_all", "true");
//       } else {
//         if (!selectedFile) {
//           setResponseMessage("Please select a valid file.");
//           setShowMessage(true);
//           setIsProcessing(false);
//           return;
//         }
//         formData.append("section_template_file", selectedFile);
//       }

//       const response = await fetch("http://192.168.1.142:8000//api/process-and-insert/", {
//         method: "POST",
//         body: formData,
//       });

//       const result = await response.json();
//       if (response.ok) {
//         setResponseMessage(result.message || "Upload successful");
//         setShowMessage(true);

//         if (selectedSection === "all") {
//           onComplete();
//         } else {
//           const updatedSections = [...processedSections, selectedSection];
//           setProcessedSections(updatedSections);

//           const remainingSections = SECTIONS.filter(
//             (section) => section.id !== "all" && !updatedSections.includes(section.id)
//           );

//           if (remainingSections.length === 0) {
//             onComplete();
//           } else {

//             //const sectionLetter = selectedSection.replace('section', '');
//             //console.log("sectionLetter",sectionLetter)
//             setResponseMessage(`Section ${selectedSection} processed. Please continue with the next section.`);
//             setShowMessage(true);
//             setSelectedSection(""); // Reset selection
//           }
//         }
//       } else {
//         setResponseMessage(result.error || "Something went wrong");
//         setShowMessage(true);
//       }
//     } catch (error) {
//       console.error("API error:", error);
//       setResponseMessage("Error connecting to the server");
//       setShowMessage(true);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h6" gutterBottom>
//         Step 2: Select Section Template
//       </Typography>

//       <FormControl fullWidth sx={{ mb: 2 }} disabled={isIndividualSelected}>
//         <InputLabel id="all-section-label">Select All Sections</InputLabel>
//         <Select
//           labelId="all-section-label"
//           value={isAllSelected ? selectedSection : ""}
//           onChange={handleSectionChange}
//           label="Select All Sections"
//         >
//           <MenuItem value="all">All Sections</MenuItem>
//         </Select>
//       </FormControl>

//       <FormControl fullWidth sx={{ mb: 2 }} disabled={isAllSelected}>
//         <InputLabel id="section-label">Select Individual Section</InputLabel>
//         <Select
//           labelId="section-label"
//           value={selectedSection || ""}
//           onChange={handleSectionChange}
//           label="Select Individual Section"
//         >
//           <MenuItem value="" disabled>
//             Select a template
//           </MenuItem>
//           {SECTIONS.filter((s) => s.id !== "all").map((section) => {
//             const isDisabled = processedSections.includes(section.id);
//             return (
//               <MenuItem
//                 key={section.id}
//                 value={section.id}
//                 disabled={isDisabled}
//                 style={isDisabled ? { color: "#222222" } : {}}
//               >
//                 {section.name}
//                 {isDisabled && " (Already Processed)"}
//               </MenuItem>
//             );
//           })}
//         </Select>
//       </FormControl>

//       <Box sx={{ my: 2 }}>
//         <Typography>
//           Selected File:{" "}
//           <strong>{selectedFile ? selectedFile.name : "None"}</strong>
//         </Typography>
//       </Box>

//       <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
//         <Button variant="outlined" onClick={onBack}>
//           Back
//         </Button>

//         <Button
//           variant="contained"
//           color="primary"
//           startIcon={<StorageIcon />}
//           disabled={!selectedFile || isProcessing}
//           onClick={handleSubmit}
//         >
//           {isProcessing ? <CircularProgress size={20} /> : "Upload"}
//         </Button>
//       </Box>

//       <Dialog
//         open={showMessage}
//         onClose={() => setShowMessage(false)}
//         aria-labelledby="response-dialog-title"
//         PaperProps={{
//           sx: {
//             background: "#ffffff",
//             borderRadius: 2,
//             boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
//             minWidth: "400px",
//           }
//         }}
//       >
//         <DialogTitle 
//           id="response-dialog-title"
//           sx={{
//             background: "#0EA5E9",
//             color: "white",
//             fontWeight: "bold",
//             display: "flex",
//             alignItems: "center",
//             gap: 1,
//           }}
//         >
//           {responseMessage?.toLowerCase().includes("success") ? (
//             <>
//               <CheckCircleIcon />
//               Success
//             </>
//           ) : responseMessage?.toLowerCase().includes("error") ? (
//             <>
//               <ErrorOutlineIcon />
//               Error
//             </>
//           ) : (
//             <>
//               <InfoIcon />
//               Message
//             </>
//           )}
//         </DialogTitle>
//         <DialogContent sx={{ py: 3 }}>
//           <Box sx={{ 
//             display: "flex", 
//             alignItems: "center", 
//             gap: 2,
//             p: 2,
//             borderRadius: 1,
//             // bgcolor: responseMessage?.toLowerCase().includes("success") 
//             //   ? "#e0f7fa" 
//             //   : responseMessage?.toLowerCase().includes("error")
//             //   ? "#ffebee"
//             //   : "#e3f2fd",
//             // color: responseMessage?.toLowerCase().includes("success")
//             //   ? "#00796b"
//             //   : responseMessage?.toLowerCase().includes("error")
//             //   ? "#c62828"
//             //   : "#1565c0",
//           }}>
//             {/* {responseMessage?.toLowerCase().includes("success") ? (
//               <CheckCircleIcon color="success" />
//             ) : responseMessage?.toLowerCase().includes("error") ? (
//               <ErrorOutlineIcon color="error" />
//             ) : (
//               <InfoIcon color="info" />
//             )} */}
//             <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: 18 }}>
//               {responseMessage}
//             </Typography>
//           </Box>
//         </DialogContent>
//         <DialogActions sx={{ p: 2, pt: 0 }}>
//           <Button 
//             onClick={() => setShowMessage(false)} 
//             variant="contained"
//             sx={{
//               background: "#0EA5E9",
//               "&:hover": {
//                 opacity: 0.9,
//               },
//             }}
//           >
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Dialog
//         open={showSectionInfo}
//         onClose={() => setShowSectionInfo(false)}
//         aria-labelledby="section-info-dialog-title"
//         PaperProps={{
//           sx: {
//             background: "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)",
//             borderRadius: 2,
//             boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
//             minWidth: "400px",
//           }
//         }}
//       >
//         <DialogTitle 
//           id="section-info-dialog-title"
//           sx={{
//             background: "linear-gradient(90deg, #0EA5E9 0%, #38bdf8 100%)",
//             color: "white",
//             fontWeight: "bold",
//             display: "flex",
//             alignItems: "center",
//             gap: 1,
//           }}
//         >
//           <ErrorOutlineIcon />
//           Section Selection Required
//         </DialogTitle>
//         <DialogContent sx={{ py: 3 }}>
//           <Box sx={{ 
//             display: "flex", 
//             flexDirection: "column",
//             gap: 2,
//             p: 2,
//           }}>
//             <Typography variant="body1" sx={{ fontWeight: 500 }}>
//               Please select a section before uploading.
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               You can either select "All Sections" or choose a specific section to process.
//             </Typography>
//           </Box>
//         </DialogContent>
//         <DialogActions sx={{ p: 2, pt: 0 }}>
//           <Button 
//             onClick={() => setShowSectionInfo(false)} 
//             variant="contained"
//             sx={{
//               background: "linear-gradient(90deg, #0EA5E9 0%, #38bdf8 100%)",
//               "&:hover": {
//                 opacity: 0.9,
//               },
//             }}
//           >
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default Step2Selection;


import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StorageIcon from "@mui/icons-material/Storage";
import TableViewIcon from "@mui/icons-material/TableView";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import InfoIcon from "@mui/icons-material/Info";
import FileUpload from "./FileUpload";

interface Step2Props {
  onBack: () => void;
  onComplete: () => void;
  processedSections: string[];
  setProcessedSections: (sections: string[]) => void;
}

// // Mock data for sections
// const SECTIONS = [

//   {
//     id: "all",
//     name: "All Sections",
//   },

//   // {
//   //   id: "A",
//   //   name: "Section A",
//   //   file: "dummy_template_sectionA_wrong.xlsx",
//   //   templatePath: "/templates/dummy_template_sectionA_wrong.xlsx"
//   // },
//   {
//     id: "A",
//     name: "Section A",
//     file: "dummy_template_sectionA.xlsx",
//     templatePath: "/templates/dummy_template_sectionA.xlsx"
//   },
//   {
//     id: "B",
//     name: "Section B",
//     file: "dummy_template_sectionB.xlsx",
//     templatePath: "/templates/dummy_template_sectionB.xlsx"
//   },
//   {
//     id: "C Principle 1",
//     name: "Section C Princliple 1",
//     file: "dummy_template_sectionC.xlsx",
//     templatePath: "/templates/dummy_template_sectionC.xlsx"
//   },
// ];

// Mock data for sections
const SECTIONS = [

  {
    id: "all",
    name: "All Sections",
  },
  // {
  //   id: "A",
  //   name: "Section A",
  //   file: "dummy_template_sectionA - Copy.xlsx",
  //   templatePath: "/templates/dummy_template_sectionA - Copy.xlsx"
  // },
  { 
    id: "A", 
    name: "Section A", 
    file: "Data_insert_BRSR_SectionA.xlsx",
    templatePath: "/templates/Data_insert_BRSR_SectionA.xlsx"
  },
  {
    id: "B",
    name: "Section B",
    file: "Data_insert_BRSR_SectionB.xlsx",
    templatePath: "/templates/Data_insert_BRSR_SectionB.xlsx"
  },
  {
    id: "C Principle 1",
    name: "Section C Princliple 1",
    file: "Data_insert_BRSR_SectionC_P1.xlsx",
    templatePath: "/templates/Data_insert_BRSR_SectionC_P1.xlsx"
  },
  {
    id: "C Principle 2",
    name: "Section C Princliple 2",
    file: "Data_insert_BRSR_SectionC_P2.xlsx",
    templatePath: "/templates/Data_insert_BRSR_SectionC_P2.xlsx"
  },
  {
    id: "C Principle 3",
    name: "Section C Princliple 3",
    file: "Data_insert_BRSR_SectionC_P3.xlsx",
    templatePath: "/templates/Data_insert_BRSR_SectionC_P3.xlsx"
  },
  {
    id: "C Principle 4,5",
    name: "Section C Princliple 4 and 5",
    file: "Data_insert_BRSR_SectionC_P4,P5.xlsx",
    templatePath: "/templates/Data_insert_BRSR_SectionC_P4,P5.xlsx"
  },
  {
    id: "C Principle 6",
    name: "Section C Princliple 6",
    file: "Data_insert_BRSR_SectionC_P6.xlsx",
    templatePath: "/templates/Data_insert_BRSR_SectionC_P6.xlsx"
  },
  {
    id: "C Principle 7,8,9",
    name: "Section C Princliple 7,8 and 9",
    file: "Data_insert_BRSR_SectionC_P7,P8,P9.xlsx",
    templatePath: "/templates/Data_insert_BRSR_SectionC_P7,P8,P9.xlsx"
  },
];

const Step2Selection = ({
  onBack,
  onComplete,
  processedSections,
  setProcessedSections
}: Step2Props) => {
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File[] | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusDetails, setStatusDetails] = useState<{
    message: string;
    details?: string;
  } | null>(null);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [showMessage, setShowMessage] = useState(false);
  const [showSectionInfo, setShowSectionInfo] = useState(false);

  // const handleSectionChange = async (event: any) => {
  //   const sectionId = event.target.value;
  //   setSelectedSection(sectionId);

  //   const section = SECTIONS.find((s) => s.id === sectionId);
  //   if (!section) return;

  //   try {
  //     const res = await fetch(section.templatePath);
  //     const blob = await res.blob();
  //     const file = new File([blob], section.file, { type: blob.type });
  //     setSelectedFile(file);
  //   } catch (error) {
  //     console.error("Error loading file:", error);
  //   }
  // };

  const handleSectionChange = async (event: any) => {
    const sectionId = event.target.value;
    setSelectedSection(sectionId);

    const section = SECTIONS.find((s) => s.id === sectionId);
    if (!section) return;

    try {
      if (sectionId === "all") {
        // Handle "All Sections" selection
        const allSections = SECTIONS.filter((s) => s.id !== "all");
        const files = await Promise.all(
          allSections.map(async (s) => {
            const templatePath = Array.isArray(s.templatePath) ? s.templatePath[0] : s.templatePath;
            const res = await fetch(templatePath);
            const blob = await res.blob();
            const fileName = Array.isArray(s.file) ? s.file[0] : s.file;
            return new File([blob], fileName, { type: blob.type });
          })
        );
        //setSelectedFile(files[0]); // Set the first file as selected
        setSelectedFile(files);
      } else {
        // Handle individual section selection
        const templatePath = Array.isArray(section.templatePath) ? section.templatePath[0] : section.templatePath;
        const res = await fetch(templatePath);
        const blob = await res.blob();
        const fileName = Array.isArray(section.file) ? section.file[0] : section.file;
        const file = new File([blob], fileName, { type: blob.type });
        setSelectedFile([file]);
      }
    } catch (error) {
      console.error("Error loading file:", error);
    }
  };

  const isAllSelected = selectedSection === "all";
  const isIndividualSelected = selectedSection && selectedSection !== "all";

  // const handleSubmit = async () => {
  //   if (!selectedSection) {
  //     setShowSectionInfo(true);
  //     return;
  //   }

  //   setIsProcessing(true);
  //   setResponseMessage(null);

  //   try {
  //     const formData = new FormData();
  //     if (selectedSection === "all") {
  //       formData.append("process_all", "true");
  //     } else {
  //       if (!selectedFile) {
  //         setResponseMessage("Please select a valid file.");
  //         setShowMessage(true);
  //         setIsProcessing(false);
  //         return;
  //       }
  //       formData.append("section_template_file", selectedFile);
  //     }

  //     const response = await fetch("http://192.168.1.86:8000//api/process-and-insert/", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     const result = await response.json();
  //     if (response.ok) {
  //       setResponseMessage(result.message || "Upload successful");
  //       setShowMessage(true);

  //       if (selectedSection === "all") {
  //         onComplete();
  //       } else {
  //         const updatedSections = [...processedSections, selectedSection];
  //         setProcessedSections(updatedSections);

  //         const remainingSections = SECTIONS.filter(
  //           (section) => section.id !== "all" && !updatedSections.includes(section.id)
  //         );

  //         if (remainingSections.length === 0) {
  //           onComplete();
  //         } else {

  //           //const sectionLetter = selectedSection.replace('section', '');
  //           //console.log("sectionLetter",sectionLetter)
  //           setResponseMessage(`Section ${selectedSection} processed. Please continue with the next section.`);
  //           setShowMessage(true);
  //           setSelectedSection(""); // Reset selection
  //         }
  //       }
  //     } else {
  //       setResponseMessage(result.error || "Something went wrong");
  //       setShowMessage(true);
  //     }
  //   } catch (error) {
  //     console.error("API error:", error);
  //     setResponseMessage("Error connecting to the server");
  //     setShowMessage(true);
  //   } finally {
  //     setIsProcessing(false);
  //   }
  // };

  const handleSubmit = async () => {
    if (!selectedSection) {
      setShowSectionInfo(true);
      return;
    }

    setIsProcessing(true);
    setResponseMessage(null);

    try {
      const formData = new FormData();
      if (selectedSection === "all") {
        // Process all sections
        const allSections = SECTIONS.filter((s) => s.id !== "all");
        for (const section of allSections) {
          const templatePath = Array.isArray(section.templatePath) ? section.templatePath[0] : section.templatePath;
          const res = await fetch(templatePath);
          const blob = await res.blob();
          const fileName = Array.isArray(section.file) ? section.file[0] : section.file;
          const file = new File([blob], fileName, { type: blob.type });
          formData.append("section_template_file", file);
        }
      } else {
        // Process individual section
        const section = SECTIONS.find((s) => s.id === selectedSection);
        if (!section) {
          setResponseMessage("Section not found.");
          setShowMessage(true);
          setIsProcessing(false);
          return;
        }
        const templatePath = Array.isArray(section.templatePath) ? section.templatePath[0] : section.templatePath;
        const res = await fetch(templatePath);
        const blob = await res.blob();
        const fileName = Array.isArray(section.file) ? section.file[0] : section.file;
        const file = new File([blob], fileName, { type: blob.type });
        formData.append("section_template_file", file);
      }

      const response = await fetch("http://192.168.1.142:8000/api/process-and-insert/", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setResponseMessage(result.message || "Upload successful");
        setShowMessage(true);

        if (selectedSection === "all") {
          onComplete();
        } else {
          const updatedSections = [...processedSections, selectedSection];
          setProcessedSections(updatedSections);

          const remainingSections = SECTIONS.filter(
            (section) => section.id !== "all" && !updatedSections.includes(section.id)
          );

          if (remainingSections.length === 0) {
            onComplete();
          } else {
            setSelectedSection(""); // Reset selection
            setResponseMessage(`Section ${selectedSection} processed. Please continue with the next section.`);
            setShowMessage(true);
          }
        }
      } else {
        setResponseMessage(result.error || "Something went wrong");
        setShowMessage(true);
      }
    } catch (error) {
      console.error("API error:", error);
      setResponseMessage("Error connecting to the server");
      setShowMessage(true);
    } finally {
      setIsProcessing(false);
    }
  };

  console.log("selectedFile", selectedFile);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Step 2: Select Section Template
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mb: 2 }}>

        <FormControl fullWidth sx={{ mb: 2 }} disabled={isIndividualSelected}>
          <InputLabel id="all-section-label">Select All Sections</InputLabel>
          <Select
            labelId="all-section-label"
            value={isAllSelected ? selectedSection : ""}
            onChange={handleSectionChange}
            label="Select All Sections"
          >
            <MenuItem value="all">All Sections</MenuItem>
          </Select>
        </FormControl>




        <FormControl fullWidth sx={{ mb: 2 }} disabled={isAllSelected}>
          <InputLabel id="section-label">Select Individual Section</InputLabel>
          <Select
            labelId="section-label"
            value={selectedSection || ""}
            onChange={handleSectionChange}
            label="Select Individual Section"
          >
            <MenuItem value="" disabled>
              Select a template
            </MenuItem>
            {SECTIONS.filter((s) => s.id !== "all").map((section) => {
              const isDisabled = processedSections.includes(section.id);
              return (
                <MenuItem
                  key={section.id}
                  value={section.id}
                  disabled={isDisabled}
                  style={isDisabled ? { color: "#222222" } : {}}
                >
                  {section.name}
                  {isDisabled && " (Already Processed)"}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>

      {/* <Box sx={{ my: 2 }}>
        <Typography>
          Selected File:{" "}
          <strong>{selectedFile ? selectedFile.name : "None"}</strong>
        </Typography>
      </Box> */}

      <Box sx={{ my: 2 }}>
        <Typography>
          Selected File:{" "}
          <strong>
            {Array.isArray(selectedFile) && selectedFile.length > 0
              ? selectedFile.map(f => f.name).join(", ")
              : "None"}
          </strong>
        </Typography>
      </Box>


      <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
        <Button variant="outlined" onClick={onBack}>
          Back
        </Button>

        <Button
          variant="contained"
          color="primary"
          startIcon={<StorageIcon />}
          disabled={!selectedFile || isProcessing}
          onClick={handleSubmit}
        >
          {isProcessing ? <CircularProgress size={20} /> : "Submit to Database"}
        </Button>
      </Box>

      <Dialog
        open={showMessage}
        onClose={() => setShowMessage(false)}
        aria-labelledby="response-dialog-title"
        PaperProps={{
          sx: {
            background: "#ffffff",
            borderRadius: 2,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            minWidth: "400px",
          }
        }}
      >
        <DialogTitle
          id="response-dialog-title"
          sx={{
            background: "#0EA5E9",
            color: "white",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {responseMessage?.toLowerCase().includes("success") ? (
            <>
              <CheckCircleIcon />
              Success
            </>
          ) : responseMessage?.toLowerCase().includes("error") ? (
            <>
              <ErrorOutlineIcon />
              Error
            </>
          ) : (
            <>
              <InfoIcon />
              Message
            </>
          )}
        </DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          <Box sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            p: 2,
            borderRadius: 1,
            // bgcolor: responseMessage?.toLowerCase().includes("success") 
            //   ? "#e0f7fa" 
            //   : responseMessage?.toLowerCase().includes("error")
            //   ? "#ffebee"
            //   : "#e3f2fd",
            // color: responseMessage?.toLowerCase().includes("success")
            //   ? "#00796b"
            //   : responseMessage?.toLowerCase().includes("error")
            //   ? "#c62828"
            //   : "#1565c0",
          }}>
            {/* {responseMessage?.toLowerCase().includes("success") ? (
              <CheckCircleIcon color="success" />
            ) : responseMessage?.toLowerCase().includes("error") ? (
              <ErrorOutlineIcon color="error" />
            ) : (
              <InfoIcon color="info" />
            )} */}
            <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: 18 }}>
              {responseMessage}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button
            onClick={() => setShowMessage(false)}
            variant="contained"
            sx={{
              background: "#0EA5E9",
              "&:hover": {
                opacity: 0.9,
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showSectionInfo}
        onClose={() => setShowSectionInfo(false)}
        aria-labelledby="section-info-dialog-title"
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
          id="section-info-dialog-title"
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
          Section Selection Required
        </DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            p: 2,
          }}>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Please select a section before uploading.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              You can either select "All Sections" or choose a specific section to process.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button
            onClick={() => setShowSectionInfo(false)}
            variant="contained"
            sx={{
              background: "linear-gradient(90deg, #0EA5E9 0%, #38bdf8 100%)",
              "&:hover": {
                opacity: 0.9,
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Step2Selection;
