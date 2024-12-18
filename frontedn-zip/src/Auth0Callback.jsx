import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { handleAuth0Callback } from '../src/Redux/Auth/Action';

const Auth0Callback = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleAuth0Callback());
  }, [dispatch]);

  return <div>Authenticating...</div>;
};

export default Auth0Callback;
