import React from "react";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Select,{SelectChangeEvent} from "@mui/material/Select";
import FormControl from '@mui/material/FormControl';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { EmployeesInterface } from "../../models/IEmployee/IEmployee";
import { RoomsInterface } from "../../models/IWorkload/IWorkload";
import { PatientRegistersInterface } from "../../models/IPatientRegister/IPatientRegister";
import { AppointmentInterface } from "../../models/IAppointment/IAppointment";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { useForm } from "react-hook-form";


const theme = createTheme({
  palette: {
    primary: {
      light: '#80cbc4',
      main: '#4db6ac',
      dark: '#26a69a',
      contrastText: '#fff',
    },
  },
});

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

function AppointmentCreate() {

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [rooms, setRooms] = useState<RoomsInterface[]>([]);
  const [patientRegisters, setPatientRegisters] = useState<PatientRegistersInterface[]>([]);
  const [appointment, setAppointment] = useState<Partial<AppointmentInterface>>({});
  const [doctors, setDoctors] = useState<EmployeesInterface[]>([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { register, handleSubmit, watch, formState: { errors }, } = useForm<AppointmentInterface>();


  const handleClose = (event?:Event| React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleChange = (
    event: SelectChangeEvent<number>
  ) => {
    const name = event.target.name as keyof typeof appointment;
    setAppointment({
      ...appointment,
      [name]: event.target.value,
    });

  };

  const handleDateChange = (date: Date | null) => {
    console.log(date);
    setSelectedDate(date);
  };

  const handleInputChange = (

    event: React.ChangeEvent<{ id?: string; value: any }>

  ) => {

    const name = event.target.id as keyof typeof appointment;

    const { value } = event.target;

    setAppointment({ ...appointment, [name]: value });

  };

  //Get Data
  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
  };

  const getRoom = async () => {
    fetch(`${apiUrl}/rooms`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setRooms(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getPatientRegister = async () => {
    fetch(`${apiUrl}/patient_registers`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setPatientRegisters(res.data);
        } else {
          console.log("else");
        }
      });
  };
  console.log("PatientRegister", doctors);

  const getDoctor = async () => {
    fetch(`${apiUrl}/employeerole/1`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setDoctors(res.data);
        } else {
          console.log("else");
        }
      });
  };
  console.log("Doctor", doctors);

  useEffect(() => {
    getRoom();
    getPatientRegister();
    getDoctor();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit() {
    let data = {
      PatientRegisterID: convertType(appointment.PatientRegisterID),
      EmployeeID: convertType(appointment.EmployeeID),
      RoomID: convertType(appointment.RoomID),
      RoomNumber: convertType(appointment.RoomNumber),
      AppointmentTime: selectedDate,
      Note: appointment.Note ?? "",
    };
    console.log(data)

    const requestOptionsPost = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/appointments`, requestOptionsPost)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log("บันทึกได้")
          setSuccess(true);
          setErrorMessage("")
          ClearForm();
        } else {
          console.log("บันทึกไม่ได้")
          setError(true);
          if (res.error.includes("RoomNumber more than 0")) {
            setErrorMessage("กรุณากรอกหมายเลขห้องตรวจที่มีค่ามากกว่า 0")
          } else if (res.error.includes("RoomNumber cannot be blank")) {
            setErrorMessage("กรุณากรอกหมายเลขห้องตรวจ")
          } else if (res.error.includes("AppointmentTime must be in the future")) {
            setErrorMessage("กรุณาเลือกวันเวลานัดหมายที่เป็นอนาคต")
          } else if (res.error.includes("patientRegister not found")) {
            setErrorMessage("กรุณาเลือกหมายเลขบัตรประชาชนผู้ป่วย")
          } else if (res.error.includes("doctor not found")) {
            setErrorMessage("กรุณาเลือกเเพทย์")
          } else if (res.error.includes("Room not found")) {
            setErrorMessage("กรุณาเลือกคลินิก")
          } else if (res.error.includes("Note cannot be blank")) {
            setErrorMessage("กรุณากรอกหมายเหตุการนัด")
          }else {
            setErrorMessage(res.error);
          }
        }
      });
  }

  // function clear form after submit success
  const ClearForm = () => {
    setAppointment({
      PatientRegisterID: 0,
      EmployeeID: 0,
      RoomID: 0,
      RoomNumber: 0,
      Note: "",
    });
    setSelectedDate(new Date());
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
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>

      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ  {errorMessage}
        </Alert>
      </Snackbar>

      <Paper>
        <Box
          display="flex"
          sx={{marginTop: 2}}
        >
          
          <Box sx={{ paddingX: 2, paddingY: 1}}>
            <Typography 
              component="h2"
              variant="h6"
              color="#4db6ac"
              gutterBottom
            >
              บันทึกข้อมูลบุคลากร
            </Typography>
          </Box>
        </Box>
        <Divider />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <p style={{ color: "#006A7D", fontSize: "10" }}>หมายเลขบัตรประชาชน</p>
                <Select
                  native
                  value={appointment.PatientRegisterID}
                  onChange={handleChange}
                  inputProps={{
                    name: "PatientRegisterID",
                  }}
                >
                  <option aria-label="None" value="">
                    กรุณาเลือกหมายเลขบัตรประชาชน
                  </option>
                  {patientRegisters.map((item: PatientRegistersInterface) => (
                    <option value={item.ID} key={item.ID}>
                      {item.ID}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} >
              <p></p>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <p style={{ color: "#006A7D", fontSize: "10" }}>แพทย์</p>
                <Select
                  native
                  value={appointment.EmployeeID}
                  onChange={handleChange}
                  inputProps={{
                    name: "EmployeeID",
                  }}
                >
                  <option aria-label="None" value="">
                    กรุณาเลือกแพทย์
                  </option>
                  {doctors.map((item: EmployeesInterface) => (
                    <option value={item.ID} key={item.ID}>
                      {item.FirstName}
                      {item.LastName}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <p style={{ color: "#006A7D", fontSize: "10" }}>คลินิก</p>
                <Select
                  native
                  value={appointment.RoomID}
                  onChange={handleChange}
                  inputProps={{
                    name: "RoomID",
                  }}
                >
                  <option aria-label="None" value="">
                    กรุณาเลือกคลินิก
                  </option>
                  {rooms.map((item: RoomsInterface) => (
                    <option value={item.ID} key={item.ID}>
                      {item.Name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <p style={{ color: "#006A7D", fontSize: "10" }}>หมายเลขห้อง :</p>
                <TextField
                  id="RoomNumber"
                  variant="outlined"
                  type="number"
                  size="medium"
                  value={appointment.RoomNumber}
                  onChange={handleInputChange}
                  inputProps={{ min: 0 }}
                />
              </FormControl>
            </Grid>
            <ThemeProvider theme={theme}>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <p style={{ color: "#006A7D", fontSize: "10" }}>วันที่และเวลานัดหมาย</p>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Appointment time"
                  inputFormat="dd/MM/yyyy"
                  value={selectedDate || new Date()}
                  onChange={handleDateChange}
                  renderInput={(params: TextFieldProps) => {
                    return <TextField{...params}
                    />;
                  }}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          </ThemeProvider>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <p style={{ color: "#006A7D", fontSize: "10" }}>หมายเหตุ :</p>
                <TextField
                  id="Note"
                  variant="outlined"
                  type="string"
                  size="medium"
                  value={appointment.Note || ""}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} >
              <p></p>
            </Grid>
            <Grid item xs={12}>
              <Button
                component={RouterLink}
                to="/appointment"
                variant="contained"
              >
                กลับ
              </Button>
              <Button
                style={{ float: "right" }}
                variant="contained"
                onClick={submit}
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
export default AppointmentCreate;