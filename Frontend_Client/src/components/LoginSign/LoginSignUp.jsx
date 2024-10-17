import React, { useEffect, useState } from "react";
import "./LoginSignUp.css";
import { useNavigate } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select, Stack, TextField, Snackbar, Alert } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';
import apiHelper from "../../Commen/ApiHelper";
import Constents from "../../Commen/Constents";
import { Path } from "../../Commen/Path";

const LoginSignUp = ({ Auth, setAuth }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tabButton1");
  const [userCity, setUserCity] = useState([]);
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    city: "",
    phone: "",
    role: 2,
    password: ""
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  useEffect(() => {
    if (Auth && Auth.role === 2) {
      navigate(Path.homescreen);
    }
  }, [Auth]);

  const getUsers = async () => {
    try {
      const result = await apiHelper.listUser(userCity.length < 0 ? undefined : userCity);
      setUserCity([...result.data.data]);
    } catch (error) {
      setSnackbar({ open: true, message: "Failed to fetch users", severity: "error" });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const LoginHandler = async () => {
    try {
      if (!userDetails.phone || userDetails.phone.length < 10) {
        setSnackbar({ open: true, message: "Invalid phone number", severity: "error" });
        return;
      }
      if (!userDetails.password) {
        setSnackbar({ open: true, message: "Password is required", severity: "error" });
        return;
      }
      const result = await apiHelper.userLogin({ phone: userDetails.phone, password: userDetails.password });
      localStorage.setItem("token", result.data.token);
      setAuth(Constents.getUserDetails());
      setSnackbar({ open: true, message: "Login successful!", severity: "success" });
      navigate(Path.homescreen);
    } catch (error) {
      setSnackbar({ open: true, message: error.response?.data?.message || "Login failed", severity: "error" });
    }
  };

  const InsertHandler = async () => {
    try {
      if (!userDetails.fullName || userDetails.fullName.length < 4) {
        setSnackbar({ open: true, message: "Full name must be at least 4 characters", severity: "error" });
        return;
      }
      if (!userDetails.city) {
        setSnackbar({ open: true, message: "City is required", severity: "error" });
        return;
      }
      if (!userDetails.phone) {
        setSnackbar({ open: true, message: "Phone number is required", severity: "error" });
        return;
      }
      if (!userDetails.password) {
        setSnackbar({ open: true, message: "Password is required", severity: "error" });
        return;
      }
      await apiHelper.createUser({ ...userDetails });
      setActiveTab("tabButton1");
      setSnackbar({ open: true, message: "Registration successful!", severity: "success" });
    } catch (error) {
      setSnackbar({ open: true, message: error.response?.data?.message || "Registration failed", severity: "error" });
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="loginSignUpSection dark-theme">
      <div className="loginSignUpContainer">
        <div className="loginSignUpTabs">
          <p
            className={activeTab === "tabButton1" ? "active" : ""}
            onClick={() => handleTab("tabButton1")}
          >
            Login
          </p>
          <p
            className={activeTab === "tabButton2" ? "active" : ""}
            onClick={() => handleTab("tabButton2")}
          >
            Register
          </p>
        </div>
        <div className="loginSignUpTabsContent">
          {activeTab === "tabButton1" && (
            <div className="loginSignUpTabsContentLogin">
              <Stack component="form" noValidate autoComplete="off">
                <TextField
                  inputProps={{ maxLength: 10 }}
                  id="outlined-number"
                  label="Phone Number"
                  type="text"
                  variant="filled"
                  value={userDetails.phone}
                  onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
                  sx={{ input: { color: "white" }, label: { color: "#ddd" }, "& .MuiFilledInput-root": { background: "#333" } }}
                />
                <TextField
                  id="outlined-password-input"
                  label="Password"
                  type="password"
                  variant="filled"
                  value={userDetails.password}
                  onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                  sx={{ input: { color: "white" }, label: { color: "#ddd" }, "& .MuiFilledInput-root": { background: "#333" } }}
                />
                <Button
                  component="label"
                  variant="contained"
                  size="large"
                  startIcon={<LoginIcon />}
                  onClick={LoginHandler}
                  sx={{ backgroundColor: "#1DB954", "&:hover": { backgroundColor: "#1ED760" } }}
                >
                  Log In
                </Button>
              </Stack>
              <div className="loginSignUpTabsContentLoginText">
                <p>
                  No account yet?{" "}
                  <span onClick={() => handleTab("tabButton2")}>
                    Create Account
                  </span>
                </p>
              </div>
            </div>
          )}

          {activeTab === "tabButton2" && (
            <div className="loginSignUpTabsContentRegister">
              <Stack component="form" noValidate autoComplete="off">
                <TextField
                  id="outlined-text"
                  label="Full Name"
                  type="text"
                  variant="filled"
                  onChange={(e) => setUserDetails({ ...userDetails, fullName: e.target.value })}
                  sx={{ input: { color: "white" }, label: { color: "#ddd" }, "& .MuiFilledInput-root": { background: "#333" } }}
                />
                <TextField
                  inputProps={{ maxLength: 10 }}
                  id="outlined-number"
                  label="Phone Number"
                  type="text"
                  variant="filled"
                  onChange={(e) => setUserDetails({ ...userDetails, phone: Number(e.target.value) || "" })}
                  sx={{ input: { color: "white" }, label: { color: "#ddd" }, "& .MuiFilledInput-root": { background: "#333" } }}
                />
                <TextField
                  id="outlined-password-input"
                  label="Password"
                  type="password"
                  variant="filled"
                  onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                  sx={{ input: { color: "white" }, label: { color: "#ddd" }, "& .MuiFilledInput-root": { background: "#333" } }}
                />
                <FormControl variant="filled" size="large" fullWidth sx={{ color: "#fff", "& .MuiFilledInput-root": { background: "#333" } }}>
                  <InputLabel id="demo-simple-select-filled-label">City</InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    value={userDetails.city}
                    onChange={(e) => setUserDetails({ ...userDetails, city: e.target.value })}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 300,
                          width: 300,
                          backgroundColor: "#444",
                          color: "#fff"
                        }
                      }
                    }}
                  >
                    {userCity.map((x) => (
                      <MenuItem key={x._id} value={x.city} style={{ whiteSpace: "normal" }}>
                        {x.city}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  component="label"
                  variant="contained"
                  size="large"
                  startIcon={<LoginIcon />}
                  onClick={InsertHandler}
                  sx={{ backgroundColor: "#1DB954", "&:hover": { backgroundColor: "#1ED760" } }}
                >
                  Sign Up
                </Button>
              </Stack>
              <div className="loginSignUpTabsContentLoginText">
                <p>
                  Have an account?{" "}
                  <span onClick={() => handleTab("tabButton1")}>
                    Log In
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LoginSignUp;
