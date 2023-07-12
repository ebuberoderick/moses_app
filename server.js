require('dotenv').config({ path: './.env' });
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const errorHandler = require('./middleware/errorHandler');

app.use(express.json());


app.use('/auth', require('./routes/authRoutes'))
app.use(errorHandler)

mongoose.connect(process.env.CONNECTION_STRING)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log('app is runing');
    })
})
.catch(err => {
    console.log(err);
})