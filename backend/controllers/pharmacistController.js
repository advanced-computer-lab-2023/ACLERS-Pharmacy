const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt');
const Pharmacist = require('../models/Pharmacist');
const Sales = require('../models/Sales');


const viewMedicines = asyncHandler(async (req, res) => {
    try {
        const Medicines = await Medicine.find()
        res.status(200).send(Medicines)
    } catch (error) {
        res.status(400).send(error)
    }
})

const viewMedicine = asyncHandler(async (req, res) => {
    try {
        const medicine=req.query.medicineId
        const sales = await Sales.find(medicine)
        res.status(200).send(sales)
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

module.exports={viewMedicines,viewMedicine,searchForMedicine,filterMedicines}