import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import './navbar.css';
import { useState } from 'react';
import { createTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { nextPage, previousPage } from '../../store/slices/UserSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const steps = [
    {
        label: "Mobile Verification",
        description: "To help us reach you",
    },
    {
        label: "PAN & AADHAR Verification",
        description: "So that we can identify you",
    },
    {
        label: "Personal Information",
        description: "Just to know you a bit more",
    },
    {
        label: "Professional Information",
        description: "To give you a fair valuation",
    },
    {
        label: "Upload Documents",
        description: "To boost your loan process"
    },
];

const theme = createTheme({
    palette: {
        primary: {
            main:"#38b6ff",
        },
        secondary: {
            main:"#efefef",
        }
    }
})

const Navbar = () => {
    const [activeStep, setActiveStep] = useState(0);
    const data = useSelector((state) => {
        return state.users.key;
    });
    useEffect(()=>{
        setActiveStep(data);
    }, [data]);
    const dispatch = useDispatch();
    // console.log("buttons original - ")
    // console.log(data);
    const handleNext = () => {
        dispatch(nextPage());
        setActiveStep(data);
    };
    const handleBack = () => {
        dispatch(previousPage());
        setActiveStep(data-2);
    };
    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Box sx={{px:'6vw', py:'auto', pt:'5%'}}
            className='boxColor'
        >
            <Stepper activeStep={activeStep} orientation="vertical">
                {
                    steps.map((step, index) => (
                        <Step key={step.label}>
                            <StepLabel optional={index === 4 ? (
                                <Typography variant="caption">
                                    Last step
                                </Typography>
                            ) : null
                        }>
                            <Typography variant='h6' className='pageLabel'>{step.label}</Typography>
                        </StepLabel>
                        <StepContent>
                            <Typography variant="body2" sx={{color:'#676767'}}>
                                {step.description}
                            </Typography>
                            <Box sx={{mb:14}}>
                                <div>
                                    <Button
                                        variant='contained'
                                        onClick={handleNext}
                                        sx={{mt:1, mr:1}}
                                        className='contBt'
                                    >
                                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                    </Button>
                                    <Button
                                        disabled={index === 0}
                                        style={theme.palette.primary}
                                        onClick={handleBack}
                                        sx={{mt:1, mr:1}}
                                    >
                                        Back
                                    </Button>
                                </div>
                            </Box>
                        </StepContent>
                        </Step>
                    ))
                }
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} sx={{p:3}}>
                    <Typography>All steps completed - you&apos;re finished</Typography>
                    <Button onClick={handleReset} sx={{mt:1, mr:1}}>
                    </Button>
                </Paper>
            )}
        </Box>
    )
}

export default Navbar;