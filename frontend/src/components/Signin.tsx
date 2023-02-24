import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Container from "@mui/material/Container";
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SigninInterface } from "../models/ISignin";

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

function SignIn() {
  const [signin, setSignin] = useState<Partial<SigninInterface>>({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [value, setValue] = React.useState("0");
  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
    setSignin({});
  }

  const loginadmin = () => {
    const apiUrl = "http://localhost:8080/login";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signin),
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSuccess(true);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("id", res.data.id);
          localStorage.setItem("role", "admin");
          window.location.href = "/";
        } else {
          setError(true);
        }
      });
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof signin;
    const { value } = event.target;
    setSignin({ ...signin, [id]: value });
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          เข้าสู่ระบบสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          อีเมลหรือรหัสผ่านไม่ถูกต้อง
        </Alert>
      </Snackbar>
      <CssBaseline />
      <div style={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        
        <Avatar sx={{ margin: 1, backgroundColor: "#009688" }}>
          <LockOutlinedIcon />
        </Avatar>
        
        <Typography component="h1" variant="h5" style={{fontSize: '1rem'}}>
          เข้าสู่ระบบ
        </Typography>

        <Box sx={{ width: '100%' }}>
          <TabContext value={value}>
          <ThemeProvider theme={theme}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="ผู้ดูแลระบบ" value="0" />
              </TabList>
            </Box>   
          </ThemeProvider>
            <TabPanel value="0">
              <form style={{ width: "100%", marginTop: 1 }} noValidate>
              <ThemeProvider theme={theme}>
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
                  value={signin.Email || ""}
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
                  value={signin.Password || ""}
                  onChange={handleInputChange}
                />
                
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 3, marginBottom: 0 }}
                  onClick={loginadmin}
                  style={{fontSize: '1rem'}}
                >
                  เข้าสู่ระบบ
                </Button>
                
              </ThemeProvider>
              </form>
            </TabPanel>
            
          </TabContext>
        </Box>
      </div>
    </Container>
  );
}

export default SignIn;