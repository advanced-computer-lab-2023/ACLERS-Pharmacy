const express = require('express')
const router = express.Router()

const { viewMedicines,viewMedicine}= require('../controllers/pharmacistController')




router.get('viewMedicines',viewMedicines)
router.get('viewMedicine',viewMedicine)

module.exports = router