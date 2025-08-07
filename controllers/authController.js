const Auth = require('../models/authModel')
const bcrypt = require('bcryptjs'); // or 'bcrypt' 
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.register = async (req, res) => {
    try{

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const existingCompany = await Auth.findOne({email})

    if (existingCompany) {
        return res.status(409).json({message: "email already in use"})
    }

    const hashedPassword = await bcrypt.hash(password, 8)
    const final = {
        email,
        password : hashedPassword
    };

    await Auth.create(final);

    return res.status(201).json({message: "registration successful"})
    
} catch (error){
    return res.status(409).json({message: "registration unsuccessfull", error: error.message})
}

}
exports.login = async (req, res) => {
    try{

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const existingCompany = await Auth.findOne({email})
    if (!existingCompany) {
        return res.status(409).json({message: "company not found"})
    }
    
    const match = await bcrypt.compare(password, existingCompany.password)
    if (!match){
        return res.status(400).json({message: "password not match"})
    }

    console.log(existingCompany);
    const token = jwt.sign(
        {
            id: existingCompany._id,
            email: existingCompany.email
        },
        process.env.SECRET_KEY,
        {expiresIn : process.env.EXPIRE_IN}

    )

    return res.status(201).json({message: "login successful", token})
    
} catch (error){
    return res.status(500).json({message: "login unsuccessfull", error: error.message})
}

}
