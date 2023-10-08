const express = require('express')
const router = express.Router()

const { viewMedicines,viewMedicine, searchForMedicine}= require('../controllers/pharmacistController')




router.get('viewMedicines',viewMedicines)
router.get('viewMedicine',viewMedicine)
router.get('searchForMedicine',searchForMedicine)


module.exports = router