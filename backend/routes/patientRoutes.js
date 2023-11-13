const express = require('express')
const router = express.Router()

const { viewOrder,cancelOrder,placeOrder,pay,addDeliveryAddress,checkoutOrder,updateCartItemQuantity,deleteCartItem,getCartItems,addToCart,viewMedicines, getAllAddresses, viewOrders}= require('../controllers/patientController')
const { searchForMedicine,filterMedicines } = require('../controllers/adminController')
const{protect,checkRole} = require('../middleware/authMiddleware')

router.post('/add-delivery-address',protect,checkRole('patient'),addDeliveryAddress)
router.post('/checkout',protect,checkRole('patient'),checkoutOrder)
router.post('/add-to-cart',protect,checkRole('patient'),addToCart)
router.get('/viewMedicines',protect,checkRole('patient'),viewMedicines)
router.get('/searchForMedicine',protect,checkRole('patient'),searchForMedicine)
router.get('/filterMedicines',protect,checkRole('patient'),filterMedicines)
router.get('/get-cart-items',protect,checkRole('patient'),getCartItems)
router.delete('/remove-item',protect,checkRole('patient'),deleteCartItem)
router.put('/change-quantity',protect,checkRole('patient'),updateCartItemQuantity)
router.put('/place-order',protect,checkRole('patient'),placeOrder)
router.post('/pay',protect,checkRole('patient'),pay)
router.put('/cancel-order',protect,checkRole('patient'),cancelOrder)
router.get('/getAddresses',protect,checkRole('patient'),getAllAddresses)
router.get('/viewOrder',protect,checkRole('patient'),viewOrders)
router.get('/view-order',protect,checkRole('patient'),viewOrder)

module.exports = router