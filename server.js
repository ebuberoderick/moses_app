require('dotenv').config({path: './.env'});
const express = require('express');
const app = express();

app.post('/login', (req, res) =>{
    res.sendStatus(200);
})

app.listen(process.env.PORT,()=>{
    console.log('app is runing');
})
