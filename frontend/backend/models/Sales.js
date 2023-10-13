const mongoose = require('mongoose')

const SalesSchema = new mongoose.Schema({
    quantity:{
type:Number ,
required:true
    }
   , sales:{
        type:Number ,
        required:true
    } ,
    medicine:{
        type : mongoose.Schema.Types.ObjectId ,ref:'Medicine',unique:true
    },
})

module.exports = mongoose.model('Sales',SalesSchema)