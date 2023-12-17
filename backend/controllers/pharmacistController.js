const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt');
const Sales = require('../models/Sales');
const Medicine = require('../models/Medicine');
const multer = require('multer'); // Import Multer
//const upload = multer({ dest: 'uploads/' });
const path = require('path');
const ShoppingCart = require('../models/ShoppingCart')
const notificationService = require('../services/notificationService');
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
      medicinalUse:medicine.medicinalUse ,
      sales : medicine.sales,
      status:'unarchived'
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

  const archiveMedicine = asyncHandler(async (req, res) => {
    try {
      const medicineId = req.query.medicineId; // Assuming the medicineId is passed in the request query params
  console.log (medicineId)
      // Find the medicine by ID
      const upmedicine = await Medicine.findById(medicineId);
      console.log(upmedicine)
      if (!upmedicine) {
        return res.status(404).send({ message: 'Medicine not found' });
      }
  
      // Update the medicine's status to 'archived'
      upmedicine.status = 'archived';
      
      // Save the updated medicine
      const updatedMedicine = await upmedicine.save();
  
      res.status(200).send(updatedMedicine);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  
  // Function to change the medicine's status to unarchived
  const unarchiveMedicine = asyncHandler(async (req, res) => {
    try {
      const medicineId = req.query.medicineId; // Assuming the medicineId is passed in the request params
  
      const updatedMedicine = await Medicine.findByIdAndUpdate(
        medicineId,
        { status: 'unarchived' },
        { new: true }
      );
  
      if (!updatedMedicine) {
        return res.status(404).send({ message: 'Medicine not found' });
      }
  
      res.status(200).send(updatedMedicine);
    } catch (error) {
      res.status(500).send({ message: 'Internal Server Error' });
    }
  });
  const getSalesByMonth = asyncHandler(async (req, res) => {
    try {
        const { year, month } = req.body;

        // Validate that year and month are provided in the request body
        if (!year || !month) {
            return res.status(400).json({ message: 'Year and month are required in the request body' });
        }

        // Calculate the start and end dates for the specified month
        const startDate = new Date(year, month - 1, 1); // Month is 0-based
        const endDate = new Date(year, month, 0); // Last day of the specified month

        // Find sales within the specified date range
        const sales = await Sales.find({
            saleDate: {
                $gte: startDate,
                $lte: endDate,
            },
        });

        res.status(200).json(sales);
    } catch (error) {
        console.error("Error retrieving sales by month:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
const filterSales = asyncHandler(async (req, res) => {
  try {
      const { medicineName, date } = req.body;
      let filter = {};

      // Apply filters based on the request body
      if (medicineName) {
          filter.medicineName = medicineName;
      }

      if (date) {
          // Assuming date is provided as a string in ISO format (e.g., "2023-07-15")
          const startDate = new Date(date);
          const endDate = new Date(date);
          endDate.setDate(endDate.getDate() + 1); // Set the end date to the next day
          filter.saleDate = {
              $gte: startDate,
              $lt: endDate,
          };
      }

      // Find sales based on the applied filters
      const sales = await Sales.find(filter);

      res.status(200).json(sales);
  } catch (error) {
      console.error("Error filtering sales:", error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});
const Wallet = require('../models/Wallet'); // Adjust the path based on your project structure
const Patient = require('../models/Patient');

const viewWalletAmount = asyncHandler(async (req, res) => {
    try {
        const userId = req.user.id;

        // Find the wallet for the specified user ID
        const wallet = await Wallet.findOne({ userId });

        if (!wallet) {
           res.status(404).json({ message: 'Wallet not found for the specified user ID' });
        }

        res.status(200).json({ userId: wallet.userId, balance: wallet.balance });
    } catch (error) {
        console.error("Error viewing wallet amount:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
const getNotifications = asyncHandler(async (req,res)=>{
  const notifications = await notificationService.getNotifications(req.user.id);
  console.log(notifications)
  res.send(notifications);
});

const getPatients = asyncHandler(async(req,res)=>{
  try{
    const patients= await Patient.find();
    res.send(patients)
  }catch(error){
    res.send(error)
  }
})
module.exports={getPatients,getNotifications,viewMedicines,viewMedicine,searchForMedicine,filterMedicines,
    AddMedicine,editMedicine,uploadMedicineImage,upload,archiveMedicine,unarchiveMedicine,getSalesByMonth,filterSales, viewWalletAmount}
