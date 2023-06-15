const asyncHelper = require("express-async-handler")
const user = require('../models/userModel')

const login = asyncHelper(async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        console.log(req.body);
        res.status(200);
    } else {
        res.status(400);
        throw new Error("Email and password are required");
    }
})

const register = asyncHelper(async (req, res) => {
    const { email, password, phone, firstname, lastname } = req.body;
    if (!email || !password || !phone || !firstname || !lastname) {
        res.status(400);
        throw new Error("Email , Password , Phone , Firstname and Lastname are required");
    }
    const User = await user.create({email, password, phone, firstname, lastname});
    console.log(req.body);
    res.status(201).json({User});
})

const get_user = asyncHelper(async (req, res) => {
    const { email, password, phone, firstname, lastname } = req.body;
    if (!email || !password || !phone || !firstname || !lastname) {
        res.status(400);
        throw new Error("Email , Password , Phone , Firstname and Lastname are required");
    }
    const User = await user.create({email, password, phone, firstname, lastname});
    console.log(req.body);
    res.status(201).json({User});
})



const forgot_password = asyncHelper(async (req, res) => {
    console.log(req.body);
    res.status(200);
})

module.exports = { login, register, forgot_password ,get_user }