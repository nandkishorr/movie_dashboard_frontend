import React, { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../Redux/users/user.actions";
import axios from "axios";
import { BASE_URL } from "../../constants/config";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { IconButton } from "@chakra-ui/react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const navigate = useNavigate();
   
    const handleSignup = async () => {
      let data = await axios.post(BASE_URL + "/user/register", {
        name,
        email,
        password,
      });
      let { message, status } = data.data;
      if (status === 1) {
        alert(message);
        navigate("/login");
      } else {
        alert(message);
      }
    };
  

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div className="signuppg container-fluid">
      <div className="box2 row">
        <div className="top2">
          <h1>Signup.</h1>
        </div>
        <div className="form2  ">
          <Box
            component="form"
            sx={{
              "& > :not(style)": { mt: 3, width: "37ch",paddingRight:"10px" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label=" Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <FormControl sx={{ mt: 3, width: "fill" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
               
                Create Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      backgroundColor="transparent"
                      border="none"
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <div>
              <Button
                sx={{
                  width: "40px",
                  float: "right",
                }}
                variant="contained"
                onClick={() => handleSignup()}
              >
                Signup
              </Button>
              <h6
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Already a user?
              </h6>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Signup;
