// import React from "react";
// import { Badge, Button } from "@mui/material";
// import { useLocation, useNavigate } from "react-router-dom";
// import CartItem from "../Cart/CartItem";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getOrderById } from "../../../Redux/Customers/Order/Action";
// import AddressCard from "../adreess/AdreessCard";
// import { createPayment } from "../../../Redux/Customers/Payment/Action";

// const OrderSummary = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
// const orderId = searchParams.get("order_id");
// const dispatch=useDispatch();
//   const jwt=localStorage.getItem("jwt");
//   const {order}=useSelector(state=>state)

// console.log("orderId ", order)

// useEffect(()=>{
  
//   dispatch(getOrderById(orderId))
// },[orderId])

// const handleCreatePayment=()=>{
//   const data={orderId:order.order?._id,jwt}
//   dispatch(createPayment(data))
// }
  

//   return (
//     <div className="space-y-5">
//         <div className="p-5 shadow-lg rounded-md border ">
//             <AddressCard address={order.order?.shippingAddress}/>
//         </div>
//       <div className="lg:grid grid-cols-3 relative justify-between">
//         <div className="lg:col-span-2 ">
//           <div className=" space-y-3">
//             {order.order?.orderItems.map((item) => (
//               <>
//                 <CartItem item={item} showButton={false}/>
//               </>
//             ))}
//           </div>
//         </div>
//         <div className="sticky top-0 h-[100vh] mt-5 lg:mt-0 ml-5">
//           <div className="border p-5 bg-white shadow-lg rounded-md">
//             <p className="font-bold opacity-60 pb-4">PRICE DETAILS</p>
//             <hr />

//             <div className="space-y-3 font-semibold">
//               <div className="flex justify-between pt-3 text-black ">
//                 <span>Price ({order.order?.totalItem} item)</span>
//                 <span>₹{order.order?.totalPrice}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Discount</span>
//                 <span className="text-green-700">-₹{order.order?.discounte}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Delivery Charges</span>
//                 <span className="text-green-700">Free</span>
//               </div>
//               <hr />
//               <div className="flex justify-between font-bold text-lg">
//                 <span>Total Amount</span>
//                 <span className="text-green-700">₹{order.order?.totalDiscountedPrice}</span>
//               </div>
//             </div>

//             <Button
//               onClick={handleCreatePayment}
//               variant="contained"
//               type="submit"
//               sx={{ padding: ".8rem 2rem", marginTop: "2rem", width: "100%" }}
//             >
//               Payment
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderSummary;


// import React, { useEffect, useState } from "react";
// import { Badge, Button } from "@mui/material";
// import { useLocation, useNavigate } from "react-router-dom";
// import CartItem from "../Cart/CartItem";
// import { useDispatch, useSelector } from "react-redux";
// import { getOrderById } from "../../../Redux/Customers/Order/Action";
// import AddressCard from "../adreess/AdreessCard";
// import { createPayment } from "../../../Redux/Customers/Payment/Action";
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// const OrderSummary = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const searchParams = new URLSearchParams(location.search);
//     const orderId = searchParams.get("order_id");
//     const dispatch = useDispatch();
//     const jwt = localStorage.getItem("jwt");
//     const { order } = useSelector((state) => state);
//     const stripe = useStripe();
//     const elements = useElements();
//     const [errorMessage, setErrorMessage] = useState('');

//     useEffect(() => {
//         if (orderId) {
//             dispatch(getOrderById(orderId));
//         }
//     }, [orderId, dispatch]);

//     const handleCreatePayment = async () => {
//       const data = { orderId: order.order?._id, jwt };
  
//       // Create payment and get the response from the server
//       const response = await dispatch(createPayment(data));
  
//       // Ensure the response contains a client secret
//       if (response?.clientSecret) {
//           const cardElement = elements.getElement(CardElement);
          
//           // Use the client secret to confirm the payment
//           const { error } = await stripe.confirmCardPayment(response.clientSecret, {
//               payment_method: {
//                   card: cardElement,
//               },
//           });
  
//           if (error) {
//               console.error("Payment failed:", error.message);
//               setErrorMessage(error.message); // Show error message to the user
//           } else {
//               console.log("Payment successful!");
//               navigate(`/payment/${order.order?._id}?payment_intent_client_secret=${response.clientSecret}`);

//           }
//       } else {
//           console.error("Payment creation failed", response);
//       }
//   };    
  
//     return (
//         <div className="space-y-5">
//             <div className="p-5 shadow-lg rounded-md border ">
//                 <AddressCard address={order.order?.shippingAddress} />
//             </div>
//             <div className="lg:grid grid-cols-3 relative justify-between">
//                 <div className="lg:col-span-2 ">
//                     <div className="space-y-3">
//                         {order.order?.orderItems.map((item) => (
//                             <CartItem key={item.id} item={item} showButton={false} />
//                         ))}
//                     </div>
//                 </div>
//                 <div className="sticky top-0 h-[100vh] mt-5 lg:mt-0 ml-5">
//                     <div className="border p-5 bg-white shadow-lg rounded-md">
//                         <p className="font-bold opacity-60 pb-4">PRICE DETAILS</p>
//                         <hr />
//                         <div className="space-y-3 font-semibold">
//                             <div className="flex justify-between pt-3 text-black ">
//                                 <span>Price ({order.order?.totalItem} item)</span>
//                                 <span>₹{order.order?.totalPrice}</span>
//                             </div>
//                             <div className="flex justify-between">
//                                 <span>Discount</span>
//                                 <span className="text-green-700">-₹{order.order?.discounte}</span>
//                             </div>
//                             <div className="flex justify-between">
//                                 <span>Delivery Charges</span>
//                                 <span className="text-green-700">Free</span>
//                             </div>
//                             <hr />
//                             <div className="flex justify-between font-bold text-lg">
//                                 <span>Total Amount</span>
//                                 <span className="text-green-700">₹{order.order?.totalDiscountedPrice}</span>
//                             </div>
//                         </div>

//                         {/* Stripe Card Element for payment */}
//                         <div className="mt-4">
//                             <CardElement />
//                             {errorMessage && <p className="text-red-500">{errorMessage}</p>}
//                         </div>

//                         <Button
//                             onClick={handleCreatePayment}
//                             variant="contained"
//                             sx={{ padding: ".8rem 2rem", marginTop: "2rem", width: "100%" }}
//                         >
//                             Payment
//                         </Button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default OrderSummary;



import React, { useEffect, useState } from "react";
import { Badge, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CartItem from "../Cart/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../../Redux/Customers/Order/Action";
import AddressCard from "../adreess/AdreessCard";
import { createPayment } from "../../../Redux/Customers/Payment/Action";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const OrderSummary = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const orderId = searchParams.get("order_id");
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { order } = useSelector((state) => state);
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (orderId) {
            dispatch(getOrderById(orderId));
        }
    }, [orderId, dispatch]);

    const handleCreatePayment = async () => {
      const data = { orderId: order.order?._id, jwt };
  
      // Create payment and get the response from the server
      const response = await dispatch(createPayment(data));
  
      // Ensure the response contains a client secret
      if (response?.clientSecret) {
          const cardElement = elements.getElement(CardElement);
          
          // Use the client secret to confirm the payment
          const { error } = await stripe.confirmCardPayment(response.clientSecret, {
              payment_method: {
                  card: cardElement,
              },
          });
  
          if (error) {
              console.error("Payment failed:", error.message);
              setErrorMessage(error.message); // Show error message to the user
          } else {
              console.log("Payment successful!");
              navigate(`/payment/${order.order?._id}?payment_intent_client_secret=${response.clientSecret}`);

          }
      } else {
          console.error("Payment creation failed", response);
      }
  };    
  
    return (
        <div className="space-y-5">
            <div className="p-5 shadow-lg rounded-md border ">
                <AddressCard address={order.order?.shippingAddress} />
            </div>
            <div className="lg:grid grid-cols-3 relative justify-between">
                <div className="lg:col-span-2 ">
                    <div className="space-y-3">
                        {order.order?.orderItems.map((item) => (
                            <CartItem key={item.id} item={item} showButton={false} />
                        ))}
                    </div>
                </div>
                <div className="sticky top-0 h-[100vh] mt-5 lg:mt-0 ml-5">
                    <div className="border p-5 bg-white shadow-lg rounded-md">
                        <p className="font-bold opacity-60 pb-4">PRICE DETAILS</p>
                        <hr />
                        <div className="space-y-3 font-semibold">
                            <div className="flex justify-between pt-3 text-black ">
                                <span>Price ({order.order?.totalItem} item)</span>
                                <span>₹{order.order?.totalPrice}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Discount</span>
                                <span className="text-green-700">-₹{order.order?.discounte}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Delivery Charges</span>
                                <span className="text-green-700">Free</span>
                            </div>
                            <hr />
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total Amount</span>
                                <span className="text-green-700">₹{order.order?.totalDiscountedPrice}</span>
                            </div>
                        </div>

                        {/* Stripe Card Element for payment */}
                        <div className="mt-4">
                            <CardElement />
                            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                        </div>

                        <Button
                            onClick={handleCreatePayment}
                            variant="contained"
                            sx={{ padding: ".8rem 2rem", marginTop: "2rem", width: "100%" }}
                        >
                            Payment
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
