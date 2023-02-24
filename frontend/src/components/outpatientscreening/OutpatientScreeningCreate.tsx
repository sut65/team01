import React, { useEffect } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, Divider, MenuItem } from '@mui/material';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Link from '@mui/material/Link';

// interfaces
import { HistorySheetsInterface } from "../../models/IHistorySheet/IHistorySheet";
import { EmergencyLevelsInterface } from "../../models/IOutpatientScreening/IEmergencyLevel";
import { HighBloodPressureLevelsInterface } from "../../models/IOutpatientScreening/IHighBloodPressureLevel";
import { DiabetesLevelsInterface } from "../../models/IOutpatientScreening/IDiabetesLevel";
import { ObesityLevelsInterface } from "../../models/IOutpatientScreening/IObesityLevel";
import { OutpatientScreeningsInterface } from "../../models/IOutpatientScreening/IOutpatientScreenings";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



  function OutpatientScreeningCreates() {


    const params = useParams();
    
    const  [AddedTime,setAddedTime] = React.useState<Date | null>(new Date());
    const handleAddedTime = (date: Date | null | undefined) => {
     if (!date) {
       return
     }
      setAddedTime(date);
    }
    const  [AddedTime1,setAddedTime1] = React.useState<Date | null>(new Date());
    const handleAddedTime1 = (date: Date | null | undefined) => {
     if (!date){
       return
     }
      setAddedTime1(date);
    }
   
  // ดึง HistorySheetId มาจาก url ตอนกดเลือกใบการซักประวัติ ex. "localhost:3000/OutpatienScreeningCreate/2" จะได้ HistorySheetId = 2
  const { HistorySheetId } = useParams();
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date());

  const [HistorySheet, setHistorySheet] = React.useState<HistorySheetsInterface>();
  const [EmergencyLevel, setEmergencyLevel] = React.useState<EmergencyLevelsInterface[]>([]);
  const [HighBloodPressureLevel, setHighBloodPressureLevel] = React.useState<HighBloodPressureLevelsInterface[]>([]);
  //const [HighBloodPressureLevel, setHighBloodPressureLevel] = React.useState<HighBloodPressureLevelInterface>();
  const [DiabetesLevel, setDiabetesLevel] = React.useState<DiabetesLevelsInterface[]>([]);
  //const [DiabetesLevel, setDiabetesLevel] = React.useState<DiabetesLevelInterface>();
  const [ObesityLevel, setObesityLevel] = React.useState<ObesityLevelsInterface[]>([]);
  //const [ObesityLevel, setObesityLevel] = React.useState<ObesityLevelInterface>();
  const [OutpatientScreenings, setOutpatientScreenings] = React.useState<Partial<OutpatientScreeningsInterface>>({
    //แก้ตอนรวมไฟล์
    //HistorySheetID: HistorySheetId,
    HistorySheetID: 1,
    EmployeeID: 0,
    EmergencyLevelID: 0,
    HighBloodPressureLevelID: 0,
    DiabetesLevelID: 0,
    ObesityLevelID: 0,  
    Date: new Date(),
    TimeStart: new Date(),
    TimeEnd: new Date(),
  });

  const [errorMessage, setErrorMessage] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof  OutpatientScreenings;
    const { value } = event.target;
    setOutpatientScreenings({ ...OutpatientScreenings, [id]: value });
  };

  const handleChange = (
    event: SelectChangeEvent<number>
  ) => {
    const name = event.target.name as keyof typeof OutpatientScreenings;
    setOutpatientScreenings({
      ...OutpatientScreenings,
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
  const handleDateChange = (date: Date | null) => {
    console.log(date);
    setSelectedDate(date);
};

  //Get Function
  const getHistorySheet = async () => {
    
    const apiUrl = `http://localhost:8080/HistorySheet/${HistorySheetId}`;
    // const apiUrl = `http://localhost:8080/HistorySheet/1`;  
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
  const getEmergencyLevel = async () => {
    const apiUrl = "http://localhost:8080/EmergencyLevel";
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
          setEmergencyLevel(res.data);
        } else {
          console.log(res.error);
        }
      })
  }

  const getHighBloodPressureLevel = async () => {                       
    const apiUrl = "http://localhost:8080/highbloodpressure_levels";
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
          setHighBloodPressureLevel(res.data);
        } else {
          console.log(res.error);
        }
      })
  }
  const getDiabetesLevel = async () => {                       
    const apiUrl = "http://localhost:8080/DiabetesLevel";
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
          setDiabetesLevel(res.data);
        } else {
          console.log(res.error);
        }
      })
  }
  const getObesityLevel = async () => {                       
    const apiUrl = "http://localhost:8080/ObesityLevels";
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
          setObesityLevel(res.data);
        } else {
          console.log(res.error);
        }
      })
  }
  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  const apiUrl = "http://localhost:8080";

  async function GetOutpatientScreeningById(id: string) {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/outpatientScreening/${id}`, requestOptions)
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
  

  function submit() {
    let data: any = {
      HistorySheetID: convertType(OutpatientScreenings.HistorySheetID),
      EmergencyLevelID: convertType(OutpatientScreenings. EmergencyLevelID),
      HighBloodPressureLevelID: convertType(OutpatientScreenings.HighBloodPressureLevelID),
      DiabetesLevelID: convertType(OutpatientScreenings.DiabetesLevelID),
      ObesityLevelID: convertType(OutpatientScreenings.ObesityLevelID),
      Note: OutpatientScreenings.Note ?? "",
      Date: selectedDate,
      TimeStart: AddedTime,
      TimeEnd: AddedTime1,

    };

    let apiUrl : any
      if (params.id){
        data["ID"] = parseInt(params.id);
        apiUrl = "http://localhost:8080/outpatientScreenings"
      }
      else{
        apiUrl = "http://localhost:8080/outpatientScreenings"
      }

    // if (params.id){
    //    data["ID"] = parseInt(params.id);
    // }

    console.log(data);

    const requestOptionsPost = {
      method: params.id ? "PATCH" : "POST",
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
          //ClearForm();
        } else {
          console.log("ไม่สามารถบันทึกได้")
          setError(true);
          if(res.error.includes("กรุณากรอกการซักประวัติเพิ่มเติม")){
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
  // }
  
  // const ClearForm = () => {
  //   setOutpatientScreenings({
  //     Note: "",
  //     HistorySheetID: 0,
  //     EmergencyLevelID: 0,
  //     HighBloodPressureLevelID: 0,
  //     DiabetesLevelID: 0,
  //     ObesityLevelID: 0,
  //   });
  };

  useEffect(() => {
    getHistorySheet();
    getEmergencyLevel();
    getHighBloodPressureLevel();
    getDiabetesLevel();
    getObesityLevel();
    if (params.id){
      GetOutpatientScreeningById(params.id)
    }

  }, []);


  
  return (
    <Container sx={{ marginTop: 2}} maxWidth="md">
     <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
       <Alert onClose={handleClose} severity="success">
         บันทึกข้อมูลสำเร็จ
       </Alert>
     </Snackbar>
     <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
       <Alert onClose={handleClose} severity="error">
         บันทึกข้อมูลไม่สำเร็จ {errorMessage}
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
             การคัดกรองคนไข้นอก
           </Typography>
         </Box>
       </Box>
       <Divider />
       <Grid container spacing={3} sx={{ flexGrow: 1}}>
          {/* Create Disable TextField */}
          {/* <Grid item xs={6}>
           <p>BMI</p>
           <FormControl fullWidth variant="outlined">
             <TextField
               id="BMI"
               variant="outlined"
               type="string"
               size="medium"
              //  defaultValue={OutpatientScreenings.HistorySheet?.BMI}
              defaultValue= {OutpatientScreenings?.HistorySheet?.BMI}
              //  onChange={handleInputChange}
               InputProps={{
                 readOnly: true,
              }}
             />
           </FormControl>
         </Grid> */}
         <Grid item xs={3}>
           <p>น้ำหนัก</p>
           <FormControl fullWidth variant="outlined" >
             <TextField
               id="Weight"
               variant="outlined"
               //disabled
               type="string"
               size="small"
               value={HistorySheet?.Weight}
               onChange={handleInputChange}
             />
           </FormControl>
         </Grid>
         <Grid item xs={3}>
           <p>ส่วนสูง</p>
           <FormControl fullWidth variant="outlined" >
             <TextField
               id="Height"
               variant="outlined"
               //disabled
               type="string"
               size="small"
               value={HistorySheet?.Height}
               onChange={handleInputChange}
             />
           </FormControl>
         </Grid>

        <Grid item xs={3}>
           <p>BMI</p>
           <FormControl fullWidth variant="outlined" >
             <TextField
               id="BMI"
               variant="outlined"
               //disabled
               type="string"
               size="small"
               value={HistorySheet?.BMI}
               onChange={handleInputChange}
             />
           </FormControl>
         </Grid>
         <Grid item xs={3}>
           <p>อุณหภูมิ</p>
           <FormControl fullWidth variant="outlined" >
             <TextField
               id="Temperature"
               variant="outlined"
               //disabled
               type="string"
               size="small"
               value={HistorySheet?.Temperature}
               onChange={handleInputChange}
             />
           </FormControl>
         </Grid>
         <Grid item xs={3}>
           <p>อัตราการเต้นของหัวใจ</p>
           <FormControl fullWidth variant="outlined" >
             <TextField
               id="HeartRate"
               variant="outlined"
               //disabled
               type="string"
               size="small"
               value={HistorySheet?.HeartRate}
               onChange={handleInputChange}
             />
           </FormControl>
         </Grid>
         <Grid item xs={3}>
           <p>ความดัน</p>
           <FormControl fullWidth variant="outlined" >
             <TextField
               id="DiastolicBloodPressure"
               variant="outlined"
               //disabled
               type="string"
               size="small"
               value={HistorySheet?.DiastolicBloodPressure}
               onChange={handleInputChange}
             />
           </FormControl>
         </Grid>
         <Grid item xs={3}>
           <p>อัตราการหายใจ</p>
           <FormControl fullWidth variant="outlined" >
             <TextField
               id="RespiratoryRate"
               variant="outlined"
               //disabled
               type="string"
               size="small"
               value={HistorySheet?.RespiratoryRate}
               onChange={handleInputChange}
             />
           </FormControl>
         </Grid>
         <Grid item xs={3}>
           <p>ความอิ่มตัวของออกซิเจน</p>
           <FormControl fullWidth variant="outlined" >
             <TextField
               id="OxygenSaturation"
               variant="outlined"
               //disabled
               type="string"
               size="small"
               value={HistorySheet?.OxygenSaturation}
               onChange={handleInputChange}
             />
           </FormControl>
         </Grid>
         
         
         
         <Grid item xs={3}>
         <FormControl fullWidth variant="outlined">
              <p>คัดกรองตามความเร่งด่วน</p>
              <Select
                value={OutpatientScreenings?.EmergencyLevelID}
                //size="small"
                onChange={handleChange}
                inputProps={{
                  name: "EmergencyLevelID",
                }}
              >
                {EmergencyLevel.map((item: EmergencyLevelsInterface) => (
                  <MenuItem value={item.ID} key={item.ID}>
                    {item.Level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
         </Grid>
         <Grid item xs={3}>
         <FormControl fullWidth variant="outlined">
              <p>แบบการคัดกรอง</p>
              <Select
                value={OutpatientScreenings?.EmergencyLevelID}
                onChange={handleChange}
                disabled
                inputProps={{
                  name: "EmergencyLevelID",
                }}
              >
                {EmergencyLevel.map((item: EmergencyLevelsInterface) => (
                  <MenuItem value={item.ID} key={item.ID}>
                    {item.AssessmentForms}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
         </Grid>
         <Grid item xs={3}>
         <FormControl fullWidth variant="outlined">
              <p>คัดกรองความดันโลหิตสูง</p>
              <Select
                value={OutpatientScreenings?.HighBloodPressureLevelID}
                onChange={handleChange}
                inputProps={{
                  name: "HighBloodPressureLevelID",
                }}
              >
                {/* <MenuItem aria-label="None" value="">
                  กลุ่มผิดปกติ
                </MenuItem> */}
                {HighBloodPressureLevel.map((item: HighBloodPressureLevelsInterface) => (
                  <MenuItem value={item.ID} key={item.ID}>
                    {item.Level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
         </Grid>
         <Grid item xs={3}>
         <FormControl fullWidth variant="outlined">
              <p>แบบการคัดกรอง</p>
              <Select
                value={OutpatientScreenings?.HighBloodPressureLevelID}
                onChange={handleChange}
                inputProps={{
                  name: "HighBloodPressureLevelID",
                }}
              >
                {/* <MenuItem aria-label="None" value="">
                  กลุ่มผิดปกติ
                </MenuItem> */}
                {HighBloodPressureLevel.map((item: HighBloodPressureLevelsInterface) => (
                  <MenuItem value={item.ID} key={item.ID}>
                    {item.AssessmentForms}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
         </Grid>
         <Grid item xs={3}>
         <FormControl fullWidth variant="outlined">
              <p>คัดกรองผู้ป่วยเบาหวาน</p>
              <Select
                value={OutpatientScreenings?.DiabetesLevelID}
                onChange={handleChange}
                inputProps={{
                  name: "DiabetesLevelID",
                }}
              >
                {/* <MenuItem aria-label="None" value="">
                  กลุ่มผิดปกติ
                </MenuItem> */}
                {DiabetesLevel.map((item: DiabetesLevelsInterface) => (
                  <MenuItem value={item.ID} key={item.ID}>
                    {item.Level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
         </Grid>
         <Grid item xs={3}>
         <FormControl fullWidth variant="outlined">
              <p>แบบการคัดกรอง</p>
              <Select
                value={OutpatientScreenings?.DiabetesLevelID}
                onChange={handleChange}
                inputProps={{
                  name: "DiabetesLevelID",
                }}
              >
                {/* <MenuItem aria-label="None" value="">
                  กลุ่มผิดปกติ
                </MenuItem> */}
                {DiabetesLevel.map((item: DiabetesLevelsInterface) => (
                  <MenuItem value={item.ID} key={item.ID}>
                    {item.AssessmentForms}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
         </Grid>
         <Grid item xs={3}>
         <FormControl fullWidth variant="outlined">
              <p>คัดกรองผู้ป่วยโรคอ้วน</p>
              <Select
                value={OutpatientScreenings?.ObesityLevelID}
                onChange={handleChange}
                inputProps={{
                  name: "ObesityLevelID",
                }}
              >
                {ObesityLevel.map((item: ObesityLevelsInterface) => (
                  <MenuItem value={item.ID} key={item.ID}>
                    {item.Level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
         </Grid>
         <Grid item xs={3}>
         <FormControl fullWidth variant="outlined">
              <p>แบบการประเมิน</p>
              <Select
                value={OutpatientScreenings?.ObesityLevelID}
                onChange={handleChange}
                inputProps={{
                  name: "ObesityLevelID",
                }}
              >
                {ObesityLevel.map((item: ObesityLevelsInterface) => (
                  <MenuItem value={item.ID} key={item.ID}>
                    {item.AssessmentForms}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
         </Grid>
         <Grid item xs={6}>
           <p>กรุณากรอกการซักประวัติเพิ่มเติม</p>
           <FormControl fullWidth variant="outlined">
             <TextField
               id="Note"
               variant="outlined"
               type="string"
               size="medium"
               value={OutpatientScreenings.Note}
               onChange={handleInputChange}
             />
           </FormControl>
         </Grid>
          
         {/* <Grid item xs={6}>
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
         </Grid> */}
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
         <Grid item xs={3}>
         <Card sx={{ maxWidth: 850 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image='https://images.unsplash.com/photo-1513224502586-d1e602410265?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2831&q=80'
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Emergency Form
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <Link href="https://1drv.ms/b/s!ApGmKhGto_SHgX7rIiRINDm387FM?e=jzdeT4">แบบการคัดกรองตามความเร่งด่วน</Link>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
         </Grid>
         <Grid item xs={3}>
         <Card sx={{ maxWidth: 850 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image='https://images.unsplash.com/photo-1621525434111-87a99d170b0e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
              HighBlood PressureForm
              </Typography>
              <Typography variant="body2" color="text.secondary">

                <Link href="https://1drv.ms/b/s!ApGmKhGto_SHiiIVEH4qgpqj6RsR?e=TVJjAb">แบบการคัดกรองผู้เสี่ยงความดันโลหิตสูง</Link>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
         </Grid>
         <Grid item xs={3}>
         <Card sx={{ maxWidth: 850 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image='https://images.unsplash.com/photo-1624625021542-41a4ff97c025?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
              Diabetes Level Form
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <Link href="https://1drv.ms/b/s!ApGmKhGto_SHiiEmgDIkrVWbS54c?e=1VLrgP">แบบการคัดกรองผู้เสี่ยงโรคเบาหวาน</Link>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
         </Grid>
         <Grid item xs={3}>
         <Card sx={{ maxWidth: 850 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image='https://images.unsplash.com/photo-1634463278803-f9f71890e67d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
              Obesity Level Form
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <Link href="https://1drv.ms/b/s!ApGmKhGto_SHiiP2-ly557XPk3F0?e=RKYqno">แบบการคัดกรองผู้เสี่ยงโรคอ้วน</Link>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
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
};
export default OutpatientScreeningCreates; 