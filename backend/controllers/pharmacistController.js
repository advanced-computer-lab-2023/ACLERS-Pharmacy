const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt');
const Sales = require('../models/Sales');
const Medicine = require('../models/Medicine');


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
    const medicineId = req.query.medicineId;
    // Use the `medicineId` to fetch the medicine data
    const medicine = await Medicine.findById(medicineId);

    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    res.status(200).json(medicine);
  } catch (error) {
    res.status(500).send(error);
  }
});

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
    const  medicine= req.body;
       
    const newMedicine = await Medicine.create({
        name:medicine.name,
       price  :medicine.price,
       description:medicine.description,
       details:medicine.details,
       quantity:medicine.quantity,
       picture:medicine.picture,
      medicinialUse:medicine.medicinialUse ,
      sales : medicine.sales
       })
       res.status(200).send(newMedicine)

    
  
  })

  const editMedicine = asyncHandler(async (req, res) => {
    try {
      const MedicineId = req.query.MedicineId;
  console.log(MedicineId)
      // Check if the health package exists
      const existingMedicine = await Medicine.findById(MedicineId);
  
      if (!existingMedicine) {
        return res.status(404).json({ message: "Medicine not found" });
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
        existingMedicine.price = price;
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