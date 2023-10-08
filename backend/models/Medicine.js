const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    picture:{
type:String ,
required:true
    }
   , price:{
        type:Number ,
        required:true
    }
    , description:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Medicine',medicineSchema)