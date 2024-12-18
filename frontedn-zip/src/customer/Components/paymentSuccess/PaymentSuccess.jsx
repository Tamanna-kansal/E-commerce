// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { updatePayment } from "../../../Redux/Customers/Payment/Action";
// import { Alert, AlertTitle, Box, Grid } from "@mui/material";
// import { deepPurple } from "@mui/material/colors";
// import StarIcon from "@mui/icons-material/Star";
// import { getOrderById } from "../../../Redux/Customers/Order/Action";
// import OrderTraker from "../orders/OrderTraker";
// import AddressCard from "../adreess/AdreessCard";
// import { useParams } from "react-router-dom";

// const PaymentSuccess = () => {
//   // razorpay_payment_link_reference_id
//   // razorpay_payment_id
//   const [paymentId, setPaymentId] = useState("");
//   const [referenceId, setReferenceId] = useState("");
//   const [paymentStatus, setPaymentStatus] = useState("");
//   const {orderId}=useParams();

  

//   const jwt = localStorage.getItem("jwt");
//   const dispatch = useDispatch();
//   const { order } = useSelector((store) => store);

//   useEffect(() => {
//     console.log("orderId",orderId)
//     const urlParams = new URLSearchParams(window.location.search);
//     setPaymentId(urlParams.get("razorpay_payment_id"));
//     setReferenceId(urlParams.get("razorpay_payment_link_reference_id"));
//     setPaymentStatus(urlParams.get("razorpay_payment_link_status"));
//   }, []);

//   useEffect(() => {
//     if (paymentId && paymentStatus === "paid") {
//       const data = { orderId, paymentId, jwt };
//       dispatch(updatePayment(data));
//       dispatch(getOrderById(orderId));
//     }
//   }, [orderId, paymentId]);

//   return (
//     <div className="px-2 lg:px-36">
//       <div className="flex flex-col justify-center items-center">
//         <Alert
//           variant="filled"
//           severity="success"
//           sx={{ mb: 6, width: "fit-content" }}
//         >
//           <AlertTitle>Payment Success</AlertTitle>
//           Congratulation Your Order Get Placed
//         </Alert>
//       </div>

//       <OrderTraker activeStep={1}/>

//       <Grid container className="space-y-5 py-5 pt-20">
//         {order.order?.orderItems.map((item) => (
//           <Grid
//             container
//             item
//             className="shadow-xl rounded-md p-5 border"
//             sx={{ alignItems: "center", justifyContent: "space-between" }}
//           >
//             <Grid item xs={6}>
//               {" "}
//               <div className="flex  items-center ">
//                 <img
//                   className="w-[5rem] h-[5rem] object-cover object-top"
//                   src={item?.product.imageUrl}
//                   alt=""
//                 />
//                 <div className="ml-5 space-y-2">
//                   <p className="">{item.product.title}</p>
//                   <p className="opacity-50 text-xs font-semibold space-x-5">
//                     <span>Color: pink</span> <span>Size: {item.size}</span>
//                   </p>
//                   <p>Seller: {item.product.brand}</p>
//                   <p>₹{item.price}</p>
//                 </div>
//               </div>
//             </Grid>
//             <Grid item>
//               <AddressCard address={order.order?.shippingAddress} />
//             </Grid>
//           </Grid>
//         ))}
//       </Grid>
//     </div>
//   );
// };

// export default PaymentSuccess;

// PaymentSuccess.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePayment } from "../../../Redux/Customers/Payment/Action";
import { Alert, AlertTitle, Grid } from "@mui/material";
import { useParams, useLocation } from "react-router-dom";
import { getOrderById } from "../../../Redux/Customers/Order/Action";
import OrderTraker from "../orders/OrderTraker";
import AddressCard from "../adreess/AdreessCard";

const PaymentSuccess = () => {
    const [clientSecret, setClientSecret] = useState("");
    const { orderId } = useParams(); // Get orderId from path params
    const dispatch = useDispatch();
    const { order } = useSelector((store) => store);
    const location = useLocation();
    const jwt = localStorage.getItem("jwt");

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        setClientSecret(urlParams.get("payment_intent_client_secret"));
    }, [location.search]);

    useEffect(() => {
        if (clientSecret && orderId) {
            const data = { orderId, clientSecret, jwt };
            dispatch(updatePayment(data)); // Updates backend with payment status
            dispatch(getOrderById(orderId)); // Fetch order details to display
        }
    }, [orderId, clientSecret, dispatch]);

    return (
        <div className="px-2 lg:px-36">
            <div className="flex flex-col justify-center items-center">
                <Alert variant="filled" severity="success" sx={{ mb: 6, width: "fit-content" }}>
                    <AlertTitle>Payment Success</AlertTitle>
                    Congratulations! Your order has been placed successfully.
                </Alert>
            </div>

            <OrderTraker activeStep={1} />

            <Grid container className="space-y-5 py-5 pt-20">
                {order.order?.orderItems.map((item) => (
                    <Grid container item key={item.product.id} className="shadow-xl rounded-md p-5 border" sx={{ alignItems: "center", justifyContent: "space-between" }}>
                        <Grid item xs={6}>
                            <div className="flex items-center">
                                <img className="w-[5rem] h-[5rem] object-cover object-top" src={item?.product.imageUrl} alt={item.product.title} />
                                <div className="ml-5 space-y-2">
                                    <p>{item.product.title}</p>
                                    <p className="opacity-50 text-xs font-semibold space-x-5">
                                        <span>Color: {item.color || 'N/A'}</span>
                                        <span>Size: {item.size}</span>
                                    </p>
                                    <p>Seller: {item.product.brand}</p>
                                    <p>Price: ₹{item.price}</p>
                                </div>
                            </div>
                        </Grid>
                        <Grid item>
                            <AddressCard address={order.order?.shippingAddress} />
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default PaymentSuccess;
