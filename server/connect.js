const mongoose = require('mongoose');

require('dotenv').config();
const db = process.env.DB_URI;
import regeneratorRuntime from "regenerator-runtime";
const connectDb = async () => {
    try{
        await mongoose.connect(db, {
            useNewUrlParser:true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('mongo database connected....')
    } catch(err){
      console.error(err.message)
      process.exit(1);
    }
}

module.exports = connectDb;