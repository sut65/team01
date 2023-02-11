import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Divider from "@material-ui/core/Divider";
import Snackbar from '@material-ui/core/Snackbar';
import Select from "@material-ui/core/Select";
import { FormControl } from "@material-ui/core";
import { AlertTitle } from "@material-ui/lab";
import { EmployeeInterface } from "../models/IEmployee";
import { HospitalInterface } from "../models/IHospital";
import { PatientInterface } from "../models/IPatient";
import { RightTypeInterface } from "../models/IRighttype";
import { PatientRightInterface } from "../models/IPatientRight";
import { MuiPickersUtilsProvider,KeyboardDateTimePicker,} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        container: {
            marginTop: theme.spacing(2),
        },
        paper: {
            padding: theme.spacing(2),
            color: theme.palette.text.secondary,
        },
        text: {
            color: "#000000",
            fontSize: "1rem",
        }

    })
);

const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

function CreatePatientRight() {

  const classes = useStyles();
  const [SendingTime, setSendingTime] = React.useState<Date | null>(new Date(),);
  const [hospital, setHospital] = useState<HospitalInterface[]>([]);
  const [patients, setPatients] = useState<PatientInterface[]>([]); 
  const [righttype, setRightType] = useState<RightTypeInterface[]>([]);
  const [patientright, setPatientRight] = useState<Partial<PatientRightInterface>>({});
  const [nurse, setNurse] = useState<EmployeeInterface>();
  const [errorMessage, setErrorMessage] = useState("");

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);


  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof patientright;
    setPatientRight({

      ...patientright,
      [name]: event.target.value,
    });
  };

  const handleDateChange = (date: Date | null) => {
    console.log(date);
    setSendingTime(date);
  };

  const handleInputChange = (

    event: React.ChangeEvent<{ id?: string; value: any }>

  ) => {

    const id = event.target.id as keyof typeof patientright;

    const { value } = event.target;

    setPatientRight({ ...patientright, [id]: value });

  };

  //Get Data
  const apiUrl = "http://localhost:8080";
  const requestOptions = {
      method: "GET",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
  };
  
  const getHospital = async () => {
    fetch(`${apiUrl}/hospitals`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setHospital(res.data);
        } else {
          return false;
        }
      });
  };
  //console.log()
  const getRightType = async () => {
    fetch(`${apiUrl}/righttypes`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setRightType(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getPatient = async () => {
    fetch(`${apiUrl}/patients`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res)
        if (res.data) {
          setPatients(res.data);
        } else {
          console.log("else");
        }
      });
  };
  console.log("Patient",nurse);
  
  const getNurse = async () => {
    let uid = localStorage.getItem("uid");
    fetch(`${apiUrl}/employee/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log(res.data)
          setNurse(res.data);
        } else {
          console.log("else");
        }
      });
  };
  console.log("Nurse", nurse);

  useEffect(() => {
    getRightType();
    getPatient();
    getNurse();
    getHospital();
    getRightType();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit() {
    if(patientright.PatientID == 0){
      setError(true);
      setErrorMessage("กรุณาเลือกคนไข้")
    }
    else if (patientright.RightTypeID == 0){
      setError(true);
      setErrorMessage("กรุณาเลือกสิทธิของผู้ป่วย")
    }
    else if (patientright.HospitalID == 0){
      setError(true);
      setErrorMessage("กรุณาเลือกโรงพยาบาลที่ใช้สิทธิ")
    }else{
      setError(false)
      let data = {
      PatientID: convertType(patientright.PatientID),
      EmployeeID : convertType(nurse?.ID),
      RightTypeID: convertType(patientright.RightTypeID),
      HospitalID: convertType(patientright.HospitalID),
      SendingTime: SendingTime,
      Note: patientright.Note ?? "",
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

    fetch(`${apiUrl}/patientrights`, requestOptionsPost)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setSuccess(true);
          setErrorMessage("");
          ClearForm();
        } else {
          console.log("ไม่มามารถบันทึกได้")
          setError(true);
          if(res.error.includes("Note cannot be blank")){
            setErrorMessage("กรุณากรอกหมายเหตุการใช้สิทธิ")
          }
          else if(res.error.includes("Time must be future")){
            setErrorMessage("กรุณาเลือกเวลาที่เป็นปัจจุบัน")
          }
          else{
            setErrorMessage(res.error);
          }
        }
      });
  }
}

  // function clear form after submit success
  const ClearForm = () => {
    setPatientRight({
      Note: "",
      HospitalID: 0,
      PatientID: 0,
      RightTypeID: 0,
      EmployeeID: 0,
    });
    setSendingTime(new Date());
  };

  return (

    <Container className={classes.container} maxWidth="md" >
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>

      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          <AlertTitle>Error</AlertTitle>
          ลงทะเบียนไม่สำเร็จ : {errorMessage}
        </Alert>
      </Snackbar>

      <Paper className={classes.paper}>
        <Box display="flex" >
          <Box flexGrow={1}>

            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
              
            >
               บันทึกสิทธิการรักษาผู้ป่วย
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} className={classes.root}>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <p style={{color:"#006A7D",fontSize: "10"}}>คนไข้</p>
              <Select
                native
                value={patientright.PatientID}
                onChange={handleChange}
                inputProps={{
                  name: "PatientID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกคนไข้
                </option>
                {patients.map((item: PatientInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.FirstName}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <p style={{color:"#006A7D",fontSize: "10"}}>เลือกประเภทสิทธิของผู้ป่วย</p>
              <Select
                native
                value={patientright.RightTypeID}
                onChange={handleChange}
                inputProps={{
                  name: "RightTypeID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกประเภทสิทธิของผู้ป่วย
                </option>
                {righttype.map((item: RightTypeInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Typename}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <p style={{color:"#006A7D",fontSize: "10"}}>เลือกโรงพยาบาลที่ใช้สิทธิ</p>
              <Select
                native
                value={patientright.HospitalID}
                onChange={handleChange}
                inputProps={{
                  name: "HospitalID",
                }}
              > 
                <option aria-label="None" value="">
                  กรุณาเลือกโรงพยาบาลที่ใช้สิทธิ
                </option>
                {hospital.map((item: HospitalInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <p style={{color:"#006A7D",fontSize: "10"}}>วันที่และเวลานัดหมาย</p>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                  name="SendingTime"
                  value={SendingTime}
                  onChange={handleDateChange}
                  label="กรุณาเลือกวันที่และเวลา"
                  minDate={new Date("2018-01-01T00:00")}
                  format="dd/MM/yyyy"
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <p style={{color:"#006A7D",fontSize: "10"}}>หมายเหตุ :</p>
              <TextField
                id="Note"
                variant="outlined"
                type="string"
                size="medium"
                value={patientright.Note || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <p style={{color:"#006A7D",fontSize: "10"}}>เจ้าหน้าที่</p>
              <Select
                native
                value={patientright.EmployeeID}
                onChange={handleChange}
                disabled
                inputProps={{
                  name: "EmployeeID",
                }}
              >
                <option value={nurse?.ID} key={nurse?.ID}>
                  {nurse?.Name}
                </option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} >
            <p></p>
          </Grid>
          
        </Grid>
      </Paper>
      <br/>
      <Grid container justifyContent="center" spacing={3}>
        <Grid item xs={3}>
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
    </Container>
  );
}
export default CreatePatientRight;