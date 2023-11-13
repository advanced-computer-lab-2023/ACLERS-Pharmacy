const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt');
const Sales = require('../models/Sales');
const Medicine = require('../models/Medicine');
const multer = require('multer'); // Import Multer
//const upload = multer({ dest: 'uploads/' });
const path = require('path');
const ShoppingCart = require('../models/ShoppingCart')
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
       console.log(medicine)

       const medicineImage = req.file['medicineImage'];
    // Check if a file is provided in the request
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload an image file' });
    }
  
    // Get the file path of the uploaded image
    const imagePath = req.file.path;
    const newMedicine = await Medicine.create({
        name:medicine.name,
       price  :medicine.price,
       description:medicine.description,
       details:medicine.details,
       quantity:medicine.quantity,
       picture:imagePath,
      medicinialUse:medicine.medicinalUse ,
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

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Define the destination folder where files will be saved
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Rename the file with a timestamp and original extension
    },
  });
  const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      const extname = path.extname(file.originalname);
      if (extname === '.pdf' || extname === '.jpeg' || extname === '.jpg' || extname === '.png') {
        return cb(null, true);
      }
      cb(new Error('File type not supported'));
    },
  });

  async function uploadMedicineImage  (req, res)  {
    // Assuming you have a 'name' field in the request body for the medicine name
    const { medicineId } = req.query;
    console.log(req.file)
    const medicineImage = req.file['medicineImage'];
    // Check if a file is provided in the request
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload an image file' });
    }
  
    // Get the file path of the uploaded image
    const imagePath = req.file.path;
  
    try {
      // Find the medicine by name in the database
      const medicine = await Medicine.findById(medicineId);
  
      if (!medicine) {
        return res.status(404).json({ error: 'Medicine not found' });
      }
  
      // Update the 'picture' attribute of the medicine with the file path
      medicine.picture = imagePath;
  
      // Save the updated medicine to the database
      await medicine.save();
  
      // Respond with success message or updated medicine details
      res.json({ success: true, message: 'Medicine picture uploaded successfully', medicine });
    } catch (error) {
      // Handle any errors that occurred during the process
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  
module.exports={viewMedicines,viewMedicine,searchForMedicine,filterMedicines,
    AddMedicine,editMedicine,uploadMedicineImage,upload}
