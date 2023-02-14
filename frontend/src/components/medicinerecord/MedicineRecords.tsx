import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { MedicineRecordsInterface } from "../../models/IMedicineRecord";
import { GetMedicineRecord } from "../../services/HttpClientServiceMedicineRecord";

function MedicineRecords() {
  const [medicinerecord, setMedicineRecords] = useState<MedicineRecordsInterface[]>([]);

  useEffect(() => {
    getMedicineRecords();
  }, []);

  const getMedicineRecords = async () => {
    let res = await GetMedicineRecord();
    if (res) {
      setMedicineRecords(res);
    } 
  };

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ลำดับ", width: 50 },
    {
      field: "Patient",
      headerName: "ชื่อ",
      width: 200,
      valueGetter: (params) => params.row.TreatmentRecord.DiagnosisRecord.HistorySheet.PatientRegister.FirstName,
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
      valueGetter: (params) => params.row.Pharmacist.FirstName,
    },
    {
      field: "Advicetext",
      headerName: "คำแนะนำ",
      width: 150,
    },
    
    { field: "MedTime", headerName: "วันที่และเวลา", width: 250 },
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