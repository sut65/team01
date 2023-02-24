import { Link as RouterLink } from "react-router-dom";
import { Alert, Avatar, Box, Button, Container, CssBaseline, Grid, Paper, Snackbar, Tab, TextField, Typography } from "@mui/material";
import { error } from "console";
import React from "react";
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import Navbar from "./Navbar";
import { useState } from "react";

export default function Home() {

  // ประกาศตัวแปร login และ setlogin สำหรับเก็บค่า email และ password
  // setlogin เป็นตัว set ค่า email และ password เข้าไปที่ตัวแปร login
  // const [login, setLogin] = useState<Partial<SigninInterface>>({
  //   Email: "", Password: ""
  // });
  // const [loginUser, setLoginUser] = useState<Partial<SigninInterface>>({
  //   Email: "", Password: ""
  // });

  // ประกาศตัวแปร value สำหรับการเปลี่ยนค่าใน tab
  // const [value, setValue] = useState("1");

  // // ควบคุม pop up snackbar
  // // success เป็น true จะแสดง pop up กรณีทำงานสำเร็จ
  // // error เป็น true จะแสดง pop up กรณีทำงานไม่สำเร็จ
  // const [success, setSuccess] = React.useState(false);
  // const [error, setError] = React.useState(false);

  // // handleclose จะเป็นตัวจัดการ pop up ให้หยุดการทำงานหลังจากที่แสดง pop up ในแต่ละกรณี 
  // const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   if (success === true) {
  //     window.location.href = "/create"; // เมื่อ success เป็น true จะทำการเปลี่ยน path ไปที่หน้า create
  //   }
  //   setSuccess(false);
  //   setError(false);
  // };


  // setlogin ทำการเก็บ email และ password จาก textfield ไปเก็บที่ตัวแปร login
  // const handleInputChange = (
  //   event: React.ChangeEvent<{ id?: string; value: any }>
  // ) => {
  //   const id = event.target.id as keyof typeof login;
  //   const { value } = event.target;
  //   setLogin({ ...login, [id]: value });
  // };
  // const handleInputUserChange = (
  //   event: React.ChangeEvent<{ id?: string; value: any }>
  // ) => {
  //   const id = event.target.id as keyof typeof loginUser;
  //   const { value } = event.target;
  //   setLoginUser({ ...loginUser, [id]: value });
  // };

  // const handleTabChange = (event: React.ChangeEvent<{}>, newValue: string) => {
  //   setValue(newValue);
  // }


  // ที่หน้า Login
  // หน้าบ้าน จะใช้ JSON สื่อสารกันกับ หลังบ้าน
  // หน้าบ้านจะแนบ header(content-type) และ body(app-json) เพื่อติดต่อไปยังหลังงบ้านที่ method POST
  // function Submit() {
  //   const apiUrl = "http://localhost:8080/login";
  //   const requestOptions = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(login),
  //   };

  //   // หลังบ้านรับ request มา
  //   // หลังบ้าน check data
  //   fetch(apiUrl, requestOptions)
  //     .then((response) => response.json())
  //     .then((res) => {
  //       if (res.data) {
  //         setSuccess(true); // ข้อมูลถูกต้อง แสดง pop up การทำงานสำเร็จ
  //         localStorage.setItem("token", res.data.token);  // setItem จะ set ค่า token ไปที่ Local storage
  //         localStorage.setItem("id", res.data.id);    // setItem จะ set ค่า id ไปที่ Local storage
  //         window.location.href = "/historysheetcreate";   // เปลี่ยน path ไปที่หน้า create
  //       } else {
  //         setError(true); // ถ้า login ไม่สำเร็จ จะแสดง pop up กรณีทำงานไม่สำเร็จ
  //       }
  //     });
  // }
  // function SubmitUser() {
  //   const apiUrl = "http://localhost:8080/login/user";
  //   const requestOptions = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(loginUser),
  //   };

  //   // หลังบ้านรับ request มา
  //   // หลังบ้าน check data
  //   fetch(apiUrl, requestOptions)
  //     .then((response) => response.json())
  //     .then((res) => {
  //       if (res.data) {
  //         setSuccess(true); // ข้อมูลถูกต้อง แสดง pop up การทำงานสำเร็จ
  //         localStorage.setItem("token", res.data.token);  // setItem จะ set ค่า token ไปที่ Local storage
  //         localStorage.setItem("id", res.data.id);    // setItem จะ set ค่า id ไปที่ Local storage
  //         window.location.href = "/user_user";   // เปลี่ยน path ไปที่หน้า create
  //       } else {
  //         setError(true); // ถ้า login ไม่สำเร็จ จะแสดง pop up กรณีทำงานไม่สำเร็จ
  //       }
  //     });
  // }

  // console.log(login);   // แสดงข้อมูลการ Login

  return (
    <Container component="main" maxWidth="xs">
      <Button component={RouterLink} to="/login">ลงชื่อเข้าใช้</Button>
      <p>
        Alan Turing
      </p>
    </Container>
  );
}