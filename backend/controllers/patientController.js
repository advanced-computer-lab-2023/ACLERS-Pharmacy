const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt');
const Patient = require('../models/Patient')
const Medicine = require('../models/Medicine')
const ShoppingCart = require('../models/ShoppingCart')
const Order = require('../models/Order');
const Wallet = require('../models/Wallet');
const axios = require('axios');
const addToCart = asyncHandler(async(req,res)=>{
  try {
    const {  quantity } = req.body;
    const medicineId = req.query.medicineId
    const userId = req.user.id; // Assuming you store the user ID in req.user after authentication

    // Find the medicine by ID
    const medicine = await Medicine.findById(medicineId);

    if (!medicine) {
      return res.status(404).json({ error: 'Medicine not found' });
    }

    // Check if the user has a shopping cart
    let shoppingCart = await ShoppingCart.findOne({ patient: userId });

    // If the user doesn't have a shopping cart, create a new one
    if (!shoppingCart) {
      shoppingCart = new ShoppingCart({ patient: userId, items: [] });
    }

    // Check if the medicine is already in the cart
    const existingItem = shoppingCart.items.find(item => item.medicine.equals(medicineId));

    // If the medicine is already in the cart, update the quantity
    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      // If the medicine is not in the cart, add it as a new item
      shoppingCart.items.push({ medicine: medicineId, quantity: quantity || 1 });
    }

    // Save the updated shopping cart
    await shoppingCart.save();

    // Respond with the updated shopping cart
    res.json({ success: true, message: 'Medicine added to the shopping cart', shoppingCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})
const getCartItems = asyncHandler(async(req,res)=>{
  try {
    const userId = req.user.id; // Assuming you store the user ID in req.user after authentication

    // Find the user's shopping cart
    const shoppingCart = await ShoppingCart.findOne({ patient: userId }).populate('items.medicine');;

    if (!shoppingCart) {
      return res.status(404).json({ error: 'Shopping cart not found' });
    }

    // Populate the details of each medicine in the cart
   

    // Respond with the shopping cart details
    res.json({ success: true, items: shoppingCart.items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})


const deleteCartItem = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const itemId = req.query.itemId;

    // Find the user's shopping cart
    const shoppingCart = await ShoppingCart.findOne({ patient: userId });

    if (!shoppingCart) {
      return res.status(404).json({ error: 'Shopping cart not found' });
    }

    // Remove the item with the given itemId from the items array
    shoppingCart.items = shoppingCart.items.filter(item => item._id.toString() !== itemId);

    // Save the updated shopping cart
    await shoppingCart.save();

    // Respond with the updated shopping cart
    res.json({ success: true, items: shoppingCart.items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
const updateCartItemQuantity = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const itemId = req.query.itemId;
    const { quantity } = req.body;

    // Find the user's shopping cart
    const shoppingCart = await ShoppingCart.findOne({ patient: userId });

    if (!shoppingCart) {
      return res.status(404).json({ error: 'Shopping cart not found' });
    }

    // Find the item with the given itemId in the items array
    const cartItem = shoppingCart.items.find(item => item._id.toString() === itemId);

    if (!cartItem) {
      return res.status(404).json({ error: 'Item not found in the shopping cart' });
    }

    // Update the quantity of the item
    cartItem.quantity = quantity;

    // Save the updated shopping cart
    await shoppingCart.save();

    // Respond with the updated shopping cart
    res.json({ success: true, items: shoppingCart.items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const viewMedicines = asyncHandler(async (req, res) => {
    try {
        const Medicines = await Medicine.find()
        res.status(200).send(Medicines)
    } catch (error) {
        res.status(400).send(error)
    }
})

const searchForMedicine = asyncHandler( async (req, res) => {

   
    const  name= req.body.name;
  
    
    const medicine= await Medicine.find(name)
    res.send(medicine)
  });

  const filterMedicines = asyncHandler( async (req, res) => {

   
    const  medicinialUse= req.body.medicinialUse;
  
    
    const medicines= await Medicine.find({medicinialUse})
    res.send(medicines)
  });


  const checkoutOrder = asyncHandler(async (req, res) => {
    try {
      const userId = req.user.id; // Assuming you store the user ID in req.user after authentication
  
      // Find the user's shopping cart
      const shoppingCart = await ShoppingCart.findOne({ patient: userId }).populate('items.medicine');
  
      if (!shoppingCart) {
        return res.status(404).json({ error: 'Shopping cart not found' });
      }
  
      // Populate the details of each medicine in the cart
     
  
      // Create an order based on the shopping cart items
      const orderItems = shoppingCart.items.map((cartItem) => ({
        medicine: cartItem.medicine._id,
        quantity: cartItem.quantity,
      }));
  
      const order = new Order({
        patient: userId,
        items: orderItems,
      
        totalAmount: shoppingCart.calculateTotalPrice(),
        status:'Pending'
      });
  
      // Save the order to the database
      await order.save();
  
      // Clear the user's shopping cart after creating the order
       shoppingCart.items.remove();
  
      res.json({ success: true, message: 'Order placed successfully', order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  const addDeliveryAddress = asyncHandler(async (req, res) => {
    try {
      const userId = req.user.id; // Assuming you store the user ID in req.user after authentication
  
      // Get the address details from the request body
      const { addressLine1, addressLine2, city, state, postalCode, country } = req.body;
  
      // Create a new delivery address object
      const newAddress = {
        addressLine1,
        addressLine2,
        city,
        state,
        postalCode,
        country,
      };
  
      // Find the patient by user ID
      const patient = await Patient.findById(userId);
  
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }
  
      // Add the new address to the patient's array of addresses
      patient.deliveryAddresses.push(newAddress);
  
      // Save the updated patient to the database
      await patient.save();
  
      res.json({ success: true, message: 'Delivery address added successfully', patient });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  const viewOrders = asyncHandler(async (req, res) => {
    try {
      const userId = req.user.id; // Assuming you store the user ID in req.user after authentication
  
      // Find orders for the specific user
      const orders = await Order.find({ patient: userId });
  
      // Respond with the list of orders
      res.json({ success: true, orders });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  const cancelOrder = asyncHandler(async (req, res) => {
    try {
      const orderId = req.query.orderId; // Assuming you have a route parameter for the order ID
  
      // Find the order by ID
      const order = await Order.findById(orderId);
  
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      // Check if the order can be canceled (based on your business logic)
      if (order.status !== 'Shipped') {
        // Update the order status to 'Canceled' and save it
        order.status = 'Cancelled';
        const wallet = await Wallet.findOne({userId:req.user.id})
        wallet.balance +=order.totalAmount;
        await wallet.save();
        await order.save();
  
        // Respond with success message or updated order details
        res.json({ success: true, message: 'Order canceled successfully', order });
      } else {
        res.status(400).json({ error: 'Cannot cancel a shipped order' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  const placeOrder = asyncHandler(async (req,res)=>{
    const {paymentMethod , deliveryAddress} = req.body
   const {orderId }= req.query
   const order = await Order.findById(orderId)
   console.log(order)
    if (paymentMethod === 'Wallet') {
      // Check if the patient's wallet balance is sufficient
      
     let wallet = await Wallet.findOne({userId:req.user.id})
     if(!wallet){
      wallet = await Wallet.create({
        userId : req.user.id,
        balance :0
      })
     }
      const balance = wallet.balance// Replace with the actual model
      if (balance < order.totalAmount ) {
        return res.status(400).json({ message: "Insufficient wallet balance" });
      }
      else{
        wallet.balance-=order.totalAmount;
        wallet.save();
        order.paymentMethod =paymentMethod;
        order.deliveryAddress = deliveryAddress
        order.status = "Placed"
        await order.save()
      }
    }else if(paymentMethod === "Credit Card"){
      const name = "Order"
      const description = "Medicine order"
      const quantity = 1
     let body={
     name:name,
     description:description,
     quantity:quantity,
     price:order.totalAmount
     }
      try{
    
        const response = await axios.post('http://localhost:8000/patient/pay', body, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': req.headers.authorization
          }
        });
        console.log(response.data)
        res.json({url:response.data.session.url})
        order.paymentMethod =paymentMethod;
        order.deliveryAddress = deliveryAddress
        order.status = "Placed"
        await  order.save()
         // return res.json(stripeResponse)
        }catch(error){
          console.log(error)
        }
    }else{
      order.paymentMethod =paymentMethod;
      order.deliveryAddress = deliveryAddress
      order.status = "Placed"
      await order.save()
    }
  })
  const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
  const pay = asyncHandler(async(req,res)=>{
    try{
  
      console.log(req.body)
      const product = await stripe.products.create({
        name: req.body.name,
        description: req.body.description,
         // URL of the product image
      });
      const price = await stripe.prices.create({
        product: product.id, // ID of the product created in step 1
        unit_amount: req.body.price *100, // Amount in the smallest currency unit (e.g., cents)
        currency: 'usd', // Currency code (e.g., USD)
       
      });
      //console.log(product,price)
      
        const session = await stripe.checkout.sessions.create({
      payment_method_types:['card'],
      line_items:[{
      price : price.id,
       quantity:req.body.quantity
      }]
      ,mode:'payment',
      success_url:'http://localhost:3000/payment-success',
      
      cancel_url:'http://localhost:3000/payment-cancel',
      
        })
       // console.log(session)
        
         return res.json({session:session})
      }catch(error){
      return res.send(error)
      }
  })
module.exports={placeOrder,pay,cancelOrder,viewOrders,viewMedicines,searchForMedicine,filterMedicines,addToCart,getCartItems,deleteCartItem,updateCartItemQuantity,checkoutOrder,addDeliveryAddress}
  