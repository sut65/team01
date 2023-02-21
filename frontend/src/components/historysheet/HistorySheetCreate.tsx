import React, { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Icon } from "@mui/material";

// interfaces
import { PatientRegistersInterface } from "../../models/IPatientRegister/IPatientRegister";
import { HistorySheetsInterface } from "../../models/IHistorySheet/IHistorySheet";
import { EmployeesInterface } from "../../models/IEmployee/IEmployee";
import { DrugAllergiesInterface } from "../../models/IHistorySheet/IHistorySheet";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function HistorySheetCreate() {
    // ประกาศตัวแปร params สำหรับรับค่าจาก url
    const params = useParams();

    // ประกาศตัวแปร prefixes และ setPrefixes สำหรับเก็บค่าจาก PrefixesInterface
    // setPrefixes เป็นตัว set ค่าจาก PrefixesInterface เข้าไปที่ตัวแปร prefixes

    const [nurses, setNurses] = React.useState<Partial<EmployeesInterface>>({ FirstName: "", LastName: "" })
    const [drugallergies, setDrugAllergies] = React.useState<DrugAllergiesInterface[]>([])
    const [patientregisters, setPatientRegisters] = React.useState<PatientRegistersInterface[]>([])
    // setUser จะเป็นตัว check ข้อมูลให้ตัวแปร user ว่าได้รับข้อมูลที่ต้องการมาแล้วหรือยัง
    const [historysheets, setHistorySheets] = React.useState<Partial<HistorySheetsInterface>>({
        NurseID: 0,
        DrugAllergyID: 0,
        PatientRegisterID: 0,
        Weight: 0,
        Height: 0, Temperature: 0, SystolicBloodPressure: 0,
        DiastolicBloodPressure: 0,
        HeartRate: 0,
        RespiratoryRate: 0, OxygenSaturation: 0,
        DrugAllergySymtom: "",
        PatientSymtom: "",
    });
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [message, setMessage] = useState("");

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        if (success === true) {
            window.location.href = "/historysheet";
        }
        setSuccess(false);
        setError(false);
    };

    // const Item = styled(Paper)(({ theme }) => ({
    //   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    //   ...theme.typography.body2,
    //   padding: theme.spacing(1),
    //   textAlign: 'center',
    //   color: theme.palette.text.secondary,
    // }));

    // setUser ทำการเก็บข้อมูลจาก combobox ไปเก็บที่ตัวแปร user
    const handleSelectChange = (event: SelectChangeEvent<number>) => {
        const name = event.target.name as keyof typeof HistorySheetCreate;
        const { value } = event.target;
        setHistorySheets({ ...historysheets, [name]: value });
    }

    // setUser ทำการเก็บข้อมูลจาก textfield ไปเก็บที่ตัวแปร user
    const handleInputChange = (event: React.ChangeEvent<{ id?: string; value: any }>) => {
        const id = event.target.id as keyof typeof HistorySheetCreate;
        const { value } = event.target;
        setHistorySheets({ ...historysheets, [id]: value });
    };




    // หน้า UserCreate
    // หน้าบ้าน จะใช้ JSON สื่อสารกันกับ หลังบ้าน
    // หน้าบ้านจะแนบ header(content-type) เพื่อติดต่อไปยังหลังงบ้านที่ method GET

    // หน้า UserCreate
    // หน้าบ้าน จะใช้ JSON สื่อสารกันกับ หลังบ้าน
    // หน้าบ้านจะแนบ header(content-type) เพื่อติดต่อไปยังหลังงบ้านที่ method GET
    //   const getPrefix = async () => {
    //     const apiUrl = "http://localhost:8080/prefixes";
    //     const requestOptions = {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${localStorage.getItem("token")}`
    //       }
    //     };

    //     // หลังบ้านรับ request มา
    //     // หลังบ้าน check data
    //     fetch(apiUrl, requestOptions)
    //       .then((response) => response.json())
    //       .then((res) => {
    //         if (res.data) {
    //           setPrefixes(res.data);  // ข้อมูลถูกต้อง setPrefixes จะ set ค่าไปที่ตัวแปร prefixes
    //         } else {
    //           console.log(res.error); // ข้อมูลไม่ถูกต้อง จะแสดงค่า error ที่ console
    //         }
    //       });
    //   }

    const getPatientRegister = async () => {
        const apiUrl = "http://localhost:8080/patientregisters";
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
                    setPatientRegisters(res.data);
                } else {
                    console.log(res.error);
                }
            });
    }

    const getNurse = async () => {
        const apiUrl = `http://localhost:8080/nurse/${localStorage.getItem("id")}`;
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
                    setNurses(res.data);
                } else {
                    console.log(res.error);
                }
            });
    }

    const getDrugAllergy = async () => {
        const apiUrl = "http://localhost:8080/drugallergies";
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
                    setDrugAllergies(res.data);
                } else {
                    console.log(res.error);
                }
            });
    }

    const getHistorySheet = async (id: string) => {
        const apiUrl = `http://localhost:8080/historysheet/${id}`;
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
                    setHistorySheets(res.data);
                } else {
                    console.log(res.error);
                }
            });
    }

    function submit() {

        // ตัวแปร data เป็นตัวรับข้อมูลจากตัวแปร user เพื่อส่งไปหลังบ้าน
        let data: any = {
            Weight: typeof historysheets.Weight === "string" ? parseFloat(historysheets.Weight) : historysheets.Weight,
            Height: typeof historysheets.Height === "string" ? parseFloat(historysheets.Height) : historysheets.Height,
            BMI: typeof historysheets.BMI === "string" ? parseFloat(historysheets.BMI) : historysheets.BMI,
            Temperature: typeof historysheets.Temperature === "string" ? parseFloat(historysheets.Temperature) : historysheets.Temperature,
            SystolicBloodPressure: typeof historysheets.SystolicBloodPressure === "string" ? parseInt(historysheets.SystolicBloodPressure) : historysheets.SystolicBloodPressure,
            DiastolicBloodPressure: typeof historysheets.DiastolicBloodPressure === "string" ? parseInt(historysheets.DiastolicBloodPressure) : historysheets.DiastolicBloodPressure,
            HeartRate: typeof historysheets.HeartRate === "string" ? parseInt(historysheets.HeartRate) : historysheets.HeartRate,
            RespiratoryRate: typeof historysheets.RespiratoryRate === "string" ? parseInt(historysheets.RespiratoryRate) : historysheets.RespiratoryRate,
            OxygenSaturation: typeof historysheets.OxygenSaturation === "string" ? parseInt(historysheets.OxygenSaturation) : historysheets.OxygenSaturation,

            DrugAllergySymtom: historysheets.DrugAllergySymtom ?? "",
            PatientSymtom: historysheets.PatientSymtom ?? "",

            PatientRegisterID: typeof historysheets.PatientRegisterID === "string" ? parseInt(historysheets.PatientRegisterID) : historysheets.PatientRegisterID,
            NurseID: nurses.ID,
            DrugAllergyID: typeof historysheets.DrugAllergyID === "string" ? parseInt(historysheets.DrugAllergyID) : historysheets.DrugAllergyID,
        };

        if (params.id) {
            data["ID"] = parseInt(params.id);
        }

        console.log(data);
        // หน้าบ้าน จะใช้ JSON สื่อสารกันกับ หลังบ้าน
        // หน้าบ้านจะแนบ header(content-type) และ body(app-json) เพื่อติดต่อไปยังหลังงบ้านที่ method POST
        const apiUrl = "http://localhost:8080/historysheets";
        const requestOptions = {
            method: params.id ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(data),
        };

        // หลังบ้านรับ request มา
        // หลังบ้าน check data
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log(res.data);    // ข้อมูลถูกต้อง บันทึกข้อมูลที่หลังบ้านและแสดงข้อมูลที่ console
                    setSuccess(true);       // แสดง pop up การทำงานสำเร็จ
                    setMessage("Successfully!");
                    window.location.href = "/historysheet";
                    // loginRegisted();      // เป็นการ login เข้าระบบแบบ auto
                } else {
                    setError(true);       // ข้อมูลไม่ถูกต้อง แสดง pop up การทำงานไม่สำเร็จ
                    setMessage("Fail! " + res.error);
                    console.log(res.error); // ข้อมูลไม่ถูกต้อง จะแสดงค่า error ที่ console
                }
            });

    }

    // const loginRegisted = () => {

    //   // ตัวแปร payload จะรับข้อมูล email และ password จาก textfield ที่ลงทะเบียน
    //   let payload = {
    //     Email: user.Email ?? "",
    //     Password: user.Password ?? "",
    //   }

    // // ที่หน้า Login
    // // หน้าบ้าน จะใช้ JSON สื่อสารกันกับ หลังบ้าน
    // // หน้าบ้านจะแนบ header(content-type) และ body(app-json) เพื่อติดต่อไปยังหลังงบ้านที่ method POST
    //   const apiUrl = "http://localhost:8080/login";
    //   const requestOptions = {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(payload),
    //   };

    //   fetch(apiUrl, requestOptions)
    //     .then((response) => response.json())
    //     .then((res) => {
    //       if (res.data) {
    //         localStorage.setItem("token", res.data.token);   // setItem จะ set ค่า token ไปที่ Local storage
    //         localStorage.setItem("id", res.data.id);  // setItem จะ set ค่า id ไปที่ Local storage
    //       } else {
    //         console.log(res.error);
    //       }
    //     });
    // }

    // เรียกใช้ฟังก์ชันเหล่านี้ ขณะกำลังสร้าง user
    // หากไม่มี [] จะเรียกใช้ function พวกนี้ตลอดเวลา
    // หากมี [] จะเรียกใช้ function พวกนี้แค่ครั้งเดียว
    // หากมี [var] จะเรียกใช้ตามเงือนไขเฉพาะ function ที่มีการเปลี่ยนแปลง
    useEffect(() => {
        getPatientRegister();
        getDrugAllergy();
        getNurse();

        if (params.id) {
            getHistorySheet(params.id)
        }
    }, []);

    console.log(historysheets);

    return (
        <Container maxWidth="md">
            <Snackbar
                open={success}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={handleClose} severity="success">
                    {message}
                </Alert>
            </Snackbar>
            <Snackbar open={error}
                autoHideDuration={6000}
                onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {message}
                </Alert>
            </Snackbar>
            <Paper>
                <Box display="flex" sx={{ marginTop: 2, }}>
                    <Box sx={{ paddingX: 2, paddingY: 1 }}>
                        <Grid container spacing={2} sx={{ paddingX: 20 }}>
                            <Grid item xs={3} >
                                <AccountCircleSharpIcon fontSize="large" color="primary" />
                            </Grid>
                            <Grid item xs={9}>
                                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                    Patient
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Divider />
                <Grid container spacing={3} sx={{ padding: 2 }}>
                    <Grid item xs={6}>
                        <p>Patient</p>
                        <FormControl fullWidth>
                            <InputLabel>Patient</InputLabel>
                            <Select
                                id="PatientRegisterID"
                                title="PatientRegisterID"
                                inputProps={{
                                    name: "PatientRegisterID"
                                }}
                                value={historysheets.PatientRegisterID || 0}
                                onChange={handleSelectChange}
                                native
                                autoFocus
                            >
                                <option key={0} value={0}></option>
                                {patientregisters.map((item: PatientRegistersInterface) => (
                                    <option key={item.ID} value={item.ID}>{item.FirstName} {item.LastName}</option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Paper>
            <Paper>
                <Box display="flex" sx={{ marginTop: 2, }}>
                    <Box sx={{ paddingX: 2, paddingY: 1 }}>
                        <Grid container spacing={2} sx={{ paddingX: 20 }}>
                            <Grid item xs={2} >
                                <AccountCircleSharpIcon fontSize="large" color="primary" />
                            </Grid>
                            <Grid item xs={10}>
                                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                    บันทึกค่าการวัดร่างกาย
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Divider />
                <Grid container spacing={2} sx={{ padding: 2 }}>
                    <Grid item xs={3}>
                        <p>Weight</p>
                        <TextField
                            id="Weight"
                            variant="outlined"
                            type="number"
                            size="medium"
                            InputProps={{ inputProps: { min: -50, step: "0.01" } }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={historysheets.Weight || ""}
                            onChange={handleInputChange}
                        />
                        {/* <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { width: '35ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <p>Weight</p>
                            <TextField
                                id="Weight"
                                variant="outlined"
                                type="number"
                                size="medium"
                                InputProps={{ inputProps: { min: -50, step: "0.01" } }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={historysheets.Weight || ""}
                                onChange={handleInputChange}
                            />
                        </Box> */}
                    </Grid>
                    <Grid item xs={3}>
                        <p>Height</p>
                        <TextField
                            id="Height"
                            variant="outlined"
                            type="number"
                            size="medium"
                            InputProps={{ inputProps: { min: -50, step: "1" } }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={historysheets.Height || ""}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <p>Temperature</p>
                        <TextField
                            id="Temperature"
                            variant="outlined"
                            type="number"
                            size="medium"
                            InputProps={{ inputProps: { min: -50, step: "0.1" } }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={historysheets.Temperature || ""}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <p>SystolicBloodPressure</p>
                        <TextField
                            id="SystolicBloodPressure"
                            variant="outlined"
                            type="number"
                            size="medium"
                            InputProps={{ inputProps: { min: 0, step: "1" } }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={historysheets.SystolicBloodPressure || ""}
                            onChange={handleInputChange}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ padding: 2 }}>
                    <Grid item xs={3}>
                        <p>DiastolicBloodPressure</p>
                        <TextField
                            id="DiastolicBloodPressure"
                            variant="outlined"
                            type="number"
                            size="medium"
                            InputProps={{ inputProps: { min: 1 } }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={historysheets.DiastolicBloodPressure || ""}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <p>RespiratoryRate</p>
                        <TextField
                            id="RespiratoryRate"
                            variant="outlined"
                            type="number"
                            size="medium"
                            InputProps={{ inputProps: { min: 1 } }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={historysheets.RespiratoryRate || ""}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <p>HeartRate</p>
                        <TextField
                            id="HeartRate"
                            variant="outlined"
                            type="number"
                            size="medium"
                            InputProps={{ inputProps: { min: -50 } }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={historysheets.HeartRate || ""}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <p>OxygenSaturation</p>
                        <TextField
                            id="OxygenSaturation"
                            variant="outlined"
                            type="number"
                            size="medium"
                            InputProps={{ inputProps: { min: 1 } }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={historysheets.OxygenSaturation || ""}
                            onChange={handleInputChange}
                        />
                    </Grid>
                </Grid>
            </Paper>
            <Paper>
                <Box display="flex" sx={{ marginTop: 2, }}>
                    <Box sx={{ paddingX: 2, paddingY: 1 }}>
                        <Grid container spacing={2} sx={{ paddingX: 20 }}>
                            <Grid item xs={3} >
                                <AccountCircleSharpIcon fontSize="large" color="primary" />
                            </Grid>
                            <Grid item xs={9}>
                                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                    Symtom
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Divider />
                <Grid container spacing={3} sx={{ padding: 2 }}>
                    <Grid item xs={4}>
                        <p>Drug Allergy</p>
                        <FormControl fullWidth>
                            <InputLabel>DrugAllergy</InputLabel>
                            <Select
                                id="DrugAllergyID"
                                title="DrugAllergyID"
                                inputProps={{
                                    name: "DrugAllergyID"
                                }}
                                value={historysheets.DrugAllergyID || 0}
                                onChange={handleSelectChange}
                                native
                                autoFocus
                            >
                                <option key={0} value={0}></option>
                                {drugallergies.map((item: DrugAllergiesInterface) => (
                                    <option key={item.ID} value={item.ID}>{item.Name}</option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <p>Drug Allergy Symtom</p>
                        <FormControl fullWidth>
                            <TextField id="DrugAllergySymtom"
                                value={historysheets.DrugAllergySymtom}
                                onChange={handleInputChange}
                                label="DrugAllergySymtom"
                                variant="outlined" />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <p>Patient Symtom</p>
                        <FormControl fullWidth>
                            <TextField id="PatientSymtom"
                                value={historysheets.PatientSymtom}
                                onChange={handleInputChange}
                                label="PatientSymtom"
                                variant="outlined" />
                        </FormControl>
                    </Grid>
                </Grid>
            </Paper>
            <Paper>
                <Box display="flex" sx={{ marginTop: 2, }}>
                    <Box sx={{ paddingX: 2, paddingY: 1 }}>
                        <Grid container spacing={2} sx={{ paddingX: 20 }}>
                            <Grid item xs={3} >
                                <AccountCircleSharpIcon fontSize="large" color="primary" />
                            </Grid>
                            <Grid item xs={9}>
                                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                    Employee
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Divider />
                <Grid container spacing={3} sx={{ padding: 2 }}>
                    <Grid item xs={6}>
                        <p>Nurse</p>
                        <FormControl fullWidth>
                            <TextField disabled label="Nurse" value={`${nurses?.FirstName} ${nurses?.LastName}`} />
                        </FormControl>
                    </Grid>
                </Grid>
            </Paper>
            <Divider />
            <Grid container spacing={2}>
                <Grid item xs={5} sx={{ textAlign: 'right', marginTop: 2, paddingX: 4, paddingY: 1, marginBottom: 2 }}>
                    <Button
                        onClick={submit}
                        variant="contained"
                        color="primary"
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </Container >
    );
}
export default HistorySheetCreate;