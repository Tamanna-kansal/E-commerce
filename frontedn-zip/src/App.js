// import { Route, Routes } from 'react-router-dom';
// import './App.css';
// import Navigation from './customer/Components/Navbar/Navigation';
// import CustomerRoutes from './Routers/CustomerRoutes';
// import AdminRoutes from './Routers/AdminRoutes';
// import NotFound from './Pages/Notfound';
// import AdminPannel from './Admin/AdminPannel';
// // import Routers from './Routers/Routers';

// function App() {
//   const isAdmin=true;
//   return (
//     <div className="">
      
//       <Routes>
//         <Route path="/*" element={<CustomerRoutes />} />
//         <Route path="/admin/*" element={<AdminPannel />} />
        
//       </Routes>
//     </div>
//   );`
// }

// export default App;



// import { Route, Routes } from 'react-router-dom';
// import './App.css';
// import CustomerRoutes from './Routers/CustomerRoutes';
// import AdminPannel from './Admin/AdminPannel';
// import PaymentSuccess from './customer/Components/paymentSuccess/PaymentSuccess';

// function App() {
//   return (
//     <div className="">
//       <Routes>
//         <Route path="/*" element={<CustomerRoutes />} />
//         <Route path="/admin/*" element={<AdminPannel />} />
//         <Route path="/payment-success/:orderId" element={<PaymentSuccess />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;


import { Route, Routes } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import './App.css';
import CustomerRoutes from './Routers/CustomerRoutes';
import AdminPannel from './Admin/AdminPannel';
import Auth0Callback from './Auth0Callback';
// import PaymentSuccess from './customer/Components/paymentSuccess/PaymentSuccess';

// Load your Stripe publishable key from environment variables
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function App() {
  return (
    <div>
      {/* Wrap Stripe-dependent components with <Elements> */}
      <Elements stripe={stripePromise}>
        <Routes>
          {/* Customer-facing routes */}
          <Route path="/*" element={<CustomerRoutes />} />
          
          {/* Admin panel routes */}
          <Route path="/admin/*" element={<AdminPannel />} />

          <Route path="/auth/callback" element={<Auth0Callback />} />


          {/* Uncomment if needed for payment success */}
          {/* <Route path="/payment-success/:orderId" element={<PaymentSuccess />} /> */}
        </Routes>
      </Elements>
    </div>
  );
}

export default App;

