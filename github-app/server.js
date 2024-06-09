// require('dotenv').config();
// const { Probot } = require('probot');
// const fs = require('fs');
// const path = require('path');
import express from 'express';

const app = express();
const PORT = 3000;

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);

// Read environment variables
// const appId = process.env.APP_ID;
// const privateKeyPath = process.env.PRIVATE_KEY_PATH;
// const privateKey = fs.readFileSync(privateKeyPath, 'utf-8');
// const webhookSecret = process.env.WEBHOOK_SECRET;

// const probot = new Probot({
//   appId: appId,
//   privateKey: privateKey,
//   secret: webhookSecret,
// });

// const app = require('./index'); // Your Probot app logic

// probot.load(app);

// require('http').createServer(probot.http).listen(3000, () => {
//   console.log('Probot app listening on port 3000');
// });
