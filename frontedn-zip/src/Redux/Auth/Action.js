// import axios from 'axios';
// import {
//   REGISTER_REQUEST,
//   REGISTER_SUCCESS,
//   REGISTER_FAILURE,
//   LOGIN_REQUEST,
//   LOGIN_SUCCESS,
//   LOGIN_FAILURE,
//   GET_USER_REQUEST,
//   GET_USER_SUCCESS,
//   GET_USER_FAILURE,
//   LOGOUT
// } from './ActionTypes';
// import api, { API_BASE_URL } from '../../config/api';

// // Register action creators
// const registerRequest = () => ({ type: REGISTER_REQUEST });
// const registerSuccess = (user) => ({ type: REGISTER_SUCCESS, payload:user });
// const registerFailure = error => ({ type: REGISTER_FAILURE, payload: error });

// export const register = userData => async dispatch => {
//   dispatch(registerRequest());
//   try {
//     const response=await axios.post(`${API_BASE_URL}/auth/signup`, userData);
//     const user = response.data;
//     if(user.jwt) localStorage.setItem("jwt",user.jwt)
//     console.log("registerr :",user)
//     dispatch(registerSuccess(user));
//   } catch (error) {
//     dispatch(registerFailure(error.message));
//   }
// };

// // Login action creators
// const loginRequest = () => ({ type: LOGIN_REQUEST });
// const loginSuccess = user => ({ type: LOGIN_SUCCESS, payload: user });
// const loginFailure = error => ({ type: LOGIN_FAILURE, payload: error });

// export const login = userData => async dispatch => {
//   dispatch(loginRequest());
//   try {
//     const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
//     const user = response.data;
//     if(user.jwt) localStorage.setItem("jwt",user.jwt)
//     console.log("login ",user)
//     dispatch(loginSuccess(user));
//   } catch (error) {
//     dispatch(loginFailure(error.message));
//   }
// };
// // Auth0 login action
// export const auth0Login = () => {
//   window.location.href = `${API_BASE_URL}/auth/auth0/login`; // Redirect to Auth0 login endpoint
// };

// // Handle Auth0 callback
// export const handleAuth0Callback = () => async (dispatch) => {
//   dispatch({ type: LOGIN_REQUEST });
//   try {
//     // Assuming your backend returns the JWT in the query params after successful login
//     const urlParams = new URLSearchParams(window.location.search);
//     const token = urlParams.get("token");

//     if (token) {
//       localStorage.setItem("jwt", token);
//       const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const user = response.data;
//       dispatch({ type: LOGIN_SUCCESS, payload: user });
//     } else {
//       throw new Error("Auth0 callback error: Missing token.");
//     }
//   } catch (error) {
//     dispatch({ type: LOGIN_FAILURE, payload: error.message });
//   }
// };




// //  get user from token
// export const getUser = (token) => {
//   return async (dispatch) => {
//     dispatch({ type: GET_USER_REQUEST });
//     try {
//       const response = await axios.get(`${API_BASE_URL}/api/users/profile`,{
//         headers:{
//           "Authorization":`Bearer ${token}`
//         }
//       });
//       const user = response.data;
//       dispatch({ type: GET_USER_SUCCESS, payload: user });
//       console.log("req User ",user)
//     } catch (error) {
//       const errorMessage = error.message;
//       dispatch({ type: GET_USER_FAILURE, payload: errorMessage });
//     }
//   };
// };

// export const logout = (token) => {
//     return async (dispatch) => {
//       dispatch({ type: LOGOUT });
//       localStorage.clear();
//     };
//   };
import axios from 'axios';
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGOUT,
} from './ActionTypes';
import { API_BASE_URL } from '../../config/api';

// Register action creators
const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (user) => ({ type: REGISTER_SUCCESS, payload: user });
const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });

export const register = (userData) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    const user = response.data;
    if (user.jwt) localStorage.setItem('jwt', user.jwt);
    console.log('Register:', user);
    dispatch(registerSuccess(user));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(registerFailure(errorMessage));
  }
};

// Login action creators
const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

export const login = (userData) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
    const user = response.data;

    // Ensure token is present and store it
    if (user.jwt) {
      localStorage.setItem('jwt', user.jwt);
      console.log('Token stored during login:', user.jwt);
    } else {
      console.warn('No token received during login.');
    }

    dispatch(loginSuccess(user));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(loginFailure(errorMessage));
  }
};

// Auth0 login action
export const auth0Login = () => {
  window.location.href = `${API_BASE_URL}/auth/auth0/login`; // Redirect to Auth0 login endpoint
};

// export const handleAuth0Callback= () => async (dispatch) => {
//   dispatch({ type: LOGIN_REQUEST });

//   try {
//     const urlParams = new URLSearchParams(window.location.search);
//     const token = urlParams.get('token');

//     if (token) {
//       console.log('Auth0 Callback Token:', token); // Debug
//       localStorage.setItem('jwt', token); // Store the token in localStorage

//       // Fetch user profile using the token
//       const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const user = response.data;

//       // Log the full user data
//       console.log('Auth0 User Data:', user);

//       // Check if firstname exists in the user profile
//       // With this check
//       if (!user.firstName || user.firstName.trim() === "") {
//         throw new Error('Missing or invalid firstname in user profile from Auth0.');
//       }

//       console.log('User Data from Auth0 Callback:', user); // Debug
//       dispatch({ type: LOGIN_SUCCESS, payload: user });
//     } else {
//       console.warn('No token found in Auth0 callback URL.');
//       throw new Error('Auth0 callback error: Missing token.');
//     }
//   } catch (error) {
//     console.error('Error in Auth0 Callback:', error); // Log any caught errors
//     const errorMessage = error.response?.data?.message || error.message;
//     console.error('Auth0 Callback Error:', errorMessage);
//     dispatch({ type: LOGIN_FAILURE, payload: errorMessage });
//   }
// };
export const handleAuth0Callback = () => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      console.log('Auth0 Callback Token:', token);
      localStorage.setItem('jwt', token);

      // Fetch user profile using the token
      const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = response.data;

      console.log('Auth0 User Data:', user);

      if (!user.firstName || user.firstName.trim() === "") {
        throw new Error('Missing or invalid firstname in user profile from Auth0.');
      }

      dispatch({ type: LOGIN_SUCCESS, payload: user });

      // Automatically redirect to homepage after login success
      window.location.href = '/'; // Adjust this path as per your routing setup
    } else {
      console.warn('No token found in Auth0 callback URL.');
      throw new Error('Auth0 callback error: Missing token.');
    }
  } catch (error) {
    console.error('Error in Auth0 Callback:', error);
    const errorMessage = error.response?.data?.message || error.message;
    console.error('Auth0 Callback Error:', errorMessage);
    dispatch({ type: LOGIN_FAILURE, payload: errorMessage });
  }
};

// export const handleAuth0Callback = () => async (dispatch) => {
//   dispatch({ type: LOGIN_REQUEST });
//   try {
//     const urlParams = new URLSearchParams(window.location.search);
//     const token = urlParams.get('token'); // Extract token from query params

//     // Check for token and store it
//     if (token) {
//       localStorage.setItem('jwt', token);
//       console.log('Token stored during Auth0 callback:', token);

//       // Fetch user profile using the token
//       const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const user = response.data;
//       console.log('User Data from Auth0 Callback:', user);

//       if (!user.firstname) {
//         throw new Error('Missing user.firstname in Auth0 response');
//       }

//       dispatch({ type: LOGIN_SUCCESS, payload: user });
//     } else {
//       console.warn('No token received during Auth0 callback.');
//       throw new Error('Auth0 callback error: Missing token.');
//     }
//   } catch (error) {
//     const errorMessage = error.response?.data?.message || error.message;
//     console.error('Auth0 Callback Error:', errorMessage);
//     dispatch({ type: LOGIN_FAILURE, payload: errorMessage });
//   }
// };


// Get user from token
export const getUser = (token) => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  try {
    const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const user = response.data;
    console.log('Token passed to getUser:', user);

    dispatch({ type: GET_USER_SUCCESS, payload: user });
    console.log('Get User:', user);
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({ type: GET_USER_FAILURE, payload: errorMessage });
  }
};

// Logout
export const logout = () => (dispatch) => {
  localStorage.clear();
  dispatch({ type: LOGOUT });
};


