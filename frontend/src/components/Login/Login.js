import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { BsGoogle } from "react-icons/bs";
import { Routes, useNavigate, Outlet } from "react-router-dom";

import styles from "./login.module.css";

function Login(props) {
  const { isAuthenticated, loginWithPopup, user, getAccessTokenSilently,logout } =
    useAuth0();
  const [stateLogin, setStateLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setOpen(!open);
    loginWithPopup();
  };
  useEffect(() => {
    async function checkUser() {
      if (isAuthenticated) {
        localStorage.setItem("isLogin", true);
        const accessToken = await getAccessTokenSilently({
          audience: "https://live-chat-app.us.auth0.com/api/v2/",
          scope: "openid read:user_idp_tokens read:current_user",
        });
        localStorage.setItem("accessToken", accessToken);
        const loginData = await fetch("http://localhost:3000/api/auth/login", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          method: "POST",
        }).then((data) => {
          if(data.status == 500) {
            logout()
          }
          data.json()
          // setLoading(true)
        });
        
        await navigate("/home");
        // console.log(user)
      } else {
        setOpen(open)
        setLoading(false)
        await navigate("/");
        return <Outlet />;
      }
    }

    checkUser(); // called async checkUser()
  }, [isAuthenticated]);

  // loading
  
 
 
  return (
   <>
      <div className={styles.loginContainer}>
      {open && <div className={styles.loadings}></div>}
      
        <div className={styles.loginBorder}>
          <div className={styles.login}>
            <button className={styles.buttonLogin} onClick={handleLogin}>
              <span className={styles.iconFacebook}>
                <BsGoogle />
              </span>
              Login với Google
            </button>
          
          </div>
        </div>
          
          <Backdrop
              sx={{ color: '#0084ff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
      </div>
   </>
  );
}

export default Login;
