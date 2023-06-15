const asyncHelper = require("express-async-handler")
const user = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = asyncHelper(async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        const User = await user.findOne({ email});
        if (User && (await bcrypt.compare(password , User.password))) {
            const user = {
                
                    _id:User.id, 
                    phone :User.phone, 
                    firstname :User.firstname, 
                    lastname :User.lastname, 
                    username:User.username
            }
            const accessToken = jwt.sign(user,process.env.JWT_KEY,{expiresIn:"1000m"})
            console.log(req.body);
            res.status(200).json({ accessToken , user });
        }else{
            res.status(401).json({message:"Invalid username or password"})
        }
    } else {
        res.status(400);
        throw new Error("Email and password are required");
    }
})

const register = asyncHelper(async (req, res) => {
    const { email, password, phone, firstname, lastname,username } = req.body;
    if (!email || !password || !phone || !firstname || !lastname || !username) {
        res.status(400);
        throw new Error("Email , Password , Phone ,Username , Firstname and Lastname are required");
    }
    const userExists = await user.findOne({email})
    if (userExists) {
        res.status(400);
        throw new Error("Email Already Exists");
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const User = await user.create({email, password:hashedPassword, phone, firstname, lastname, username});
    if (User) {
        res.status(201).json({_id:User.id, phone :User.phone, firstname :User.firstname, lastname :User.lastname, username:User.username});
    }
})

const get_user = asyncHelper(async (req, res) => {
    res.status(200).json(req);
})



const forgot_password = asyncHelper(async (req, res) => {
    console.log(req.body);
    res.status(200);
})

module.exports = { login, register, forgot_password ,get_user }