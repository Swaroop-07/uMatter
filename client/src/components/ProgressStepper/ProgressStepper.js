import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {getActiveState} from '../../store/authStore.js'
import './ProgressStepper.css';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
const steps = ['Select Blog Category', 'Blog Title & Description', 'Add image URL', 'Submit'];

export default function ProgressStepper() {
    
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = React.useState(0);

  useEffect(() => {
    setActiveStep(0);
  },[]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    dispatch(getActiveState(activeStep + 1));
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    dispatch(getActiveState(activeStep - 1));
  };

  return (
    <Box sx={{ width: '85%', marginLeft:'10%'}}>
        {activeStep === steps.length ? (
        <React.Fragment>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 , fontFamily: 'Josefin Sans'}}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button style={{fontFamily: 'Josefin Sans'}}onClick={handleBack}>Back</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <IconButton 
            color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}>
                <ChevronLeftIcon />
            </IconButton>
            <Box sx={{ flex: '1 1 auto' }} />
            {activeStep === steps.length - 1 ? "" :
            <IconButton 
            color="inherit"
              onClick={handleNext}
              sx={{ mr: 1 }}>
              <ChevronRightIcon />
            </IconButton>
            }
          </Box>
          <br/>
        </React.Fragment>
      )}
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps} className="Stepper">
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      
    </Box>
  );
}