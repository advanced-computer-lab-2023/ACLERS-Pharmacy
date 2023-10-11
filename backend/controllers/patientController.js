const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt');
const Patient = require('../models/Patient')
const Medicine = require('../models/Medicine')


const viewMedicines = asyncHandler(async (req, res) => {
    try {
        const Medicines = await Medicine.find()
        res.status(200).send(Medicines)
    } catch (error) {
        res.status(400).send(error)
    }
})

const searchForMedicine = asyncHandler( async (req, res) => {

   
    const  name= req.body.name;
  
    
    const medicine= await Medicine.find(name)
    res.send(medicine)
  });

  const filterMedicines = asyncHandler( async (req, res) => {

   
    const  medicinialUse= req.body.medicinialUse;
  
    
    const medicines= await Medicine.find({medicinialUse})
    res.send(medicines)
  });
module.exports={viewMedicines,searchForMedicine,filterMedicines}
  