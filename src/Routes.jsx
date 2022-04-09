import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { linkAsDirector, linkAsEmployee, linkHomePage } from './Constants'
import HomePage from './PAGES/HomePage/HomePage'
import StaffingTable from './PAGES/StaffingTable/StaffingTable'


function RoutesPage() {
    return (
        <Routes>
            <Route path={linkHomePage} element={<HomePage/>}/> {/* HOME PAGE QISMI */}
            <Route path={linkAsDirector} element={<StaffingTable />} /> {/* HODIMLARNING MALUMOTLARI AGAR DIRECTOR SIFATIDA KIRSA */}
            <Route path={linkAsEmployee} element={<StaffingTable />} /> {/* HODIMLARNING MALUMOTLARI AGAR ODDIY HODIM SIFATIDA KIRSA */}
        </Routes>
    )
}

export default RoutesPage
