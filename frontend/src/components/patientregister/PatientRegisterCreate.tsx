import React, { useEffect } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
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
import { Button, TextField } from "@mui/material";

// interfaces
import { BloodTypesInterface, DistrictsInterface, MaritalStatusesInterface, NationalitiesInterface, PatientRegistersInterface, PrefixesInterface, ProvincesInterface, ReligionsInterface, SubDistrictsInterface } from "../../models/IPatientRegister/IPatientRegister";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { EmployeesInterface, GendersInterface } from "../../models/IEmployee/IEmployee";
import PatientRegisters from "./PatientRegister";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function PatientRegisterCreate() {
    const params = useParams();

    // ประกาศตัวแปร prefixes และ setPrefixes สำหรับเก็บค่าจาก PrefixesInterface
    // setPrefixes เป็นตัว set ค่าจาก PrefixesInterface เข้าไปที่ตัวแปร prefixes
    const [employees, setEmployees] = React.useState<Partial<EmployeesInterface>>({
        FirstName: "", LastName: ""
    })
    const [prefixes, setPrefixes] = React.useState<PrefixesInterface[]>([])
    const [genders, setGenders] = React.useState<GendersInterface[]>([])
    const [nationalities, setNationalities] = React.useState<NationalitiesInterface[]>([])
    const [religions, setReligions] = React.useState<ReligionsInterface[]>([])
    const [bloodtypes, setBloodTypes] = React.useState<BloodTypesInterface[]>([])
    const [maritalstatuses, setMaritalStautses] = React.useState<MaritalStatusesInterface[]>([])
    const [subdistricts, setSubDistricts] = React.useState<SubDistrictsInterface[]>([])
    const [districts, setDistricts] = React.useState<DistrictsInterface[]>([])
    const [provinces, setProvinces] = React.useState<ProvincesInterface[]>([])
    const [postcodes, setPostcodes] = React.useState<number>(0)

    // const [date, setDate] = React.useState<Date | null>(null);

    // setUser จะเป็นตัว check ข้อมูลให้ตัวแปร user ว่าได้รับข้อมูลที่ต้องการมาแล้วหรือยัง
    const [patientregisters, setPatientRegisters] = React.useState<Partial<PatientRegistersInterface>>({
        EmployeeID: 0, PrefixID: 0, GenderID: 0, NationalityID: 0, ReligionID: 0, BloodTypeID: 0, MaritalStatusID: 0, SubDistrictID: 0, DistrictID: 0, ProvinceID: 0,
        FirstName: "", LastName: "", IdentificationNumber: "", Age: 0, BirthDay: new Date(), Mobile: "", Occupation: "", Address: "",
    });
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [messages, setMessages] = React.useState("");

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        if (success === true) {
            window.location.href = "/patient";
        }
        setSuccess(false);
        setError(false);
    };

    // setUser ทำการเก็บข้อมูลจาก combobox ไปเก็บที่ตัวแปร user
    const handleSelectChange = (event: SelectChangeEvent<number>) => {
        const name = event.target.name as keyof typeof PatientRegisters;
        const { value } = event.target;
        setPatientRegisters({ ...patientregisters, [name]: value });
    }

    // setUser ทำการเก็บข้อมูลจาก textfield ไปเก็บที่ตัวแปร user
    const handleInputChange = (event: React.ChangeEvent<{ id?: string; value: any }>) => {
        const id = event.target.id as keyof typeof PatientRegisterCreate;
        const { value } = event.target;
        setPatientRegisters({ ...patientregisters, [id]: value });
    };

    // หน้า UserCreate
    // หน้าบ้าน จะใช้ JSON สื่อสารกันกับ หลังบ้าน
    // หน้าบ้านจะแนบ header(content-type) เพื่อติดต่อไปยังหลังงบ้านที่ method GET
    const getEmployee = async () => {
        const apiUrl = `http://localhost:8080/employee/${localStorage.getItem("id")}`;
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        };


        // หลังบ้านรับ request มา
        // หลังบ้าน check data
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                if (res.data) {
                    setEmployees(res.data);   // ข้อมูลถูกต้อง setRoles จะ set ค่าไปที่ตัวแปร roles
                } else {
                    console.log(res.error); // ข้อมูลไม่ถูกต้อง จะแสดงค่า error ที่ console
                }
            });
    }

    // หน้า UserCreate
    // หน้าบ้าน จะใช้ JSON สื่อสารกันกับ หลังบ้าน
    // หน้าบ้านจะแนบ header(content-type) เพื่อติดต่อไปยังหลังงบ้านที่ method GET
    const getPrefix = async () => {
        const apiUrl = "http://localhost:8080/prefixes";
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        };

        // หลังบ้านรับ request มา
        // หลังบ้าน check data
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setPrefixes(res.data);  // ข้อมูลถูกต้อง setPrefixes จะ set ค่าไปที่ตัวแปร prefixes
                } else {
                    console.log(res.error); // ข้อมูลไม่ถูกต้อง จะแสดงค่า error ที่ console
                }
            });
    }

    const getGender = async () => {
        const apiUrl = "http://localhost:8080/genders";
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        };

        // หลังบ้านรับ request มา
        // หลังบ้าน check data
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setGenders(res.data);  // ข้อมูลถูกต้อง setPrefixes จะ set ค่าไปที่ตัวแปร prefixes
                } else {
                    console.log(res.error); // ข้อมูลไม่ถูกต้อง จะแสดงค่า error ที่ console
                }
            });
    }

    const getNationality = async () => {
        const apiUrl = "http://localhost:8080/nationalities";
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        };

        // หลังบ้านรับ request มา
        // หลังบ้าน check data
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setNationalities(res.data);  // ข้อมูลถูกต้อง setPrefixes จะ set ค่าไปที่ตัวแปร prefixes
                } else {
                    console.log(res.error); // ข้อมูลไม่ถูกต้อง จะแสดงค่า error ที่ console
                }
            });
    }

    const getReligion = async () => {
        const apiUrl = "http://localhost:8080/religions";
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        };

        // หลังบ้านรับ request มา
        // หลังบ้าน check data
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setReligions(res.data);  // ข้อมูลถูกต้อง setPrefixes จะ set ค่าไปที่ตัวแปร prefixes
                } else {
                    console.log(res.error); // ข้อมูลไม่ถูกต้อง จะแสดงค่า error ที่ console
                }
            });
    }

    const getBloodType = async () => {
        const apiUrl = "http://localhost:8080/bloodtypes";
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        };

        // หลังบ้านรับ request มา
        // หลังบ้าน check data
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setBloodTypes(res.data);  // ข้อมูลถูกต้อง setPrefixes จะ set ค่าไปที่ตัวแปร prefixes
                } else {
                    console.log(res.error); // ข้อมูลไม่ถูกต้อง จะแสดงค่า error ที่ console
                }
            });
    }

    const getMaritalStatus = async () => {
        const apiUrl = "http://localhost:8080/maritalstatuses";
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        };

        // หลังบ้านรับ request มา
        // หลังบ้าน check data
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setMaritalStautses(res.data);  // ข้อมูลถูกต้อง setPrefixes จะ set ค่าไปที่ตัวแปร prefixes
                } else {
                    console.log(res.error); // ข้อมูลไม่ถูกต้อง จะแสดงค่า error ที่ console
                }
            });
    }

    const getSubDistrict = async () => {
        const apiUrl = "http://localhost:8080/subdistricts/districts/" + patientregisters.DistrictID;
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        };

        // หลังบ้านรับ request มา
        // หลังบ้าน check data
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setSubDistricts(res.data);  // ข้อมูลถูกต้อง setPrefixes จะ set ค่าไปที่ตัวแปร prefixes
                } else {
                    console.log(res.error); // ข้อมูลไม่ถูกต้อง จะแสดงค่า error ที่ console
                }
            });
    }

    const getDistrict = async () => {
        const apiUrl = "http://localhost:8080/districts/provinces/" + patientregisters.ProvinceID;
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        };

        // หลังบ้านรับ request มา
        // หลังบ้าน check data
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setDistricts(res.data);  // ข้อมูลถูกต้อง setPrefixes จะ set ค่าไปที่ตัวแปร prefixes
                } else {
                    console.log(res.error); // ข้อมูลไม่ถูกต้อง จะแสดงค่า error ที่ console
                }
            });
    }

    const getProvince = async () => {
        const apiUrl = "http://localhost:8080/provinces";
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        };

        // หลังบ้านรับ request มา
        // หลังบ้าน check data
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setProvinces(res.data);  // ข้อมูลถูกต้อง setPrefixes จะ set ค่าไปที่ตัวแปร prefixes
                } else {
                    console.log(res.error); // ข้อมูลไม่ถูกต้อง จะแสดงค่า error ที่ console
                }
            });
    }

    const getPostcode = async () => {
        const apiUrl = "http://localhost:8080/subdistrict/" + patientregisters.SubDistrictID;
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        };

        // หลังบ้านรับ request มา
        // หลังบ้าน check data
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setPostcodes(res.data.PostCode);  // ข้อมูลถูกต้อง setPrefixes จะ set ค่าไปที่ตัวแปร prefixes
                } else {
                    console.log(res.error); // ข้อมูลไม่ถูกต้อง จะแสดงค่า error ที่ console
                }
            });
        console.log(postcodes);
    }

    const getPatientRegister = async (id: string) => {
        const apiUrl = `http://localhost:8080/patientregister/${id}`;
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

    function submit() {

        // ตัวแปร data เป็นตัวรับข้อมูลจากตัวแปร user เพื่อส่งไปหลังบ้าน
        let data: any = {
            FirstName: patientregisters.FirstName ?? "",
            LastName: patientregisters.LastName ?? "",
            Age: typeof patientregisters.Age === "string" ? parseInt(patientregisters.Age) : patientregisters.Age,
            IdentificationNumber: patientregisters.IdentificationNumber ?? "",
            BirthDay: patientregisters.BirthDay ?? new Date(),
            Mobile: patientregisters.Mobile ?? "",
            Occupation: patientregisters.Occupation ?? "",
            Address: patientregisters.Address ?? "",

            EmployeeID: employees.ID,
            PrefixID: typeof patientregisters.PrefixID === "string" ? parseInt(patientregisters.PrefixID) : patientregisters.PrefixID,
            GenderID: typeof patientregisters.GenderID === "string" ? parseInt(patientregisters.GenderID) : patientregisters.GenderID,
            NationalityID: typeof patientregisters.NationalityID === "string" ? parseInt(patientregisters.NationalityID) : patientregisters.NationalityID,
            ReligionID: typeof patientregisters.ReligionID === "string" ? parseInt(patientregisters.ReligionID) : patientregisters.ReligionID,
            BloodTypeID: typeof patientregisters.BloodTypeID === "string" ? parseInt(patientregisters.BloodTypeID) : patientregisters.BloodTypeID,
            MaritalStatusID: typeof patientregisters.MaritalStatusID === "string" ? parseInt(patientregisters.MaritalStatusID) : patientregisters.MaritalStatusID,
            SubDistrictID: typeof patientregisters.SubDistrictID === "string" ? parseInt(patientregisters.SubDistrictID) : patientregisters.SubDistrictID,
            DistrictID: typeof patientregisters.DistrictID === "string" ? parseInt(patientregisters.DistrictID) : patientregisters.DistrictID,
            ProvinceID: typeof patientregisters.ProvinceID === "string" ? parseInt(patientregisters.ProvinceID) : patientregisters.ProvinceID,

        };
        if (params.id) {
            data["ID"] = parseInt(params.id);
        }

        console.log(data);

        // หน้าบ้าน จะใช้ JSON สื่อสารกันกับ หลังบ้าน
        // หน้าบ้านจะแนบ header(content-type) และ body(app-json) เพื่อติดต่อไปยังหลังงบ้านที่ method POST
        const apiUrl = "http://localhost:8080/patientregisters";
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
                    setMessages("Successfully!");
                    window.location.href = "/patient";
                    // loginRegisted();      // เป็นการ login เข้าระบบแบบ auto
                } else {
                    setError(true);       // ข้อมูลไม่ถูกต้อง แสดง pop up การทำงานไม่สำเร็จ
                    setMessages("Fail! " + res.error);
                    console.log(res.error); // ข้อมูลไม่ถูกต้อง จะแสดงค่า error ที่ console
                }
            });
    }

    // เรียกใช้ฟังก์ชันเหล่านี้ ขณะกำลังสร้าง user
    // หากไม่มี [] จะเรียกใช้ function พวกนี้ตลอดเวลา
    // หากมี [] จะเรียกใช้ function พวกนี้แค่ครั้งเดียว
    // หากมี [var] จะเรียกใช้ตามเงือนไขเฉพาะ function ที่มีการเปลี่ยนแปลง
    useEffect(() => {
        // getEmployee();
        // getPrefix();
        // getGender();
        // getNationality();
        // getReligion();
        // getBloodType();
        // getMaritalStatus();
        // getSubDistrict();
        // getDistrict();
        // getProvince();
        // getPostcode();
        if (params.id) {
            getPatientRegister(params.id)
        }
    }, []);
    useEffect(() => {
        getEmployee();
        getPrefix();
        getGender();
        getNationality();
        getReligion();
        getBloodType();
        getMaritalStatus();
        getSubDistrict();
        getDistrict();
        getProvince();
        getPostcode();
    }, [patientregisters]);

    console.log(patientregisters);

    return (
        <Container maxWidth="md">
            <Snackbar
                open={success}
                autoHideDuration={5000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={handleClose} severity="success">
                    {messages}
                </Alert>
            </Snackbar>
            <Snackbar open={error}
                autoHideDuration={6000} 
                onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {messages}
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
                                    Create User
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Divider />
                <Grid container spacing={2} sx={{ padding: 2 }}>
                    <Grid item xs={4}>
                        <p>Prefix</p>
                        <FormControl fullWidth>
                            <InputLabel>Prefix</InputLabel>
                            <Select
                                id="PrefixID"
                                title="PrefixID"
                                inputProps={{
                                    name: "PrefixID"
                                }}
                                value={patientregisters.PrefixID || 0}
                                onChange={handleSelectChange}
                                native
                                autoFocus
                            >
                                <option key={0} value={0}></option>
                                {prefixes.map((item: PrefixesInterface) => (
                                    <option key={item.ID} value={item.ID}>{item.Name}</option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <p>First Name</p>
                        <FormControl fullWidth>
                            <TextField id="FirstName"
                                value={patientregisters.FirstName}
                                onChange={handleInputChange}
                                label="FirstName"
                                variant="outlined" />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <p>Last Name</p>
                        <FormControl fullWidth>
                            <TextField id="LastName"
                                value={patientregisters.LastName}
                                onChange={handleInputChange}
                                label="LastName"
                                variant="outlined" />
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ padding: 2 }}>
                    <Grid item xs={4}>
                        <p>Gender</p>
                        <FormControl fullWidth>
                            <InputLabel>Gender</InputLabel>
                            <Select
                                id="GenderID"
                                title="GenderID"
                                inputProps={{
                                    name: "GenderID"
                                }}
                                value={patientregisters.GenderID || 0}
                                onChange={handleSelectChange}
                                native
                                autoFocus
                            >
                                <option key={0} value={0}></option>
                                {genders.map((item: GendersInterface) => (
                                    <option key={item.ID} value={item.ID}>{item.Name}</option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <p>Age</p>
                        <TextField
                            id="Age"
                            variant="outlined"
                            type="number"
                            size="medium"
                            // InputProps={{ inputProps:  }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={patientregisters.Age || ""}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <p>Identification Number</p>
                        <FormControl fullWidth>
                            <TextField id="IdentificationNumber"
                                value={patientregisters.IdentificationNumber}
                                onChange={handleInputChange}
                                label="IdentificationNumber"
                                variant="outlined" />
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ padding: 2 }}>
                    <Grid item xs={4}>
                        <p>Birth Day</p>
                        <FormControl fullWidth variant="outlined">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    value={patientregisters.BirthDay || new Date()}
                                    onChange={(newValue) => {
                                        setPatientRegisters({ ...patientregisters, BirthDay: newValue });
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <p>Blood Type</p>
                        <FormControl fullWidth>
                            <InputLabel>BloodType</InputLabel>
                            <Select
                                id="BloodTypeID"
                                title="BloodTypeID"
                                inputProps={{
                                    name: "BloodTypeID"
                                }}
                                value={patientregisters.BloodTypeID || 0}
                                onChange={handleSelectChange}
                                native
                                autoFocus
                            >
                                <option key={0} value={0}></option>
                                {bloodtypes.map((item: BloodTypesInterface) => (
                                    <option key={item.ID} value={item.ID}>{item.Name}</option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <p>Occupation</p>
                        <FormControl fullWidth>
                            <TextField id="Occupation"
                                value={patientregisters.Occupation}
                                onChange={handleInputChange}
                                label="Occupation"
                                variant="outlined" />
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ padding: 2 }}>
                    <Grid item xs={4}>
                        <p>Nationality</p>
                        <FormControl fullWidth>
                            <InputLabel>Nationality</InputLabel>
                            <Select
                                id="NationalityID"
                                title="NationalityID"
                                inputProps={{
                                    name: "NationalityID"
                                }}
                                value={patientregisters.NationalityID || 0}
                                onChange={handleSelectChange}
                                native
                                autoFocus
                            >
                                <option key={0} value={0}></option>
                                {nationalities.map((item: NationalitiesInterface) => (
                                    <option key={item.ID} value={item.ID}>{item.Name}</option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <p>Religion</p>
                        <FormControl fullWidth>
                            <InputLabel>Religion</InputLabel>
                            <Select
                                id="ReligionID"
                                title="ReligionID"
                                inputProps={{
                                    name: "ReligionID"
                                }}
                                value={patientregisters.ReligionID || 0}
                                onChange={handleSelectChange}
                                native
                                autoFocus
                            >
                                <option key={0} value={0}></option>
                                {religions.map((item: ReligionsInterface) => (
                                    <option key={item.ID} value={item.ID}>{item.Name}</option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <p>Marital Status</p>
                        <FormControl fullWidth>
                            <InputLabel>MaritalStatus</InputLabel>
                            <Select
                                id="MaritalStatusID"
                                title="MaritalStatusID"
                                inputProps={{
                                    name: "MaritalStatusID"
                                }}
                                value={patientregisters.MaritalStatusID || 0}
                                onChange={handleSelectChange}
                                native
                                autoFocus
                            >
                                <option key={0} value={0}></option>
                                {maritalstatuses.map((item: MaritalStatusesInterface) => (
                                    <option key={item.ID} value={item.ID}>{item.Name}</option>
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
                            <Grid item xs={3} >
                                <AccountCircleSharpIcon fontSize="large" color="primary" />
                            </Grid>
                            <Grid item xs={9}>
                                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                    Patient Contact
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Divider />
                <Grid container spacing={2} sx={{ padding: 2 }}>
                    <Grid item xs={4}>
                        <p>Mobile</p>
                        <FormControl fullWidth>
                            <TextField id="Mobile"
                                value={patientregisters.Mobile}
                                onChange={handleInputChange}
                                label="Mobile"
                                variant="outlined" />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <p>Address</p>
                        <FormControl fullWidth>
                            <TextField id="Address"
                                value={patientregisters.Address}
                                onChange={handleInputChange}
                                label="Address"
                                variant="outlined" />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <p>Province</p>
                        <FormControl fullWidth>
                            <InputLabel>Province</InputLabel>
                            <Select
                                id="ProvinceID"
                                title="ProvinceID"
                                inputProps={{
                                    name: "ProvinceID"
                                }}
                                value={patientregisters.ProvinceID || 0}
                                onChange={handleSelectChange}
                                native
                                autoFocus
                            >
                                <option key={0} value={0}></option>
                                {provinces.map((item: ProvincesInterface) => (
                                    <option key={item.ID} value={item.ID}>{item.Name}</option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ padding: 2 }}>
                    <Grid item xs={4}>
                        <p>District</p>
                        <FormControl fullWidth>
                            <InputLabel>District</InputLabel>
                            <Select
                                id="DistrictID"
                                title="DistrictID"
                                inputProps={{
                                    name: "DistrictID"
                                }}
                                value={patientregisters.DistrictID || 0}
                                onChange={handleSelectChange}
                                native
                                autoFocus
                            >
                                <option key={0} value={0}></option>
                                {districts.map((item: DistrictsInterface) => (
                                    <option key={item.ID} value={item.ID}>{item.Name}</option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <p>Sub-District</p>
                        <FormControl fullWidth>
                            <InputLabel>SubDistrict</InputLabel>
                            <Select
                                id="SubDistrictID"
                                title="SubDistrictID"
                                inputProps={{
                                    name: "SubDistrictID"
                                }}
                                value={patientregisters.SubDistrictID || 0}
                                onChange={handleSelectChange}
                                native
                                autoFocus
                            >
                                <option key={0} value={0}></option>
                                {subdistricts.map((item: SubDistrictsInterface) => (
                                    <option key={item.ID} value={item.ID}>{item.Name}</option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <p>Post Code</p>
                        <FormControl fullWidth>
                            <TextField id="PostCode"
                                disabled
                                label="PostCode"
                                value={`${postcodes}`}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </Paper>
            <Divider />
            <Paper>
                <Box display="flex" sx={{ marginTop: 2, }}>
                    <Box sx={{ paddingX: 2, paddingY: 1 }}>
                        <Grid container spacing={2} sx={{ paddingX: 20 }}>
                            <Grid item xs={3} >
                                <AccountCircleSharpIcon fontSize="large" color="primary" />
                            </Grid>
                            <Grid item xs={9}>
                                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                    Recorder
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Divider />
                <Grid container spacing={2} sx={{ padding: 2 }}>
                    <Grid item xs={4}>
                        <p>Employee</p>
                        <FormControl fullWidth>
                            <TextField id="Employee"
                                disabled
                                label="Employee"
                                value={`${employees.FirstName} ${employees.LastName}`}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </Paper>
            <Paper>
                <Grid container spacing={2}>
                    <Grid item xs={4} sx={{ textAlign: 'right', marginTop: 2, paddingX: 4, paddingY: 1, marginBottom: 2 }}>
                        <Button
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
export default PatientRegisterCreate;