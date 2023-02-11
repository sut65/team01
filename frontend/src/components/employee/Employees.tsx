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
import { EmployeesInterface } from "../models/IEmployee";
import moment from "moment";

function Employees() {
  const [employees, setEmployee] = React.useState<EmployeesInterface[]>([]);
  const getEmployee = async () => {
    const apiUrl = "http://localhost:8080/employees";
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
          setEmployee(res.data);
        } else {
          console.log("else");
        }
      });
  };
  console.log("data", employees)

  useEffect(() => {
    getEmployee();
  }, []);

  return (
    <div>
      <Container maxWidth="lg"
        sx={{ marginTop: 2 }}
      >
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography 
              component="h2"
              variant="h6"
              color="#4db6ac"
              gutterBottom
            >
              ข้อมูลบุคลากร
            </Typography>
          </Box>

          <Box>
            <Button style={{background: '#4db6ac' }}
              component={RouterLink}
              to="/createemployee"
              variant="contained"
              color="primary"
            >
              บันทึกข้อมูลบุคลากร
            </Button>
          </Box>
        </Box>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" width="10%" >
                  เลขประจำตัวประชาชน
                </TableCell>
                <TableCell align="center" width="auto">
                  คำนำหน้า
                </TableCell>
                <TableCell align="center" width="12%">
                  ชื่อ-นามสกุล
                </TableCell>
                <TableCell align="center" width="auto">
                  ตำแหน่ง
                </TableCell>
                <TableCell align="center" width="auto">
                  เบอร์โทรศัพท์
                </TableCell>
                <TableCell align="center" width="auto">
                  อีเมล
                </TableCell>
                <TableCell align="center" width="auto">
                  รหัสผ่าน
                </TableCell>
                <TableCell align="center" width="auto">
                  เพศ
                </TableCell>
                <TableCell align="center" width="auto">
                  เงินเดือน
                </TableCell>
                <TableCell align="center" width="auto">
                  วันเดือนปีเกิด
                </TableCell>
                <TableCell align="center" width="auto">
                  ผู้ดูแลระบบ
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((item: EmployeesInterface) => (
                <TableRow key={item.ID}>
                  <TableCell align="center">{item.IDCard}</TableCell>
                  <TableCell align="center">{item.Title.Name}</TableCell>
                  <TableCell align="center">{item.FirstName} {item.LastName}</TableCell>
                  <TableCell align="center">{item.Role.Name}</TableCell>
                  <TableCell align="center">{item.PhoneNumber}</TableCell>
                  <TableCell align="center">{item.Email}</TableCell>
                  <TableCell align="center">{item.Password}</TableCell>
                  <TableCell align="center">{item.Gender.Name}</TableCell>
                  <TableCell align="center">{item.Salary}</TableCell>
                  <TableCell align="center">{moment(item.Birthday).format("DD/MM/YYYY")}</TableCell>
                  <TableCell align="center">{item.Admin.FirstName} {item.Admin.LastName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  )
}
export default Employees; 