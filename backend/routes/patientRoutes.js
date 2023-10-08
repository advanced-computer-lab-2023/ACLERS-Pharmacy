const express = require('express')
const router = express.Router()

const { viewMedicines}= require('../controllers/patientController')
const { searchForMedicine } = require('../controllers/adminController')




router.get('viewMedicines',viewMedicines)
router.get('searchForMedicine',searchForMedicine)

module.exports = router