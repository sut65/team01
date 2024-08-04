import React, { useEffect } from 'react';
import { Link as RouterLink, useParams } from "react-router-dom";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { AdminsInterface, EmployeesInterface, TitlesInterface, RolesInterface, GendersInterface } from "../../models/IEmployee/IEmployee";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';

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

function EmployeeCreate() {

  const params = useParams();
  const [employee, setEmployee] = React.useState<Partial<EmployeesInterface>>({}); //useState
  const [admin, setAdmin] = React.useState<AdminsInterface>();
  const [title, setTitle] = React.useState<TitlesInterface[]>([]);
  const [role, setRole] = React.useState<RolesInterface[]>([]);
  const [gender, setGender] = React.useState<GendersInterface[]>([]);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date());
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false);
    setError(false);
  };

  const handleInputChange = (event: React.ChangeEvent<{ id?: string; value: any }>) => {
    const id = event.target.id as keyof typeof employee;
    const { value } = event.target;
    setEmployee({ ...employee, [id]: value });
  };

  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    const name = event.target.name as keyof typeof employee;
    setEmployee({ ...employee, [name]: event.target.value });
  };
  

  const handleDateChange = (date: Date | null) => {
    console.log(date);
    setSelectedDate(date);
  };

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

  const getTitle = async () => {
    const apiUrl = "http://localhost:8080/titles";
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
          setTitle(res.data)
        } else {
          console.log("else")
        }
      });
    console.log(title)
  }

  const getRole = async () => {
    const apiUrl = "http://localhost:8080/roles";
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
          setRole(res.data)
        } else {
          console.log("else")
        }
      });
    console.log(role)
  }

  const getGender = async () => {
    const apiUrl = "http://localhost:8080/genders";
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
          setGender(res.data)
        } else {
          console.log("else")
        }
      });
    console.log(gender)
  }

  //   const apiUrl = `http://localhost:8080/employees`;
  //   const requestOptions = {
  //       method: "GET",
  //       headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${localStorage.getItem("token")}`
  //       }
  //   };

  //   fetch(apiUrl, requestOptions)
  //       .then((response) => response.json())
  //       .then((res) => {
  //           if (res.data) {
  //               setEmployee(res.data);
  //           } else {
  //               console.log(res.error);
  //           }
  //       });
  // console.log(employee)

const getEmployeeByID = async (id: string) => {
  const apiUrl = `http://localhost:8080/employee/${id}`;
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
            setEmployee(res.data);
            setSelectedDate(res.data.BirthDay);
              // return res.data;
              
          } else {
            console.log(res.error);
          }
      });
    
}

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit() {

    let data: any = {
      AdminID: convertType(admin?.ID),
      IDCard: employee.IDCard ?? "",
      TitleID: convertType(employee.TitleID ),
      FirstName: employee.FirstName ?? "",
      LastName: employee.LastName ?? "",
      RoleID: convertType(employee.RoleID),
      PhoneNumber: employee.PhoneNumber ?? "",
      Email: employee.Email ?? "",
      Password: employee.Password ?? "",
      GenderID: convertType(employee.GenderID),
      Salary: convertType(employee.Salary),
      Birthday: selectedDate,
    };
    if (params.id) {
      data["ID"] = parseInt(params.id);
  }
  console.log(data);

    const apiUrl = "http://localhost:8080/employee";
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
          setTimeout(() => { 
          window.location.href = "/employees";
          }, 2000)
        } else {
          console.log("บันทึกข้อมูลไม่สำเร็จ")
          setError(true);
          if (res.error.includes("Identification Number cannot be blank")) {
            setErrorMessage("กรุณาเลขประตัวประชาชน")
          } else if (res.error.includes("Title not found")) {
            setErrorMessage("กรุณาเลือกคำนำหน้า")
          } else if (res.error.includes("First Name cannot be blank")) {
            setErrorMessage("กรุณากรอกชื่อ")
          } else if (res.error.includes("Last Name cannot be blank")) {
            setErrorMessage("กรุณากรอกนามสกุล")
          } else if (res.error.includes("Role not found")) {
            setErrorMessage("กรุณาเลือกตำแหน่ง")
          } else if (res.error.includes("Phone Number cannot be blank")) {
            setErrorMessage("กรุณากรอกเบอร์โทรศัพท์")
          } else if (res.error.includes("Email cannot be blank")) {
            setErrorMessage("กรุณากรอกอีเมล")
          } else if (res.error.includes("Password cannot be blank")) {
            setErrorMessage("กรุณากรอกรหัสผ่าน")
          } else if (res.error.includes("Gender not found")) {
            setErrorMessage("กรุณาเลือกเพศ")
          } else if (res.error.includes("Salary must not be zero")) {
            setErrorMessage("เงินเดือนต้องไม่เป็น 0")
          } else if (res.error.includes("Salary must not be negative")) {
            setErrorMessage("เงินเดือนต้องไม่ติดลบ")
          } else if (res.error.includes("Birthday: The following validator is invalid or can't be applied to the field: \"past\"")) {
            setErrorMessage("กรุณากรอกวันเกิดให้เป็นอดีต")
          } else if (res.error.includes("Email does not validate as email")) {
            setErrorMessage("กรุณากรอกอีเมลให้ถูกต้อง")
          } else if (res.error.includes("Phone Number must be invalid")) {
            setErrorMessage("กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง")
          } else if (res.error.includes("IDCard does not validate")) {
            setErrorMessage("กรุณากรอกเลขประจำตัวประชาชนให้ถูกต้อง")
          } else if (res.error.includes("UNIQUE constraint failed: employees.email")) {
            setErrorMessage("อีเมลนี้ถูกบันทึกแล้ว")
          } else if (res.error.includes("UNIQUE constraint failed: employees.id_card")) {
            setErrorMessage("เลขประจำตัวประชาชนนี้ถูกบันทึกแล้ว")
          } else if (res.error.includes("UNIQUE constraint failed: employees.phone_number")) {
            setErrorMessage("เบอร์โทรศัพท์นี้ถูกบันทึกแล้ว")
          }else {
            setErrorMessage(res.error);
          }
        }
      });
  }
  useEffect(() => {
    console.log(params.id);
    if (params.id){
      getEmployeeByID(params.id)
    }
  }, []);
  useEffect(() => {
    getAdmin();
    getRole();
    getTitle();
    getGender();
  }, [employee]);

  console.log(employee)

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

        <Grid container spacing={3} sx={{ padding: 2 }}>
          <Grid item xs={4}>
            <p style={{ color: "#006A7D", fontSize: "10" }}>ผู้ดูแลระบบ</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Admin"
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
          <Grid item xs={8}>
            <p style={{ color: "#006A7D", fontSize: "10" }}>เลขประจำตัวประชาชน</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="IDCard" //ระบุว่าบันทึกที่ไหน
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกเลขประจำตัวประชาชน"
                value={employee?.IDCard || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          </ThemeProvider>

          <ThemeProvider theme={theme}>
          <Grid item xs={3}>
            <FormControl fullWidth variant="outlined">
              <p style={{ color: "#006A7D", fontSize: "10" }}>คำนำหน้า</p>
              <Select
                native
                value={employee.TitleID || 0}
                onChange={handleSelectChange}
                inputProps={{ name: "TitleID" }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกคำนำหน้า
                </option>
                {title.map((item: TitlesInterface) => (
                  <option key={item.Name} value={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          </ThemeProvider>
          
          <ThemeProvider theme={theme}>
          <Grid item xs={4.5}>
            <p style={{ color: "#006A7D", fontSize: "10" }}>ชื่อ</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="FirstName" //ระบุว่าบันทึกที่ไหน
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกชื่อ"
                value={employee?.FirstName || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          </ThemeProvider>

          <ThemeProvider theme={theme}>
          <Grid item xs={4.5}>
            <p style={{ color: "#006A7D", fontSize: "10" }}>นามสกุล</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="LastName" //ระบุว่าบันทึกที่ไหน
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกนามสกุล"
                value={employee?.LastName || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          </ThemeProvider>

          <ThemeProvider theme={theme}>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p style={{ color: "#006A7D", fontSize: "10" }}>ตำแหน่ง</p>
              <Select
                native
                value={employee.RoleID || 0}
                onChange={handleSelectChange}
                inputProps={{ name: "RoleID" }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกตำแหน่ง
                </option>
                {role.map((item: RolesInterface) => (
                  <option key={item.Name} value={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          </ThemeProvider>

          <ThemeProvider theme={theme}>
          <Grid item xs={6}>
            <p style={{ color: "#006A7D", fontSize: "10" }}>เบอร์โทรศัพท์</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="PhoneNumber" //ระบุว่าบันทึกที่ไหน
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกเบอร์โทรศัพท์"
                value={employee?.PhoneNumber || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          </ThemeProvider>

          <ThemeProvider theme={theme}>
          <Grid item xs={6}>
            <p style={{ color: "#006A7D", fontSize: "10" }}>อีเมล</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Email" //ระบุว่าบันทึกที่ไหน
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกอีเมล"
                value={employee?.Email || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          </ThemeProvider>

          <ThemeProvider theme={theme}>
          <Grid item xs={6}>
            <p style={{ color: "#006A7D", fontSize: "10" }}>รหัสผ่าน</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Password" //ระบุว่าบันทึกที่ไหน
                variant="outlined"
                type="password"
                size="medium"
                placeholder="กรุณากรอกรหัสผ่าน"
                value={employee?.Password || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          </ThemeProvider>

          <ThemeProvider theme={theme}>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p style={{ color: "#006A7D", fontSize: "10" }}>เพศ</p>
              <Select
                native
                value={employee.GenderID || 0}
                onChange={handleSelectChange}
                inputProps={{ name: "GenderID" }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกเพศ
                </option>
                {gender.map((item: GendersInterface) => (
                  <option key={item.Name} value={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          </ThemeProvider>   

          <ThemeProvider theme={theme}>       
          <Grid item xs={6}>
            <p style={{ color: "#006A7D", fontSize: "10" }}>เงินเดือน</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Salary" //ระบุว่าบันทึกที่ไหน
                variant="outlined"
                type="int"
                size="medium"
                placeholder="กรุณากรอกเงินเดือน"
                value={employee?.Salary || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          </ThemeProvider> 

          <ThemeProvider theme={theme}>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <p style={{ color: "#006A7D", fontSize: "10" }}>วันเดือนปีเกิด</p>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Birthday"
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

          <Grid item xs={12}>
            <Button style={{ float: "left", background: '#4db6ac' }} component={RouterLink} to="/employees" variant="contained" >
              กลับ
            </Button>

            <Button
              style={{ float: "right", background: '#4db6ac' }}
              onClick={submit}
              variant="contained"
              // color="primary"
            >
              บันทึก
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default EmployeeCreate;