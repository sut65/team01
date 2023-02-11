import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
// import PatientRegisters from "./components/PatientRegister";
// import PatientRegisterCreate from "./components/PatientRegisterCreate";
import Home from "./components/Home";
import Login from "./components/Login";
import HistorySheets from "./components/HistorySheet";
import HistorySheetCreate from "./components/HistorySheetCreate";

export default function App() {
  // const [token, setToken] = React.useState<string | null>();
  const token: string | null = localStorage.getItem("token"); // ตัวแปร token จะดึงค่า token ที่อยู่ใน local storage

  // useEffect(() => {
  //   setToken();
  // }, []);

  
  // ถ้า local storage ไม่มี token หรือ ตัวแปร token เป็น null จะสามารถเข้าถึง path Home, Log in และ UserCreate ได้
  if (!token) {
    return (
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/create" element={<UserCreate />} /> */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        
      </Router>
    );
  }


  // ถ้า local storage มี token หรือ ตัวแปร token ไม่เป็น null จะสามารถเข้าถึง path Home, Users
  return (
    <Router>
    <div>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/historysheet" element={<HistorySheets />} />
        {/* <Route path="/patient" element={<PatientRegisters />} /> */}
        {/* <Route path="/user_user" element={<UserForUser />} /> */}
        {/* <Route path="/patientcreate" element={<PatientRegisterCreate />} /> */}
        <Route path="/historysheetcreate" element={<HistorySheetCreate />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
    </Router>
  );
}