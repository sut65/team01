import React, { useEffect } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
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
import moment from "moment";

import { QueuingManagementsInterface } from "../models/IQueuingManagements";
//import { QueuingManagementsInterface, QueuingManagementsQueuingManagementsetsInterface} from "../models/IQueuingManagements";

function QueuingManagements() {
  // ดึง HistorySheetId มาจาก url ตอนกดสั่งอาหาร ex. "localhost:3000/QueuingManagementscreate/2" จะได้ HistorySheetId = 2
  const { PatientRegisterId } = useParams();
  const [QueuingManagements, setQueuingManagements] = React.useState<QueuingManagementsInterface[]>([]);

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

  useEffect(() => {
    getQueuingManagements();
  }, []);

  return (
    <div>
      <Container sx={{ marginTop: 2 }} maxWidth="lg">
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              รายการการจัดการคิวการรักษา
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/QueuingManagementsHistory"
              variant="contained"
              color="inherit"
            >
              กลับ
            </Button>
            &nbsp;
            <Button
              component={RouterLink}
              //to={"/history" + PatientRegisterId}
              to={"/create"}
              variant="contained"
              color="primary"
            >
              การจัดลำดับ
            </Button>
          </Box>
        </Box>

        <TableContainer component={Paper} sx={{ marginTop: 4 }}>
          <Table sx={{ miinWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.main' }}>
                <TableCell align="left" width="15%" sx={{ fontWeight: 'bold' }}>
                  ID
                </TableCell>
                <TableCell align="center" width="15%" sx={{ fontWeight: 'bold' }}>
                  HistorySheet
                </TableCell>
                <TableCell align="center" width="20%" sx={{ fontWeight: 'bold' }}>
                  ServicePoint
                </TableCell>
                <TableCell align="center" width="20%" sx={{ fontWeight: 'bold' }}>
                  ServiceChannel
                </TableCell>
                <TableCell align="center" width="20%" sx={{ fontWeight: 'bold' }}>
                  MedicalAction
                </TableCell>
                <TableCell align="center" width="20%" sx={{ fontWeight: 'bold' }}>
                  Time
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {QueuingManagements.map((QueuingManagementsItem: QueuingManagementsInterface) => (
                <React.Fragment>
                  <TableRow key={QueuingManagementsItem.ID}>
                    <TableCell align="left">{QueuingManagementsItem.ID}</TableCell>
                    <TableCell align="left">{QueuingManagementsItem.HistorySheet.ID}</TableCell>          
                    <TableCell align="center">{QueuingManagementsItem.ServicePoint.Name}</TableCell>
                    <TableCell align="center">{QueuingManagementsItem.ServiceChannel.Name}</TableCell>
                    <TableCell align="center">{QueuingManagementsItem.MedicalAction.Action}</TableCell>
                    <TableCell align="center">
                      {moment(QueuingManagementsItem.Time).format("DD/MM/YYYY HH:mm")}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Table>
                        <TableHead>
                          
                        </TableHead>
                        {/* <TableBody>
                          {QueuingManagementsItem.QueuingManagements.map((item: QueuingManagementsInterface) => (
                            <TableRow key={item.ID}>
                              <TableCell align="left">{item.QueuingManagementset.Name}</TableCell>
                              <TableCell align="left">{item.Quantity}</TableCell>
                              <TableCell align="left">{item.QueuingManagementset.Price}</TableCell>
                              <TableCell align="left">{item.Quantity * item.QueuingManagementset.Price}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody> */}
                      </Table>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default QueuingManagements;