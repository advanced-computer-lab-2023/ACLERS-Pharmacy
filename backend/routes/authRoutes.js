const express = require('express')
const router = express.Router()
const {registerPatient} = require('../controllers/authController')
const {registerPharmacist} = require('../controllers/authController')


router.post('/register-patient',registerPatient)

router.post('/register-Pharmacist',registerPharmacist)
module.exports = router