
import React, { useState } from "react";
import Layout from "@/components/Layout";
import StepIndicator from "@/components/StepIndicator";
import Step1Upload from "@/components/Step1Upload";
import Step2Selection from "@/components/Step2Selection";
import Completion from "@/components/Completion";
import { Box } from "@mui/material";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [processedSections, setProcessedSections] = useState<string[]>([]);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 2));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleComplete = () => {
    setIsComplete(true);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setIsComplete(false);
    setProcessedSections([]);
  };

  return (
    <Layout>
      {!isComplete ? (
        <>
          <StepIndicator currentStep={currentStep} totalSteps={2} />
          <Box sx={{ mt: 4 }}>
            {currentStep === 1 && <Step1Upload onNext={handleNext} onBack={handleBack} />}
            {currentStep === 2 && (
              <Step2Selection
                onBack={handleBack}
                onComplete={handleComplete}
                processedSections={processedSections}
                setProcessedSections={setProcessedSections}
              />
            )}
          </Box>
        </>
      ) : (
        <Completion onReset={handleReset} />
      )}
    </Layout>
  );
};

export default Index;
