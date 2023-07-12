import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import MainButtons from "../MainButtons/mainButtons";

const PanNAadhar = ({upliftData}) => {
    // const [user, setUser] = useState(
    //     {
    //         name:"",
    //         panNum:"",
    //         aadhar:"",
    //     }
    // );
    // const handleInputs = (e) => {
    //     const {name, value} = e.target;
    //     setUser(user =>({...user, [name]:value}));
    // }
    
    const [name, setName] = useState('');
    const [validName, setValidName] = useState(true);
    const nameHandler = (e) => {
        const {value} = e.target;
        setName(value);
        setValidName(validateName(value));
    }
    const validateName = (name) => {
        // Remove leading and trailing whitespace
        const trimmedName = name.trim();

        // Check if the name contains at least two characters
        // const nameRegex = /^[a-zA-Z]{2,}$/;

        // Split the name by spaces
        const nameRegex = trimmedName.split(' ');

        // return nameRegex.test(trimmedName);

        // Check if there are at least two name parts
        return nameRegex.length >= 2;
    }

    const [panNum, setPanNum] = useState('');
    const [validPanNumber, setValidPanNumber] = useState(true);
    const panNumHandler = (e) => {
        const {value} = e.target;
        setPanNum(value);
        setValidPanNumber(validatePanNumber(value));
    }
    const validatePanNumber = (panNum) => {
        // Regular expression for PAN card number validation
        const panRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        return panRegex.test(panNum);
    }

    const [aadhar, setAadhar] = useState('');
    const [validAadharNumber, setValidAadharNumber] = useState(true);
    const aadharHandler = (e) => {
        const {value} = e.target;
        setAadhar(value);
        setValidAadharNumber(validateAadharNumber(value));
    }
    const validateAadharNumber = (aadhar) => {
        // Regular expression for Aadhaar card number validation
        const aadharRegex = /^\d{12}$/;
        return aadharRegex.test(aadhar);
    }
    const doSomething = () => {
        upliftData({name, panNum, aadhar});
    }

    return (
        <Box sx={{ padding:'4rem', width:'80%', height:'60vh'}}>
            <Typography variant="h3" sx={{color:'#004aad', marginBottom:6, fontFamily:'Montserrat, sans-serif', fontWeight:'regular'}}>
                Let's validate your PAN & AADHAR card
            </Typography>
            <Typography variant="h5" sx={{color:'#38b6ff', marginBottom:1, fontWeight:'bold', fontFamily:'Montserrat, sans-serif'}}>
                Please enter name as per PAN & AADHAR card
            </Typography>
            <TextField
                required
                id="standard-required"
                fullWidth
                label='Required'
                name="name"
                // value={user.name}
                value={name}
                variant="standard"
                // onChange={handleInputs}
                onChange={nameHandler}
                error={!validName}
                helperText={!validName ? 'Please enter a valid name' : ''}
            />
            <Typography variant="h5" sx={{color:'#38b6ff', marginTop:6, marginBottom:1, fontWeight:'bold', fontFamily:'Montserrat, sans-serif'}}>
                PAN number
            </Typography>
            <TextField
                required
                id="standard-required"
                fullWidth
                label='Required'
                name="panNum"
                // value={user.panNum}
                value={panNum}
                variant="standard"
                // onChange={handleInputs}
                onChange={panNumHandler}
                error={!validPanNumber}
                helperText={!validPanNumber ? 'Please enter a valid PAN card number' : ''}
            />
            <Typography variant="h5" sx={{color:'#38b6ff', marginTop:6, marginBottom:1, fontWeight:'bold', fontFamily:'Montserrat, sans-serif'}}>
                AADHAR number
            </Typography>
            <TextField
                required
                id="standard-required"
                fullWidth
                label='Required'
                name="aadhar"
                // value={user.aadhar}
                value={aadhar}
                variant="standard"
                // onChange={handleInputs}
                onChange={aadharHandler}
                error={!validAadharNumber}
                helperText={!validAadharNumber ? 'Please enter a valid Aadhar card number' : ''}
            />
            <MainButtons handleClick={doSomething}/>
        </Box>
    );
};

export default PanNAadhar;