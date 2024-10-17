import { Button, Card, TextField } from "@mui/material";
import apiHelper from "../../Commen/ApiHelper";
import { useEffect, useState } from "react";
import Constents from "../../Commen/constents";
import { Path } from "../../Commen/Path";
import { useNavigate } from "react-router-dom";

export default function Login({ Auth, setAuth }) {
    const navigate = useNavigate()
    const [userInfo, setuserInfo] = useState({
        phone: "",
        password: ""
    })

    useEffect(() => {
        if (Auth && Auth.role < 2) {
            navigate(Path.dashboard)
        }
        // eslint-disable-next-line
    }, [Auth])

    const LoginHandeler = async () => {
        try {
            if (!userInfo.phone || userInfo.phone.length < 10) return window.alert("Somthing went wrong with phone!")
            if (!userInfo.password) return window.alert("Somthing went wrong with password!")
            const result = await apiHelper.userLogin(userInfo)
            localStorage.setItem("token", result.data.token)
            setAuth(Constents.getUserDetails())
        } catch (error) {
            console.log(error)
        }
    }


    return <>
        <div style={{ width: "100%", height: "100vh" }} className="d-flex align-items-center justify-content-center w-100">
            <Card className="p-3" style={{ width: "500px" }} >
                <center>
                    <h4 className="fw-bold">
                        Welcome Back
                    </h4>
                    <p>Enter your phone and password to sign in</p>
                    <TextField fullWidth label="Phone" onChange={(e) => setuserInfo({ phone: Number(e.target.value) || "" })} inputProps={{ maxLength: 10 }} />
                    <br />
                    <br />
                    <TextField onChange={(e) => setuserInfo({ ...userInfo, password: e.target.value })} fullWidth label="Password" type="password" />
                    <br />
                    <br />
                    <Button onClick={LoginHandeler} variant="contained" >Sign in</Button>
                </center>
            </Card>
        </div>

    </>
}