import React from 'react';
import ExportExcel from './excelexport';
import appData from './appData.json';

function App2(){
    // const ExcelExportData = 
    // [
    //     {
    //         "First Name": "Arul",
    //         "Last Name": "Prasant",
    //         "Employee Code": "001",
    //         "Mobile No": "9876543210",
    //         "DOB": "01-01-1995",
    //         "Address": "Chennai",
    //     },
    //     {
    //         "First Name": "Balu",
    //         "Last Name": "Subramani",
    //         "Employee Code": "002",
    //         "Mobile No": "0123456789",
    //         "DOB": "02-02-2000",
    //         "Address": "Hyderabad",
    //     },
    //     {
    //         "First Name": "Chandru",
    //         "Last Name": "Kumar",
    //         "Employee Code": "003",
    //         "Mobile No": "9083724156",
    //         "DOB": "03-03-1998",
    //         "Address": "Banglore",
    //     },
    // ]
    return (
        <div>
            <h1 style={{marginTop:"20%"}} onClick={()=>{console.log(appData)}}>Excel Export</h1>
            {/*<ExportExcel excelData={ExcelExportData} fileName={"Excel Export"}/>*/}
            <ExportExcel excelData={appData} fileName={"Excel Export"}/>
        </div>
    );
}

export default App2;