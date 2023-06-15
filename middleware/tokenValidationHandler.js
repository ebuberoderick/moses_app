const asyncHelper = require('express-async-handler')
const jwt = require('jsonwebtoken')

const validator = asyncHelper(async(req, res, next) => {
    let token ;
    let authorization = req.headers.authorization || req.headers.Authorization
    if (authorization && authorization.startsWith('Bearer')) {
        token = authorization.split(' ')[1]
        jwt.verify(token,process.env.JWT_KEY ,(err,decoded) => {
            if(err){
                res.status(401)
                throw new Error("Unauthorized")
            }
            req.user = decoded
            next();
        })
        if(!token){
            res.status(401)
            throw new Error("Unauthorized OR token is invalid")
        }
    }
    res.status(401)
    throw new Error("Unauthorized OR token is invalid")

})

module.exports = validator
