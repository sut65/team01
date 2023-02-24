import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Checkbox, Divider, FormControl,
  FormControlLabel, FormGroup,
  FormLabel, InputLabel, MenuItem, Snackbar
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
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import '../App.css';
import { EmployeesInterface } from "../../models/IEmployee/IEmployee";
import { PatientRegistersInterface } from "../../models/IPatientRegister/IPatientRegister";
import { DiagnosisRecordsInterface,  DiseasesInterface } from "../../models/IDiagnosisRecord/IDiagnosisRecord";
import { HistorySheetsInterface } from "../../models/IHistorySheet/IHistorySheet";

import {
  GetEmployee,
  GetEmployeeByUID,
  GetPatient,
  GetHistorysheet,
  GetDisease,
  CreateDiagnosisRecord,
  // GetMedicalCertificate,
} from "../../services/HttpClientService";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function DiagnosisRecordCreate() {
  const [employee, setEmployee] = useState<EmployeesInterface[]>([]);
  // const [employeeUID, setEmployeeUID] = useState<EmployeeInterface>();
  const [patient, setPatient] = useState<PatientRegistersInterface[]>([]);
  const [disease, setDisease] = useState<DiseasesInterface[]>([]);
  const [historySheet, setHistorySheet] = useState<HistorySheetsInterface[]>([]);
  // const [medicalCertificate, setMedicalCertificate] = useState<MedicalCertificateInterface[]>([]);
  const [diagnosisRecord, setDiagnosisRecord] = useState<Partial<DiagnosisRecordsInterface>>({
    Examination: "",
    MedicalCertificate: undefined,
    Date: new Date(),
    DoctorID: parseInt(localStorage.getItem('uid') ?? ""),
  });

  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [messages, setMessages] = React.useState("");

  // สำหรับ combobox boolean
  const menuItems = [
    { id: "0", label: "ไม่รับ", value: "false" },
    { id: "1", label: "รับ", value: "true" }
  ]

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

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof diagnosisRecord;
    console.log("handleChage")
    console.log(event.target.value)
    setDiagnosisRecord({
      ...diagnosisRecord,
      [name]: event.target.value,
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof diagnosisRecord;
    const { value } = event.target;
    setDiagnosisRecord({ ...diagnosisRecord, [id]: value });
  };

  const handleSeclectChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const name = event.target.name as keyof typeof diagnosisRecord;
    const { value } = event.target;
    console.log(name)
    console.log(event.target.value)
    setDiagnosisRecord({
      ...diagnosisRecord,
      [name]: value === "true" ? true : false
    })
  }

  const getEmployee = async () => {
    let res = await GetEmployee();
    if (res) {
      setEmployee(res);
    }
  };

  // const getEmployeeUID = async () => {
  //   let res = await GetEmployeeByUID();
  //   if (res) {
  //     setEmployeeUID(res);
  //   }
  // };

  const getPatient = async () => {
    let res = await GetPatient();

    if (res) {
      setPatient(res);
    }
  };

  const getHistorySheet = async () => {
    let res = await GetHistorysheet();
    if (res) {
      setHistorySheet(res);
    }
  };

  const getDisease = async () => {
    let res = await GetDisease();
    if (res) {
      setDisease(res);
    }
  };

  // const getMedicalCertificate = async () => {
  //   let res = await GetMedicalCertificate();
  //   if (res) {
  //     setMedicalCertificate(res);
  //   }
  // };

  useEffect(() => {
    // getEmployeeUID();
    getEmployee();
    getPatient();
    getHistorySheet();
    getDisease();
    // getMedicalCertificate();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  async function submit() {
    let data = {
      // PatientRegisterID: diagnosisRecord.HistorySheet?.PatientRegisterID,
      DoctorID: convertType(diagnosisRecord.DoctorID),
      HistorySheetID: convertType(diagnosisRecord.HistorySheetID),
      DiseaseID: convertType(diagnosisRecord.DiseaseID),
      // MedicalCertificateID: convertType(diagnosisRecord.MedicalCertificateID),
      MedicalCertificate: diagnosisRecord.MedicalCertificate,
      Examination: diagnosisRecord.Examination,
      Date: diagnosisRecord.Date,
    };

    //console.log(data);
    let res = await CreateDiagnosisRecord(data);
    if (res.status) {
      setSuccess(true);
      setMessages("Successfully!!");
    } else {
      setError(true);
      setMessages("Fail!! " + res.message);
    }
  };

  return (
    <Container maxWidth="md">
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          {messages}
        </Alert>
      </Snackbar>

      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
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
              บันทึกผลการวินิจฉัย
            </Typography>
          </Box>
          <Divider />
{/* =========================== Patient ==================================== */}
          <Box sx={{ paddingX: 3, paddingY: 2 }}>
            <p>ข้อมูลผู้ป่วย</p>
            <FormControl required sx={{ m: 1, minWidth: 200 }}>
              <InputLabel id="select-patient">ชื่อ</InputLabel>
              <Select
                id="select-patient"
                label="ชื่อ"
                inputProps={{ name: "HistorySheetID", native: true, autoFocus: true  }}
                value={diagnosisRecord.HistorySheetID + ""}
                onChange={handleChange}
                native
                autoFocus
              >
                <option key={0} value={0}>
                  เลือกข้อมูล
                </option>
                {patient.map((item: PatientRegistersInterface) => (
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
                value={diagnosisRecord.HistorySheetID + ""}
                label="อายุ"
                // onChange={handleChange}
                inputProps={{ readOnly: true, native: true, autoFocus: true }}
              >
                <MenuItem aria-label="None" value="">
                  <em>None</em>
                </MenuItem>
                <option key={0} value={0}></option>
                {patient.map((item: PatientRegistersInterface) => (
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
                value={diagnosisRecord.HistorySheetID + ""}
                label="เพศ"
                onChange={handleChange}
                inputProps={{ readOnly: true, native: true, autoFocus: true }}
              >
                <option key={0} value={0}></option>
                {patient.map((item: PatientRegistersInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.PatientRegisterGender.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Box>
{/* ========================== Examine ==================================== */}
          <Box sx={{ paddingX: 3, paddingY: 2 }}>
            <p>รายละเอียดการวินิจฉัย</p>
            <FormControl required sx={{ m: 1, minWidth: 300 }}>
              <TextField
                required
                //fullWidth
                id="Examination"
                label="การตรวจร่างกาย"
                variant="outlined"
                value={diagnosisRecord.Examination ?? ""}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl required sx={{ m: 1, minWidth: 300, maxWidth: 300 }}>
              <InputLabel id="select-disease-label">วินิฉัยโรค</InputLabel>
              <Select
                id="select-disease-label"
                value={diagnosisRecord.DiseaseID + ""}
                label="วินิฉัยโรค"
                onChange={handleChange}
                inputProps={{ name: "DiseaseID" }}
                native
                autoFocus
              >
                <option key={0} value={0}>
                  <em>เลือกผลวินิฉัยโรค</em>
                </option>
                {disease.map((item: DiseasesInterface) => (
                  <option value={item.ID} key={item.ID}>
                  {item.Name}
                </option>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 200 }}>        
            {/* <InputLabel id="select-medicalcertificate-label">รับใบรับรองแพทย์</InputLabel>      
              <Select
                id="select-medicalcertificate-label"
                label="รับใบรับรองแพทย์"
                value={diagnosisRecord.MedicalCertificateID + ""}
                inputProps={{ name: "MedicalCertificateID",}}
                onChange={handleChange}
              >
                <MenuItem aria-label="None" value="">
                  <em>เลือก</em>
                </MenuItem>
                {medicalCertificate.map((item: MedicalCertificateInterface) => (
                  <MenuItem key={item.ID} value={item.ID}>
                    {item.Label}
                  </MenuItem>
                ))}
              </Select> */}
              <TextField
                select
                id="select-medicalcertificate-label"
                label="รับใบรับรองแพทย์"
                value={diagnosisRecord.MedicalCertificate + ""}
                inputProps={{ name: "MedicalCertificate", }}
                SelectProps={{ 
                  native: true, 
                  autoFocus: true,
                }}
                onChange={handleSeclectChange}
              >
                <option key={0} value={0}>
                  เลือกข้อมูล
                </option>
                {menuItems.map((item) => (
                  <option key={item.id} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </TextField>
            </FormControl>
          </Box>
{/* =========================== Sheet ==================================== */}
          <Box sx={{ paddingX: 3, paddingY: 2 }}>
            <p>ข้อมูลร่างกาย</p>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="select-sheet-label">น้ำหนัก</InputLabel>
              <Select
                id="select-sheet-label"
                value={diagnosisRecord.HistorySheetID + ""}
                label="น้ำหนัก"
                // onChange={handleChange}
                inputProps={{ readOnly: true, native: true, autoFocus: true }} 
              >
                <option key={0} value={0}></option>
                {historySheet.map((item: HistorySheetsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Weight} กก.
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="select-sheet-label">ส่วนสูง</InputLabel>
              <Select
                id="select-sheet-label"
                value={diagnosisRecord.HistorySheetID + ""}
                label="ส่วนสูง"
                // onChange={handleChange}
                inputProps={{ readOnly: true, native: true, autoFocus: true }} 
              >
                <option key={0} value={0}></option>
                {historySheet.map((item: HistorySheetsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Height} ซม.
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="select-sheet-label">อุณหภูมิ</InputLabel>
              <Select
                id="select-sheet-label"
                value={diagnosisRecord.HistorySheetID + ""}
                label="อุณหภูมิ"
                // onChange={handleChange}
                inputProps={{ readOnly: true, native: true, autoFocus: true }} 
              >
                <option key={0} value={0}></option>
                {historySheet.map((item: HistorySheetsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Temperature} °C
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="select-sheet-label">ชีพจร</InputLabel>
              <Select
                id="select-sheet-label"
                value={diagnosisRecord.HistorySheetID + ""}
                label="ชีพจร"
                // onChange={handleChange}
                inputProps={{ readOnly: true, native: true, autoFocus: true }} 
              >
                <option key={0} value={0}></option>
                {historySheet.map((item: HistorySheetsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.HeartRate} ครั้ง/นาที
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="select-sheet-label">ค่าออกซิเจน</InputLabel>
              <Select
                id="select-sheetlabel"
                value={diagnosisRecord.HistorySheetID + ""}
                label="ค่าออกซิเจน"
                // onChange={handleChange}
                inputProps={{ readOnly: true, native: true, autoFocus: true }} 
              >
                <option key={0} value={0}></option>
                {historySheet.map((item: HistorySheetsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.OxygenSaturation} %
                  </option>
                ))}
              </Select>
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
              >
                {employee.map((item: EmployeesInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.FirstName}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="วันที่ตรวจ"
                  value={diagnosisRecord?.Date || new Date()}
                  onChange={(newValue) => {
                    setDiagnosisRecord({
                      ...diagnosisRecord,
                      Date: newValue,
                    });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                  ampm={false}
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

export default DiagnosisRecordCreate;