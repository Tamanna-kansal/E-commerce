// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { BrowserRouter, } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { store } from './Redux/Store';
// import { Auth0Provider } from '@auth0/auth0-react';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <Auth0Provider
//       domain="dev-ezm8fb8ksh1juosc.us.auth0.com"
//       clientId="WnHviFmHWAAiA1c1vG2qSJavSndoxsXh"
//       authorizationParams={{
//         redirect_uri: window.location.origin
//       }}
//     >
//     <BrowserRouter>
//     <Provider store={store}>
//       <App />
//     </Provider>
      
  
      
//     </BrowserRouter>
//     </Auth0Provider>
//   </React.StrictMode>
// );

// reportWebVitals();
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Redux/Store';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Auth0 Provider for Authentication */}
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin, // Redirect back to the app after login
      }}
    >
      {/* BrowserRouter for Routing */}
      <BrowserRouter>
        {/* Redux Provider for State Management */}
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);

// Measure app performance
reportWebVitals();
