
const mongoose = require('mongoose')
const companySchema = new mongoose.Schema({
   
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        
    }
   
})

const Company = mongoose.model("company",companySchema)

module.exports = Company