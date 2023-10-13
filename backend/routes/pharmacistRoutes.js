const express = require('express')
const router = express.Router()

const { viewMedicines,viewMedicine, searchForMedicine,filterMedicines,AddMedicine,editMedicine}= require('../controllers/pharmacistController')




router.get('/viewMedicines',viewMedicines)
router.get('/viewMedicine',viewMedicine)
router.get('/searchForMedicine',searchForMedicine)
router.get('/filterMedicines',filterMedicines)
router.post('/AddMedicine',AddMedicine)
router.put('/editMedicine',editMedicine)
module.exports = router