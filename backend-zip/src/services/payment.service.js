// const razorpay = require("../config/razorpayClient");
// const orderService=require("../services/order.service.js");

// const createPaymentLink= async (orderId)=>{
//     // const { amount, currency, receipt, notes } = reqData;
    

//     try {
        
//         const order = await orderService.findOrderById(orderId);
    
//         const paymentLinkRequest = {
//           amount: order.totalPrice * 100,
//           currency: 'INR',
//           customer: {
//             name: order.user.firstName + ' ' + order.user.lastName,
//             contact: order.user.mobile,
//             email: order.user.email,
//           },
//           notify: {
//             sms: true,
//             email: true,
//           },
//           reminder_enable: true,
//           callback_url: `https://codewithzosh-ecommerce-mern.vercel.app/payment/${orderId}`,
//           callback_method: 'get',
//         };
    
//         const paymentLink = await razorpay.paymentLink.create(paymentLinkRequest);
    
//         const paymentLinkId = paymentLink.id;
//         const payment_link_url = paymentLink.short_url;
    
     
    
//         // Return the payment link URL and ID in the response
//         const resData = {
//           paymentLinkId: paymentLinkId,
//           payment_link_url,
//         };
//         return resData;
//       } catch (error) {
//         console.error('Error creating payment link:', error);
//         throw new Error(error.message);
//       }
// }

// const updatePaymentInformation=async(reqData)=>{
//     const paymentId = reqData.payment_id;
//   const orderId = reqData.order_id;

//   try {
//     // Fetch order details (You will need to implement the 'orderService.findOrderById' function)
//     const order = await orderService.findOrderById(orderId);

//     // Fetch the payment details using the payment ID
//     const payment = await razorpay.payments.fetch(paymentId);
  

//     if (payment.status === 'captured') {
     

//       order.paymentDetails.paymentId=paymentId;
//       order.paymentDetails.status='COMPLETED'; 
//       order.orderStatus='PLACED';
     

     
//       await order.save()
//     }
//     console.log( 'payment status',order);
//     const resData = { message: 'Your order is placed', success: true };
//     return resData
//   } catch (error) {
//     console.error('Error processing payment:', error);
//     throw new Error(error.message)
//   }
// }

// module.exports={createPaymentLink,updatePaymentInformation}

// services/payment.service.js
// services/payment.service.js
const stripe = require('../config/stripeClient');
const orderService = require("../services/order.service.js");

const createPaymentLink = async (orderId) => {
  const order = await orderService.findOrderById(orderId);

  // Check if order exists
  if (!order) {
    throw new Error(`Order with ID ${orderId} not found`);
  }

  // Create a payment intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: order.totalPrice * 100, // Ensure totalPrice is in the correct format
    currency: 'INR',
    metadata: { orderId: order._id.toString() },
    automatic_payment_methods: { enabled: true },
  });

  // Return both client_secret and paymentIntent ID
  return { 
    clientSecret: paymentIntent.client_secret, 
    paymentIntentId: paymentIntent.id // Add this line to return the payment intent ID
  };
};


const updatePaymentInformation = async (reqData) => {
  const paymentId = reqData.payment_id;
  const orderId = reqData.order_id;

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);
    const order = await orderService.findOrderById(orderId);

    if (paymentIntent.status === 'succeeded') {
      order.paymentDetails = {
        paymentId: paymentId,
        status: 'COMPLETED'
      };
      order.orderStatus = 'PLACED';
      await order.save();
    }

    return { message: 'Your order is placed', success: true };
  } catch (error) {
    console.error('Error updating payment information:', error);
    throw new Error(error.message);
  }
};

module.exports = { createPaymentLink, updatePaymentInformation };
