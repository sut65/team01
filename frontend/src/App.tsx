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
import PatientRightCreate from "./components/partientright/PatientRightCreate";
import PatientRight from "./components/partientright/PatientRight";
import OutpatientScreenings from "./components/outpatientscreening/OutpatienScreening";
import OutpatientScreeningCreate from "./components/outpatientscreening/OutpatientScreeningCreate";
import QueuingManagements from "./components/queuingmanagement/QueuingManagements";
import QueuingManagementsCreate from "./components/queuingmanagement/QueuingManagementsCreate";
import Appointments from "./components/appointment/Appointment";
import AppointmentCreate from "./components/appointment/CreateAppointment";
import MedicineRecords from "./components/medicinerecord/MedicineRecords";
import MedicineRecordCreate from "./components/medicinerecord/MedicineRecordCreate";
import Payments from "./components/payment/Payments";
import PaymentCreate from "./components/payment/PaymentCreate";

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
          <Route path="/employees" element={<Employees />} />
          <Route path="/employeecreate" element={<EmployeeCreate />} />
          <Route path="/employeecreate/:id" element={<EmployeeCreate />} />

          <Route path="/workloads" element={<Workloads />} />
          <Route path="/workloadcreate" element={<WorkloadCreate />} />
          <Route path="/workloadcreate/:id" element={<WorkloadCreate />} />

          <Route path="/patients" element={<PatientRegisters />} />
          <Route path="/patientcreate" element={<PatientRegisterCreate />} />
          <Route path="/patientcreate/:id" element={<PatientRegisterCreate />} />

          <Route path="/patientrights" element={<PatientRight />} />
          <Route path="/patientrightcreate" element={<PatientRightCreate />} />
          <Route path="/patientrightcreate/:id" element={<PatientRightCreate />} />

          <Route path="/historysheets" element={<HistorySheets />} />
          <Route path="/historysheetcreate" element={<HistorySheetCreate />} />
          <Route path="/historysheetcreate/:id" element={<HistorySheetCreate />} />
          
          <Route path="/outpatientscreenings" element={<OutpatientScreenings />} />
          <Route path="/outpatientscreeningcreate" element={<OutpatientScreeningCreate />} />
          <Route path="/outpatientscreeningcreate/:id" element={<OutpatientScreeningCreate />} />
          
          <Route path="/queuings" element={<QueuingManagements />} />
          <Route path="/queuingcreate" element={<QueuingManagementsCreate />} />
          <Route path="/queuingcreate/:id" element={<QueuingManagementsCreate />} />
          
          {/* <Route path="/diagnosisrecords" element={<HistorySheets />} />
          <Route path="/diagnosisrecordcreate" element={<HistorySheetCreate />} />
          <Route path="/diagnosisrecordcreate/:id" element={<HistorySheetCreate />} /> */}
          
          {/* <Route path="/treatmentrecords" element={<HistorySheets />} />
          <Route path="/treatmentrecordcreate" element={<HistorySheetCreate />} />
          <Route path="/treatmentrecordcreate/:id" element={<HistorySheetCreate />} /> */}
          
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/appointmentcreate" element={<AppointmentCreate />} />
          <Route path="/appointmentcreate/:id" element={<AppointmentCreate />} />
          
          <Route path="/medicinerecords" element={<MedicineRecords />} />
          <Route path="/medicinerecordcreate" element={<MedicineRecordCreate />} />
          <Route path="/medicinerecordcreate/:id" element={<MedicineRecordCreate />} />
          
          <Route path="/payments" element={<Payments />} />
          <Route path="/paymentcreate" element={<PaymentCreate />} />
          <Route path="/paymentcreate/:id" element={<PaymentCreate />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}