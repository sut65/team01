import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { EmployeesInterface } from "../../models/IEmployee/IEmployee";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from "moment";
import { Tooltip } from "@mui/material";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Employees() {
const [employees, setEmployees] = React.useState<EmployeesInterface[]>([]);
const [success, setSuccess] = React.useState(false);
const [error, setError] = React.useState(false);
const [message, setMessage] = React.useState("");
const [open, setOpen] = React.useState<boolean[]>([]);

const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const getEmployees = async () => {
    const apiUrl = "http://localhost:8080/employees";
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setEmployees(res.data)
        } else {
          console.log(res.error)
        }
      });
    console.log(employees);
  };

  const deleteEmployee = async (id: number) => {
    const apiUrl = "http://localhost:8080";
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
    };

    fetch(`${apiUrl}/employees/`+id, requestOptions)
    // fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setEmployees(res.data)
          setSuccess(true);
          setMessage("Delete Success");
          console.log(res.data);
        }
        else {
          setError(true);
          setMessage("Delete Error");
          console.log(res.error);
        }
      });

    window.location.reload();
    handleCloseDialog(id);
  }

  const checkOpen = (id: number): boolean => {
    return open[id] ? open[id] : false;
  }

  const handleOpen = (id: number) => {
    let openArr = [...open];
    openArr[id] = true;
    setOpen(openArr);
  };

  const handleCloseDialog = (id: number) => {
    let openArr = [...open];
    openArr[id] = false;
    setOpen(openArr);
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const columns: GridColDef[] = [
    { field: "IDCard", headerName: "เลขประจำตัวประชาชน", width: 150, },
    { field: "Title", headerName: "คำนำหน้า", width: 96, valueGetter: (params) => { return params.row.Title.Name}},
    { field: "FirstName", headerName: "ชื่อ", width: 96 },
    { field: "LastName", headerName: "นามสกุล", width: 96 },
    { field: "Role", headerName: "ตำแหน่ง", width: 96, valueGetter: (params) => { return params.row.Role.Name}},
    { field: "PhoneNumber", headerName: "เบอร์โทรศัพท์", width: 150 },
    { field: "Email", headerName: "อีเมล", width: 180 },
    { field: "Password", headerName: "รหัสผ่าน", width: 96 },
    { field: "Gender", headerName: "เพศ", width: 96,valueGetter: (params) => { return params.row.Gender.Name}},
    { field: "Salary", headerName: "เงินเดือน", width: 96 },
    { field: "Birthday", headerName: "วันเกิด", width: 120,valueFormatter: function (params) {return moment(params.value).format('D MMM YYYY');}, },
    { field: "Admin", headerName: "ผู้ดูแลระบบ", width: 150,valueGetter: (params) => { return params.row.Admin.FirstName + " " + params.row.Admin.LastName}},
    {
        field: "Actions",
        // type: "action",
        // width: 100,
        headerName: "Action",
        sortable: false,
        renderCell: (params) => {
          return (
            <React.Fragment>
            <Tooltip title="แก้ไข">
              <IconButton size="small" component={RouterLink} to={`/employeecreate/${params.row.ID}`}>
                <EditIcon color="success" fontSize="small"></EditIcon>
              </IconButton>
            </Tooltip>
            <Tooltip title="ลบ">
              <IconButton size="small" onClick={() => handleOpen(params.row.ID)}>
                <DeleteIcon color="error" fontSize="small"></DeleteIcon>
              </IconButton>
            </Tooltip>
              <Dialog open={checkOpen(params.row.ID)} onClose={() => handleCloseDialog(params.row.ID)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>คุณต้องการลบข้อมูลของ { params.row.FirstName + " " + params.row.LastName } ?</DialogContent>
                <DialogActions>
                  <Button onClick={() => handleCloseDialog(params.row.ID)}>Cancel</Button>
                  <Button onClick={() => deleteEmployee(params.row.ID)}>OK</Button>
                </DialogActions>
              </Dialog>
            </React.Fragment>
          )
        }
      }
  ];

  // เมื่อมีการ log out ฟังก์ชันนี้จะทำการ clear token ใน local storage และเปลี่ยน path ไปที่หน้า log in

  return (
    <div>
      <Container maxWidth="lg">
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
        <Box
          display="flex"
          sx={{
            marginTop: 2,
          }}
        >
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
            <Button
              style={{background: '#4db6ac'}}
              component={RouterLink}
              to="/employeecreate"
              variant="contained"
              color="primary"
              sx={{marginTop:1,marginRight:1}}
            >
              บันทึกข้อมูลบุคลากร
            </Button>
          </Box>
        </Box>
        <div style={{ height: 400, width: "100%", marginTop: '20px' }}>
          <DataGrid
            rows={employees}
            getRowId={(row) => row.ID}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </Container>
    </div>
  );
}
export default Employees;