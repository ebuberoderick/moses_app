const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: 'string',
        unique: [true, "email already exists"],
        required: [true, 'Please enter a valid email address']
    },
    firstname: {
        type: 'string',
        required: [true, 'Please enter a valid firstname']
    },
    lastname: {
        type: 'string',
        required: [true, 'Please enter a valid lastname']
    },
    password: {
        type: 'string',
        required: [true, 'Please enter a valid password']
    },
    phone: {
        type: 'string',
        required: false
    },
    username: {
        type: 'string',
        required: [true, 'Please enter a username']
    },
},
    {
        timestamps: true
    }
)

const User = mongoose.model('user', userSchema);

module.exports = User