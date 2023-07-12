import * as React from 'react';
import { Stack, Button, Stepper } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nextPage, previousPage } from '../../store/slices/UserSlice';

const MainButtons = ({handleClick}) => {
    const [activeStep, setActiveStep] = useState(0);
    const stepLength = 5;
    const dispatch = useDispatch();
    const data = useSelector((state) => {
        return state.users.key;
    })
    // console.log("buttons - ");
    // console.log(data);
    const handleNext = () => {
        dispatch(nextPage());
        handleClick();
        setActiveStep(data);
    }
    const handleBack = () => {
        dispatch(previousPage());
        setActiveStep(data-2);
    }
    return(
        <Stack activeStep={activeStep} sx={{justifyContent:'space-between'}} direction='row' padding={7}>

            <Button variant='outlined' onClick={handleBack} disabled={data === 0}>
                Back
            </Button>

            <Button variant='contained' onClick={handleNext}>
                {data === 4 ? 'Finish' : 'Next'}
            </Button>
        </Stack>
    )
};

export default MainButtons;