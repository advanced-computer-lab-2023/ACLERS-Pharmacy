const mongoose = require('mongoose')

const MedicineSchema = new mongoose.Schema({
    name:{
type:String,
required:true
    },
    
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