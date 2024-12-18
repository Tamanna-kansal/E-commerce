import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ProductDetails from "../customer/Components/Product/ProductDetails/ProductDetails";
import Product from "../customer/Components/Product/Product/Product";
import Contact from "../Pages/Contact";
import TearmsCondition from "../Pages/TearmsCondition";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import About from "../Pages/About";
import Homepage from "../Pages/Homepage";
import Navigation from "../customer/Components/Navbar/Navigation";
import Cart from "../customer/Components/Cart/Cart";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Button} from "@mui/material";
import { customTheme, customerTheme } from "../Admin/them/customeThem";
import Order from "../customer/Components/orders/Order";
import OrderDetails from "../customer/Components/orders/OrderDetails";
import Checkout from "../customer/Components/Checkout/Checkout";
import Footer from "../customer/Components/footer/Footer";
import PaymentSuccess from "../customer/Components/paymentSuccess/PaymentSuccess";
import RateProduct from "../customer/Components/ReviewProduct/RateProduct";

const CustomerRoutes = () => {
    const location = useLocation();
    
  
    // Only show Navigation component when not on the NotFound page
    const showNavigation = location.pathname !== "*";

    // const path=["/","/home","/about","/privacy-policy","/terms-condition","/contact","/men",`/product/${productId}`]
  return (
    <div>
    
    <ThemeProvider theme={customerTheme}>
    {showNavigation && <Navigation />}
     <Routes>
     <Route path="/login" element={<Homepage />}></Route>
     <Route path="/register" element={<Homepage />}></Route>

        <Route path="/" element={<Homepage />}></Route>
        <Route path="/home" element={<Homepage />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/privaciy-policy" element={<PrivacyPolicy />}></Route>
        <Route path="/terms-condition" element={<TearmsCondition />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/:lavelOne/:lavelTwo/:lavelThree" element={<Product />}></Route>
        <Route path="/product/:productId" element={<ProductDetails />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/account/order" element={<Order />}></Route>
        <Route path="/account/order/:orderId" element={<OrderDetails />}></Route>
        <Route path="/account/rate/:productId" element={<RateProduct />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/payment/:orderId" element={<PaymentSuccess />}></Route>
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      <Footer/>
    </ThemeProvider>
      
    </div>
  );
};

export default CustomerRoutes;



// import React from "react";
// import { Route, Routes, useLocation, Navigate } from "react-router-dom";
// import ProductDetails from "../customer/Components/Product/ProductDetails/ProductDetails";
// import Product from "../customer/Components/Product/Product/Product";
// import Contact from "../Pages/Contact";
// import TearmsCondition from "../Pages/TearmsCondition";
// import PrivacyPolicy from "../Pages/PrivacyPolicy";
// import About from "../Pages/About";
// import Homepage from "../Pages/Homepage";
// import Navigation from "../customer/Components/Navbar/Navigation";
// import Cart from "../customer/Components/Cart/Cart";
// import { ThemeProvider } from "@mui/material/styles";
// import { customerTheme } from "../Admin/them/customeThem";
// import Order from "../customer/Components/orders/Order";
// import OrderDetails from "../customer/Components/orders/OrderDetails";
// import Checkout from "../customer/Components/Checkout/Checkout";
// import Footer from "../customer/Components/footer/Footer";
// import PaymentSuccess from "../customer/Components/paymentSuccess/PaymentSuccess";
// import RateProduct from "../customer/Components/ReviewProduct/RateProduct";
// import { useAuth0 } from "@auth0/auth0-react";

// const CustomerRoutes = () => {
//   const location = useLocation();
//   const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

//   // Only show Navigation component when not on the NotFound page
//   const showNavigation = location.pathname !== "*";

//   // Handle protected routes
//   const ProtectedRoute = ({ children }) => {
//     if (isLoading) {
//       return <div>Loading...</div>; // Show a loading screen while Auth0 checks authentication
//     }

//     if (!isAuthenticated) {
//       // Redirect unauthenticated users to the login page
//       loginWithRedirect({ appState: { returnTo: location.pathname } });
//       return null;
//     }

//     return children;
//   };

//   return (
//     <div>
//       <ThemeProvider theme={customerTheme}>
//         {showNavigation && <Navigation />}
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<Homepage />} />
//           <Route path="/home" element={<Homepage />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//           <Route path="/terms-condition" element={<TearmsCondition />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/:lavelOne/:lavelTwo/:lavelThree" element={<Product />} />
//           <Route path="/product/:productId" element={<ProductDetails />} />
//           <Route path="/cart" element={<Cart />} />

//           {/* Protected Routes */}
//           <Route
//             path="/account/order"
//             element={
//               <ProtectedRoute>
//                 <Order />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/account/order/:orderId"
//             element={
//               <ProtectedRoute>
//                 <OrderDetails />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/account/rate/:productId"
//             element={
//               <ProtectedRoute>
//                 <RateProduct />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/checkout"
//             element={
//               <ProtectedRoute>
//                 <Checkout />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/payment/:orderId"
//             element={
//               <ProtectedRoute>
//                 <PaymentSuccess />
//               </ProtectedRoute>
//             }
//           />
//           {/* Handle 404 - Not Found */}
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//         <Footer />
//       </ThemeProvider>
//     </div>
//   );
// };

// export default CustomerRoutes;
