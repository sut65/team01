import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
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
import { HistorySheetsInterface } from "../../models/IHistorySheet/IHistorySheet";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function HistorySheets() {

  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  // ประกาศตัวแปร users และ setUsers สำหรับเก็บค่าจาก UsersInterface
  // setUsers เป็นตัว set ค่าจาก UsersInterface เข้าไปที่ตัวแปร users
  const [historysheets, setHistorySheets] = React.useState<HistorySheetsInterface[]>([]);
  const [open, setOpen] = React.useState<boolean[]>([]);

  const calculateBMI = (weight: number, height: number) => {
    let heightM = (height / 100);
    return weight / (heightM * heightM);
  }

  const getHistorySheets = async () => {
    const apiUrl = "http://localhost:8080/historysheets";
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
          let resData = res.data.map((item: any) => {
            return {
              ...item,
              BMI: calculateBMI(item.Weight, item.Height),
            }
          });
          console.log(resData);
          setHistorySheets(resData);  // ข้อมูลถูกต้อง หลังบ้านจะส่งข้อมูลมาตามที่ขอ
        }
        else {
          console.log(res.error);  // ข้อมูลไม่ถูกต้อง จะแสดงค่า error ที่ console เช่น token หรือ ข้อมูลไม่ถูกต้อง ก็จะแสดงค่าของข้อมูลตัวนั้น
        }
      });

    console.log(historysheets);
  };

  const deleteHistorySheet = async (id: number) => {
    const apiUrl = `http://localhost:8080/historysheets/${id}`;
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
            <IconButton size="small" component={RouterLink} to={`/historysheetcreate/${params.row.ID}`}>
              <EditIcon color="success" fontSize="small"></EditIcon>
            </IconButton>
            <IconButton size="small" onClick={() => handleOpen(params.row.ID)}>
              <DeleteIcon color="error" fontSize="small"></DeleteIcon>
            </IconButton>
            <Dialog open={checkOpen(params.row.ID)} onClose={() => handleCloseDialog(params.row.ID)}>
              <DialogTitle>ยืนยันลบข้อมูล</DialogTitle>
              <DialogContent>คุณต้องการลบข้อมูลการซักประวัติคนไข้ '{ params.row.PatientRegister.FirstName + " " + params.row.PatientRegister.LastName }' (ID: { params.row.ID }) ใช่ไหม?</DialogContent>
              <DialogActions>
                <Button onClick={() => handleCloseDialog(params.row.ID)}>ยกเลิก</Button>
                <Button onClick={() => deleteHistorySheet(params.row.ID)}>ตกลง</Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        )
      }
    },
    { field: "ID", headerName: "ID", width: 96, },
    { field: "Weight", headerName: "Weight", width: 96 },
    { field: "Height", headerName: "Height", width: 96 },
    { field: "BMI", headerName: "BMI", width: 96, valueFormatter: params => (params.value.toFixed(2)) },
    { field: "Temperature", headerName: "Temperature", width: 96 },
    { field: "SystolicBloodPressure", headerName: "SystolicBloodPressure", width: 96 },
    { field: "DiastolicBloodPressure", headerName: "DiastolicBloodPressure", width: 96 },
    { field: "HeartRate", headerName: "HeartRate", width: 96 },
    { field: "RespiratoryRate", headerName: "RespiratoryRate", width: 96 },
    { field: "OxygenSaturation", headerName: "OxygenSaturation", width: 96 },
    { field: "DrugAllergySymtom", headerName: "DrugAllergySymtom", width: 96 },
    { field: "PatientSymtom", headerName: "PatientSymtom", width: 96 },
    { field: "PatientRegister ID", headerName: "Patient", width: 96, valueGetter: (params) => { return params.row.PatientRegister.FirstName + " " + params.row.PatientRegister.LastName } },
    { field: "Nurse ID", headerName: "Nurse", width: 96, valueGetter: (params) => { return params.row.Employee.FirstName + " " + params.row.Employee.LastName } },
    { field: "DrugAllergy ID", headerName: "Drug Allergy", width: 96, valueGetter: (params) => { return params.row.DrugAllergy.Name } },

  ];

  // เมื่อมีการ log out ฟังก์ชันนี้จะทำการ clear token ใน local storage และเปลี่ยน path ไปที่หน้า log in
  const logOut = () => {
    localStorage.clear();
    window.location.href = "/login";
  }

  useEffect(() => {
    getHistorySheets();
  }, []);

  return (
    <div>
      <Container maxWidth="lg">
        <Snackbar
          open={success}
          autoHideDuration={5000}
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
              ข้อมูลการซักประวัติ
            </Typography>
          </Box>
          <Box>
            <Button
              variant="outlined"
              color="error"
              onClick={logOut}
              sx={{ marginX: 1 }}
            >
              ลงชื่อออก
            </Button>
          </Box>
        </Box>
        <div style={{ height: 400, width: "100%", marginTop: '20px' }}>
          <DataGrid
            rows={historysheets}
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
export default HistorySheets;