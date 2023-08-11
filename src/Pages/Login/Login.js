import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../Redux/users/user.actions'
import { useNavigate } from 'react-router-dom'
import "./Login.css";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { IconButton } from '@chakra-ui/react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import toast, { Toaster } from 'react-hot-toast';
function Login() {
      const navigate= useNavigate()
      const {auth,token,loding,error} = useSelector((state) => state.userReducer)
      console.log(auth,token)
      if(auth){
          navigate("/home")
      }
      const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')
      const [showPassword, setShowPassword] = useState(false);
      const dispatch = useDispatch()
  
      const handleLogin = () => {
          dispatch(getUser({email, password}))
          navigate("/home")
      }
    
      if(loding) return   toast.loading('The data is loading');
   
      if(error) return toast.error('Something went wrong');

      const handleClickShowPassword = () => setShowPassword((show) => !show);
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    

  return (
    <div className='loginpg container-fluid'>
       {/* <Toaster
      position="bottom-center"
      reverseOrder={false}/> */}

    <div className= 'box1 row'>
         <div className="top1">
             <h1>Login.</h1>
         </div>
         <div className="form1">
         <Box 
      component="form"
     
      sx={{
        '& > :not(style)': { mt: 3, width: "37ch",paddingRight:"10px"},
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)}/>
    
    <FormControl sx={{ mt: 3,width: 'fill' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                backgroundColor="transparent"
                border='none'
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
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <div><Button sx={{
            width:'40px',float:'right'
          }} variant="contained" onClick={()=>handleLogin()}>Login</Button>
           <h6 style={{ cursor:'pointer'}} onClick={()=>{navigate("/register")}}>Already a user?</h6> </div>

        </Box>
         </div>
     </div>

    
   
 </div>
  );
}

export default Login
