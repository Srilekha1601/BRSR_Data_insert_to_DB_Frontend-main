import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import StepIndicator from "../components/StepIndicator";
import Step1Upload from "../components/Step1Upload";
import { Box } from "@mui/material";

const BrsrUpload = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/home");
  };

  const handleNext = () => {
    navigate("/brsrdataentry");
  };

  return (
    <Layout>
      <StepIndicator currentStep={1} totalSteps={2} />
      <Box sx={{ mt: 4 }}>
        <Step1Upload onNext={handleNext} onBack={handleBack}/>
      </Box>
    </Layout>
  );
};

export default BrsrUpload;
