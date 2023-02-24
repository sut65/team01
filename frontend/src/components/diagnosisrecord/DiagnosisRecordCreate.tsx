import React, { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import {
  Divider, FormControl,
  InputLabel, MenuItem, Snackbar
} from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from "@mui/material/Paper";
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import '../App.css';
import { EmployeesInterface } from "../../models/IEmployee/IEmployee";
import { PatientRegistersInterface } from "../../models/IPatientRegister/IPatientRegister";
import { DiagnosisRecordsInterface,  DiseasesInterface } from "../../models/IDiagnosisRecord/IDiagnosisRecord";
import { HistorySheetsInterface } from "../../models/IHistorySheet/IHistorySheet";


import {
  GetEmployee,
  GetPatient,
  GetHistorysheet,
  GetDisease,
  CreateDiagnosisRecord,
  UpdateDiagnosisRecord,
} from "../../services/HttpClientService";
import { DatePicker } from "@mui/x-date-pickers";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function DiagnosisRecordCreate() {
  const [employee, setEmployee] = useState<Partial<EmployeesInterface>>({ FirstName: "", LastName: "" });
  const [patient, setPatient] = useState<PatientRegistersInterface[]>([]);
  const [disease, setDisease] = useState<DiseasesInterface[]>([]);
  const [historySheet, setHistorySheet] = useState<HistorySheetsInterface[]>([]);
  const [diagnosisRecords, setDiagnosisRecord] = useState<Partial<DiagnosisRecordsInterface>>({
    Examination: "",
    MedicalCertificate: undefined,
    Date: new Date(),
    DoctorID: parseInt(localStorage.getItem('uid') ?? ""),
  });

  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [messages, setMessages] = React.useState("");
  const params = useParams();

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
    const name = event.target.name as keyof typeof diagnosisRecords;
    console.log("handleChage")
    console.log(event.target.value)
    setDiagnosisRecord({
      ...diagnosisRecords,
      [name]: event.target.value,
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof diagnosisRecords;
    const { value } = event.target;
    setDiagnosisRecord({ ...diagnosisRecords, [id]: value });
  };

  const handleSeclectChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const name = event.target.name as keyof typeof diagnosisRecords;
    const { value } = event.target;
    console.log(name)
    console.log(event.target.value)
    setDiagnosisRecord({
      ...diagnosisRecords,
      [name]: value === "true" ? true : false
    })
  }

  const getEmployee = async () => {
    let res = await GetEmployee();
    if (res) {
      setEmployee(res);
    }
  };

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

  const getDiagnosisRecord = async (id: string) => {
    const apiUrl = `http://localhost:8080/diagnosisrecord/${id}`;
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    };

    fetch(apiUrl, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                setDiagnosisRecord(res.data);
            } else {
                console.log(res.error);
            }
        });
  }

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  async function submit() {
    if (diagnosisRecords.HistorySheetID == null) {
      setError(true)
      setMessages("กรุณาเลือกชื่อผู้ป่วย")
    } else if (diagnosisRecords.DiseaseID == null) {
      setError(true)
      setMessages("กรุณาเลือกชื่อโรค")
    } else {
      setError(false)
      let data: any = {
        DoctorID: convertType(employee.ID),
        HistorySheetID: convertType(diagnosisRecords.HistorySheetID),
        DiseaseID: convertType(diagnosisRecords.DiseaseID),
        MedicalCertificate: diagnosisRecords.MedicalCertificate,
        Examination: diagnosisRecords.Examination,
        Date: diagnosisRecords.Date,
      };

      let res : any 
      console.log(params.id);
      if (params.id) {
        data["ID"] = parseInt(params.id);
        res = await UpdateDiagnosisRecord(data);
      } else {
        res = await CreateDiagnosisRecord(data);
      }
      
      console.log(data);
      if (res.status) {
        setSuccess(true);
        setMessages("บันทึกข้อมูลสำเร็จ");
        window.location.href="/diagnosis_records";
      } else {
        setError(true);
        if (res.message === "Examination cannot be Blank") {
          setMessages("กรุณากรอกผลการตรวจร่างกาย");
        } else if (res.message === "Date must be present") {
          setMessages("วันที่ต้องเป็นปัจจุบัน");
        } else if (res.message === "MedicalCertificate cannot be Null") {
          setMessages("กรุณาเลือกใบรับรองแพทย์");
        } else  { 
          setMessages(res.message);
        }
      }
    };
  }

  useEffect(() => {
    getEmployee();
    getPatient();
    getHistorySheet();
    getDisease();
    if (params.id) {
      getDiagnosisRecord(params.id)
    }
  }, []);
  console.log(diagnosisRecords)

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
                value={diagnosisRecords.HistorySheetID + ""}
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
                value={diagnosisRecords.HistorySheetID + ""}
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
                value={diagnosisRecords.HistorySheetID + ""}
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
                value={diagnosisRecords.Examination ?? ""}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl required sx={{ m: 1, minWidth: 300, maxWidth: 300 }}>
              <InputLabel id="select-disease-label">วินิฉัยโรค</InputLabel>
              <Select
                id="select-disease-label"
                value={diagnosisRecords.DiseaseID + ""}
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
            <FormControl sx={{ m: 1, maxWidth: 150 }}>        
              <TextField
                select
                id="select-medicalcertificate-label"
                label="รับใบรับรองแพทย์"
                value={diagnosisRecords.MedicalCertificate + ""}
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
                value={diagnosisRecords.HistorySheetID + ""}
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
                value={diagnosisRecords.HistorySheetID + ""}
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
                value={diagnosisRecords.HistorySheetID + ""}
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
                value={diagnosisRecords.HistorySheetID + ""}
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
            <FormControl sx={{ m: 1, minWidth: 180 }}>
              <InputLabel id="select-sheet-label">ความดันโลหิต</InputLabel>
              <Select
                id="select-sheetlabel"
                value={diagnosisRecords.HistorySheetID + ""}
                label="ค่าออกซิเจน"
                // onChange={handleChange}
                inputProps={{ readOnly: true, native: true, autoFocus: true }} 
              >
                <option key={0} value={0}></option>
                {historySheet.map((item: HistorySheetsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.SystolicBloodPressure}/{item.DiastolicBloodPressure} มม./ปรอท
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="select-sheet-label">ค่าออกซิเจน</InputLabel>
              <Select
                id="select-sheetlabel"
                value={diagnosisRecords.HistorySheetID + ""}
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
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <InputLabel id="select-sheet-label">การแพ้ยา</InputLabel>
              <Select
                id="select-sheetlabel"
                value={diagnosisRecords.HistorySheetID + ""}
                label="การแพ้ยา"
                // onChange={handleChange}
                inputProps={{ readOnly: true, native: true, autoFocus: true }} 
              >
                <option key={0} value={0}></option>
                {historySheet.map((item: HistorySheetsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.DrugAllergySymtom}
                  </option>
                ))}
              </Select>
            </FormControl>

          </Box>
{/* ========================== Doctor ==================================== */}
          <Box sx={{ paddingX: 3, paddingY: 2 }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
               <TextField disabled label="แพทย์ผู้ตรวจ" value={`${employee?.Title?.Name}${employee?.FirstName}`} />
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="วันที่ตรวจ"
                  value={diagnosisRecords?.Date || new Date()}
                  onChange={(newValue) => {
                    setDiagnosisRecord({
                      ...diagnosisRecords,
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
              to="/diagnosis_records"
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