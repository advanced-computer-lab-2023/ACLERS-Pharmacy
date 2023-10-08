const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin')


const viewMedicines = asyncHandler(async (req, res) => {
    try {
        const Medicines = await Medicine.find()
        res.status(200).send(Medicines)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports={viewMedicines}
  