import React from "react";
import { DiagnosisRecordInterface } from "../models/IDiagnosisRecord";
import { SigninInterface } from "../models/ISignIn";
import { TreatmentRecordInterface } from "../models/ITreatmentRecord";

const apiUrl = "http://localhost:8080";

async function Login(data: SigninInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/login`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("uid", res.data.id);
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

//===============================================================================

//GET Disease
async function GetDisease() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/diseases`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

//GET Medicine
async function GetMedicine() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/medicines`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

//Get Employee
async function GetEmployee() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/employees`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

//Get EmployeeByUID
async function GetEmployeeByUID() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/employee/${localStorage.getItem("id")}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

//Get Patient
async function GetPatient() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/patients`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

//Get Historysheet
async function GetHistorysheet() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/historysheets`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

//Get MedicalCertificate
// async function GetMedicalCertificate() {
//   const requestOptions = {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//       "Content-Type": "application/json",
//     },
//   };

//   let res = await fetch(`${apiUrl}/medicalcertificates`, requestOptions)
//     .then((response) => response.json())
//     .then((res) => {
//       console.log(res.data);
//       if (res.data) {
//         return res.data;
//       } else {
//         return false;
//       }
//     });

//   return res;
// }


//================================================================================================

//Create Diagnosis
async function CreateDiagnosisRecord(data: DiagnosisRecordInterface) {
  const requestOption = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/diagnosisrecords`, requestOption)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        console.log(res.error);
        return { status: false, message: res.error };
      }
    });

  return res;
}

//Get DiagnosisRecord
async function GetDiagnosisRecord() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/diagnosisrecords`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

//Create Treatment
async function CreateTreatmentRecord(data: TreatmentRecordInterface) {
  const requestOption = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };


  let res = await fetch(`${apiUrl}/treatmentrecords`, requestOption)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });
  return res;
}

//Get TreatmentRecord
async function GetTreatmentRecord() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/treatmentrecords`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

export {
  Login,
  GetDisease,
  GetMedicine,
  GetEmployee,
  GetEmployeeByUID,
  GetPatient,
  GetHistorysheet,
  // GetMedicalCertificate,
  CreateDiagnosisRecord, GetDiagnosisRecord,
  CreateTreatmentRecord, GetTreatmentRecord,
};