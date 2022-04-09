import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import HomePage from './PAGES/HomePage/HomePage';
import StaffingTable from './PAGES/StaffingTable/StaffingTable';
import { Routes, Route } from 'react-router-dom';
import { linkAsDirector, linkAsEmployee, linkHomePage } from './Constants';

function Main() {
  return (
    <Routes >
      <Route path={linkHomePage} element={<HomePage/>}/> {/* HOME PAGE QISMI */}
      <Route path={linkAsDirector} element={<StaffingTable />} /> {/* HODIMLARNING MALUMOTLARI AGAR DIRECTOR SIFATIDA KIRSA */}
      <Route path={linkAsEmployee} element={<StaffingTable />} /> {/* HODIMLARNING MALUMOTLARI AGAR ODDIY HODIM SIFATIDA KIRSA */}
    </Routes>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));// PROEKT REACTNINTNG YANGILANGAN 18 VERSIYASIDA QURILGAN
root.render(<BrowserRouter>
  <Main/>
</BrowserRouter>)
