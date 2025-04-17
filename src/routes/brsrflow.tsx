import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Step1Upload from '../components/Step1Upload';
import Step2Selection from '../components/Step2Selection';
import Completion from '../components/Completion';
import { Box, CircularProgress, Alert, Button } from '@mui/material';

interface Props {
  step: 'upload' | 'dataentry' | 'complete';
}

type ProcessedSections = string[];

const BrsrFlow: React.FC<Props> = ({ step }) => {
  const navigate = useNavigate();
  const [processedSections, setProcessedSections] = useState<ProcessedSections>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNavigation = useCallback((path: string) => {
    try {
      setIsLoading(true);
      setError(null);
      navigate(path);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during navigation');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const handleNext = useCallback(() => handleNavigation('/brsrdataentry'), [handleNavigation]);
  const handleBack = useCallback(() => handleNavigation('/brsrxmlupload'), [handleNavigation]);
  const handleComplete = useCallback(() => handleNavigation('/processcomplete'), [handleNavigation]);
  
  const handleReset = useCallback(() => {
    setProcessedSections([]);
    handleNavigation('/brsrxmlupload');
  }, [handleNavigation]);

  const handleProcessedSectionsUpdate = useCallback((sections: ProcessedSections) => {
    setProcessedSections(sections);
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button variant="contained" onClick={() => setError(null)}>
          Try Again
        </Button>
      </Box>
    );
  }

  switch (step) {
    case 'upload':
      return <Step1Upload onNext={handleNext} />;
    case 'dataentry':
      return (
        <Step2Selection
          onBack={handleBack}
          onComplete={handleComplete}
          processedSections={processedSections}
          setProcessedSections={handleProcessedSectionsUpdate}
        />
      );
    case 'complete':
      return <Completion onReset={handleReset} />;
    default:
      return null;
  }
};

export default BrsrFlow;
