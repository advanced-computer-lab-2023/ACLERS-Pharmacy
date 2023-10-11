const express = require('express')
const router = express.Router()

const {viewApplicants,approveDoctorRequest,disapproveDoctorRequest,addAdmin, removeAdmin, removePharmacist, removePatient, viewMedicines, searchForMedicine, filterMedicines,viewPharmacists,viewPharmacistInfo,ViewPatients}= require('../controllers/adminController')



router.post('/add-admin',addAdmin)
router.delete('/remove-admin', removeAdmin)
router.delete('/remove-pharmacist', removePharmacist)
router.delete('/remove-patient', removePatient)
router.post('/approve-doctor',approveDoctorRequest)
router.delete('/reject-doctor',disapproveDoctorRequest)
router.get('/view-applicants',viewApplicants)
router.get('/viewMedicines',viewMedicines)
router.get('/searchForMedicine',searchForMedicine)
router.get('/filterMedicines',filterMedicines)
router.get('/viewPharmacists',viewPharmacists)
router.get('/viewPharmacistInfo',viewPharmacistInfo)
router.get('/ViewPatients',ViewPatients)


module.exports = router
