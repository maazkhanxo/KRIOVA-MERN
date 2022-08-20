const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    EmployeeName:{type: String, required:true},
    Email:{type: String, required:true, unique:true},
    PhoneNumber:{type: String, required:true},
    Password:{type:String}
   })

module.exports = mongoose.model('authKriova',userSchema)