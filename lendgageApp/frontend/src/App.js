import React from 'react';
import Navbar from './components/Navbar/navbar';
import TopNav from './components/TopNav/topNav';
import './App.css';
import MobileOtp from './components/MainContent/mobileOtpPage';
import PanNAadhar from './components/MainContent/pan&aadhar';
import PersonalInfo from './components/MainContent/personalInfo';
import ProfessionalInfo from './components/MainContent/professionalInfo';
import UploadDoc from './components/MainContent/uploadDocuments';
import MainButtons from './components/MainButtons/mainButtons';
import ExportExcel from './excelexport';
import { Stepper, StepLabel, Step, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  const [userData, setUserData] = useState({});
  const [jsonData, setJsonData] = useState(null);
  const [change, setChange] = useState(false);
  const handleChange = () => {
    setChange(!change);
  }
  const doAnotherThing1 = ({emailID, ph}) => {
    setUserData(userData => ({...userData, emailID, ph}));
    console.log(emailID);
    console.log(ph);
    console.log(userData);
  }
  const doAnotherThing2 = ({name, panNum, aadhar}) => {
    setUserData(userData => ({...userData, name, panNum, aadhar}));
    console.log(userData);
  }
  const doAnotherThing3 = ({
      gender, 
      dob, 
      martialStatus, 
      currentResidentialAddress,
      currentResidentialPincode, 
      currentResidentialCity, 
      currentResidentialState,
      currentResidentialType,
      permanentResidentialAddress,
      permanentResidentialPincode,
      permanentResidentialCity,
      permanentResidentialState
  }) => {
    setUserData(userData => ({...userData,
      gender, 
      dob, 
      martialStatus, 
      currentResidentialAddress,
      currentResidentialPincode, 
      currentResidentialCity, 
      currentResidentialState,
      currentResidentialType,
      permanentResidentialAddress,
      permanentResidentialPincode,
      permanentResidentialCity,
      permanentResidentialState
    }))
  }
  const doAnotherThing4 = ({
    salaried,
    totalWorkExpYear,
    totalWorkExpMonth,
    averageMonthlySalary,
    designation,
    income,
    companyOrBusinessName,
    companyOrBusinessAddress,
    companyOrBusinessPincode,
    companyOrBusinessCity,
    companyOrBusinessState,
    jobOrBusinessEmail,
    expInCurrOrg
  }) => {
    setUserData(userData => ({...userData,
      salaried,
      totalWorkExpYear,
      totalWorkExpMonth,
      averageMonthlySalary,
      designation,
      income,
      companyOrBusinessName,
      companyOrBusinessAddress,
      companyOrBusinessPincode,
      companyOrBusinessCity,
      companyOrBusinessState,
      jobOrBusinessEmail,
      expInCurrOrg
    }))
  }
  const doAnotherThing5 = ({emi}) => {
    setUserData(userData => ({...userData, emi}));
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/data');
        setJsonData(response.data);
      } catch (error) {
        console.error('Error fetching JSON data:', error);
      }
    };
    fetchData();
  }, [change]);
  
  const sendData = async() => {
    try{
      await axios.post('/api/data', {data: userData});
    } catch (error) {
      console.log('Data was not send successfully');
    }
  };

  const [step, setStep] = useState(0);
  const data = useSelector((state) => {
    return state.users.key;
  })
  useEffect(()=>{
    setStep(data);
  }, [data]);
  useEffect(()=>{
    console.log(userData);
  }, [userData]);
  
  const showStep = (step) => {
    switch(step){
      case 1:
        return <MobileOtp upliftData={doAnotherThing1}/>
      case 2:
        return <PanNAadhar upliftData={doAnotherThing2}/>
      case 3:
        return <PersonalInfo upliftData={doAnotherThing3}/>
      case 4:
        return <ProfessionalInfo upliftData={doAnotherThing4}/>
      case 5:
        return <UploadDoc upliftData={doAnotherThing5}/>
      case 6:
        return <div className='BtnContainer'><Button variant='contained' onClick={sendData}>Submit</Button>
        <Button variant='contained' onClick={handleChange}>Load from Backend</Button>
    <ExportExcel excelData={jsonData} fileName={"Excel Export"}/></div>
        
    }
  }
  return (
    <div>
      <TopNav/>
      <div className='main'>
        <Navbar/>
        <div>
          {showStep(step+1)}
          {/*<MainButtons/>*/}
        </div>
      </div>
    </div>
  );
}

export default App;
