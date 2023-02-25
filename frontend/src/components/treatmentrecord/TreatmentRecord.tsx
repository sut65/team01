import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { TreatmentRecordsInterface } from "../../models/ITreatmentRecord/ITreatmentRecord";
import { GetTreatmentRecord } from "../../services/HttpClientService";
import moment from "moment";


function TreatmentRecord() {
    const [treatmentRecord, setTreatmentRecord] = useState<TreatmentRecordsInterface[]>([])
    const [openedit, setOpenEdit] = useState(false);
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
        return `${params.row.DiagnosisRecord.HistorySheet.PatientRegister.FirstName || ''} ${params.row.DiagnosisRecord.HistorySheet.PatientRegister.LastName || ''}`
    }

    function getDoctorFullName(params: GridValueGetterParams) {
        return `${params.row.Doctor.Title.Name || ''}${params.row.Doctor.FirstName || ''} ${params.row.Doctor.LastName || ''}`
    }

    const handleEdit = () => {
        setOpenEdit(true);
    }

    const getTreatmentRecord = async () => {
        let res = await GetTreatmentRecord();
        if (res) {
            setTreatmentRecord(res);
        }
    };

    const deleteTreatmentRecord = async (id: number) => {
        const apiUrl = `http://localhost:8080/treatmentrecords/${id}`;
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
        getTreatmentRecord();
    }, []);

    const columns: GridColDef[] = [
        {
            field: "Actions",
            type: "action",
            width: 80,
            renderCell: (params) => {
              return (
                <React.Fragment>
                  <IconButton size="small" component={RouterLink} to={`/treatmentrecordcreate/${params.row.ID}`}>
                    <EditIcon color="success" fontSize="small"></EditIcon>
                  </IconButton>
                  <IconButton size="small" onClick={() => handleOpen(params.row.ID)}>
                    <DeleteIcon color="error" fontSize="small"></DeleteIcon>
                  </IconButton>
                  <Dialog open={checkOpen(params.row.ID)} onClose={() => handleCloseDialog(params.row.ID)}>
                    <DialogTitle>ยืนยันลบข้อมูล</DialogTitle>
                    <DialogContent>คุณต้องการลบข้อมูลการรักษาของ '{ params.row.DiagnosisRecord.HistorySheet.PatientRegister.FirstName + " " + params.row.DiagnosisRecord.HistorySheet.PatientRegister.LastName }' หรือไม่?</DialogContent>
                    <DialogActions>
                      <Button onClick={() => handleCloseDialog(params.row.ID)}>ยกเลิก</Button>
                      <Button onClick={() => deleteTreatmentRecord(params.row.ID)}>ตกลง</Button>
                    </DialogActions>
                  </Dialog>
                </React.Fragment>
              )
            }
        },
        { field: "ID", headerName: "No.", width: 50 },
        {   field: "Doctor",
            headerName: "แพทย์ผู้บันทึก",
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
            field: "Treatment",
            headerName: "การรักษา",
            width: 200,
            valueGetter: (params) => params.row.Treatment,
        },
        {
            field: "ืNote",
            headerName: "หมายเหตุ",
            width: 200,
            valueGetter: (params) => params.row.Note,
        },
        // {   field: "Medicine", 
        //     headerName: "รายการยา", 
        //     width: 100,
        //     renderCell: () => (
        //         <div>
        //             &nbsp;
        //           <Button 
        //             onClick={handleEdit}
        //             variant="contained" 
        //             size="small" 
        //             startIcon={<SearchIcon />}
        //             color="success"> 
        //             แสดง
        //           </Button>
        //         </div>
        //       ),
        // },
        {   field: "Appointment", headerName: "การนัดหมาย", width: 120,
            renderCell : params => {
                if (params.row.Appointment === true) {
                    return <div>ใช่</div>
                } return <div>ไม่</div>
            },
        },
        {   field: "Date", headerName: "Date", width: 140,
            valueGetter: (params) => moment(params.row.Date).format("DD/MM/YYYY") 
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
                        gutterBottom>
                        รายการการรักษา
                    </Typography>
                </Box>
                <Box>
                    <Button
                        component={RouterLink}
                        to="/treatment_records/create"
                        variant="contained"
                        color="primary">
                        บันทึกการรักษา
                    </Button>
                </Box>
                <div style={{ height: 400 , width: "100%", marginTop: "20px"}}>
                    <DataGrid
                        rows={treatmentRecord}
                        getRowId={(row) => row.ID}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                </div>
            </Container>
        </div>
    )
}

export default TreatmentRecord;