// const fs = require('fs');
// fs.writeFileSync('read.txt', "Hello there");

// const chalk = require("chalk");
// const validator = require("validator");
// console.log(chalk.blue.inverse("Blue World"));
// const res = validator.isEmail("thapa@thapaacom");
// console.log(res ? chalk.green.inverse(res) : chalk.red.inverse(res));
// const dotenv = require("dotenv");
// const mongoose = require('mongoose');
// const express = require("express");
// const app = express();

// dotenv.config({path: './config.env'});
// require('./db/conn');
// const User = require('./model/userSchema');

// app.use(express.json());

// const DB = 'mongodb+srv://roshanpatra98:roshanpatra98@cluster0.mnufadr.mongodb.net/';
// const PORT = process.env.PORT;

// const middleware = (req, res, next) => {
//     console.log(`Hello my Middleware`);
// }
// middleware();

// app.get('/', (req, res) => {
//     res.send("Hello world from backend lendgage");
// })

// app.listen(8000, () => {
//     console.log(`server is running at port no ${PORT}`);
// })

// const http = require("http");

// const server = http.createServer((req, res) => {
//     res.end("Hello from the other side");
// });

// server.listen(8000, "127.0.0.1", () => {
//     console.log("listening to the port on 8000");
// })
const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.json());

const appendDataToFile = (filePath, newData) => {
    // Read the existing JSON file
    fs.readFile(filePath, 'utf8', (error, data) => {
        if (error) {
            console.error('Error reading JSON file: ', error);
            return;
        }

        // Parse the JSON data
        let existingData = [];
        try {
            existingData = JSON.parse(data);
        } catch(parseError) {
            console.error('Error parsing JSON:', parseError);
            return;
        }
    
        // Append the new data to the existing data
        const updatedData = [...existingData, newData];
    
        // Write the updated data back to the file
        fs.writeFile(filePath, JSON.stringify(updatedData), 'utf8', (writeError) => {
            if(writeError){
                console.log('Error writing JSON file:', writeError);
            } else {
                console.log('Data appended to JSON file successfully')
            }
        });
    });
};

app.post('/api/data', (req, res) => {
    const userData = req.body;
    // console.log(userData);
    const filePath = 'userData.json';
    const newData = userData.data;
    appendDataToFile(filePath, newData);
    res.send('Data received successfully');
});

// app.get('/api/data', (req, res) => {
//     // Read the JSON file
//     fs.readFile('userData.json', 'utf8', (err, data) => {
//         if(err){
//             console.error('Error reading JSON file:', err);
//             res.status(500).json({
//                 error:'Failed to read JSON file'
//             });
//             return;
//         }

//         // Parse the JSON data
//         let jsonData;
//         try{
//             jsonData = JSON.parse(data);
//         } catch (parseError) {
//             console.log('Error parsing JSON:', parseError);
//             res.status(500), json({
//                 error:'Failed to parse JSON'
//             });
//             return;
//         }

//         // Send the JSON data as the response
//         res.json(jsonData);
//     });
// });

app.get('/api/data', (req, res) => {
    const jsonData = require('./userData.json');
    res.json(jsonData);
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
})