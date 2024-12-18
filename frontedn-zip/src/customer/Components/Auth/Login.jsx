// import * as React from "react";
// import { Grid, TextField, Button, Box, Snackbar, Alert } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getUser, login } from "../../../Redux/Auth/Action";
// import { useEffect } from "react";
// import { useState } from "react";

// export default function LoginUserForm({ handleNext }) {
//   const navigate = useNavigate();
//   const dispatch=useDispatch();
//   const jwt=localStorage.getItem("jwt");
//   const [openSnackBar,setOpenSnackBar]=useState(false);
//   const { auth } = useSelector((store) => store);
//   const handleCloseSnakbar=()=>setOpenSnackBar(false);
//   useEffect(()=>{
//     if(jwt){
//       dispatch(getUser(jwt))
//     }
  
//   },[jwt])
  
  
//     useEffect(() => {
//       if (auth.user || auth.error) setOpenSnackBar(true)
//     }, [auth.user]);
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
    
//     const userData={
//       email: data.get("email"),
//       password: data.get("password"),
     
//     }
//     console.log("login user",userData);
  
//     dispatch(login(userData));

//   };

//   return (
//     <React.Fragment className=" shadow-lg ">
//       <form className="w-full" onSubmit={handleSubmit}>
//         <Grid container spacing={3}>
//           <Grid item xs={12}>
//             <TextField
//               required
//               id="email"
//               name="email"
//               label="Email"
//               fullWidth
//               autoComplete="given-name"
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               required
//               id="password"
//               name="password"
//               label="Password"
//               fullWidth
//               autoComplete="given-name"
//               type="password"
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <Button
//               className="bg-[#9155FD] w-full"
//               type="submit"
//               variant="contained"
//               size="large"
//               sx={{padding:".8rem 0"}}
//             >
//               Login
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//       <div className="flex justify-center flex-col items-center">
//          <div className="py-3 flex items-center">
//         <p className="m-0 p-0">don't have account ?</p>
//         <Button onClick={()=> navigate("/register")} className="ml-5" size="small">
//           Register
//         </Button>
//         </div>
//       </div>
//       <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleCloseSnakbar}>
//         <Alert onClose={handleCloseSnakbar} severity="success" sx={{ width: '100%' }}>
//           {auth.error?auth.error:auth.user?"Register Success":""}
//         </Alert>
//       </Snackbar>
//     </React.Fragment>
//   );
// }


import * as React from "react";
import { Grid, TextField, Button, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, login } from "../../../Redux/Auth/Action";
import { useEffect, useState } from "react";
import { API_BASE_URL } from '../../../config/api';
export default function LoginUserForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const { auth } = useSelector((store) => store);

  const handleCloseSnackbar = () => setOpenSnackBar(false);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt]);

  useEffect(() => {
    if (auth.user || auth.error) setOpenSnackBar(true);
  }, [auth.user]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    dispatch(login(userData));
  };

  const handleAuth0Login = () => {
    window.location.href = `${API_BASE_URL}/auth/auth0/login`;
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              fullWidth
              type="password"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              className="bg-[#9155FD] w-full"
              type="submit"
              variant="contained"
              size="large"
            >
              Login
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={handleAuth0Login}
              variant="outlined"
              size="large"
              fullWidth
            >
              Login with Auth0
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={auth.error ? "error" : "success"}
        >
          {auth.error || (auth.user && "Login Successful")}
        </Alert>
      </Snackbar>
    </>
  );
}
