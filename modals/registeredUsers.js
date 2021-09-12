const mongoose = require('mongoose');



const registeredUsersSchema = new mongoose.Schema({
    name:{
        type:String,
        unique: [true, "Name Exist"],
    },
    email: {
        type:String,
        unique: [true, "Email Exist"],
        
    },
    password: {
        type:mongoose.Schema.Types.Mixed,
        
    }

      
}, {timestamps: true})

module.exports = mongoose.model('registeredUsers', registeredUsersSchema);