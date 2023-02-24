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
import { OutpatientScreeningsInterface } from "../../models/IOutpatientScreening/IOutpatientScreenings";


function OutpatientScreenings() {
  // ดึง HistorySheetId มาจาก url ตอนกดสั่งอาหาร ex. "localhost:3000/OutpatienScreeningscreate/2" จะได้ HistorySheetId = 2
  //const { HistorySheetId } = useParams();
  const [OutpatienScreenings, setOutpatienScreenings] = React.useState<OutpatientScreeningsInterface[]>([]);

  const getOutpatienScreenings = async () => {
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
          setOutpatienScreenings(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getOutpatienScreenings();
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
              บันทึกการคัดกรองคนไข้นอก
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/"
              variant="contained"
              color="inherit"
            >
              กลับ
            </Button>
            &nbsp;
            <Button
              component={RouterLink}
              to={"/create"}
              variant="contained"
              color="primary"
            >
              การคัดกรองคนไข้นอก
            </Button>
          </Box>
        </Box>

        <TableContainer component={Paper} sx={{ marginTop: 4 }}>
          <Table sx={{ miinWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.main' }}>
                <TableCell align="left" width="5%" sx={{ fontWeight: 'bold' }}>
                  ID
                </TableCell>
                <TableCell align="center" width="15%" sx={{ fontWeight: 'bold' }}>
                  HistorySheet ID
                </TableCell>
                <TableCell align="center" width="15%" sx={{ fontWeight: 'bold' }}>
                  การประเมินระดับความเร่งด่วน
                </TableCell>
                <TableCell align="center" width="20%" sx={{ fontWeight: 'bold' }}>
                  การประเมินระดับความดันโลหิตสูง
                </TableCell>
                <TableCell align="center" width="15%" sx={{ fontWeight: 'bold' }}>
                  การประเมินระดับเบาหวาน
                </TableCell>
                <TableCell align="center" width="15%" sx={{ fontWeight: 'bold' }}>
                  การประเมินระดับโรคอ้วน
                </TableCell>
                <TableCell align="center" width="20%" sx={{ fontWeight: 'bold' }}>
                  การซักประวัติเพิ่มเติม
                </TableCell>
                <TableCell align="center" width="20%" sx={{ fontWeight: 'bold' }}>
                  Time
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {OutpatienScreenings.map((OutpatienScreeningsItem: OutpatientScreeningsInterface) => (
                <React.Fragment>
                  <TableRow key={OutpatienScreeningsItem.ID}>
                    <TableCell align="left">{OutpatienScreeningsItem.ID}</TableCell>
                    <TableCell align="left">{OutpatienScreeningsItem.HistorySheet.ID}</TableCell>          
                    <TableCell align="center">{OutpatienScreeningsItem.EmergencyLevel.Level}</TableCell>
                    <TableCell align="center">{OutpatienScreeningsItem.HighBloodPressureLevel.Level}</TableCell>
                    <TableCell align="center">{OutpatienScreeningsItem.DiabetesLevel.Level}</TableCell>
                    <TableCell align="center">{OutpatienScreeningsItem.ObesityLevel.Level}</TableCell>
                    <TableCell align="center">{OutpatienScreeningsItem.Note }</TableCell>
                    {/* <TableCell align="center">{OutpatienScreeningsItem.Time }</TableCell> */}
                    <TableCell align="center">
                      {moment(OutpatienScreeningsItem.Time).format("DD/MM/YYYY HH:mm")}
                    </TableCell>
                  </TableRow>
                  <TableRow>
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

export default OutpatientScreenings;