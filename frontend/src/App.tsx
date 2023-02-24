import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
// import PatientRegisters from "./components/PatientRegister";
// import PatientRegisterCreate from "./components/PatientRegisterCreate";
// import Home from "./components/Home";
import Login from "./components/Login";
import HistorySheetCreate from "./components/historysheet/HistorySheetCreate";
import HistorySheets from "./components/historysheet/HistorySheet";
import Employees from "./components/employee/Employees";
import EmployeeCreate from "./components/employee/EmployeeCreate";
import WorkloadCreate from "./components/workload/WorkloadCreate";
import Workloads from "./components/workload/Workloads";
import PatientRegisterCreate from "./components/patientregister/PatientRegisterCreate";
import PatientRegisters from "./components/patientregister/PatientRegister";
import Home from "./components/Home";

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
            <Route path="/employees" element={<Employees />} />
            <Route path="/createemployee" element={<EmployeeCreate />} />
            <Route path="/createemployee/:id" element={<EmployeeCreate />} />
            <Route path="/createworkload" element={<WorkloadCreate />}/>
            <Route path="/createworkload/:id" element={<WorkloadCreate />}/>
            <Route path="/workloads" element={<Workloads />}/>
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
        <Route path="/historysheet" element={<HistorySheets />} />
        <Route path="/patient" element={<PatientRegisters />} />
        <Route path="/patientcreate" element={<PatientRegisterCreate />} />
        <Route path="/patientcreate/:id" element={<PatientRegisterCreate />} />
        <Route path="/historysheetcreate" element={<HistorySheetCreate />} />
        <Route path="/historysheetcreate/:id" element={<HistorySheetCreate />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
    </Router>
  );
}