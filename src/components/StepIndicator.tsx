
import React from "react";
import { Box, Step, StepLabel, Stepper } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
  const steps = Array.from({ length: totalSteps }).map((_, index) => `Step ${index + 1}`);

  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Stepper activeStep={currentStep - 1} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconProps={{
              completed: currentStep > parseInt(label.split(' ')[1]),
              icon: currentStep > parseInt(label.split(' ')[1]) ? <CheckIcon /> : parseInt(label.split(' ')[1]),
            }}>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default StepIndicator;
