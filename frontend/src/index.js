import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter} from 'react-router-dom'
import {Auth0Provider} from '@auth0/auth0-react'
import './index.css';
import App from './App';

const domain = process.env.REACT_APP_AUTH0_DOMAIN
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID
ReactDOM.render(
    <Auth0Provider 
      audience="https://live-chat-app.us.auth0.com/api/v2/"
      scope="read:user_idp_tokens read:current_user"
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin} >
      <App />
    </Auth0Provider>,
  document.getElementById('root')
);
