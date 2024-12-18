// import { API_BASE_URL } from '../../../config/api';
// import {
//     CREATE_PAYMENT_REQUEST,
//     CREATE_PAYMENT_SUCCESS,
//     CREATE_PAYMENT_FAILURE,
//     UPDATE_PAYMENT_REQUEST,
//     UPDATE_PAYMENT_SUCCESS,
//     UPDATE_PAYMENT_FAILURE,
//   } from './ActionType';
  
//   import axios from 'axios';
  
//   export const createPayment = (reqData) => async (dispatch) => {
//     console.log("create payment reqData ",reqData)
//     try {
//       dispatch({
//         type: CREATE_PAYMENT_REQUEST,
//       });
//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${reqData.jwt}`,
//         },
//       };
  
//       const { data } = await axios.post(`${API_BASE_URL}/api/payments/${reqData.orderId}`,reqData, config);
//   console.log("datta",data)
//   if(data.payment_link_url){
//     window.location.href=data.payment_link_url;
//   }
//       dispatch({
//         type: CREATE_PAYMENT_SUCCESS,
//         payload: data,
//       });
//     } catch (error) {
//       dispatch({
//         type: CREATE_PAYMENT_FAILURE,
//         payload: error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//       });
//     }
//   };
  



//   export const updatePayment = (reqData) => {
//     return async (dispatch) => {
//       console.log("update payment reqData ",reqData)
//       dispatch(updatePaymentRequest());
//       try {
//         const config = {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${reqData.jwt}`,
//           },
//         };
//         const response = await axios.get(`${API_BASE_URL}/api/payments?payment_id=${reqData.paymentId}&order_id=${reqData.orderId}`,config);
//         console.log("updated data ---- ",response.data)
//         dispatch(updatePaymentSuccess(response.data));
//       } catch (error) {
//         dispatch(updatePaymentFailure(error.message));
//         console.log("catch error ",error)
//       }
//     };
//   };

// export const updatePaymentRequest = () => {
//   return {
//     type: UPDATE_PAYMENT_REQUEST,
//   };
// };

// export const updatePaymentSuccess = (payment) => {
//   return {
//     type: UPDATE_PAYMENT_SUCCESS,
//     payload: payment,
//   };
// };

// export const updatePaymentFailure = (error) => {
//   return {
//     type: UPDATE_PAYMENT_FAILURE,
//     payload: error,
//   };
// };

 
  // Action.js for Payment
// import { API_BASE_URL } from '../../../config/api';
// import {
//     CREATE_PAYMENT_REQUEST,
//     CREATE_PAYMENT_SUCCESS,
//     CREATE_PAYMENT_FAILURE,
//     UPDATE_PAYMENT_REQUEST,
//     UPDATE_PAYMENT_SUCCESS,
//     UPDATE_PAYMENT_FAILURE,
// } from './ActionType';

// import axios from 'axios';

// // Create Payment Action (to generate the client secret)
// export const createPayment = (reqData) => async (dispatch) => {
//     try {
//         dispatch({ type: CREATE_PAYMENT_REQUEST });

//         const config = {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${reqData.jwt}`,
//             },
//         };

//         // Adjusted URL for Stripe
//         const { data } = await axios.post(`${API_BASE_URL}/api/payments/${reqData.orderId}`, reqData, config);

//         // Dispatch success action
//         dispatch({
//             type: CREATE_PAYMENT_SUCCESS,
//             payload: data,
//         });

//         // Return client secret to component
//         return data.clientSecret;
//     } catch (error) {
//         dispatch({
//             type: CREATE_PAYMENT_FAILURE,
//             payload: error.response && error.response.data.message
//                 ? error.response.data.message
//                 : error.message,
//         });
//     }
// };

// export const updatePayment = ({ orderId, clientSecret, jwt }) => async (dispatch) => {
//   try {
//     const response = await axios.put(
//       `http://localhost:5454/api/payments`,
//       { orderId, clientSecret },
//       {
//         headers: {
//           Authorization: `Bearer ${jwt}`,
//         },
//       }
//     );

//     dispatch({
//       type: UPDATE_PAYMENT_SUCCESS,
//       payload: response.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: UPDATE_PAYMENT_FAILURE,
//       payload: error.response?.data || "Error updating payment",
//     });
//   }
// };

// Action.js
import { API_BASE_URL } from '../../../config/api';
import {
    CREATE_PAYMENT_REQUEST,
    CREATE_PAYMENT_SUCCESS,
    CREATE_PAYMENT_FAILURE,
    UPDATE_PAYMENT_REQUEST,
    UPDATE_PAYMENT_SUCCESS,
    UPDATE_PAYMENT_FAILURE,
} from './ActionType';
import axios from 'axios';

export const createPayment = (reqData) => async (dispatch) => {
  try {
      dispatch({ type: CREATE_PAYMENT_REQUEST });

      const config = {
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${reqData.jwt}`,
          },
      };

      const { data } = await axios.post(
          `${API_BASE_URL}/api/payments/${reqData.orderId}`,
          reqData,
          config
      );

      dispatch({
          type: CREATE_PAYMENT_SUCCESS,
          payload: data,
      });

      // Log the response for debugging
      console.log("Create Payment Response:", data);
      return data; // Return the full response
  } catch (error) {
      dispatch({
          type: CREATE_PAYMENT_FAILURE,
          payload: error.response?.data?.message || error.message,
      });
      console.error("Error creating payment:", error);
  }
};

// Update Payment Action for Payment Success
export const updatePayment = ({ orderId, clientSecret, jwt }) => async (dispatch) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/payments`,
      { orderId, clientSecret },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    dispatch({
      type: UPDATE_PAYMENT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PAYMENT_FAILURE,
      payload: error.response?.data || "Error updating payment",
    });
  }
};
