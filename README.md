# ACLERS-Pharmacy

## Project title
The Virtual Pharmacy Platform is a cutting-edge online solution designed to streamline and enhance the pharmacy experience for patients, pharmacists, and administrators. At its core, this project aims to simplify medication management, making it more accessible, efficient, and user-friendly

## Motivation
In an era where digital transformation is revolutionizing healthcare, the need for an accessible, efficient, and secure pharmacy service has never been more critical. The Virtual Pharmacy Platform is conceived out of a desire to meet this need, bridging the gap between technology and healthcare.

## Build Status

Dashboards need improvement
Responsiveness needs improvement

## Code Style

Follow [JavaScript Standard Style](https://standardjs.com/) for code styling.

## Screenshots

![login](https://github.com/advanced-computer-lab-2023/ACLERS-Pharmacy/assets/121358472/b366fea2-75d2-4bac-a8fd-963bf8cfd484)
![dashboard](https://github.com/advanced-computer-lab-2023/ACLERS-Pharmacy/assets/121358472/7615e750-0ea1-468f-a70e-2c2761f9782e)
![change password](https://github.com/advanced-computer-lab-2023/ACLERS-Pharmacy/assets/121358472/83671edb-0d60-4479-84e4-53bd1ef15567)
![medicines](https://github.com/advanced-computer-lab-2023/ACLERS-Pharmacy/assets/121358472/144d72d4-adb0-4e0b-ab49-3cba433cbe98)
## Tech/Framework used

- React.js for the frontend
- Node.js for the backend
- Express.js as the backend framework
- MongoDB as the database

## Features

### For Patients
Comprehensive Prescription Management:
 Patients can easily view, manage, and track the status of their prescriptions, including detailed information about each medication.
Medication Search and Information:
 A user-friendly search function allows patients to find specific medications, understand their uses, dosages, and side effects.
Online Shopping Cart and Checkout:
 Patients can add medications to their shopping cart, adjust quantities, and proceed to checkout for a seamless purchasing experience.
Multiple Payment Options:
 The platform supports various payment methods, including credit cards, digital wallets, and cash on delivery, offering flexibility in payment.
Order History and Tracking:
Patients have access to their order history, can view current order status, and track their deliveries in real-time.
Medication Alternatives:
 In case a medication is out of stock, the platform suggests alternatives based on the main active ingredient, ensuring continuous patient care.
Interactive Communication:
 A chat feature enables patients to communicate with pharmacists for advice or clarifications on medications.

### For Pharmacists
Order Management:
 Pharmacists can view and manage prescription orders, update order statuses, and handle patient queries.
Inventory Control:
The platform provides tools to manage and update the pharmacy's inventory, including adding new medicines and updating stock levels.
Patient Interaction:
 Pharmacists can interact with patients for order clarifications, providing personalized care and advice.
Prescription Verification:
 Pharmacists have the ability to verify prescriptions digitally, ensuring accuracy and compliance with health regulations.

### For Administrators
User Account Management:
 Administrators can oversee both patient and pharmacist accounts, ensuring smooth operation and access control.
Data Analytics and Reporting:
 The platform offers analytics tools to track sales, popular medications, and user activity, aiding in informed decision-making.
Security and Compliance:
 Administrators ensure the platform adheres to privacy laws and security protocols, safeguarding sensitive health information.

### General Features
User-Friendly Interface:
 The platform is designed with a focus on ease of use, ensuring that patients and pharmacists can navigate and utilize the features efficiently.
Real-Time Notifications:
 Users receive real-time updates about their orders, prescription status, and any relevant information.
Accessibility and Compatibility:
 Optimized for various devices, the platform ensures accessibility from desktops, tablets, and smartphones.



## Code Examples
const placeOrder = asyncHandler(async (req, res) => {
  const { paymentMethod, deliveryAddress } = req.body
  const { orderId } = req.query
  const order = await Order.findById(orderId)
  const patient = await Patient.findById(req.user.id)
  console.log(order)
  const matchingAddress = patient.deliveryAddresses.find(
    (address) => address._id.toString() === deliveryAddress
  );
  console.log(matchingAddress)
  for (const orderItem of order.items) {
    console.log(orderItem + "orderItem")
    const medicine = await Medicine.findById(orderItem.medicine);

    if (!medicine || medicine.quantity < orderItem.quantity) {
      return res.status(400).json({ message: 'Insufficient medicine quantity' });
    }

    // Decrease medicine quantity

  }
  if (paymentMethod === 'wallet') {
    // Check if the patient's wallet balance is sufficient

    let wallet = await Wallet.findOne({ userId: req.user.id })
    if (!wallet) {
      wallet = await Wallet.create({
        userId: req.user.id,
        balance: 0
      })
    }
    const balance = wallet.balance// Replace with the actual model
    if (balance < order.totalAmount) {
      return res.status(400).json({ message: "Insufficient wallet balance" });
    }
    else {
      wallet.balance -= order.totalAmount;
      wallet.save();
      order.paymentMethod = paymentMethod;

      order.deliveryAddress = matchingAddress
      order.status = "Placed"

      await order.save()
      for (const orderItem of order.items) {
        const medicine = await Medicine.findById(orderItem.medicine);
        medicine.quantity -= orderItem.quantity;
        await medicine.save();
        if (medicine.quantity === 0) {
          try {
            // Fetch all pharmacists from the database
            const pharmacists = await Pharmacist.find();
        
            // Iterate over each pharmacist and send a notification and email
            for (const pharmacist of pharmacists) {
              // You can customize the notification and email messages as needed
              const notificationMessage = `Medicine ${medicine.name} is out of stock.`;
              const emailSubject = 'Medicine Out of Stock';
              const emailMessage = `Dear ${pharmacist.name},\n\nThe medicine ${medicine.name} is out of stock.`;
        
              // Send notification
              await notificationService.sendNotification(pharmacist._id, notificationMessage);
        
              // Send email
              await mailService.sendNotification(pharmacist.email, emailSubject, emailMessage);
            }
        
            // Additional actions after notifying all pharmacists (if needed)
            // ...
          } catch (error) {
            console.error('Error sending notifications and emails:', error);
            // Handle the error appropriately
          }
        }

        // Increment sales attribute
        medicine.sales += orderItem.quantity;
        await medicine.save();
        const sales = new Sales({
          medicineName: medicine.name,
          quantitySold: orderItem.quantity,
          order: order._id    
           });

      // Save the Sale to the database
      await sales.save();
      }
      }
     
  } else if (paymentMethod === "credit Card") {
    const name = "Order"
    const description = "Medicine order"
    const quantity = 1
    let body = {
      name: name,
      description: description,
      quantity: quantity,
      price: order.totalAmount
    }
    try {

      const response = await axios.post('http://localhost:8000/patient/pay', body, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': req.headers.authorization
        }
      });
      console.log(response.data)
      res.json({ url: response.data.session.url })
      order.paymentMethod = paymentMethod;
      order.deliveryAddress = matchingAddress
      order.status = "Placed"
      await order.save()
      for (const orderItem of order.items) {
        const medicine = await Medicine.findById(orderItem.medicine);
        medicine.quantity -= orderItem.quantity;
        await medicine.save();

        // Increment sales attribute
        medicine.sales += orderItem.quantity;
        await medicine.save();
        const sales = new Sales({
          medicineName: medicine.name,
          quantitySold: orderItem.quantity,
          order: order._id    
      });

      // Save the Sale to the database
      await sales.save();
    }
     
  
      // Save the order to the database
      // return res.json(stripeResponse)
    } catch (error) {
      console.log(error)
    }
  } else {
    order.paymentMethod = paymentMethod;

    order.deliveryAddress = matchingAddress
    order.status = "Placed"
    await order.save()
    for (const orderItem of order.items) {
      try {
        const medicine = await Medicine.findById(orderItem.medicine);

        // Increment sales attribute before saving the Medicine model
        medicine.sales += orderItem.quantity;

        // Update the Medicine quantity
        medicine.quantity -= orderItem.quantity;
        const name=medicine.name
        // Save the Medicine model
        await medicine.save();
        console.log(order.id)
        console.log(medicine.name)
        console.log(orderItem.quantity)
        const sales = new Sales({
            medicineName: name,
            quantitySold: orderItem.quantity,
          order: order._id
        });

        // Save the Sale to the database
        await sales.save();
        console.log("ana 3amlt el sale");
    } catch (error) {
        console.error("Error processing order item:", error);
        // Handle the error as needed
    }
}
      
    

  }


  const cart = await ShoppingCart.findOne({ patient: req.user.id })
  await cart.updateOne({ $set: { items: [] } });
  console.log(cart+"cart")
})
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
const pay = asyncHandler(async (req, res) => {
  try {

    console.log(req.body)
    const product = await stripe.products.create({
      name: req.body.name,
      description: req.body.description,
      // URL of the product image
    });
    const price = await stripe.prices.create({
      product: product.id, // ID of the product created in step 1
      unit_amount: req.body.price * 100, // Amount in the smallest currency unit (e.g., cents)
      currency: 'usd', // Currency code (e.g., USD)

    });
    //console.log(product,price)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: price.id,
        quantity: req.body.quantity
      }]
      , mode: 'payment',
      success_url: 'http://localhost:3000/payment-success',

      cancel_url: 'http://localhost:3000/payment-cancel',

    })
    // console.log(session)

    return res.json({ session: session })
  } catch (error) {
    return res.send(error)
  }
})
Provide examples of your code, showcasing important and well-written parts.

## Installation

### Prerequisites:

Before you begin the installation process, make sure you have the following software and tools installed on your system:

1. Node.js and npm:
Install Node.js and npm by visiting Node.js official website (https://nodejs.org/) and following the installation instructions for your operating system.
2. Git:
Install Git by visiting Git official website (https://git-scm.com/) and following the installation instructions for your operating system.

3. Database Server:

Set up a database server (https://www.mongodb.com/) 

### cloning 

1. Clone the repository:
   git clone https://github.com/advanced-computer-lab-2023/ACLERS-Pharmacy.git
2. Install dependencies: npm install
3. start the application: npm start


### create .env file and add: 
MONGO_URI = mongodb+srv://omar:omarwael@cluster0.lgb4yus.mongodb.net/virtualClinic?retryWrites=true&w=majority

## API References

### admin routes
- View Pharmacists: get /api/view-pharmacists
- View Patients:get /api/view-patients
- Add Admin:post /api/add-admin
- Remove Admin:delete /api/remove-admin
- Remove Pharmacist:delete /api/remove-pharmacist
- Remove Patient: delete /api/remove-patient
- Approve Doctor:post /api/approve-doctor
- Reject Doctor: delete /api/reject-doctor
- View Applicants:get /api/view-applicants
- View Medicines:get /api/viewMedicines
- Search for Medicine:get  /api/searchForMedicine
- Filter Medicines:get /api/filterMedicines
- View Pharmacists:get /api/viewPharmacists
- View Pharmacist Info:get /api/viewPharmacistInfo
- View Patients:get  /api/ViewPatients
- View Patient:get /api/viewPatient

### auth routes
- Register Patient:post /api/register-patient
- Register Pharmacist:post /api/register-Pharmacist

### patient routes
- View Medicines:get /api/viewMedicines
- Search For Medicine:get /api/searchForMedicine
- Filter Medicines:get /api/filterMedicines

### pharmacist routes
- View Medicines:get /api/viewMedicines
- View Medicine:get /api/viewMedicine
- Search For Medicine:get /api/searchForMedicine
- Filter Medicines:get /api/filterMedicines
- Add Medicine:post /api/AddMedicine
- Edit Medicine:put /api/editMedicine


## Tests 

## How to Use

1. Registration and Login
- Patients: Create your account with basic details. Log in using your credentials.
- Pharmacists: Access the platform with your professional credentials.
- Administrators: Log in using your administrator account to oversee the platform.
2. Profile Management
- Patients: Complete your profile with personal and health information.
- Pharmacists/Administrators: Ensure your professional profiles are complete and up-to-date.
3. Medication Management
- Patients: Use the search function to find medications, read about their details, and add them to your cart.
- Pharmacists: Manage inventory, update stock levels, and verify prescriptions.
- Administrators: Oversee the medication database and ensure accurate and current information.
4. Order Processing and Management
- Patients: Proceed to checkout, choose a payment method, and place your order.
- Pharmacists: View and manage incoming orders, process them efficiently, and update order statuses.
- Administrators: Monitor transaction processes and ensure smooth order management.
5. Communication and Interaction
- Patients: Communicate with pharmacists for advice or clarifications on medications.
- Pharmacists: Provide guidance and respond to patient inquiries.
- Administrators: Facilitate effective communication channels within the platform.
6. Tracking and Notifications
- Patients: Track your orders and view order history.
- Pharmacists/Administrators: Monitor order statuses and system notifications for real-time updates.
7. Security and Compliance
- Patients: Manage your account securely and be aware of privacy settings.
- Pharmacists/Administrators: Ensure adherence to privacy laws and security protocols.
8. Feedback and Support
- All Users: Utilize the platform’s help section for any queries. Provide feedback to enhance the platform’s functionality and user experience.


## Contribute 

Follow these guidelines if you would like to contribute:

### Code Contributions

1. Fork the repository.
2. Create a new branch for your feature or bug fix: git checkout -b feature-name.
3. Implement your changes and commit them: git commit -m 'Add new feature'.
4. Push to your branch: git push origin feature-name.
5. Open a pull request on our [GitHub repository](https://github.com/advanced-computer-lab-2023/ACLERS-Pharmacy.git) with a clear description of your changes.

### Documentation

Help improve our documentation by fixing typos, clarifying instructions, or adding missing information. Submit a pull request with your documentation changes.

### Testing

If you're contributing code changes, ensure that your modifications include relevant tests to maintain the stability of the platform.

### Reporting Issues

please open an issue on the [issue tracker](https://github.com/advanced-computer-lab-2023/ACLERS-Pharmacy/issues).

## Credits

Special thanks to the following resources that contributed to the development of this project:

- [YouTube Tutorial Playlist](https://www.youtube.com/playlist?list=PLZlA0Gpn_vH_NT5zPVp18nGe_W9LqBDQK)

Feel free to check out the playlist for additional insights and tutorials.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT)

### Third-Party Licenses

Certain components and dependencies used in this project are subject to their own licenses:

- Stripe: The use of Stripe is subject to the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0). Please review the license terms for more information.

- Socket.io: The use of Socket.io is subject to the [MIT License](https://opensource.org/licenses/MIT). Please review the license terms for more information.

- MongoDB: The use of MongoDB is subject to the [Server Side Public License (SSPL)](https://www.mongodb.com/licensing/server-side-public-license). Please review the license terms for more information.

- nodemon: The use of nodemon is subject to the [MIT License](https://opensource.org/licenses/MIT). Please review the license terms for more information.

- Redux: The use of Redux is subject to the [MIT License](https://opensource.org/licenses/MIT). Please review the license terms for more information.

- Bootstrap: The use of Bootstrap is subject to the [MIT License](https://opensource.org/licenses/MIT). Please review the license terms for more information.

- JWT Authentication: The specific implementation or library used for JWT authentication is subject to its own license. Please review the license terms for more information.

Refer to the respective licenses of these components for details about permissions and restrictions. Ensure compliance with the terms of each license when using or contributing to this project.
