import React, { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import {
  Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl,
  FormControlLabel, FormGroup,
  FormLabel, IconButton, InputLabel, MenuItem, Snackbar
} from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
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

// import '../App.css';
import { EmployeesInterface } from "../../models/IEmployee/IEmployee";
import { PatientRegistersInterface } from "../../models/IPatientRegister/IPatientRegister";
import { DiagnosisRecordsInterface } from "../../models/IDiagnosisRecord/IDiagnosisRecord";
import { MedicinesInterface, MedicineOrdersInterface, TreatmentRecordsInterface } from "../../models/ITreatmentRecord/ITreatmentRecord";

import {
  GetEmployee,
  GetPatient,
  GetDiagnosisRecord,
  GetMedicine,
  CreateTreatmentRecord,
  UpdateTreatmentRecord,
} from "../../services/HttpClientService";
import { DatePicker } from "@mui/x-date-pickers";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import moment from "moment";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// export interface RowDetails extends Partial<MedicineOrdersInterface> {
//   RowId: number;
// }

function TreatmentRecordCreate() {
  const [employee, setEmployee] = useState<Partial<EmployeesInterface>>({ FirstName: "", LastName: "" });
  const [patient, setPatient] = useState<PatientRegistersInterface[]>([]);
  const [medicine, setMedicine] = useState<MedicinesInterface[]>([]);
  const [diagnosisRecords, setDiagnosisRecord] = useState<DiagnosisRecordsInterface[]>([]);
  const [treatmentRecords, setTreatmentRecord] = useState<Partial<TreatmentRecordsInterface>>({
    Treatment: "",
    Note: "",
    Appointment: undefined,
    Date: new Date(),
    DoctorID: parseInt(localStorage.getItem('uid') ?? ""),
  });

  const [selected, setSelected] = useState<Partial<MedicineOrdersInterface>>({});
  const [medicineOreder, setMedicineOreder] = useState<Partial<MedicineOrdersInterface>[]>([]);
  // Row Sequence Number
  const [rowSeq, setRowSeq] = useState<number>(0);

  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [messages, setMessages] = React.useState("");
  const params = useParams();

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

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof treatmentRecords;
    console.log("handleChage")
    console.log(event.target.value)
    setTreatmentRecord({
      ...treatmentRecords,
      [name]: event.target.value,
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof treatmentRecords;
    const { value } = event.target;
    setTreatmentRecord({ ...treatmentRecords, [id]: value });
  };

  const handleSeclectChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const name = event.target.name as keyof typeof treatmentRecords;
    const { value } = event.target;
    console.log(name)
    console.log(event.target.value)
    setTreatmentRecord({
      ...treatmentRecords,
      [name]: value === "true" ? true : false
    })
  }
  
  const handleSelectMedicine = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof MedicineOrdersInterface;
    console.log("handleChage")
    console.log(event.target.value)
    if (name === 'MedicineID') {
      let findMedicine = medicine.find(m => m.ID === Number(event.target.value));
      setSelected({
        ...selected, 
        MedicineID: findMedicine!.ID, 
        Medicine: findMedicine 
      });
    }
  }

  const handleInputAmount = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof MedicineOrdersInterface;
    const { value } = event.target;
    setSelected({ ...selected, [id]: value });
  };

  function AddToTable() {
    let newMedicineOrder = [...medicineOreder]
    
    newMedicineOrder.push({ 
      ...selected, 
      ID: rowSeq, 
      OrderAmount: convertType(selected.OrderAmount),
    });
    setMedicineOreder(newMedicineOrder);
    setRowSeq(rowSeq + 1);
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

  const getTreatmentRecord = async (id: string) => {
    const apiUrl = `http://localhost:8080/treatmentrecord/${id}`;
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
                setTreatmentRecord(res.data);
            } else {
                console.log(res.error);
            }
        });
  }


  function getMedicineToOrder(params: { row: { Medicine: { Name: any; }; }; }) {
    return `${params.row.Medicine.Name || ''}`
  }

  const removeFromOrder = (rowID: number) => {
    let updatedOrderItem = medicineOreder.filter((m) => m.ID !== rowID);
    setMedicineOreder(updatedOrderItem);
  }

  const columns: GridColDef[] = [
    
    {
        field: "Medicine",
        headerName: "รายการยา",
        width: 250,
        valueGetter: getMedicineToOrder,
    },
    {
        field: "OrderAmount",
        headerName: "จำนวน",
        width: 100,
        valueGetter: (params) => params.row.OrderAmount,
    },
    {
      field: "Actions",
      type: "action",
      width: 100,
      renderCell: (params) => {
        return (
          <React.Fragment>
            <IconButton size="small" onClick={() => removeFromOrder(params.row.ID)}>
              <DeleteIcon color="error" fontSize="small"></DeleteIcon>
            </IconButton>
          </React.Fragment>
        )
      }
    },
  ];


  useEffect(() => {
    getEmployee();
    getPatient();
    getMedicine();
    getDiagnosisRecord();

    if (params.id) {
      getTreatmentRecord(params.id);
    }
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  async function submit() {
    if (treatmentRecords.DiagnosisRecordID == null) {
      setError(true)
      setMessages("กรุณาเลือกชื่อผู้ป่วย")
    } else if (selected.MedicineID == null) {
      setError(true)
      setMessages("กรุณาสร้างรายการยา")
    } else {
      setError(false)
      let data: any = {
        DoctorID: convertType(employee.ID),
        DiagnosisRecordID: convertType(treatmentRecords.DiagnosisRecordID),
        Treatment: treatmentRecords.Treatment,
        Note: treatmentRecords.Note,
        Appointment: treatmentRecords.Appointment,
        MedicineOrders: medicineOreder as MedicineOrdersInterface[],
        Date: treatmentRecords.Date,
      };

      // console.log(data);
      let res : any
      if  (params.id) {
        data["ID"] = parseInt(params.id);
        res = await UpdateTreatmentRecord(data);
      } 
      else {
        res = await CreateTreatmentRecord(data);
      }
 
      if (res.status) {
        setSuccess(true);
        setMessages("บันทึกข้อมูลสำเร็จ");
        setTimeout(() => {
          window.location.href="/treatmentrecords";
        }, 2000)
      } else {
        setError(true);
        if (res.message === "Treatment cannot be blank") {
          setMessages("กรุณากรอกรายละเอียดการรักษา");
        } else if (res.message === "Date must be present") {
          setMessages("วันที่ต้องเป็นปัจจุบัน");
        } else if (res.message === "Appointment cannot be Null") {
          setMessages("กรุณาเลือกการนัดหมาย");
        } else if (res.message === "Order Amount must not be negative") {
          setMessages("จำนวนต้องไม่เป็นลบ");
        } else  { 
          setMessages(res.message);
        }
      }
    };
  }

  return (
    <Container maxWidth="lg">
      <Snackbar open={success}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          {messages}
        </Alert>
      </Snackbar>

      <Snackbar open={error} 
        autoHideDuration={6000} 
        onClose={handleClose}
      >
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
                value={treatmentRecords.DiagnosisRecordID + ""}
                onChange={handleChange}
                native
                autoFocus
              >
                <option key={0} value={0}>
                  เลือกข้อมูล
                </option>
                {diagnosisRecords.map((item: DiagnosisRecordsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.HistorySheet?.PatientRegister.FirstName} {item.HistorySheet?.PatientRegister?.LastName}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="select-patient">อายุ</InputLabel>
              <Select
                id="select-patient"
                value={treatmentRecords.DiagnosisRecordID + ""}
                label="อายุ"
                // onChange={handleChange}
                inputProps={{ readOnly: true, native: true, autoFocus: true }}
              >
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
                value={treatmentRecords.DiagnosisRecordID + ""}
                label="เพศ"
                // onChange={handleChange}
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
{/* ========================== Diagnosis ==================================== */}
          <Box sx={{ paddingX: 3, paddingY: 2 }}>
            <p>รายละเอียดการวินิจฉัย</p>
            <FormControl required sx={{ m: 1, minWidth: 300 }}>
              <InputLabel id="Examination">การตรวจร่างกาย</InputLabel>
              <Select
                id="Examination"
                label="การตรวจร่างกาย"
                variant="outlined"
                value={treatmentRecords.DiagnosisRecordID + ""}
                inputProps={{ readOnly: true, native: true, autoFocus: true }}
              >
                <option key={0} value={0}></option>
                {diagnosisRecords.map((item: DiagnosisRecordsInterface) => (
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
                value={treatmentRecords.DiagnosisRecordID + ""}
                label="วินิฉัยโรค"
                onChange={handleChange}
                inputProps={{ readOnly: true, native: true, autoFocus: true }} 
              >
                <option key={0} value={0}></option>
                {diagnosisRecords.map((item: DiagnosisRecordsInterface) => (
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
                value={treatmentRecords.Treatment + ""}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 300 }}>
              <TextField
                //fullWidth
                id="Note"
                label="หมายเหตุ"
                variant="outlined"
                value={treatmentRecords.Note + ""}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <TextField
                select
                id="Appointment"
                label="นัดตรวจครั้งต่อไป"
                value={treatmentRecords.Appointment + ""}
                inputProps={{ name: "Appointment", }}
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
{/* ========================== Medicine ==================================== */}
          <Box sx={{ paddingX: 3, paddingY: 2 }}>
            <p>สั่งจ่ายยา</p>
            <FormControl required sx={{ m: 1, minWidth: 250 }}>
              <InputLabel id="select-medicinet-label">ชนิดยา</InputLabel>
              <Select
                id="select-medicine-label"
                value={selected.MedicineID + ""}
                label="ชนิดยา"
                onChange={handleSelectMedicine}
                inputProps={{ name: "MedicineID" }}
                native
                autoFocus
              >
                <option key={0} >
                  เลือกข้อมูล
                </option>
                {medicine.map((item: MedicinesInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, maxWidth: 100 }}>
              <TextField
                //fullWidth
                id="OrderAmount"
                label="จำนวน"
                variant="outlined"
                type="number"
                defaultValue={0}
                //inputProps={{ min: 1, max: 100 }}
                onChange={handleInputAmount}
              />
            </FormControl>
            <FormControl sx={{ maxWidth: 100 }}>
              <Button
                variant="contained"
                color='info'
                sx={{ p: 1, m: 2, mx: 'auto', float: "right" }}
                onClick={AddToTable}>
                เลือก
              </Button>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 505 }}>
              <div style={{ height: 300 , width: "100%", marginTop: "20px"}}>
                <DataGrid
                  rows={medicineOreder}
                  getRowId={(row) => row.ID}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                />
              </div>
            </FormControl>
          </Box>
          {/* ========================== Doctor ==================================== */}
          <Box sx={{ paddingX: 3, paddingY: 2 }}>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <TextField disabled label="แพทย์ผู้บันทึก" value={`${employee?.Title?.Name}${employee?.FirstName}`} />
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="วันที่ตรวจ"
                  value={treatmentRecords.Date || new Date()}
                  onChange={(newValue) => {
                    setTreatmentRecord({
                      ...treatmentRecords,
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
              to="/treatmentrecords"
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