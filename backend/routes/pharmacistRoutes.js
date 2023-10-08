const express = require('express')
const router = express.Router()

const { viewMedicines,viewMedicine, searchForMedicine,filterMedicines}= require('../controllers/pharmacistController')




router.get('viewMedicines',viewMedicines)
router.get('viewMedicine',viewMedicine)
router.get('searchForMedicine',searchForMedicine)
router.get('filterMedicines',filterMedicines)



module.exports = router