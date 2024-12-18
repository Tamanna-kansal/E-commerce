// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Modal from "@mui/material/Modal";
// import RegisterUserForm from "./Register";
// import { useEffect, useState } from "react";
// import LoginUserForm from "./Login";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { Alert, Snackbar } from "@mui/material";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 500,
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   p: 4,
// };

// export default function AuthModal({ handleClose, open }) {
//   const location = useLocation();
//   const { auth } = useSelector((store) => store);
//   const navigate=useNavigate()
//   useEffect(() => {
//     if (auth.user){
//        handleClose();
//        if(auth.user?.role==="ADMIN"){
//         navigate('/admin')
//        }
//       }
//   }, [auth.user]);
//   return (
//     <>
//     <Modal
//       open={open}
//       onClose={handleClose}
//       aria-labelledby="modal-modal-title"
//       aria-describedby="modal-modal-description"
//       size="large"
//     >
//       <Box className="rounded-md" sx={style}>
//         {location.pathname === "/login" ? (
//           <LoginUserForm />
//         ) : (
//           <RegisterUserForm />
//         )}
//       </Box>
//     </Modal>
    
//     </>
    
//   );
// }
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Modal from "@mui/material/Modal";
// import RegisterUserForm from "./Register";
// import { useEffect } from "react";
// import LoginUserForm from "./Login";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { Alert, Snackbar } from "@mui/material";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 500,
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   p: 4,
// };

// export default function AuthModal({ handleClose, open }) {
//   const location = useLocation();
//   const { auth } = useSelector((store) => store);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (auth.user) {
//       handleClose();
//       if (auth.user?.role === "ADMIN") {
//         navigate("/admin");
//       }
//     }
//   }, [auth.user]);

//   const handleAuth0Login = () => {
//     window.location.href = `${process.env.REACT_APP_API_URL}/auth/auth0/login`;
//   };

//   return (
//     <>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//         size="large"
//       >
//         <Box className="rounded-md" sx={style}>
//           {location.pathname === "/login" ? (
//             <>
//               <LoginUserForm />
//               {/* <Button
//                 onClick={handleAuth0Login}
//                 className="mt-3 w-full"
//                 variant="outlined"
//               >
//                 Login with Auth0
//               </Button> */}
//             </>
//           ) : (
//             <RegisterUserForm />
//           )}
//         </Box>
//       </Modal>
//     </>
//   );
// }


// import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";
// import RegisterUserForm from "./Register";
// import LoginUserForm from "./Login";
// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { API_BASE_URL } from '../../../config/api';
// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 500,
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   p: 4,
// };

// export default function AuthModal({ handleClose, open, isLogin }) {
//   const { auth } = useSelector((store) => store);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (auth.user) {
//       handleClose();
//       if (auth.user?.role === "ADMIN") {
//         navigate("/admin");
//       }
//     }
//   }, [auth.user, handleClose, navigate]);

//   const handleAuth0Login = () => {
//     window.location.href = `${API_BASE_URL}/auth/auth0/login`;
//   };

//   return (
//     <Modal
//       open={open}
//       onClose={handleClose}
//       aria-labelledby="modal-modal-title"
//       aria-describedby="modal-modal-description"
//       size="large"
//     >
//       <Box className="rounded-md" sx={style}>
//         {isLogin ? (
//           <LoginUserForm />
//         ) : (
//           <RegisterUserForm />
//         )}

//         {/* Auth0 Button - Common to Both Forms */}
//         <Button
//           onClick={handleAuth0Login}
//           variant="outlined"
//           fullWidth
//           size="large"
//           className="mt-3"
//         >
//           Login with Auth0
//         </Button>
//       </Box>
//     </Modal>
//   );
// }


import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import RegisterUserForm from "./Register";
import LoginUserForm from "./Login";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from '../../../config/api';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function AuthModal({ handleClose, open }) {
  const [isLogin, setIsLogin] = useState(true); // Default to Login form
  const { auth } = useSelector((store) => store);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user) {
      handleClose();
      if (auth.user?.role === "ADMIN") {
        navigate("/admin");
      }
    }
  }, [auth.user, handleClose, navigate]);

  const handleAuth0Login = () => {
    window.location.href = `${API_BASE_URL}/auth/auth0/login`;
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      size="large"
    >
      <Box className="rounded-md" sx={style}>
        {isLogin ? (
          <LoginUserForm />
        ) : (
          <RegisterUserForm />
        )}

        {/* Switch between Login and Register */}
        <Button
          variant="text"
          fullWidth
          onClick={() => setIsLogin((prev) => !prev)}
          className="mt-3"
        >
          {isLogin
            ? "Don't have an account? Register here"
            : "Already have an account? Login here"}
        </Button>

        {/* Auth0 Button */}
        <Button
          onClick={handleAuth0Login}
          variant="outlined"
          fullWidth
          size="large"
          className="mt-3"
        >
          {isLogin ? "Login with Auth0" : "Register with Auth0"}
        </Button>
      </Box>
    </Modal>
  );
}
