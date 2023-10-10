const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt');
const Pharmacist = require('../models/Pharmacist');
const Sales = require('../models/Sales');
const Pharmacist = require('../models/Pharmacist');


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
  const AddMedicine = asyncHandler( async (req, res) => {
    const  Medicine= req.body;

    const newMedicine = await Medicine.create({
        name:Medicine.name,
       price  :Medicine.price,
       description:Medicine.description,
       details:Medicine.details,
       quantity:Medicine.quantity,
       picture:Medicine.picture


       })
       res.status(200).send(newMedicine)

    
  
  })

  const editMedicine = asyncHandler(async (req, res) => {
    try {
      const MedicineId = req.query.medicineId;
  
      // Check if the health package exists
      const existingMedicine = await Medicine.findById(MedicineId);
  
      if (!existingMedicine) {
        return res.status(404).json({ message: "Health package not found" });
      }
  
      // Parse the request body to get the updated field(s)
      const {
        details,
        price,
       
      } = req.body;
  
      // Update the health package document with the provided fields
      if (details) {
        existingMedicine.details = details;
      }
      if (price) {
        existingMedicine.Price = Price;
      }
      
  
      // Save the updated health package
      await existingMedicine.save();
  
      return res.status(200).json({
        message: "Medicine package updated successfully",
        existingMedicine,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

 


module.exports={viewMedicines,viewMedicine,searchForMedicine,filterMedicines,
    AddMedicine,editMedicine}