import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import reducer from './store/reducer';
import { Provider } from 'react-redux';
import BaseLayout from './components/BaseLayout';
import About from './components/About';
import Results from './components/Results';
import Search2 from './components/Search2';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Configure toast here
toast.configure();

const store = configureStore({ reducer });


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <BaseLayout>
          <Routes>
            <Route element={<Search2 />} path="/" />
            <Route element={<About />} path="/about" />
            <Route element={<Results />} path="/results" />
          </Routes>
        </BaseLayout>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
