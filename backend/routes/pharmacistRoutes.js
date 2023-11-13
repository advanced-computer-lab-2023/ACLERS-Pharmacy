const express = require('express')
const router = express.Router()

const {upload, uploadMedicineImage,viewMedicines,viewMedicine, searchForMedicine,filterMedicines,AddMedicine,editMedicine}= require('../controllers/pharmacistController')
const{protect,checkRole} = require('../middleware/authMiddleware')


router.post('/upload-medicine-image',protect,checkRole('pharmacist'), upload.single('medicineImage'), uploadMedicineImage);
router.get('/viewMedicines',protect,checkRole('pharmacist'),viewMedicines)
router.get('/viewMedicine',protect,checkRole('pharmacist'),viewMedicine)
router.get('/searchForMedicine',protect,checkRole('pharmacist'),searchForMedicine)
router.get('/filterMedicines',protect,checkRole('pharmacist'),filterMedicines)
router.post('/AddMedicine',protect,checkRole('pharmacist'),upload.single('medicineImage'),AddMedicine)
router.put('/editMedicine',protect,checkRole('pharmacist'),editMedicine)

module.exports = router