import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {createTheme} from '@mui/material/styles';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { AppointmentInterface } from "../../models/IAppointment/IAppointment";
import LogIn from "../Login";
import moment from "moment";
import Chip from '@mui/material/Chip';
import AllInboxIcon from '@mui/icons-material/AllInbox';

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
  
function Appointments() {
    const [token, setToken] = React.useState<String>("");
    const [appointments, setAppointments] = React.useState<AppointmentInterface[]>([]);



    const getAppointments = async () => {
        const apiUrl = "http://localhost:8080/appointments";
        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                console.log(res.data);
                if (res.data) {
                    setAppointments(res.data);
                } else {
                    console.log("else");
                }
            });
    };

    useEffect(() => {
        getAppointments();
        const token = localStorage.getItem("token");
        if (token) {
            setToken(token);
        }
    }, []);

    if (!token) {
        return <LogIn/>;
    }


    return (

        <div>

            <Container maxWidth="md">
                <Box display="flex">
                    <Box flexGrow={1}>
                    <Chip
                    size="medium"
                    icon={<AllInboxIcon style={{ color: '#009688' }} />}
                    label={"ระบบบันทึกรายการนัดหมาย"}
                    variant="outlined"
                    style={{ backgroundColor: '#fff', fontSize: '1rem', color: '#009688' }}
                    />
                    </Box>
                    <Box>
                        <Button
                            component={RouterLink}
                            to="/CreateAppointment"
                            variant="contained"
                            color="primary"
                        >
                            บันทึกรายการนัดหมาย
                        </Button>
                    </Box>
                </Box>
                <p></p>
                <Paper>
                    <Box display="flex">
                        <Box flexGrow={1}>
                            <Typography
                                component="h2"
                                variant="h6"
                                color="primary"
                                gutterBottom
                            >
                                รายการนัดหมาย
                            </Typography>
                        </Box>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table caria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" width="15%" >
                                        ผู้ป่วย
                                    </TableCell>
                                    <TableCell align="center" width="20%">
                                        เเพทย์
                                    </TableCell>
                                    <TableCell align="center" width="10%">
                                        คลินิก
                                    </TableCell>
                                    <TableCell align="center" width="10%">
                                        หมายเลขห้องตรวจ
                                    </TableCell>
                                    <TableCell align="center" width="25%">
                                        วันเวลานัด
                                    </TableCell>
                                    <TableCell align="center" width="15%">
                                        หมายเหตุการนัด
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {appointments.map((item: AppointmentInterface) => (
                                    <TableRow key={item.ID}>
                                        <TableCell align="center">{item.PatientRegister.FirstName}{"  "}{item.PatientRegister.LastName}</TableCell>
                                        <TableCell align="center">{item.Employee.FirstName}{"  "}{item.Employee.LastName}</TableCell>
                                        <TableCell align="center">{item.Room.Name}</TableCell>
                                        <TableCell align="center">{item.RoomNumber}</TableCell>
                                        <TableCell align="center">{moment(item.AppointmentTime).format('D MMMM YYYY,HH:mm:ss')}</TableCell>
                                        <TableCell align="center">{item.Note}</TableCell>
                                    </TableRow>

                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>

            </Container>

        </div >
    );
}
export default Appointments;