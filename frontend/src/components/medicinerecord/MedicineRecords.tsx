import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import MuiAlert  from "@mui/material/Alert";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { MedicineRecordsInterface } from "../../models/IMedicineRecord/IMedicineRecord";
import { GetMedicineRecord } from "../../services/HttpClientServiceMedicineRecord";
import  moment from 'moment'; 
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import { Dialog, DialogTitle, DialogContent, DialogActions, AlertProps } from "@mui/material";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function MedicineRecords() {
  const [medicinerecord, setMedicineRecords] = useState<MedicineRecordsInterface[]>([]);
  const [open, setOpen] = React.useState<boolean[]>([]);


  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [message, setMessage] = React.useState("");
  

  const getMedicineRecords = async () => {
    let res = await GetMedicineRecord();
    if (res) {
      setMedicineRecords(res);
    } 
  };

  useEffect(() => {
    getMedicineRecords();
  }, []);

  const removeMedicineRecord= (id: number) => {
    console.log(id);
    const apiUrl = "http://localhost:8080";
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
      },
    };

    fetch(`${apiUrl}/medicinerecords/`+id, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setMedicineRecords(res.data);
          window.location.reload();

        } else {
          console.log("else");
        }
      });
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
    { field: "ID", headerName: "ลำดับ", width: 50 },
    {
      field: "Patient",
      headerName: "ชื่อ",
      width: 200,
      valueGetter: (params) => params.row.TreatmentRecord.DiagnosisRecord.HistorySheet.PatientRegister.FirstName + " " +params.row.TreatmentRecord.DiagnosisRecord.HistorySheet.PatientRegister.LastName ,
    },
    {
      field: "TreatmentRecord",
      headerName: "ข้อมูลการรักษา",
      width: 150,
      valueGetter: (params) => params.row.TreatmentRecord.Treatment,
    },
    {
      field: "StatusMed",
      headerName: "สถานะการจ่ายยา",
      width: 150,
      valueGetter: (params) => params.row.StatusMed.Status,
    },
    {
      field: "Pharmacist",
      headerName: "เภสัชกร",
      width: 150,
      valueGetter: (params) => params.row.Employee.FirstName,
    },
    {
      field: "Advicetext",
      headerName: "คำแนะนำ",
      width: 150,
    },
    { 
      field: "MedTime", 
      headerName: "วันที่และเวลา", 
      width: 250,
      valueFormatter: params => 
      moment(params?.value).format("DD/MM/YYYY hh:mm A"),
    
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: ( params ) => (
        <React.Fragment>
          <IconButton size="small" component={RouterLink} to={`/medicinerecord/create/${params.row.ID}`}>
                <EditIcon color="success" fontSize="small"></EditIcon>
              </IconButton>
              <IconButton size="small" onClick={() => handleOpen(params.row.ID)}>
                <DeleteIcon color="error" fontSize="small"></DeleteIcon>
          </IconButton>
          <Dialog open={checkOpen(params.row.ID)} onClose={() => handleCloseDialog(params.row.ID)}>
              <DialogTitle>Confirm Delete</DialogTitle>
              <DialogContent>Do you want to delete medicinerecord of '{ params.row.TreatmentRecord.DiagnosisRecord.HistorySheet.PatientRegister.FirstName + " " +params.row.TreatmentRecord.DiagnosisRecord.HistorySheet.PatientRegister.LastName }' (ID: { params.row.ID }) ?</DialogContent>
              <DialogActions>
                <Button onClick={() => handleCloseDialog(params.row.ID)}>Cancel</Button>
                <Button onClick={() => removeMedicineRecord(params.row.ID)}>OK</Button>
              </DialogActions>
            </Dialog>
              
        </React.Fragment>
        
      )
      },
  ];

  return (
    <div>
      <Container maxWidth="lg">
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
              ข้อมูลการบันทึกการจ่ายยาและเวชภัณฑ์
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/medicinerecord/create"
              variant="contained"
              color="primary"
            >
              สร้างข้อมูล
            </Button>
          </Box>
        </Box>
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={medicinerecord}
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

export default MedicineRecords;