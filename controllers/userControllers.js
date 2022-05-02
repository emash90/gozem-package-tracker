const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const registerUser = asyncHandler(async(req, res) => {
    try {
        
        const { firstName, lastName, email, accountType, password } =req.body
        if(!firstName || !lastName || !email || !accountType || !password) {
            res.status(400)
            throw new Error('please fill all fields')
        }
        const userExists = await User.findOne({email})
        if(userExists) {
            res.status(400)
            throw new Error('User with that emailaddress already exits')
        }
        //hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
    
        //create the user
    
        const user = await User.create({
            firstName,
            lastName,
            email,
            accountType,
            password: hashedPassword
        })
        if(user) {
            res.status(201).json({
                _id: user.id,
                name: user.firstName,
                email: user.email,
                user: accountType,
                token: generateToken(user._id)
            })
        } else{
        res.status(400)
        throw new Error('Invalid user data')
        }
    } catch (error) {
        res.status(500)
        throw new Error('error occured')
    }
})

const loginUser = asyncHandler(async(req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({email})
        if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.firstName,
            email: user.email,
            userType: user.accountType,
            token: generateToken(user._id)
    })
    }else {
        res.status(400)
        throw new Error('Invalid credentials')
    }    
    } catch (error) {
        res.status(500)
        throw new Error('error occured') 
    }
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30mins',
    } )
}

module.exports = {
    registerUser,
    loginUser

}


