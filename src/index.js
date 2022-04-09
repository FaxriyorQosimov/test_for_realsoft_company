import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById("root"));// PROEKT REACTNINTNG YANGILANGAN 18 VERSIYASIDA QURILGAN
root.render(<BrowserRouter>
  <App/>
</BrowserRouter>)
