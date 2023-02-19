import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from '@mui/material/Box';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Container from '@mui/material/Container';
import moment from "moment";
import { WorkloadsInterface } from "../../models/IWorkload/IWorkload";
import { Divider } from "@mui/material";

function Workloads() {
    const [workloads, setWorkload] = React.useState<WorkloadsInterface[]>([]);
    const getWorkload = async () => {
        const apiUrl = "http://localhost:8080/workloads";
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
                    setWorkload(res.data);
                } else {
                    console.log("else");
                }
            });
    };

    useEffect(() => {
        getWorkload();
    }, []);

    return (
        <div>
            <Container maxWidth="lg"
                sx={{ marginTop: 2 }}
            >
                <Paper>
                <Box display="flex">
                    <Box flexGrow={1} sx={{ paddingX: 2, paddingY: 1}}>
                        <Typography
                            component="h2"
                            variant="h6"
                            color="#4db6ac"
                            gutterBottom
                        >
                            ภาระงานแพทย์
                        </Typography>
                    </Box>

                    <Box>
                        <Button
                            component={RouterLink}
                            to="/createworkload"
                            variant="contained"
                            color="primary"
                            style={{background: '#4db6ac' }}
                            sx={{marginTop:1,marginRight:1}}
                        >
                            บันทึกภาระงานแพทย์
                        </Button>
                    </Box>
                </Box>
                <Divider />
                
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" width="auto">
                                    แพทย์
                                </TableCell>
                                <TableCell align="center" width="auto">
                                    ห้องตรวจ
                                </TableCell>
                                <TableCell align="center" width="auto">
                                    สถานะแพทย์
                                </TableCell>
                                <TableCell align="center" width="auto">
                                    วันที่
                                </TableCell>
                                <TableCell align="center" width="auto">
                                    เวลาที่เริ่ม
                                </TableCell>
                                <TableCell align="center" width="auto">
                                    เวลาสิ้นสุด
                                </TableCell>
                                <TableCell align="center" width="auto">
                                    ผู้ดูแลระบบ
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {workloads.map((item: WorkloadsInterface) => (
                                <TableRow key={item.ID}>
                                    <TableCell align="center">{item.Employee.FirstName} {item.Employee.LastName}</TableCell>
                                    <TableCell align="center">{item.Room.Name}</TableCell>
                                    <TableCell align="center">{item.Status.Name}</TableCell>
                                    <TableCell align="center">{moment(item.Date).format("DD/MM/YYYY")}</TableCell>
                                    <TableCell align="center">{moment(item.StartTime).format("HH:mm น.")}</TableCell>
                                    <TableCell align="center">{moment(item.EndTime).format("HH:mm น.")}</TableCell>
                                    <TableCell align="center">{item.Admin.FirstName} {item.Admin.LastName}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                </Paper>
            </Container>
        </div>
    )
}
export default Workloads; 