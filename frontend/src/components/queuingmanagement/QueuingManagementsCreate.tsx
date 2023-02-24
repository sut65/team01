import React, { useEffect } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { ButtonGroup, CardActionArea, Divider, MenuItem } from '@mui/material';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Link from '@mui/material/Link';

import { EmployeesInterface } from "../../models/IEmployee/IEmployee";
import { HistorySheetsInterface } from "../../models/IHistorySheet/IHistorySheet";
import { ServicePointsInterface } from "../../models/IQueuingManagement/IServicePoints";
import { ServiceChannelsInterface } from "../../models/IQueuingManagement/IServiceChannels";
import { MedicalActionsInterface } from "../../models/IQueuingManagement/IMedicalActions";
import { QueuingManagementsInterface } from "../../models/IQueuingManagement/IQueuingManagements";
import { Note } from "@mui/icons-material";


cconst Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



function QueuingManagementsCreate() {

  const [AddedTime, setAddedTime] = React.useState<Date | null>(new Date());
  const handleAddedTime = (date: Date | null | undefined) => {
    if (!date) {
      return
    }
    setAddedTime(date);
  }
  const [AddedTime1, setAddedTime1] = React.useState<Date | null>(new Date());
  const handleAddedTime1 = (date: Date | null | undefined) => {
    if (!date) {
      return
    }
    setAddedTime1(date);
  }

  const { HistorySheetId } = useParams();
  const [Count ,setCount] = React.useState(0);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date());
  
  //const [PatientRegister, setPatientRegister] = React.useState<PatientRegistersInterface>();
  const [HistorySheet, setHistorySheet] = React.useState<HistorySheetsInterface>();
  const [ServicePoint, setServicePoint] = React.useState<ServicePointsInterface[]>([]);
  const [ServiceChannel, setServiceChannel] = React.useState<ServiceChannelsInterface[]>([]);
  const [MedicalAction, setMedicalAction] = React.useState<MedicalActionsInterface[]>([]);
  const [QueuingManagements, setQueuingManagements] = React.useState<Partial<QueuingManagementsInterface>>({
    HistorySheetID: 1,
  });
  const [errorMessage, setErrorMessage] = React.useState("");

  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof QueuingManagements;
    const { value } = event.target;
    setQueuingManagements({ ...QueuingManagements, [id]: value });
  };

  const handleChange = (
    event: SelectChangeEvent<number>
  ) => {
    const name = event.target.name as keyof typeof QueuingManagements;
    setQueuingManagements({
      ...QueuingManagements,
      [name]: event.target.value,
    });
  };

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

  //Get Function
  const getHistorySheet = async () => {
    const apiUrl = `http://localhost:8080/HistorySheet/1`;
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
    fetch(apiUrl, requestOptions)
      .then(response => response.json())
      .then(res => {
        console.log(res);
        if (res.data) {
          setHistorySheet(res.data);
        } else {
          console.log(res.error);
        }
      })
  }
  const getServicePoint = async () => {
    const apiUrl = "http://localhost:8080/ServicePoint";
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }

    fetch(apiUrl, requestOptions)
      .then(response => response.json())
      .then(res => {
        console.log(res);
        if (res.data) {
          setServicePoint(res.data);
        } else {
          console.log(res.error);
        }
      })
  }

  const getServiceChannel = async () => {
    const apiUrl = "http://localhost:8080/ServiceChannel";
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }

    fetch(apiUrl, requestOptions)
      .then(response => response.json())
      .then(res => {
        console.log(res);
        if (res.data) {
          setServiceChannel(res.data);
        } else {
          console.log(res.error);
        }
      })
  }
  const getMedicalAction = async () => {
    const apiUrl = "http://localhost:8080/MedicalAction";
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }

    fetch(apiUrl, requestOptions)
      .then(response => response.json())
      .then(res => {
        console.log(res);
        if (res.data) {
          setMedicalAction(res.data);
        } else {
          console.log(res.error);
        }
      })
  }

  const getCountQueuingManagements = async () => {
    const apiUrl = "http://localhost:8080/queuingManagements/count";
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
    fetch(apiUrl, requestOptions)
      .then(response => response.json())
      .then(res => {
        console.log(res);
        if (res.data) {
          setCount(res.data + 1);
        } else {
          console.log(res.error);
        }
      })
  }



  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };
  useEffect(() => {
    getHistorySheet();
    getServicePoint();
    getServiceChannel();
    getMedicalAction();
    getCountQueuingManagements();
  }, []);

  function submit() {
    let data = {
      HistorySheetID: convertType(QueuingManagements.HistorySheetID),
      ServicePointID: convertType(QueuingManagements.ServicePointID),
      ServiceChannelID: convertType(QueuingManagements.ServiceChannelID),
      MedicalActionID: convertType(QueuingManagements.MedicalActionID),
      Date: selectedDate,
      TimeStart: AddedTime,
      TimeEnd: AddedTime1,
      Note: QueuingManagements.Note ?? "",
    };
    console.log(data)


    const apiUrl = "http://localhost:8080/queuingManagements";
    const requestOptionsPost = {

      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}`, requestOptionsPost)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log("บันทึกได้")
          setSuccess(true);
          setErrorMessage("")
          ClearForm();
        } else {
          console.log("ไม่สามารถบันทึกได้")
          setError(true);
          if(res.error.includes("Note cannot be blank")){
            setErrorMessage("กรุณากรอกการซักประวัติเพิ่มเติม")
          }else if (res.error.includes("Date must be present")){
            setErrorMessage("กรุณาเลือกวันที่ที่เป็นปัจจุบันหรืออนาคต")
          } else if (res.error.includes("Start Time must be future")) {
            setErrorMessage("เวลาเริ่มต้นต้องเป็นอนาคต")
          } else if (res.error.includes("End Time must be future")) {
            setErrorMessage("เวลาสิ้นสุดต้องเป็นอนาคต")
          }         
        }
      });
  } const ClearForm = () => {
    setQueuingManagements({
      Note: "",
      HistorySheetID: 0,
      ServicePointID: 0,
      ServiceChannelID: 0,
      MedicalActionID: 0,
    });
  };



  return (
    <Container sx={{ marginTop: 2 }} maxWidth="md">
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
        </Alert>
      </Snackbar>
      <Paper sx={{ padding: 2, color: "text.secondary" }}>
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              การจัดลำดับคิวการรักษา
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} sx={{ flexGrow: 1 }}>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>จุดบริการ</p>
              <Select
                value={QueuingManagements?.ServicePointID}
                onChange={handleChange}
                inputProps={{
                  name: "ServicePointID",
                }}
              >
                {ServicePoint.map((item: ServicePointsInterface) => (
                  <MenuItem value={item.ID} key={item.ID}>
                    {item.Name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <p>ชื่อ(น้ำหนัก)</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="firstName"
                variant="outlined"
                disabled
                type="string"
                size="medium"
                value={HistorySheet?.Weight}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <p>นามสกุล (สูง)</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="LastName"
                variant="outlined"
                disabled
                type="string"
                size="medium"
                value={HistorySheet?.Height}
              />
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <p>ช่องบริการ</p>
            <FormControl fullWidth variant="outlined">
              <Select
                value={QueuingManagements?.ServiceChannelID}
                onChange={handleChange}
                inputProps={{
                  name: "ServiceChannelID",
                }}
              >
                {ServiceChannel.map((item: ServiceChannelsInterface) => (
                  <MenuItem value={item.ID} key={item.ID}>
                    {item.Name}
                  </MenuItem>
                ))} 
              </Select>
            </FormControl>
          </Grid>
            {/* <p>เพิ่มลด</p> */}
            {/* <ButtonGroup variant="contained" aria-label="outlined primary button group">
              <Button size="small" variant="outlined" color="success" >+</Button>&nbsp;
              <Button size="small" variant="outlined" color="error" >-</Button>&nbsp;
            </ButtonGroup> */}
          <Grid item xs={3}>
            <p>ลำดับการมารับบริการ OPD</p>
            {/* <Link href="https://elearning2.sut.ac.th/pluginfile.php/7096524/mod_resource/content/3/523332%20Module%20Descriptions%20and%20Syllabus.pdf">Link</Link> */}
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Sequence"
                variant="outlined"
                type="string"
                size="medium"
                value={Count}
                disabled
                //onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <p>การดำเนินการ</p>
            <FormControl fullWidth variant="outlined">
              <Select
                value={QueuingManagements?.MedicalActionID}
                onChange={handleChange}
                inputProps={{
                  name: "MedicalActionID",
                }}
              >
                {MedicalAction.map((item: MedicalActionsInterface) => (
                  <MenuItem value={item.ID} key={item.ID}>
                    {item.Action}
                  </MenuItem>
                ))} 
              </Select>
            </FormControl>
          </Grid>
         <Grid item xs={6}>
           <p>บันทึกรายละเอียดเพิ่มเติม</p>
           <FormControl fullWidth variant="outlined" >
             <TextField
               id="Note"
               variant="outlined"
               type="string"
               size="medium"
               value={QueuingManagements.Note}
               onChange={handleInputChange}
             />
           </FormControl>
         </Grid>
          <Grid item xs={3}>
           <FormControl fullWidth variant="outlined">
             <p>วันที่และเวลาที่เริ่มคัดกรอง</p>
             <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                 value={AddedTime}
                 onChange={(newValue) => handleAddedTime(newValue)}
                 minDate={new Date("2018-01-01T00:00")}
                 renderInput={(params) => <TextField {...params} />}
                 ampm = {false}
               />
             </LocalizationProvider>
           </FormControl>
         </Grid>
         <Grid item xs={3}>
           <FormControl fullWidth variant="outlined">
             <p>วันที่และเวลาที่จบคัดกรอง</p>
             <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                 value={AddedTime1}
                 onChange={(newValue) => handleAddedTime1(newValue)}
                 minDate={new Date("2018-01-01T00:00")}
                 renderInput={(params) => <TextField {...params} />}
                 ampm = {false}
               />
             </LocalizationProvider>
           </FormControl>
         </Grid>
          <Grid item xs={12}>
            <Button component={RouterLink} to="/history" variant="contained">
              Back
            </Button>
            <Button
              style={{ float: "right" }}
              onClick={submit}
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>

  );
}
export default QueuingManagementsCreate;




