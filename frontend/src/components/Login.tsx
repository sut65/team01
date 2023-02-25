import { Alert, Avatar, Box, Button, Container, CssBaseline, Grid, Snackbar, Tab, TextField, Typography } from "@mui/material";
import { error } from "console";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import React from "react";
import { useState } from "react";
import { SigninInterface } from "../models/ISignin";
import { createTheme, ThemeProvider } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
// import { SigninInterface } from "../models/ISignin/ISignin";
// import { LoginInterface } from "../models/ILogin";


const theme = createTheme({
  palette:{
    primary:{
    light: '#80cbc4',
    main: '#4db6ac',
    dark: '#26a69a',
    contrastText: '#fff',
  },
  }
})
export default function LogIn() {

  // ประกาศตัวแปร login และ setlogin สำหรับเก็บค่า email และ password
  // setlogin เป็นตัว set ค่า email และ password เข้าไปที่ตัวแปร login
  const [login, setLogin] = useState<Partial<SigninInterface>>({
    Email: "", Password: ""
  });
  const [loginUser, setLoginUser] = useState<Partial<SigninInterface>>({
    Email: "", Password: ""
  });

  // ประกาศตัวแปร value สำหรับการเปลี่ยนค่าใน tab
  const [value, setValue] = useState("1");

  // ควบคุม pop up snackbar
  // success เป็น true จะแสดง pop up กรณีทำงานสำเร็จ
  // error เป็น true จะแสดง pop up กรณีทำงานไม่สำเร็จ
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

  // handleclose จะเป็นตัวจัดการ pop up ให้หยุดการทำงานหลังจากที่แสดง pop up ในแต่ละกรณี 
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    if (success === true) {
      window.location.href = "/create"; // เมื่อ success เป็น true จะทำการเปลี่ยน path ไปที่หน้า create
    }
    setSuccess(false);
    setError(false);
  };

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
    setLogin({});
  }
  // setlogin ทำการเก็บ email และ password จาก textfield ไปเก็บที่ตัวแปร login
  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof login;
    const { value } = event.target;
    setLogin({ ...login, [id]: value });
  };
  const handleInputUserChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof loginUser;
    const { value } = event.target;
    setLoginUser({ ...loginUser, [id]: value });
  };

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  }


  // ที่หน้า Login
  // หน้าบ้าน จะใช้ JSON สื่อสารกันกับ หลังบ้าน
  // หน้าบ้านจะแนบ header(content-type) และ body(app-json) เพื่อติดต่อไปยังหลังงบ้านที่ method POST
  function Submit() {
    const apiUrl = "http://localhost:8080/login/admin";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(login),
    };

    // หลังบ้านรับ request มา
    // หลังบ้าน check data
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSuccess(true); // ข้อมูลถูกต้อง แสดง pop up การทำงานสำเร็จ
          localStorage.setItem("token", res.data.token);  // setItem จะ set ค่า token ไปที่ Local storage
          localStorage.setItem("id", res.data.id);    // setItem จะ set ค่า id ไปที่ Local storage
          localStorage.setItem("role", res.data.role);    // setItem จะ set ค่า role ไปที่ Local storage
          window.location.href = "/employees";   // เปลี่ยน path ไปที่หน้า employee
        } else {
          setError(true); // ถ้า login ไม่สำเร็จ จะแสดง pop up กรณีทำงานไม่สำเร็จ
        }
      });
  }

  function SubmitUser() {
    const apiUrl = "http://localhost:8080/login/employee";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginUser),
    };

    // หลังบ้านรับ request มา
    // หลังบ้าน check data
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSuccess(true); // ข้อมูลถูกต้อง แสดง pop up การทำงานสำเร็จ
          localStorage.setItem("token", res.data.token);  // setItem จะ set ค่า token ไปที่ Local storage
          localStorage.setItem("id", res.data.id);    // setItem จะ set ค่า id ไปที่ Local storage
          localStorage.setItem("role", res.data.role);    // setItem จะ set ค่า role ไปที่ Local storage
          window.location.href = "/patients";   // เปลี่ยน path ไปที่หน้า create
        } else {
          setError(true); // ถ้า login ไม่สำเร็จ จะแสดง pop up กรณีทำงานไม่สำเร็จ
        }
      });
  }

  console.log("admin:", login);   // แสดงข้อมูลการ Login
  console.log("employee:", loginUser);

  return (
    <Container component="main" maxWidth="xs">
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          เข้าสู่ระบบสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          เข้าสู่ระบบไม่สำเร็จ
        </Alert>
      </Snackbar>
      <Grid container spacing={2} sx={{ marginTop: 4, paddingX: 7 }}>
        <Avatar sx={{ margin: 1,marginLeft: 17, backgroundcolor: "#009688" }}>
          <Box textAlign='center' ><LockIcon /></Box>

        </Avatar>
        <Box sx={{ width: '100%' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="แอดมิน" value="0" />
                <Tab label="บุคลากร" value="1" />
              </TabList>
            </Box>
            <TabPanel value="0">
              <form style={{ width: "100%", marginTop: 1 }} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="Email"
                  label="อีเมล"
                  name="Email"
                  autoComplete="email"
                  autoFocus
                  value={login.Email || ""}
                  onChange={handleInputChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="Password"
                  label="รหัสผ่าน"
                  type="password"
                  id="Password"
                  autoComplete="current-password"
                  value={login.Password || ""}
                  onChange={handleInputChange}
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 3, marginBottom: 0 }}
                  onClick={Submit}
                  style={{ background: '#4db6ac' }}
                >
                  เข้าสู่ระบบ
                </Button>
              </form>
            </TabPanel>

            <TabPanel value="1">

              <form style={{ width: "100%", marginTop: 1 }} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="Email"
                  label="อีเมล"
                  name="Email"
                  autoComplete="email"
                  autoFocus
                  value={loginUser.Email || ""}
                  onChange={handleInputUserChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="Password"
                  label="รหัสผ่าน"
                  type="password"
                  id="Password"
                  autoComplete="current-password"
                  value={loginUser.Password || ""}
                  onChange={handleInputUserChange}
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 3, marginBottom: 0 }}
                  onClick={SubmitUser}
                  style={{ background: '#4db6ac' }}
                >
                  เข้าสู่ระบบ
                </Button>
              </form>
            </TabPanel>
            
          </TabContext>
          
        </Box>
      </Grid>
    </Container>
  );
}