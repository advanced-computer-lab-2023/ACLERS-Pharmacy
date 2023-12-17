const express = require('express')
const router = express.Router()

const {getPatients,getNotifications,upload, uploadMedicineImage,viewMedicines,viewMedicine, searchForMedicine,filterMedicines,AddMedicine,editMedicine, archiveMedicine, unarchiveMedicine, getSalesByMonth, filterSales, viewWalletAmount}= require('../controllers/pharmacistController')
const{protect,checkRole} = require('../middleware/authMiddleware')
const {createConversation ,getConversation,getConversations,sendMessage,getMessages} = require('../controllers/conversationController')

router.post('/create-chat',protect,checkRole('pharmacist'),createConversation)
router.get('/get-chats',protect,checkRole('pharmacist'),getConversations)
router.get('/get-chat',protect,checkRole('pharmacist'),getConversation)
router.get('/get-messages',protect,checkRole('pharmacist'),getMessages)
router.post('/send-message',protect,checkRole('pharmacist'),sendMessage)


router.post('/upload-medicine-image',protect,checkRole('pharmacist'), upload.single('medicineImage'), uploadMedicineImage);
router.get('/viewMedicines',protect,checkRole('pharmacist'),viewMedicines)
router.get('/view-Medicines',viewMedicines)
router.get('/viewMedicine',protect,checkRole('pharmacist'),viewMedicine)
router.get('/view-Medicine',viewMedicine)
router.get('/searchForMedicine',protect,checkRole('pharmacist'),searchForMedicine)
router.get('/filterMedicines',protect,checkRole('pharmacist'),filterMedicines)
router.post('/AddMedicine',protect,checkRole('pharmacist'),upload.single('medicineImage'),AddMedicine)
router.put('/editMedicine',protect,checkRole('pharmacist'),editMedicine)
router.put('/archiveMedicine',protect,checkRole('pharmacist'),archiveMedicine)
router.put('/unarchiveMedicine',protect,checkRole('pharmacist'),unarchiveMedicine)
router.post('/monthSales',protect,checkRole('pharmacist'),getSalesByMonth)
router.post('/filterSales',protect,checkRole('pharmacist'),filterSales)
router.get('/viewWallet',protect,checkRole('pharmacist'),viewWalletAmount)
router.get('/view-Medicines',viewMedicines)
router.get('/get-notifications',protect,checkRole('pharmacist'),getNotifications)
router.get('/patients',protect,checkRole('pharmacist'),getPatients)





module.exports = router