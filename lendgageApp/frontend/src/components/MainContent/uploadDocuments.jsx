import { Box, Typography, Button, Input, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import * as React from 'react';
import { useState } from 'react';
import MainButtons from '../MainButtons/mainButtons';

const UploadDoc = ({upliftData}) => {
    const [pan, setPan] = useState();
    const panHandler = (e) => {
        setPan(e.target.file[0]);
    };
    const [bankState, setBankState] = useState();
    const bankStateHandler = (e) => {
        setBankState(e.target.file[0]);
    };
    const [photo, setPhoto] = useState();
    const photoHandler = (e) => {
        setPhoto(e.target.file[0]);
    };
    const [emi, setEmi] = useState('');
    const handleEmi = (e) => {
        setEmi(e.target.value);
    }
    const doSomething = () => {
        upliftData({emi});
    }
    const handleSubmission = () => {

    };
    return (
        <Box sx={{padding:'4rem', width:'80%', height:'60vh'}}>
            <Typography variant="h3" sx={{color:'#004aad', marginBottom:2, fontFamily:'Montserrat, sans-serif', fontWeight:'regular'}}>
                Upload Documents
            </Typography>
            <Typography variant="body2" sx={{color:'#676767'}}>
                The documents you are uploading should be legible. You can gather the documents and login to begin from the same place.
            </Typography>

            <Typography variant="h5" sx={{color:'#38b6ff', marginTop:5, marginBottom:1, fontFamily:'Montserrat, sans-serif', fontWeight:'bold'}}>
                PAN card
            </Typography>
            <div>
                <Input type="file" name='pan' onChange={panHandler}/>
                <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSubmission}>Upload your PAN card here &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button>
            </div>

            <Typography variant="h5" sx={{color:'#38b6ff', marginTop:3, marginBottom:1, fontFamily:'Montserrat, sans-serif', fontWeight:'bold'}}>
                Bank Statements
            </Typography>
            <div>
                <Input type="file" name='bankState' onChange={bankStateHandler}/>
                <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSubmission}>Upload Last 6 months Bank Statement&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button>
            </div>

            <Typography variant="h5" sx={{color:'#38b6ff', marginTop:3, marginBottom:1, fontFamily:'Montserrat, sans-serif', fontWeight:'bold'}}>
                Photograph
            </Typography>
            <div>
                <Input type="file" name='photo' onChange={photoHandler}/>
                <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSubmission}>Upload recent passport size Photograph&nbsp;</Button>
            </div>

            <FormControl sx={{marginTop:3}}>
                <FormLabel id="demo-row-radio-buttons-group-label">
                    <Typography variant="h5" sx={{color:'#38b6ff', marginBottom:0, fontFamily:'Montserrat, sans-serif', fontWeight:'bold'}}>
                        Please tell us if you are having any existing EMIs
                    </Typography>
                </FormLabel>
            </FormControl>
            <FormControl sx={{marginTop:2.5, marginLeft:1}}>
                <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                    <FormControlLabel value="YES" control={<Radio />} label="YES" onClick={handleEmi}/>
                    <FormControlLabel value="NO" control={<Radio />} label="NO" onClick={handleEmi}/>
                </RadioGroup>
            </FormControl>
            <MainButtons handleClick={doSomething}/>
        </Box>
    )
}

export default UploadDoc;