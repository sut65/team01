import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { PaymentsInterface, PaymentTypesInterface } from "../../models/IPayment";
import { MedicineRecordsInterface } from "../../models/IMedicineRecord";
import { EmployeesInterface } from "../../models/IEmployee";
import { PatientRightsInterface } from "../../models/IPatientRight";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Button from "@mui/material/Button";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
// import moment from "moment";
import { GetMedicineRecord } from "../../services/HttpClientServiceMedicineRecord";
import { GetPatientRight } from "../../services/HttpClientServicePatientRight";
import { GetPaymentType, GetEmployee } from "../../services/HttpClientServicePayment";
// import { GetPayment } from "../../services/HttpClientServicePayment";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function PaymentCreate() {
  const [cashiers, setEmployee] = React.useState<EmployeesInterface>();
  const [paymenttypes, setPaymentType] = React.useState<PaymentTypesInterface[]>([]);
  const [patientrights, setPatientRight] = React.useState<PatientRightsInterface[]>([]);
  const [medicinerecords, setMedicineRecord] = React.useState<MedicineRecordsInterface[]>([]);
  // const [payments, setPayment] = React.useState<PaymentsInterface[]>([]);
  const [payments, setPayment] = React.useState<Partial<PaymentsInterface>>(
    { PatientRightID: 0, PaymentTypeID: 0, PaymentTime: new Date(), Total: 0, });
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };
  // Select Data From formcontrol
  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof payments;
    console.log("handleChage")
    console.log(event.target.value)
    sumTotalPrice()
    // if(name === "MedicineRecordID" ){
    //   getMedicineRecord();
    // }
    setPayment({
      ...payments,
      [name]: event.target.value,
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof payments;
    const { value } = event.target;
    setPayment({ ...payments, [id]: value });
  };
  // const handleSelectChange = (event: SelectChangeEvent<number>) => {
  //   const name = event.target.name as keyof typeof payments;
  //   setPayment({ ...payments, [name]: event.target.value });
  // };



  const getPaymentType = async () => {
    let res = await GetPaymentType()
    if (res) {
      setPaymentType(res)
      console.log(paymenttypes)
    }
  }
  const getPatientRight = async () => {
    let res = await GetPatientRight()
    if (res) {
      setPatientRight(res)
      console.log(patientrights)
    }
  }
  const getMedicineRecord = async () => {
    let res = await GetMedicineRecord()
    if (res) {
      setMedicineRecord(res)
      console.log(medicinerecords,"jawooo")
    }
  }
  const getEmployee = async (ID: string | null) => {
    let res = await GetEmployee()
    if (res) {
      setEmployee(res)
    }
  }

  const sumTotalPrice = () => {
    let MedPrice =
      medicinerecords.find(b => b.ID === payments.MedicineRecordID)//?.TreatmentRecord.Medicine?.Price ?? 0;
    let PatientRightPrice = patientrights.find(b => b.ID === payments.PatientRightID)//?.Discount ?? 0;
    // if(!MedPrice ) return 0
    // setPayment({ ...payments, Total: MedPrice - PatientRightPrice });
    console.log(MedPrice, "haloooo")
    console.log(PatientRightPrice, "halo")
  };
  

  const convertType = (data: string | number | undefined | null | Date) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit() {
    if (payments.MedicineRecordID == 0) {
      setError(true)
      setErrorMessage("กรุณาเลือกชื่อ - นามสกุล")
    }
    else if (payments.PatientRightID == 0) {
      setError(true)
      setErrorMessage("กรุณาเลือกสิทธิการรักษา")
    }
    else if (payments.PaymentTypeID == 0) {
      setError(true)
      setErrorMessage("กรุณาเลือกประเภทการจ่ายเงิน")
    }
    else {
      setError(false)
      let data = {
        MedicineRecordID: convertType(payments.MedicineRecordID),
        PatientRightID: convertType(payments.PatientRightID),
        CashierID: cashiers?.ID,
        PaymentTypeID: convertType(payments.PaymentTypeID),
        PaymentTime: payments.PaymentTime,
        Total: payments.Total,
      };

      const apiUrl = `http://localhost:8080/createpayment`;
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      fetch(apiUrl, requestOptions)
        .then((response) => response.json())
        .then((res) => {
          console.log(res);
          if (res.data) {
            setSuccess(true);
          } else {
            setError(true);
            if (res.error == "Total cannot be zero") {
              setErrorMessage("กรุณาเลือกรายการใหม่")
            }
            else if (res.error == "The data recorder should be a Cashier") {
              setErrorMessage("ผู้บันทึกข้อมูลต้องเป็นเจ้าหน้าที่การเงินเท่านั้น")
            }
            else if (res.error == "MedTime must be in the present") {
              setErrorMessage("กรุณาเลือกวันและเวลาปัจจุบัน")
            }

            else {
              setErrorMessage(res.error);
            }
            console.log(res.error);
          }
        });
    }

  }
  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    const name = event.target.name as keyof typeof payments;
    setPayment({ ...payments, [name]: event.target.value });
  };

  console.log("Hello")
  console.log(medicinerecords)

  useEffect(() => {
    getPaymentType();
    getPatientRight();
    getMedicineRecord();
    getEmployee(localStorage.getItem("id"));

  }, []);
  useEffect(() => {
    sumTotalPrice();
  }, [payments.MedicineRecord?.TreatmentRecordID, payments.PatientRightID]);


  return (
    <Container sx={{ marginTop: 2 }}>
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar
        open={error}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
        </Alert>
      </Snackbar>
      <Paper>
        <Box
          display="flex"
          sx={{
            marginTop: 4,
          }}
        >
          <Box sx={{ paddingX: 2, paddingY: 2 }}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              บันทึกการชำระเงิน
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} sx={{ padding: 2 }}>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ชื่อ - นามสกุล</p>
              <Select
                native
                value={payments.MedicineRecordID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "MedicineRecordID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกชื่อ - นามสกุล
                </option>
                {medicinerecords.map((item: MedicineRecordsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.TreatmentRecord?.DiagnosisRecord?.HistorySheet?.PatientRegister?.FirstName} {item.TreatmentRecord?.DiagnosisRecord?.HistorySheet?.PatientRegister?.LastName}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>สิทธิการรักษา</p>
              <Select
                native
                value={payments.PatientRightID + ""}
                onChange={handleChange}

                inputProps={{
                  name: "PatientRightID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกสิทธิการรักษา
                </option>
                {patientrights.map((item: PatientRightsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.PatientType.Typename}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ประเภทการชำระเงิน</p>
              <Select
                native
                value={payments.PaymentTypeID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "PaymentTypeID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกประเภทการชำระเงิน
                </option>
                {paymenttypes.map((item: PaymentTypesInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Type}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <p>เจ้าหน้าที่การเงิน</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="FirstName"
                disabled
                variant="outlined"
                type="string"
                size="medium"
                value={cashiers?.FirstName + " " + cashiers?.LastName}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <p>รายการชำระเงิน</p>
            <TableContainer component={Paper} sx={{ marginTop: 4 }}>
              <Table sx={{ miinWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" width="10%">ลำดับ</TableCell>
                    <TableCell align="center" width="10%">รายการชำระเงิน</TableCell>
                    <TableCell align="center" width="10%">ราคา</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {medicinerecords.map((row: MedicineRecordsInterface, index) => {
                    sumTotalPrice()
                    if (payments.MedicineRecordID == row.ID)
                      return (
                        <TableRow key={index}>
                          <TableCell align="center">{row.TreatmentRecordID}</TableCell>
                          <TableCell align="center">{medicinerecords.find(m => m.ID === row.TreatmentRecord.MedicineID)?.TreatmentRecord.Medicine?.Name}</TableCell>
                          <TableCell align="center">{medicinerecords.find(m => m.ID === row.TreatmentRecord.MedicineID)?.TreatmentRecord.Medicine?.Price}</TableCell>
                          {/* <TableCell width="5%"><IconButton size="small" onClick={() => removeFromItem(index)}><DeleteIcon /></IconButton></TableCell> */}

                        </TableRow>
                      )
                  })}

                </TableBody>
              </Table>
            </TableContainer>
          </Grid>




          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined">
              <p>วันที่และเวลา</p>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={payments.PaymentTime}
                  onChange={(newValue) => {
                    setPayment({
                      ...payments,
                      PaymentTime: newValue ? newValue : new Date(),
                    });
                  }}

                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <TextField disabled id="Total" value={0} fullWidth />
          </Grid>

          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/payments"
              variant="contained"
              color="inherit"
            >
              กลับ
            </Button>
            <Button
              style={{ float: "right" }}
              onClick={submit}
              variant="contained"
              color="primary"
            >
              บันทึก
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}