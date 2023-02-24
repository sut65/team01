import React, { useEffect } from 'react';
import { Link as RouterLink, useParams } from "react-router-dom";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { AdminsInterface, EmployeesInterface } from "../../models/IEmployee/IEmployee";
import { RoomsInterface, StatusesInterface, WorkloadsInterface } from '../../models/IWorkload/IWorkload';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import { DesktopTimePicker } from '@mui/x-date-pickers';
import moment from 'moment';

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

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function WorkloadCreate() {

    const params = useParams();
    const [workload, setWorkload] = React.useState<Partial<WorkloadsInterface>>({});
    const [doctor, setDoctor] = React.useState<EmployeesInterface[]>([]);
    const [admin, setAdmin] = React.useState<AdminsInterface>();
    const [room, setRoom] = React.useState<RoomsInterface[]>([]);
    const [status, setStatus] = React.useState<StatusesInterface[]>([]);
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date());
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    var getStartTime = new Date(moment(workload.StartTime).format());
    var getEndTime = new Date(moment(workload.EndTime).format());
    // new Date(moment(workload.StartTime).format());
    const [AddedTime1, setAddedTime1] = React.useState<Date | null>(new Date());
    

    const handleAddedTime1 = (date: Date | null | undefined) => {
        console.log(date);
        if (!date) {
            return
        }
        setAddedTime1(date);

  
        // setWorkload(date);
    }
    const [AddedTime2, setAddedTime2] = React.useState<Date | null>(new Date());
    const handleAddedTime2 = (date: Date | null | undefined) => {
        console.log(date);
        if (!date) {
            return
        }
        setAddedTime2(date);
    }
    
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setSuccess(false);
        setError(false);
    };

    const handleSelectChange = (event: SelectChangeEvent<number>) => {
        const name = event.target.name as keyof typeof workload;
        setWorkload({ ...workload, [name]: event.target.value });
      };

    const handleInputChange = (event: React.ChangeEvent<{ id?: string; value: any }>) => {
        const id = event.target.id as keyof typeof workload;
        const { value } = event.target;
        setWorkload({ ...workload, [id]: value });
    };

    const handleDateChange = (date: Date | null) => {
        console.log(date);
        setSelectedDate(date);
    };
    console.log("errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",workload.StartTime===undefined? "true" : workload.StartTime)
    const getAdmin = async () => {
        const apiUrl = `http://localhost:8080/admin/${localStorage.getItem("id")}`; //localStorage เก็บไอดีของพนักงานที่ล็อกอินเข้ามา
        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        }
        //เรียกใช้ฟังก์ชัน fetch ในการดึงข้อมูล (input เป็น apiUrl,RequestInfo เป็น requestOptions)
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())  //พอหลังบ้าน respon กลับมาเราก็จะทำการ then ข้อมูลที่ได้จากหลังบ้าน โดยเริ่มจากการแปลงข้อมูลให้เป็น json 
            .then((res) => {
                console.log(res.data); //console log ดูว่าข้อมูลที่ได้จากหลังบ้านเป็นหน้าตายังไง
                if (res.data) { //ติดต่อกันผ่าน path /admin มันก็เลยจะวิ่งไปที่ controller admin (List)ใน Backend อะ
                    setAdmin(res.data) //โดยตัว respone ที่เราได้จาก backend มันก็จะมี data กับ error ซึ่งถ้ามันมี data ส่งมาอะมันก็จะเอาค่าไปเก็บไว้ใน setAdmin (Set function ที่เรากำหนดไว้ก่อนหน้านี้อะ)
                } else {
                    console.log("else")
                }
            });
        console.log(admin)
    }

    const getDoctor = async () => {
        const apiUrl = `http://localhost:8080/employeerole/1`;
        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        }

        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setDoctor(res.data)
                } else {
                    console.log("else")
                }
            });
        console.log(doctor);
    }

    const getRoom = async () => {
        const apiUrl = "http://localhost:8080/rooms";
        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        }

        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                console.log(res.data);
                if (res.data) {
                    setRoom(res.data)
                } else {
                    console.log("else")
                }
            });
        console.log(room)
    }

    const getStatus = async () => {
        const apiUrl = "http://localhost:8080/statuses";
        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        }

        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                console.log(res.data);
                if (res.data) {
                    setStatus(res.data)
                } else {
                    console.log("else")
                }
            });
        console.log(status)
    }

    const getWorkload = async (id: string) => {
        const apiUrl = `http://localhost:8080/workload/${id}`;
        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        }

        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                console.log(res.data);
                if (res.data) {
                    setWorkload(res.data)
                } else {
                    console.log(res.error)
                }
            });
        console.log(workload)
    }
 
    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };
    
    function submit() {

        let data: any = {
            AdminID: convertType(admin?.ID),
            EmployeeID: convertType(workload.EmployeeID),
            RoomID: convertType(workload.RoomID),
            StatusID: convertType(workload.StatusID),
            Date: selectedDate,
            StartTime: (moment(AddedTime1).format()),
            EndTime: (moment(AddedTime2).format()),
        };
        if (params.id) {
            data["ID"] = parseInt(params.id);
        }
        console.log(data)

        const apiUrl = "http://localhost:8080/workload";
        const requestOptionsPost = {
            method: params.id ? "PATCH" : "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        fetch(apiUrl, requestOptionsPost) //เรียกใช้ฟังก์ชัน fetch ในการดึงข้อมูล (input เป็น apiUrl,RequestInfo เป็น requestOptions)
            .then((response) => response.json())
            .then((res) => {
                console.log(res.data);
                if (res.data) {
                    console.log("บันทึกข้อมูลสำเร็จ")
                    setSuccess(true);
                    setErrorMessage("")
                    // setTimeout(() => {
                    // window.location.href = "/workloads";
                    //   }, 2000)
                } else {
                    console.log(res.error)
                    console.log("บันทึกข้อมูลไม่สำเร็จ")
                    setError(true);
                    if (res.error.includes("Employee not found")) {
                        setErrorMessage("กรุณาเลือกแพทย์")
                    } else if (res.error.includes("Room not found")) {
                        setErrorMessage("กรุณาเลือกห้องตรวจ")
                    } else if (res.error.includes("Status not found")) {
                        setErrorMessage("กรุณาเลือกสถานะแพทย์")
                    } else if (res.error.includes("Date must be present")) {
                        setErrorMessage("กรุณาเลือกวันที่ที่เป็นปัจจุบันหรืออนาคต")
                    } else if (res.error.includes("Start Time must be future")) {
                        setErrorMessage("เวลาเริ่มต้นต้องเป็นอนาคต")
                    } else if (res.error.includes("End Time must be future")) {
                        setErrorMessage("เวลาสิ้นสุดต้องเป็นอนาคต")
                    } else if (res.error.includes("เวลาเริ่มต้นต้องน้อยกว่าเวลาสิ้นสุด")) {
                        setErrorMessage("เวลาเริ่มต้นต้องน้อยกว่าเวลาสิ้นสุด")
                    
                    
                    }else {
                        setErrorMessage(res.error);
                      }
                }
            });
    }
    useEffect(() => {
        if (params.id){
          getWorkload(params.id)
        }
      }, []);
    useEffect(() => {
        getAdmin();
        getDoctor();
        getRoom();
        getStatus();
        setAddedTime1(getStartTime)
        setAddedTime2(getEndTime)
    }, [workload]);
    console.log(workload)

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
                    sx={{
                        marginTop: 2,
                    }}
                >

                    <Box sx={{ paddingX: 2, paddingY: 1 }}>
                        <Typography
                            component="h2"
                            variant="h6"
                            gutterBottom
                            color="#4db6ac"
                        >
                            บันทึกภาระงานแพทย์
                        </Typography>
                    </Box>
                </Box>
                <Divider />

                <Grid container spacing={3} sx={{ padding: 2 }}>
                    <Grid item xs={6}>
                        <p style={{ color: "#006A7D", fontSize: "10" }}>ผู้ดูแลระบบ</p>
                        <FormControl fullWidth variant="outlined">
                            <TextField
                                id="FirstName"
                                disabled
                                variant="outlined"
                                type="string"
                                size="medium"
                                value={admin?.FirstName+" "+admin?.LastName}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>

                    <ThemeProvider theme={theme}>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined">
                            <p style={{ color: "#006A7D", fontSize: "10" }}>แพทย์</p>
                            <Select
                                native
                                value={workload.EmployeeID || 0}
                                onChange={handleSelectChange}
                                inputProps={{ name: "EmployeeID" }}
                            >
                                <option aria-label="None" value="">
                                กรุณาเลือกแพทย์
                                </option>
                                {doctor.map((item: EmployeesInterface) => (
                                <option key={item.ID} value={item.ID}>
                                    {item.FirstName} {item.LastName}
                                </option>
                                ))}
                            </Select>
                            </FormControl>
                        </Grid>
                    </ThemeProvider>
                    
                    <ThemeProvider theme={theme}>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined">
                            <p style={{ color: "#006A7D", fontSize: "10" }}>ห้องตรวจ</p>
                            <Select
                                native
                                value={workload.RoomID || 0}
                                onChange={handleSelectChange}
                                inputProps={{ name: "RoomID" }}
                            >
                                <option aria-label="None" value="">
                                กรุณาเลือกห้องตรวจ
                                </option>
                                {room.map((item: RoomsInterface) => (
                                <option key={item.ID} value={item.ID}>
                                    {item.Name}
                                </option>
                                ))}
                            </Select>
                            </FormControl>
                        </Grid>
                    </ThemeProvider>

                    <ThemeProvider theme={theme}>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined">
                            <p style={{ color: "#006A7D", fontSize: "10" }}>สถานะแพทย์</p>
                            <Select
                                native
                                value={workload.StatusID || 0}
                                onChange={handleSelectChange}
                                inputProps={{ name: "StatusID" }}
                            >
                                <option aria-label="None" value="">
                                กรุณาเลือกสถานะแพทย์
                                </option>
                                {status.map((item: StatusesInterface) => (
                                <option key={item.ID} value={item.ID}>
                                {item.Name}
                                </option>
                                ))}
                            </Select>
                            </FormControl>
                        </Grid>
                    </ThemeProvider>
                                    
                    <ThemeProvider theme={theme}>              
                    <Grid item xs={4}>
                        <FormControl fullWidth variant="outlined">
                            <p style={{ color: "#006A7D", fontSize: "10" }}>วันที่</p>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    label="วันที่"
                                    inputFormat="dd/MM/yyyy"
                                    value={selectedDate}
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
                    
                    <ThemeProvider theme={theme}>
                    <Grid item xs={4}>
                        <FormControl fullWidth variant="outlined">
                            <p style={{ color: "#006A7D", fontSize: "10" }}>เวลาที่เริ่ม</p>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <TimePicker
                                    value={AddedTime1}
                                    // value = {workload.StartTime === undefined ? AddedTime1 || workload.StartTime}
                                    onChange={(newValue) => handleAddedTime1(newValue)}
                                    renderInput={(params) => <TextField {...params} />}
                                    ampm={false}
                                />
                                
                            </LocalizationProvider>
                        </FormControl>
                    </Grid>
                    </ThemeProvider>

                    <ThemeProvider theme={theme}>
                    <Grid item xs={4}>
                        <FormControl fullWidth variant="outlined">
                            <p style={{ color: "#006A7D", fontSize: "10" }}>เวลาสิ้นสุด</p>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <TimePicker
                                    value={AddedTime2}
                                    onChange={(newValue) => handleAddedTime2(newValue)}
                                    renderInput={(params) => <TextField {...params} />}
                                    ampm={false}
                                />
                            </LocalizationProvider>
                        </FormControl>
                    </Grid>
                    </ThemeProvider>

                    <Grid item xs={12}>
                        <Button style={{ float: "left", background: '#4db6ac' }} component={RouterLink} to="/workloads" variant="contained">
                            กลับ
                        </Button>

                        <Button
                            style={{ float: "right", background: '#4db6ac' }}
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


export default WorkloadCreate;