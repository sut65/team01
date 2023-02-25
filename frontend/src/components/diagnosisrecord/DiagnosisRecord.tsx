import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import MuiAlert  from "@mui/material/Alert";
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Typography, AlertProps } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { DiagnosisRecordsInterface } from "../../models/IDiagnosisRecord/IDiagnosisRecord";
import { GetDiagnosisRecord } from "../../services/HttpClientService";
import moment from "moment";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
function DiagnosisRecord() {
    const [diagnosisRecord, setDiagnosisRecord] = useState<DiagnosisRecordsInterface[]>([])
    const [open, setOpen] = React.useState<boolean[]>([]);
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

    function getPatientFullName(params: GridValueGetterParams) {
        return `${params.row.HistorySheet.PatientRegister.FirstName || ''} ${params.row.HistorySheet.PatientRegister.LastName || ''}`
    }

    function getDoctorFullName(params: GridValueGetterParams) {
        return `${params.row.Doctor.Title.Name || ''}${params.row.Doctor.FirstName || ''} ${params.row.Doctor.LastName || ''}`
    }

    const getDiagnosisRecord = async () => {
        let res = await GetDiagnosisRecord();
        if (res) {
            setDiagnosisRecord(res);
        }
    };

    const deleteDiagnosisRecord = async (id: number) => {
        const apiUrl = `http://localhost:8080/diagnosisrecords/${id}`;
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
        getDiagnosisRecord();
    }, []);

    const columns: GridColDef[] = [
        {
            field: "Actions",
            type: "action",
            width: 80,
            renderCell: (params) => {
              return (
                <React.Fragment>
                  <IconButton size="small" component={RouterLink} to={`/diagnosisrecordcreate/${params.row.ID}`}>
                    <EditIcon color="success" fontSize="small"></EditIcon>
                  </IconButton>
                  <IconButton size="small" onClick={() => handleOpen(params.row.ID)}>
                    <DeleteIcon color="error" fontSize="small"></DeleteIcon>
                  </IconButton>
                  <Dialog open={checkOpen(params.row.ID)} onClose={() => handleCloseDialog(params.row.ID)}>
                    <DialogTitle>ยืนยันลบข้อมูล</DialogTitle>
                    <DialogContent>คุณต้องการลบข้อมูลการวินิฉัยของ '{ params.row.HistorySheet.PatientRegister.FirstName + " " + params.row.HistorySheet.PatientRegister.LastName }' หรือไม่?</DialogContent>
                    <DialogActions>
                      <Button onClick={() => handleCloseDialog(params.row.ID)}>ยกเลิก</Button>
                      <Button onClick={() => deleteDiagnosisRecord(params.row.ID)}>ตกลง</Button>
                    </DialogActions>
                  </Dialog>
                </React.Fragment>
              )
            }
        },
        { field: "ID", headerName: "No.", width: 50 },
        {   field: "Doctor",
            headerName: "แพทย์ผู้ตรวจ",
            width: 190,
            valueGetter: getDoctorFullName,
        },
        {
            field: "Patient",
            headerName: "ผู้ป่วย",
            width: 170,
            valueGetter: getPatientFullName,
        },
        {
            field: "Examination",
            headerName: "การวินิจฉัย",
            width: 200,
            valueGetter: (params) => params.row.Examination,
        },
        {
            field: "Disease",
            headerName: "วินิจฉัยโรค",
            width: 200,
            valueGetter: (params) => params.row.Disease.Name,
        },
        {   field: "MedicalCertificate", headerName: "ใบรับรองแพทย์", width: 120,
            renderCell : params => {
                if (params.row.MedicalCertificate === true) {
                    return <div>รับ</div>
                } return <div>ไม่รับ</div>
            },
        },
        {   field: "Date", headerName: "Date", width: 140,
            valueFormatter: (params) => moment(params?.value).format("DD/MM/YYYY"),
        },
    ];

    return (
        <div>
            <Container maxWidth="lg">
                <Box display="flex" sx={{ marginTop: 2 }}>
                    <Typography
                        component="h2"
                        variant="h6"
                        color="primary"
                        gutterBottom
                    >
                        รายการผลวินิจฉัย
                    </Typography>
                </Box>
                <Box>
                    <Button
                     component={RouterLink}
                     to="/diagnosis_records/create"
                     variant="contained"
                     color="primary">
                        บันทึกผลการวินิจฉัย
                    </Button>
                </Box>
                <div style={{ height: 400 , width: "100%", marginTop: "20px"}}>
                    <DataGrid
                        rows={diagnosisRecord}
                        getRowId={(row: any) => row.ID}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                </div>
            </Container>
        </div>
    )
}

export default DiagnosisRecord;
