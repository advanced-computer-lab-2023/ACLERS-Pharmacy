const express = require('express')
const router = express.Router()

const { viewMedicines}= require('../controllers/pharmacistController')




router.get('viewMedicines',viewMedicines)
module.exports = router