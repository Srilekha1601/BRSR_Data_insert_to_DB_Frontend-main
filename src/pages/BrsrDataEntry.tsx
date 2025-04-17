import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import StepIndicator from "../components/StepIndicator";
import Step2Selection from "../components/Step2Selection";
import { Box } from "@mui/material";

const BrsrDataEntry = () => {
  const [processedSections, setProcessedSections] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/brsrxmlupload");
  };

  const handleComplete = () => {
    navigate("/completion");
  };

  return (
    <Layout>
      <StepIndicator currentStep={2} totalSteps={2} />
      <Box sx={{ mt: 4 }}>
        <Step2Selection
          onBack={handleBack}
          onComplete={handleComplete}
          processedSections={processedSections}
          setProcessedSections={setProcessedSections}
        />
      </Box>
    </Layout>
  );
};

export default BrsrDataEntry;
