import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { PatientRegistersInterface } from "../../models/IPatientRegister/IPatientRegister";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function PatientRegisters() {

  // ประกาศตัวแปร users และ setUsers สำหรับเก็บค่าจาก UsersInterface
  // setUsers เป็นตัว set ค่าจาก UsersInterface เข้าไปที่ตัวแปร users
  const [patientregisters, setPatientRegisters] = React.useState<PatientRegistersInterface[]>([]);

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

  const getPatientRegisters = async () => {
    const apiUrl = "http://localhost:8080/patientregisters";
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`    // login เพื่อเอาข้อมูลให้หลังบ้าน check เป็นการระบุตัวตน
      },
    };

    // หลังบ้าน check token และ ข้อมูล
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.data) {
          setPatientRegisters(res.data);  // ข้อมูลถูกต้อง หลังบ้านจะส่งข้อมูลมาตามที่ขอ
        }
        else {
          console.log(res.error);  // ข้อมูลไม่ถูกต้อง จะแสดงค่า error ที่ console เช่น token หรือ ข้อมูลไม่ถูกต้อง ก็จะแสดงค่าของข้อมูลตัวนั้น
        }
      });

    console.log(patientregisters);
  };

  const deletePatientRegister = async (id: number) => {
    const apiUrl = `http://localhost:8080/patientregisters/${id}`;
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.data) {
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

    // await getHistorySheets();
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

  const columns: GridColDef[] = [
    {
      field: "Actions",
      type: "action",
      width: 100,
      renderCell: (params) => {
        return (
          <React.Fragment>
            <IconButton size="small" component={RouterLink} to={`/patientcreate/${params.row.ID}`}>
              <EditIcon color="success" fontSize="small"></EditIcon>
            </IconButton>
            <IconButton size="small" onClick={() => handleOpen(params.row.ID)}>
              <DeleteIcon color="error" fontSize="small"></DeleteIcon>
            </IconButton>
            <Dialog open={checkOpen(params.row.ID)} onClose={() => handleCloseDialog(params.row.ID)}>
              <DialogTitle>Confirm Delete</DialogTitle>
              <DialogContent>Do you want to delete patient of '{ params.row.FirstName + " " + params.row.LastName }' (ID: {params.row.ID}) ?</DialogContent>
              <DialogActions>
                <Button onClick={() => handleCloseDialog(params.row.ID)}>Cancel</Button>
                <Button onClick={() => deletePatientRegister(params.row.ID)}>OK</Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        )
      }
    },
    { field: "ID", headerName: "ID", width: 96, },
    { field: "Prefix ID", headerName: "Prefix", width: 96, valueGetter: (params) => { return params.row.Prefix.Name } },
    { field: "FirstName", headerName: "First name", width: 96 },
    { field: "LastName", headerName: "Last name", width: 96 },
    { field: "Age", headerName: "Age", width: 96 },
    { field: "Occupation", headerName: "Occupation", width: 96 },
    { field: "Address", headerName: "Address", width: 96 },
    { field: "BirthDay", headerName: "BirthDay", width: 96 },
    { field: "Gender ID", headerName: "Gender", width: 96, valueGetter: (params) => { return params.row.Gender.Name } },
    { field: "IdentificationNumber", headerName: "Identification", width: 96 },
    { field: "Mobile", headerName: "Mobile", width: 96 },
    { field: "PostCode ID", headerName: "PostCode", width: 96, valueGetter: (params) => { return params.row.SubDistrict.PostCode } },
    { field: "Religion ID", headerName: "Religion", width: 96, valueGetter: (params) => { return params.row.Religion.Name } },
    { field: "BloodType ID", headerName: "BloodType", width: 96, valueGetter: (params) => { return params.row.BloodType.Name } },
    { field: "MaritalStatus ID", headerName: "MaritalStatus", width: 96, valueGetter: (params) => { return params.row.MaritalStatus.Name } },
    { field: "Nationality ID", headerName: "Nationality", width: 96, valueGetter: (params) => { return params.row.Nationality.Name } },
    { field: "Province ID", headerName: "Province", width: 96, valueGetter: (params) => { return params.row.Province.Name } },
    { field: "District ID", headerName: "District", width: 96, valueGetter: (params) => { return params.row.District.Name } },
    { field: "SubDistrict ID", headerName: "SubDistrict", width: 96, valueGetter: (params) => { return params.row.SubDistrict.Name } },
    { field: "Employee", headerName: "Employee", width: 96, valueGetter: (params) => { return params.row.Employee.FirstName + " " + params.row.Employee.LastName } },
  ];

  // เมื่อมีการ log out ฟังก์ชันนี้จะทำการ clear token ใน local storage และเปลี่ยน path ไปที่หน้า log in
  const logOut = () => {
    localStorage.clear();
    window.location.href = "/login";
  }

  useEffect(() => {
    getPatientRegisters();
  }, []);

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
              color="primary"
              gutterBottom
            >
              Users
            </Typography>
          </Box>
          <Box>
            <Button
              variant="outlined"
              color="error"
              onClick={logOut}
              sx={{ marginX: 1 }}
            >
              Log out
            </Button>
          </Box>
        </Box>
        <div style={{ height: 400, width: "100%", marginTop: '20px' }}>
          <DataGrid
            rows={patientregisters}
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
export default PatientRegisters;