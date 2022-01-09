import React, { useEffect, useState } from 'react';
import {useAuth0} from '@auth0/auth0-react'
import { BsGoogle } from "react-icons/bs"
import { Routes, useNavigate,Outlet } from "react-router-dom";


import styles from './login.module.css'


function Login(props) {
    const { isAuthenticated, loginWithPopup, user, getAccessTokenSilently } = useAuth0();
    const [stateLogin, setStateLogin] = useState(true)
    const navigate = useNavigate();

    const handleLogin = () => {
      loginWithPopup();
    }
    useEffect(() => {
        async function checkUser() {
            if (isAuthenticated) {
            localStorage.setItem("isLogin", true);
            const accessToken = await getAccessTokenSilently({
                audience: "https://live-chat-app.us.auth0.com/api/v2/",
                scope: "openid read:user_idp_tokens read:current_user",
            })
            localStorage.setItem('accessToken', accessToken)
            const loginData = await fetch(
                "http://localhost:3000/api/auth/login",
                {
                    headers: {
                        Authorization:`Bearer ${accessToken}`,
                    },
                    method: "POST",
                }
            ).then((data) => data.json())
            // console.log(loginData);
            await navigate("/home");
            // console.log(user)
        } else {
            await navigate("/");
            return <Outlet/>
        }
        }

        checkUser();  // called async checkUser()
    }, [isAuthenticated]);

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginBorder}>
                <div className={styles.login}> 
                <button className={styles.buttonLogin} onClick={handleLogin}>
                    <span className={styles.iconFacebook}><BsGoogle/></span> 
                    Login với Google 
                </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
