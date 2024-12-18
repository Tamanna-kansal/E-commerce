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
} from "./ActionTypes";

const initialState = {
  user: null,
  token: localStorage.getItem('jwt') || null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REGISTER_REQUEST':
    case 'LOGIN_REQUEST':
    case 'GET_USER_REQUEST':
      return { ...state, loading: true, error: null };

    case 'REGISTER_SUCCESS':
    case 'LOGIN_SUCCESS':
      return { ...state, loading: false, user: action.payload, token: action.payload.jwt, error: null };

    case 'GET_USER_SUCCESS':
      return { ...state, loading: false, user: action.payload, error: null };

    case 'REGISTER_FAILURE':
    case 'LOGIN_FAILURE':
    case 'GET_USER_FAILURE':
      return { ...state, loading: false, error: action.payload };

    case 'LOGOUT':
      localStorage.removeItem("token");
      return { ...state, user: null, token: null };

    default:
      return state;
  }
};

export default authReducer;