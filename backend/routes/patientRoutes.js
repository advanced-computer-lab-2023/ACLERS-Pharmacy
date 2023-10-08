const express = require('express')
const router = express.Router()

const { viewMedicines}= require('../controllers/patientController')




router.get('viewMedicines',viewMedicines)
module.exports = router