import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Constents from '../Commen/constents';

const steps = [
 ...Constents.orderStaps
];

export default function OrderStaps({activeStep}) {
  return (
    // <Box sx={{ width: '100%',maxWidth:"100vw" }}>
      <Stepper style={{flexWrap:"wrap"}} activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label.toUpperCase()}</StepLabel>
          </Step>
        ))}
      </Stepper>
    // </Box>
  );
}