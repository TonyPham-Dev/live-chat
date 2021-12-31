import React, { useEffect, useState } from 'react';
import {useAuth0} from '@auth0/auth0-react'
import { BsGoogle } from "react-icons/bs"
import { Routes, useNavigate } from "react-router-dom";

import styles from './login.module.css'


function Login(props) {
    const { isAuthenticated, loginWithPopup, user } = useAuth0();
    const [stateLogin, setStateLogin] = useState(true)
    const navigate = useNavigate();

    const handleLogin = () => {
      loginWithPopup();
    }
    
    // const setLocalStorage = JSON.stringify(secretCode)

    
    useEffect(() => {
        async function checkUser() {
            if (isAuthenticated) {
            // localStorage.setItem('browser-tabs-lock-key-auth0.lock.getTokenSilently', stateLogin)
            // localStorage.removeItem('browser-tabs-lock-key-auth0.lock.getTokenSilently')
            await navigate("/home");
            console.log(user)
        } else {
            // setStateLogin(false)
            localStorage.removeItem('browser-tabs-lock-key-auth0.lock.getTokenSilently')
            // loginWithRedirect();
            await navigate("/");
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
