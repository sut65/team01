import React, { useEffect } from "react";
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
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { QueuingManagementsInterface } from "../../models/IQueuingManagement/IQueuingManagements";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function QueuingManagements() {

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
  const [queuingmanagements, setQueuingManagements] = React.useState<QueuingManagementsInterface[]>([]);
  const [open, setOpen] = React.useState<boolean[]>([]);


  const getQueuingManagements = async () => {
        const apiUrl = `http://localhost:8080/queuingManagement`;
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
              setQueuingManagements(res.data);
            } else {
              console.log("else");
            }
          });
      };

  const DeleteQueuingManagement = async (id: number) => {
    const apiUrl = `http://localhost:8080/queuingManagements/${id}`;
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
            {/* <IconButton size="small" component={RouterLink} to={`/create/${params.row.ID}`}>
              <EditIcon color="success" fontSize="small"></EditIcon>
            </IconButton> */}
            <IconButton size="small" onClick={() => handleOpen(params.row.ID)}>
              <DeleteIcon color="error" fontSize="small"></DeleteIcon>
            </IconButton>
            <Dialog open={checkOpen(params.row.ID)} onClose={() => handleCloseDialog(params.row.ID)}>
              <DialogTitle>ยืนยันลบข้อมูล</DialogTitle>
              <DialogContent>คุณต้องการลบการจัดการคิวการรักษาที่ ({ params.row.ID }) ใช่ไหม?</DialogContent>
              <DialogActions>
                <Button onClick={() => handleCloseDialog(params.row.ID)}>ยกเลิก</Button>
                <Button onClick={() => DeleteQueuingManagement(params.row.ID)}>ตกลง</Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        )
      }
    },

    { field: "ID", headerName: "ID", width: 50 },
    { field: "QueuingManagements.HistorySheet.ID ", headerName: "Historysheet", width: 96, valueGetter: (params) => { return params.row.HistorySheetID}},
    { field: "QueuingManagements.ServicePoint.Name", headerName: "จุดบริการ", width: 96, valueGetter: (params) => { return params.row.ServicePoint.Name}},
    { field: "QueuingManagements.ServiceChannel.Name", headerName: "ช่องบริการ", width: 120, valueGetter: (params) => { return params.row.ServiceChannel.Name} },
    { field: "QueuingManagements.MedicalAction.Action", headerName: "การดำเนินการ", width: 180, valueGetter: (params) => { return params.row.MedicalAction.Action} },
    // { field: "QueuingManagements.Note", headerName: "บันทึกเพิ่มเติม", width: 150, valueGetter: (params) => { return params.row.Note} },
    { field: "QueuingManagements.TimeEnd", headerName: "เวลา", width: 180, valueGetter: (params) => { return params.row.TimeEnd}},

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
    getQueuingManagements();
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
            rows={queuingmanagements}
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
export default QueuingManagements;