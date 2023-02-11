import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Checkbox, Divider, FormControl,
  FormControlLabel, FormGroup,
  FormLabel, IconButton, InputLabel, MenuItem, Snackbar
} from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from "@mui/material/Paper";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import DateFnsUtils from "@date-io/date-fns";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import '../App.css';
import { EmployeeInterface, GenderInterface } from "../models/IEmployee";
import { PatientRegisterInterface } from "../models/IPatientRegister";
import { DiagnosisRecordInterface, DiseaseInterface } from "../models/IDiagnosisRecord";
import { MedicineInterface, TreatmentRecordInterface } from "../models/ITreatmentRecord";

import {
  GetEmployee,
  GetEmployeeByUID,
  GetPatient,
  GetDiagnosisRecord,
  GetMedicine,
  CreateTreatmentRecord,
} from "../services/HttpClientService";
import { DatePicker, DesktopDatePicker } from "@mui/x-date-pickers";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TreatmentRecordCreate() {
  const [employee, setEmployee] = useState<EmployeeInterface[]>([]);
  //   const [employeeUID, setEmployeeUID] = useState<EmployeeInterface>();
  const [patient, setPatient] = useState<PatientRegisterInterface[]>([]);
  const [medicine, setMedicine] = useState<MedicineInterface[]>([]);
  const [diagnosisRecord, setDiagnosisRecord] = useState<DiagnosisRecordInterface[]>([]);
  const [treatmentRecord, setTreatmentRecord] = useState<Partial<TreatmentRecordInterface>>({
    Treatment: "",
    Note: "",
    Appointment: undefined,
    MedicineQuantity: 0,
    Date: new Date(),
    DoctorID: parseInt(localStorage.getItem('uid') ?? ""),
  });

  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [messages, setMessages] = React.useState("");

  // สำหรับ combobox boolean
  const menuItems = [
    { id: "0", label: "ไม่", value: "false" },
    { id: "1", label: "ใช่", value: "true" }
  ];

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleChange = (event: SelectChangeEvent<number>) => {
    const name = event.target.name as keyof typeof treatmentRecord;
    setTreatmentRecord({
      ...treatmentRecord,
      [name]: event.target.value,
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof TreatmentRecordCreate;
    const { value } = event.target;
    setTreatmentRecord({ ...treatmentRecord, [id]: value });
  };

  const handleSeclectChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const name = event.target.name as keyof typeof TreatmentRecordCreate;
    const { value } = event.target;
    console.log(name)
    console.log(event.target.value)
    setTreatmentRecord({
      ...treatmentRecord,
      [name]: value === "true" ? true : false
    })
  }

  const getEmployee = async () => {
    let res = await GetEmployee();
    if (res) {
      setEmployee(res);
    }
  };

  //   const getEmployeeUID = async () => {
  //     let res = await GetEmployeeByUID();
  //     if (res) {
  //       setEmployeeUID(res);
  //     }
  //   };

  const getPatient = async () => {
    let res = await GetPatient();
    if (res) {
      setPatient(res);
    }
  };

  const getMedicine = async () => {
    let res = await GetMedicine();
    if (res) {
      setMedicine(res);
    }
  }

  const getDiagnosisRecord = async () => {
    let res = await GetDiagnosisRecord();
    if (res) {
      setDiagnosisRecord(res);
    }
  };

  useEffect(() => {
    // getEmployeeUID();
    getEmployee();
    getPatient();
    getMedicine();
    getDiagnosisRecord();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  async function submit() {
    let data = {
      // PatientRegisterID: convertType(treatmentRecord.DiagnosisRecord?.HistorySheet?.PatientRegisterID),
      DoctorID: convertType(treatmentRecord.DoctorID),
      DiagnosisRecordID: convertType(treatmentRecord.DiagnosisRecordID),
      MedicineID: convertType(treatmentRecord.MedicineID),
      Treatment: treatmentRecord.Treatment,
      Note: treatmentRecord.Note,
      MedicineQuantity: convertType(treatmentRecord.MedicineQuantity),
      Appointment: treatmentRecord.Appointment,
      Date: treatmentRecord.Date,
    };

    // console.log(data);
    let res = await CreateTreatmentRecord(data);
    if (res) {
      setSuccess(true);
      setMessages("Successfully!!");
    } else {
      setError(true);
      setMessages("Fail!! " + res.error);
      console.log(res);
    }
  };

  return (
    <Container maxWidth="md">
      <Snackbar
        open={success}
        // autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          {messages}
        </Alert>
      </Snackbar>

      <Snackbar open={error} 
        // autoHideDuration={6000} 
        onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {messages}
        </Alert>
      </Snackbar>

      <Container maxWidth="md">
        <Paper>
          <Box display={"flex"}
            sx={{
              marginTop: 2,
              paddingX: 2,
              paddingY: 2,
            }}
          >
            <Typography variant="h5" color="primary" gutterBottom>
              จัดเก็บข้อมูลกการรักษา
            </Typography>
          </Box>
          <Divider />
          {/* =========================== Patient ==================================== */}
          <Box sx={{ paddingX: 3, paddingY: 2 }}>
            <p>ข้อมูลผู้ป่วย</p>
            <FormControl required sx={{ m: 1, minWidth: 200 }}>
              <InputLabel id="Patient">ชื่อ</InputLabel>
              <Select
                id="select-patient"
                label="ชื่อ"
                inputProps={{ name: "DiagnosisRecordID" }}
                value={treatmentRecord.DiagnosisRecordID ?? ""}
                onChange={handleChange}
                native
                autoFocus
              >
                <option key={0} value={0}></option>
                {patient.map((item: PatientRegisterInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.FirstName} {item.LastName}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="select-patient">อายุ</InputLabel>
              <Select
                id="select-patient"
                value={treatmentRecord.DiagnosisRecordID ?? ""}
                label="อายุ"
                onChange={handleChange}
                inputProps={{ readOnly: true }}
                native
                autoFocus
              >
                <option key={0} value={0}></option>
                {patient.map((item: PatientRegisterInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Age}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="select-patient">เพศ</InputLabel>
              <Select
                id="select-patient"
                value={treatmentRecord.DiagnosisRecordID ?? ""}
                label="เพศ"
                onChange={handleChange}
                inputProps={{ readOnly: true }}
                native
                autoFocus
              >
                <option key={0} value={0}></option>
                {patient.map((item: PatientRegisterInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Gender.Name}

                  </option>
                ))}
              </Select>
            </FormControl>
          </Box>
          {/* ========================== Diagnosis ==================================== */}
          <Box sx={{ paddingX: 3, paddingY: 2 }}>
            <p>รายละเอียดการวินิจฉัย</p>
            <FormControl required sx={{ m: 1, minWidth: 300 }}>
              <InputLabel id="Examination">การตรวจร่างกาย</InputLabel>
              <Select
                id="Examination"
                label="การตรวจร่างกาย"
                variant="outlined"
                value={treatmentRecord.DiagnosisRecordID ?? ""}
                inputProps={{ readOnly: true }}
                native
                autoFocus
              >
                <option key={0} value={0}></option>
                {diagnosisRecord.map((item: DiagnosisRecordInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Examination}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl required sx={{ m: 1, minWidth: 300, maxWidth: 300 }}>
              <InputLabel id="Disease">วินิฉัยโรค</InputLabel>
              <Select
                id="Disease"
                value={treatmentRecord.DiagnosisRecordID ?? ""}
                label="วินิฉัยโรค"
                onChange={handleChange}
                inputProps={{ readOnly: true }}
                native
                autoFocus
              >
                <option key={0} value={0}></option>
                {diagnosisRecord.map((item: DiagnosisRecordInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Disease?.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Box>
          {/* =========================== Treatment ==================================== */}
          <Box sx={{ paddingX: 3, paddingY: 2 }}>
            <p>รายละเอียดการรักษา</p>
            <FormControl required sx={{ m: 1, minWidth: 300 }}>
              <TextField
                required
                //fullWidth
                id="Treatment"
                label="การรักษา"
                variant="outlined"
                value={treatmentRecord.Treatment ?? ""}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 300 }}>
              <TextField
                //fullWidth
                id="Note"
                label="หมายเหตุ"
                variant="outlined"
                value={treatmentRecord.Note ?? ""}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <TextField
                select
                id="Appointment"
                label="นัดตรวจครั้งต่อไป"
                value={treatmentRecord.Appointment ?? ""}
                inputProps={{ name: "Appointment", }}
                SelectProps={{ 
                  native: true, 
                  autoFocus: true,
                }}
                onChange={handleSeclectChange}
                autoFocus
              >
                <option key={0} value={0}></option>
                {menuItems.map((item) => (
                  <option key={item.id} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </TextField>
            </FormControl>
          </Box>
          {/* ========================== Medicine ==================================== */}
          <Box sx={{ paddingX: 3, paddingY: 2 }}>
            <p>สั่งจ่ายยา</p>
            <FormControl required sx={{ m: 1, minWidth: 300 }}>
              <InputLabel id="select-medicinet-label">ชนิดยา</InputLabel>
              <Select
                id="select-medicine-label"
                value={treatmentRecord.MedicineID ?? ""}
                label="ชนิดยา"
                onChange={handleChange}
                inputProps={{ name: "MedicineID" }}
                native
                autoFocus
              >
                <option key={0} value={0}></option>
                {medicine.map((item: MedicineInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 100 }}>
              <TextField
                //fullWidth
                id="MedicineQuantity"
                label="จำนวน"
                variant="outlined"
                type="number"
                // defaultValue={0}
                inputProps={{ min: 1, max: 100 }}
                onChange={handleInputChange}
              />
            </FormControl>
          </Box>
          {/* ========================== Doctor ==================================== */}
          <Box sx={{ paddingX: 3, paddingY: 2 }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="select-Doctor-label">แพทย์ผู้ตรวจ</InputLabel>
              <Select
                id="select-Doctor-label"
                value={localStorage.getItem('uid')}
                name="DoctorID"
                label="แพทย์ผู้ตรวจ"
                //onChange={handleChange}
                inputProps={{ readOnly: true }}
                native
                autoFocus
              >
                {employee.map((item: EmployeeInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.FirstName}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="วันที่ตรวจ"
                  value={treatmentRecord?.Date}
                  onChange={(newValue) => {
                    setTreatmentRecord({
                      ...treatmentRecord,
                      Date: newValue,
                    });
                  }}
                  renderInput={(props) => <TextField {...props} />}
    
                />
                
              </LocalizationProvider> */}

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="วันที่ตรวจ"
                  value={treatmentRecord.Date || new Date()}
                  onChange={(newValue) => {
                    setTreatmentRecord({
                      ...treatmentRecord,
                      Date: newValue,
                    });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Box>
          {/* ========================== Submit ==================================== */}
          <Box sx={{ paddingX: 3, paddingY: 2 }}>
            <Button
              component={RouterLink}
              to="/"
              variant="contained"
              sx={{ p: 1, m: 2, mx: 'auto' }}
              color="inherit">
              Back
            </Button>
            <Button
              variant="contained"
              color='success'
              sx={{ p: 1, m: 2, mx: 'auto', float: "right" }}
              onClick={submit}>
              Submit
            </Button>
          </Box>
        </Paper>
      </Container>
    </Container>
  );
}

export default TreatmentRecordCreate;