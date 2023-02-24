import React, { useEffect } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Snackbar from "@mui/material/Snackbar";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import moment from "moment";
import { OutpatientScreeningsInterface } from "../../models/IOutpatientScreening/IOutpatientScreenings";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function OutpatientScreenings() {

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
  const [outpatientscreenings, setOutpatientScreenings] = React.useState<OutpatientScreeningsInterface[]>([]);
  const [open, setOpen] = React.useState<boolean[]>([]);


  const getOutpatientScreenings = async () => {
        const apiUrl = `http://localhost:8080/outpatientScreenings`;
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
                setOutpatientScreenings(res.data);
            } else {
              console.log("else");
            }
          });
      };

  const DeleteOutpatientScreening = async (id: number) => {
    const apiUrl = `http://localhost:8080/outpatientScreenings/${id}`;
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
    
    // await getQueuingManagements();
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
            <IconButton size="small" component={RouterLink} to={`/create/${params.row.ID}`}>
              <EditIcon color="success" fontSize="small"></EditIcon>
            </IconButton>
            <IconButton size="small" onClick={() => handleOpen(params.row.ID)}>
              <DeleteIcon color="error" fontSize="small"></DeleteIcon>
            </IconButton>
            <Dialog open={checkOpen(params.row.ID)} onClose={() => handleCloseDialog(params.row.ID)}>
              <DialogTitle>ยืนยันลบข้อมูล</DialogTitle>
              <DialogContent>คุณต้องการลบการคัดกรอง ({ params.row.ID }) ใช่ไหม?</DialogContent>
              <DialogActions>
                <Button onClick={() => handleCloseDialog(params.row.ID)}>ยกเลิก</Button>
                <Button onClick={() => DeleteOutpatientScreening(params.row.ID)}>ตกลง</Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        )
      }
    },

    { field: "ID", headerName: "ID", width: 50 },
    { field: "OutpatientScreenings.HistorySheet.ID", headerName: "Historysheet", width: 96, valueGetter: (params) => { return params.row.HistorySheetID}},
    { field: "OutpatientScreenings.EmergencyLevel.Level", headerName: "การประเมินระดับความเร่งด่วน", width: 96, valueGetter: (params) => { return params.row.EmergencyLevel.Level}},
    { field: "OutpatientScreenings.HighBloodPressureLevel.Level", headerName: "การประเมินระดับความดันโลหิตสูง", width: 120, valueGetter: (params) => { return params.row.HighBloodPressureLevel.Level} },
    { field: "OutpatientScreenings.DiabetesLevel.Level", headerName: "การประเมินระดับเบาหวาน", width: 180, valueGetter: (params) => { return params.row.DiabetesLevel.Level} },
    { field: "OutpatientScreenings.ObesityLevel.Level", headerName: "การประเมินระดับโรคอ้วน", width: 180, valueGetter: (params) => { return params.row.ObesityLevel.Level} },
    // { field: "QueuingManagements.Note", headerName: "บันทึกเพิ่มเติม", width: 150, valueGetter: (params) => { return params.row.Note} },
    { field: "OutpatientScreenings.TimeEnd", headerName: "เวลา", width: 180, valueGetter: (params) => { return params.row.TimeEnd}},

    // { field: "ID", headerName: "ID", width: 96, },
    // { field: "Weight", headerName: "Weight", width: 96 },
    // { field: "Height", headerName: "Height", width: 96 },
    // { field: "BMI", headerName: "BMI", width: 96, valueFormatter: params => (params.value.toFixed(2)) },
    // { field: "Temperature", headerName: "Temperature", width: 96 },
    // { field: "SystolicBloodPressure", headerName: "SystolicBloodPressure", width: 96 },
    // { field: "DiastolicBloodPressure", headerName: "DiastolicBloodPressure", width: 96 },
    // { field: "HeartRate", headerName: "HeartRate", width: 96 },
    // { field: "RespiratoryRate", headerName: "RespiratoryRate", width: 96 },
    // { field: "OxygenSaturation", headerName: "OxygenSaturation", width: 96 },
    // { field: "DrugAllergySymtom", headerName: "DrugAllergySymtom", width: 96 },
    // { field: "PatientSymtom", headerName: "PatientSymtom", width: 96 },
    // { field: "PatientRegister ID", headerName: "Patient", width: 96, valueGetter: (params) => { return params.row.PatientRegister.FirstName + " " + params.row.PatientRegister.LastName } },
    // { field: "Nurse ID", headerName: "Nurse", width: 96, valueGetter: (params) => { return params.row.Nurse.FirstName + " " + params.row.Nurse.LastName } },
    // { field: "DrugAllergy ID", headerName: "Drug Allergy", width: 96, valueGetter: (params) => { return params.row.DrugAllergy.Name } },

  ];

  // เมื่อมีการ log out ฟังก์ชันนี้จะทำการ clear token ใน local storage และเปลี่ยน path ไปที่หน้า log in


  useEffect(() => {
    getOutpatientScreenings();
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
              ข้อมูลการจัดการคิวการรักษา
            </Typography>
          </Box>
          <Box>
          </Box>
        </Box>
        <div style={{ height: 400, width: "100%", marginTop: '20px' }}>
          <DataGrid
            rows={outpatientscreenings}
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
export default OutpatientScreenings;