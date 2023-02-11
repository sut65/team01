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
import { DataGrid, GridColDef } from "@mui/x-data-grid";


// import moment from "moment";
import { PaymentsInterface, PaymentTypesInterface } from "../../models/IPayment";
import { GetPayment } from "../../services/HttpClientServicePayment";

function Bills() {
  const [payment, setPayment] = React.useState<PaymentsInterface[]>([]);

  const getPayment = async () => {
    let res = await GetPayment();
    if (res) {
      setPayment(res);
    } 
  };

  useEffect(() => {
    getPayment();
  }, []);

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ลำดับ", width: 50 },
    {
      field: "Patient",
      headerName: "ชื่อ",
      width: 250,
      valueGetter: (params) => params.row.MedicineRecord.TreatmentRecord.DiagnosisRecord.HistorySheet.PatientRegister.FirstName,
    },
    {
      field: "PatientRight",
      headerName: "สิทธิการรักษา",
      width: 150,
      valueGetter: (params) => params.row.PatientRight.PatientType.TypeName,
    },
    {
      field: "PaymentType",
      headerName: "ประเภทการชำระเงิน",
      width: 150,
      valueGetter: (params) => params.row.PaymentType,
    },
    // {
    //   field: "MedicineRecord",
    //   headerName: "รายการจ่ายยา",
    //   width: 150,
    //   valueFormatter: (params) => params.value.Value,
    // },
    // {
    //   field: "Price",
    //   headerName: "ราคารวม",
    //   width: 150,
    //   valueFormatter: (params) => params.value.Value,
    // },
    {
      field: "Cashier",
      headerName: "เจ้าหน้าที่การเงิน",
      width: 150,
      valueGetter: (params) => params.row.Cashier.FirstName,
    },
    { field: "PaymentTime", headerName: "วันที่และเวลา", width: 250 },
  ];

  return (
    <div>
      <Container maxWidth="md">
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

export default Bills;