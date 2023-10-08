const express = require('express')
const router = express.Router()

const { viewMedicines}= require('../controllers/patientController')
const { searchForMedicine,filterMedicines } = require('../controllers/adminController')




router.get('viewMedicines',viewMedicines)
router.get('searchForMedicine',searchForMedicine)
router.get('filterMedicines',filterMedicines)


module.exports = router