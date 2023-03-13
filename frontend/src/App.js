import React, {useState} from 'react'
import './App.css';
import {BrowserRouter as Router, Routes, Route, Outlet} from 'react-router-dom'
import Login from "./pages/login";
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import DashboardHR from './pages/dashboard_hr';
import Sidebar from './components/sidebar';
import SidebarHr from './components/sidebarHr';
import LemburUser from './pages/lembur_user';
import LemburHr from './pages/lembur_hr';
import ReimburseUser from './pages/reimburse_user';
import ReimburseHr from './pages/reimburse_hr';
import Absen from './pages/absen';
import Cookies from 'js-cookie'

export const SidebarLayout = () => (
  <div className='flex'>
    <Sidebar />
    <Outlet />
  </div>
);

export const SidebarHrLayout = () => (
  <div className='flex'>
    <SidebarHr />
    <Outlet />
  </div>
);

function App() {
  let [role, setRole]=useState(""); 
  role = Cookies.get('role');
  return (
    <Router>
        <Routes>
            <Route exact path="/" element={<Login/>}/>
            <Route exact path="/register" element={<Register/>}/>
            {role === "karyawan" && 
              <Route element={<SidebarLayout/>}>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/reimburseUser" element={<ReimburseUser/>}/>
                <Route path="/lemburUser" element={<LemburUser/>}/>
                <Route path="/absen" element={<Absen/>}/>
              </Route>
            }
            {role === "hr" &&
              <Route element={<SidebarHrLayout/>}>
                <Route path="/dashboardHr" element={<DashboardHR/>}/>
                <Route path="/lemburHr" element={<LemburHr/>}/>
                <Route path="/absen" element={<Absen/>}/>
                <Route path="/reimburseHr" element={<ReimburseHr/>}/>
              </Route>
            }
        </Routes>
    </Router>
  );
}

export default App;
