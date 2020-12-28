import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import './custom.scss';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import './styles/react_dates_overrides.css';
import UserProvider from './contexts/User';
import SignupProvider from './contexts/ShowSignup';
require('dotenv').config();

ReactDOM.render(
  <UserProvider>
    <SignupProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SignupProvider>
  </UserProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
