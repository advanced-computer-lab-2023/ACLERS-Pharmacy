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

module.exports={viewMedicines,viewMedicine}