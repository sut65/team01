import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { MenuItem } from "@mui/material";
// import DeleteIcon from "@mui/icons-material"

import IconButton from '@mui/material/IconButton';

import Select, { SelectChangeEvent } from "@mui/material/Select";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  GetEmployee,
  GetStatusMed,

  CreateMedicineRecords
} from "../../services/HttpClientServiceMedicineRecord";
import { GetTreatmentRecord } from "../../services/HttpClientServiceTreatmentRecord";
import { MedicineRecordsInterface, StatusMedsInterface } from "../../models/IMedicineRecord";
import { TreatmentRecordsInterface } from "../../models/ITreatmentRecord";

import { EmployeesInterface } from "../../models/IEmployee";



const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function MedicineRecordCreate() {
  // Main State For Create Data to Database
  const [medicinerecords, setMedicineRecord] = React.useState<Partial<MedicineRecordsInterface>>({
    MedTime: new Date(), TreatmentRecordID: 0, StatusMedID: 0, Advicetext: "",
  }
  );
  // For Set treatmentrecord Relation In Database and Display In ComboBox
  const [treatmentrecords, setTreatmentRecord] = React.useState<TreatmentRecordsInterface[]>([]);
  const [statusmed, setStatusMed] = React.useState<StatusMedsInterface[]>([]);
  // Set a one because Employee will Login only one don't set a Other Employee
  const [pharmacist, setEmployee] = React.useState<EmployeesInterface>();


  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
  // Select Data From formcontrol
  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof medicinerecords;
    setMedicineRecord({
      ...medicinerecords,
      [name]: event.target.value,
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof medicinerecords;
    const { value } = event.target;
    setMedicineRecord({ ...medicinerecords, [id]: value });
  };

  const removeFromItem = (index: number) => {
    let updatedItem = treatmentrecords.filter((_, i) => i !== index);
    setTreatmentRecord(updatedItem);
  }



  const getTreatmentRecord = async () => {
    let res = await GetTreatmentRecord()
    if (res) {
      setTreatmentRecord(res)
      console.log(treatmentrecords)
    }
  }


  const getStatusMed = async () => {
    let res = await GetStatusMed()
    if (res) {
      setStatusMed(res);
      // console.log(statusmed)
    }
  }
  console.log(statusmed)


  const getEmployee = async (ID: string | null) => {
    let res = await GetEmployee()
    if (res) {
      setEmployee(res)
    }
  }



  useEffect(() => {
    getTreatmentRecord();
    getStatusMed();
    getEmployee(localStorage.getItem("id"));
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  async function submit() {
    if(medicinerecords.TreatmentRecordID == 0){
      setError(true)
      setErrorMessage("กรุณาเลือกชื่อ - นามสกุล")
    }
    else if(medicinerecords.StatusMedID == 0){
      setError(true)
      setErrorMessage("กรุณาเลือกสถานะการจ่ายยา")
    }
    else{
      setError(false)
      let data = {
      
        TreatmentRecordID: convertType(medicinerecords.TreatmentRecordID),
        StatusMedID: convertType(medicinerecords.StatusMedID),
        PharmacistID: convertType(pharmacist?.ID),
        Advicetext: medicinerecords.Advicetext,
        MedTime: medicinerecords.MedTime,
      };
  
      const apiUrl = "http://localhost:8080/createmedicinerecord";
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      fetch(apiUrl, requestOptions)
        .then((response) => response.json())
        .then((res) => {
          if (res.data) {
            setSuccess(true);
            setErrorMessage("");
            // clearForm();
          } else {
            setError(true);
            if (res.error == "Advicetext cannot be blank") {
              setErrorMessage(" กรุณากรอกคำแนะนำ")
            }
            else if (res.error == "The data recorder should be a Pharmacist") {
              setErrorMessage(" ผู้บันทึกข้อมูลต้องเป็นเภสัชกรเท่านั้น")
            }
            else if (res.error == "MedTime must be in the present") {
              setErrorMessage(" กรุณาเลือกวันและเวลาปัจจุบัน")
            }
            
            else {
              setErrorMessage(res.error);
            }
          }
        });
    }
    
    
  }


  return (
    <Container maxWidth="md">
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ:  
          {errorMessage}
        </Alert>
      </Snackbar>
      <Paper>
        <Box
          display="flex"
          sx={{
            marginTop: 2,
          }}
        >
          <Box sx={{ paddingX: 2, paddingY: 1 }}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              บันทึกการจ่ายยาและเวชภัณฑ์
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} sx={{ padding: 2 }}>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ชื่อ - นามสกุล</p>
              <Select
                native
                value={medicinerecords.TreatmentRecordID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "TreatmentRecordID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกชื่อ - นามสกุล
                </option>
                {treatmentrecords.map((item: TreatmentRecordsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.DiagnosisRecord?.HistorySheet?.PatientRegister?.FirstName} {item.DiagnosisRecord?.HistorySheet?.PatientRegister?.LastName}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ข้อมูลการรักษา</p>
              <Select
                native
                disabled
                value={medicinerecords.TreatmentRecordID + ""}
                // onChange={handleChange}
                inputProps={{
                  name: "TreatmentRecordID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกข้อมูลการรักษา
                </option>
                {treatmentrecords.map((item: TreatmentRecordsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Treatment}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>สถานะการจ่ายยา</p>
              <Select
                native
                value={medicinerecords.StatusMedID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "StatusMedID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกสถานะการจ่ายยา
                </option>
                {statusmed.map((item: StatusMedsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Status}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <p>เภสัชกร</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="FirstName"
                disabled
                variant="outlined"
                type="string"
                size="medium"
                value={pharmacist?.FirstName + " " + pharmacist?.LastName}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>คำแนะนำ</p>
              <TextField
                id="Advicetext"
                variant="outlined"
                type="string"
                size="medium"
                value={medicinerecords.Advicetext || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={8}>
            <p>ผลการจ่ายยา</p>
            <TableContainer component={Paper} sx={{ marginTop: 4 }}>
              <Table sx={{ miinWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" width="10%">ใบผลการรักษา</TableCell>
                    <TableCell align="center" width="10%">=ชื่อ</TableCell>
                    <TableCell align="center" width="10%">ราคา</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {treatmentrecords.map((row: TreatmentRecordsInterface, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell align="center">{row.MedicineID}</TableCell>
                        <TableCell align="center">{treatmentrecords.find(p => p.ID === row.MedicineID)?.Medicine?.Name}</TableCell>
                        <TableCell align="center">{treatmentrecords.find(p => p.ID === row.MedicineID)?.Medicine?.Price}</TableCell>
                        {/* <TableCell width="5%"><IconButton size="small" onClick={() => removeFromItem(index)}><DeleteIcon /></IconButton></TableCell> */}

                      </TableRow>
                    )
                  })}

                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined">
              <p>วันที่และเวลา</p>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={medicinerecords.MedTime}
                  onChange={(newValue) => {
                    setMedicineRecord({
                      ...medicinerecords,
                      MedTime: newValue,
                    });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/medicinerecords"
              variant="contained"
              color="inherit"
            >
              กลับ
            </Button>
            <Button
              style={{ float: "right" }}
              onClick={submit}
              variant="contained"
              color="primary"
            >
              บันทึก
            </Button>
          </Grid>
        </Grid>

      </Paper>
    </Container>
  );
}

export default MedicineRecordCreate;