import React, { useEffect, useState} from 'react';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from '@mui/material/Tooltip';
import MenuIcon from "@mui/icons-material/Menu";
import { Chip } from '@mui/material';
import AssignmentIcon from "@mui/icons-material/Assignment";
import LogoutIcon from '@mui/icons-material/Logout';
import { Link as RouterLink } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import { AdminsInterface, EmployeesInterface } from '../models/IEmployee/IEmployee';
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import CreateIcon from '@mui/icons-material/Create';
import SignIn from './Signin';
import FaceIcon from '@mui/icons-material/Face';

export default function Navbar() {

  // const [token, settoken] = React.useState<String>("");
  const [role, setrole] = React.useState<String>("");

  const menu_admin = [
    { name: "บันทึกข้อมูลบุคลากร", icon: <CreateIcon />, path: "/employeecreate" },
    { name: "ข้อมูลบุคลากร", icon: <AssignmentIcon />, path: "/employees" },
    { name: "บันทึกข้อมูลภาระงานแพทย์", icon: <CreateIcon />, path: "/workloadcreate" },
    { name: "ข้อมูลภาระงานแพทย์", icon: <AssignmentIcon />, path: "/workloads" },
  ]

  const menu_employee = [
    { name: "ลงทะเบียนข้อมูลคนไข้นอก", icon: <CreateIcon />, path: "/patientcreate" },
    { name: "ข้อมูลคนไข้นอก", icon: <AssignmentIcon />, path: "/patients" },
    { name: "บันทึกข้อมูลสิทธิการรักษา", icon: <CreateIcon />, path: "/patientrightcreate" },
    { name: "ข้อมูลสิทธิการรักษา", icon: <AssignmentIcon />, path: "/patientrights" },

    { name: "บันทึกข้อมูลการซักประวัติ", icon: <CreateIcon />, path: "/historysheetcreate" },
    { name: "ข้อมูลการซักประวัติ", icon: <AssignmentIcon />, path: "/historysheets" },

    { name: "บันทึกข้อมูลการคัดกรอง", icon: <CreateIcon />, path: "/outpatientscreeningcreate" },
    { name: "ข้อมูลการคัดกรอง", icon: <AssignmentIcon />, path: "/outpatientscreenings" },
    { name: "บันทึกข้อมูลคิว", icon: <CreateIcon />, path: "/queuingcreate" },
    { name: "ข้อมูลคิวการรักษา", icon: <AssignmentIcon />, path: "/queuings" },

    { name: "บันทึกข้อมูลผลการวินิจฉัย", icon: <CreateIcon />, path: "/diagnosisrecordcreate" },
    { name: "ข้อมูลผลการวินิจฉัย", icon: <AssignmentIcon />, path: "/diagnosisrecords" },
    { name: "บันทึกข้อมูลการรักษา", icon: <CreateIcon />, path: "/treatmentrecordcreate" },
    { name: "ข้อมูลการรักษา", icon: <AssignmentIcon />, path: "/treatmentrecords" },
    
    { name: "บันทึกข้อมูลการนัดหมาย", icon: <CreateIcon />, path: "/appointmentcreate" },
    { name: "ข้อมูลการนัดหมาย", icon: <AssignmentIcon />, path: "/appointments" },

    { name: "บันทึกข้อมูลการจ่ายยาและเวชภัณฑ์", icon: <CreateIcon />, path: "/medicinerecordcreate" },
    { name: "ข้อมูลการจ่ายยาและเวชภัณฑ์", icon: <AssignmentIcon />, path: "/medicinerecords" },
    { name: "บันทึกข้อมูลการชำระเงิน", icon: <CreateIcon />, path: "/paymentcreate" },
    { name: "ข้อมูลการชำระเงิน", icon: <AssignmentIcon />, path: "/payments" },
  ]

  const [admin, setAdmin] = React.useState<AdminsInterface>();
  const [employee, setEmployee] = React.useState<EmployeesInterface>();
  const [openDrawer, setOpenDrawer] = useState(false);

  const getAdmin = async () => {
    const apiUrl = `http://localhost:8080/admin/${localStorage.getItem("id")}`; //localStorage เก็บไอดีของพนักงานที่ล็อกอินเข้ามา
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }
    //เรียกใช้ฟังก์ชัน fetch ในการดึงข้อมูล (input เป็น apiUrl,RequestInfo เป็น requestOptions)
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())  //พอหลังบ้าน respon กลับมาเราก็จะทำการ then ข้อมูลที่ได้จากหลังบ้าน โดยเริ่มจากการแปลงข้อมูลให้เป็น json 
      .then((res) => {
        console.log(res.data); //console log ดูว่าข้อมูลที่ได้จากหลังบ้านเป็นหน้าตายังไง
        if (res.data) { //ติดต่อกันผ่าน path /admin มันก็เลยจะวิ่งไปที่ controller admin (List)ใน Backend อะ
          setAdmin(res.data) //โดยตัว respone ที่เราได้จาก backend มันก็จะมี data กับ error ซึ่งถ้ามันมี data ส่งมาอะมันก็จะเอาค่าไปเก็บไว้ใน setAdmin (Set function ที่เรากำหนดไว้ก่อนหน้านี้อะ)
        } else {
          console.log("else")
        }
      });
  }

  const getEmployee = async () => {
    const apiUrl = `http://localhost:8080/employee/${localStorage.getItem("id")}`; //localStorage เก็บไอดีของพนักงานที่ล็อกอินเข้ามา
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }
    //เรียกใช้ฟังก์ชัน fetch ในการดึงข้อมูล (input เป็น apiUrl,RequestInfo เป็น requestOptions)
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())  //พอหลังบ้าน respon กลับมาเราก็จะทำการ then ข้อมูลที่ได้จากหลังบ้าน โดยเริ่มจากการแปลงข้อมูลให้เป็น json 
      .then((res) => {
        console.log(res.data); //console log ดูว่าข้อมูลที่ได้จากหลังบ้านเป็นหน้าตายังไง
        if (res.data) { //ติดต่อกันผ่าน path /admin มันก็เลยจะวิ่งไปที่ controller admin (List)ใน Backend อะ
          setEmployee(res.data) //โดยตัว respone ที่เราได้จาก backend มันก็จะมี data กับ error ซึ่งถ้ามันมี data ส่งมาอะมันก็จะเอาค่าไปเก็บไว้ใน setAdmin (Set function ที่เรากำหนดไว้ก่อนหน้านี้อะ)
        } else {
          console.log("else")
        }
      });
  }


  const toggleDrawer = (state: boolean) => (event: any) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setOpenDrawer(state);
  }


  const Signout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  useEffect(() => {
   
    // const token = localStorage.getItem("token")
    const getrole = localStorage.getItem("role")
    // if (token) {
    //   settoken(token);
    // }
    if (getrole) {
      setrole(getrole);
      switch (getrole) {
      case 'admin':
        getAdmin();
        break;
      case 'employee':
        getEmployee();
        break;
      }
    }
  }, []);

  if (role === 'admin' || role === 'employee') {
    return (
      <div style={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ background: '#4db6ac' }}>
          <Toolbar>
            <Tooltip title="เมนู">
              <IconButton
                onClick={toggleDrawer(true)}
                edge="start"
                sx={{ color: '#e0f2f1',marginRight: 2 }}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>
            
            <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
              <List
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                {role === 'admin' ? menu_admin.map((item, index) => (
                  <ListItem key={index} button component={RouterLink} to={item.path}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText>{item.name}</ListItemText>
                  </ListItem>
                )) : null}
                {role === 'employee' ? menu_employee.map((item, index) => (
                  <ListItem key={index} button component={RouterLink} to={item.path}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText>{item.name}</ListItemText>
                  </ListItem>
                )) : null}
              </List>
            </Drawer>
            
            <Tooltip title="หน้าแรก">
              <IconButton
                sx={{color: '#e0f2f1', marginRight:1.5}}
                edge="start"
                component={RouterLink} to="/"
              >
                <HomeIcon />
              </IconButton>  
            </Tooltip>

            <Typography variant="h6" sx={{ flexGrow: 1}}>
              ระบบจัดการคนไข้นอก
            </Typography>

            {role === 'admin' ? (<Tooltip title="ผู้ดูแลระบบที่เข้าใช้งาน">
            <Chip 
              variant="outlined" 
              icon={<FaceIcon style={{ color: '#00796b' }} />}
              style={{ backgroundColor: '#e0f2f1', fontSize: '1rem', color: '#00796b'}}
              label={admin?.FirstName+" "+admin?.LastName+" (ผู้ดูแลระบบ)"}
            />
            </Tooltip>) : null}

            {role === 'employee' ? (<Tooltip title="บุคลากรที่เข้าใช้งาน">
            <Chip 
              variant="outlined" 
              icon={<FaceIcon style={{ color: '#00796b' }} />}
              style={{ backgroundColor: '#e0f2f1', fontSize: '1rem', color: '#00796b'}}
              label={employee?.FirstName+" "+employee?.LastName+" (บุคลากร)"}
            />
            </Tooltip>) : null}

            <Tooltip title="ออกจากระบบ">
              <IconButton
                onClick={Signout}
                edge="end"
                sx={{ marginLeft: 2 ,color: '#e0f2f1'}}
              >
                <LogoutIcon />
              </IconButton>  
            </Tooltip>
          </Toolbar>
        </AppBar>
      </div>
    );
  }

  // else if (role === 'employee') {


  //   return (
  //     <div style={{ flexGrow: 1 }}>
  //       <AppBar position="static">
  //         <Toolbar>
  //           <IconButton
  //             onClick={toggleDrawer(true)}
  //             edge="start"
  //             sx={{ marginRight: 2 }}
  //             color="inherit"
  //             aria-label="menu"
  //           >
  //             <MenuIcon />
  //           </IconButton>
  //           <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
  //             <List
  //               onClick={toggleDrawer(false)}
  //               onKeyDown={toggleDrawer(false)}
  //             >
  //               <ListItem button component={RouterLink} to="/">
  //                 <ListItemIcon><HomeIcon /></ListItemIcon>
  //                 <ListItemText>หน้าแรก</ListItemText>
  //               </ListItem>
  //               <Divider />
  //               {menu_employee.map((item, index) => (
  //                 <ListItem key={index} button component={RouterLink} to={item.path}>
  //                   <ListItemIcon>{item.icon}</ListItemIcon>
  //                   <ListItemText>{item.name}</ListItemText>
  //                 </ListItem>
  //               ))}

  //               <ListItem button onClick={Signout}>
  //                 <ListItemIcon> <ExitToAppIcon /></ListItemIcon>
  //                 <ListItemText>Sign out</ListItemText>
  //               </ListItem>

  //             </List>
  //           </Drawer>

  //           <Link style={{ color: "white", textDecoration: "none", marginRight: "auto" }} to="/">
  //             <Typography variant="h6" sx={{ flexGrow: 1 }}>
  //               ระบบการจองใช้ห้อง
  //             </Typography>
  //           </Link>

  //         </Toolbar>
  //       </AppBar>
  //     </div>
  //   );
  else {
    return (
      <div></div>
    )
  }
  // return <SignIn/>;
}
