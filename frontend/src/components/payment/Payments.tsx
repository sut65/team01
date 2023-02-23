import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
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
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import  moment from 'moment'; 
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";




// import moment from "moment";
import { PaymentsInterface, PaymentTypesInterface } from "../../models/IPayment";
import { GetPayment } from "../../services/HttpClientServicePayment";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

function Payments() {
  const [payment, setPayment] = React.useState<PaymentsInterface[]>([]);
  const [open, setOpen] = React.useState<boolean[]>([]);

  const getPayment = async () => {
    let res = await GetPayment();
    if (res) {
      setPayment(res);
    } 
  };
  console.log(payment);
  
  const removePayment= (id: any) => {
    console.log(id);
    const apiUrl = "http://localhost:8080";
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
      },
    };

    fetch(`${apiUrl}/payments/`+id, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setPayment(res.data);
        } else {
          console.log("else");
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
    getPayment();
  }, []);

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ลำดับ", width: 50 },
    {
      field: "Patient",
      headerName: "ชื่อ - นามสกุล",
      width: 250,
      valueGetter: (params) => params.row.MedicineRecord.TreatmentRecord.DiagnosisRecord.HistorySheet.PatientRegister.FirstName + "  " + params.row.MedicineRecord.TreatmentRecord.DiagnosisRecord.HistorySheet.PatientRegister.LastName ,
    },
    {
      field: "PatientRight",
      headerName: "สิทธิการรักษา",
      width: 150,
      valueGetter: (params) => params.row.PatientRight.Name,
    },
    {
      field: "PaymentType",
      headerName: "ประเภทการชำระเงิน",
      width: 150,
      valueGetter: (params) => params.row.PaymentType.Type,
    },
    {
      field: "Total",
      headerName: "ราคารวม",
      width: 150,
      valueGetter: (params) => params.row.Total,
    },
   
    {
      field: "Cashier",
      headerName: "เจ้าหน้าที่การเงิน",
      width: 150,
      valueGetter: (params) => params.row.Employee.FirstName,
    },
    { 
      field: "PaymentTime", 
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
        <IconButton size="small" component={RouterLink} to={`/payment/create/${params.row.ID}`}>
              <EditIcon color="success" fontSize="small"></EditIcon>
            </IconButton>
            <IconButton size="small" onClick={() => handleOpen(params.row.ID)}>
              <DeleteIcon color="error" fontSize="small"></DeleteIcon>
            </IconButton>
            <Dialog open={checkOpen(params.row.ID)} onClose={() => handleCloseDialog(params.row.ID)}>
              <DialogTitle>Confirm Delete</DialogTitle>
              <DialogContent>Do you want to delete payment of '{ params.row.MedicineRecord.TreatmentRecord.DiagnosisRecord.HistorySheet.PatientRegister.FirstName + "  " + params.row.MedicineRecord.TreatmentRecord.DiagnosisRecord.HistorySheet.PatientRegister.LastName }' (ID: { params.row.ID }) ?</DialogContent>
              <DialogActions>
                <Button onClick={() => handleCloseDialog(params.row.ID)}>Cancel</Button>
                <Button onClick={() => removePayment(params.row.ID)}>OK</Button>
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
              ข้อมูลการบันทึกการชำระเงิน
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/payment/create"
              variant="contained"
              color="primary"
            >
              สร้างข้อมูล
            </Button>
          </Box>
        </Box>
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={payment}
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

export default Payments;