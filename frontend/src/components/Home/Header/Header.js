import React, { useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom"
import {AiFillHome, AiFillCompass, AiFillMessage, AiFillHeart,AiFillCaretDown} from "react-icons/ai"
import { FaUserFriends,FaSearch } from "react-icons/fa"
import { IoMdNotifications } from "react-icons/io"
import clsx from 'clsx'

import Notification from './notification/Notification'
import Logout from '../../Login/Logout'
import logo from "../Header/image/logo.jpg"
import imageUser from "../Header/image/imageUser.jpg"
import styles from './header.module.css'

function Header() {
    const styleTheme = styles.icon
    const styleActive = styles.active
    const styleNotification = styles.notification
    const [active, setActive] = useState(1);
    const [openNotification, setOpenNotification] = useState(false)
    return (
        <div className={styles.headerContainer}>
            <div className={styles.container}>
                {/* logo */}
               <div className={styles.logoContainer}>
                    <Link to="/home" replace >
                        <img src={logo} className={styles.logo}/>
                    </Link>
               </div>

               {/* icon */}
               <div className={styles.containerIcon}>
                    <Link to="/home">
                        <span className={active === 1 ? styleTheme + " " + styleActive : styleTheme} onClick={() => setActive(1)}><AiFillHome/></span>
                    </Link>
                    
                    <Link to="/home">
                        <span className={active === 2 ? styleTheme + " " + styleActive : styleTheme} onClick={() => setActive(2)}><AiFillCompass/></span>
                    </Link>
                    
                    <Link to="/home">
                        <span className={active === 3 ? styleTheme + " " + styleActive : styleTheme} onClick={() => setActive(3)}><FaUserFriends/></span>
                    </Link>
                    
                    <Link to="/home">
                        <span className={active === 4 ? styleTheme + " " + styleActive : styleTheme} onClick={() => setActive(4)}><AiFillMessage/></span>
                    </Link>
                    
                    <Link to="/home">
                        <span className={active === 5 ? styleTheme + " " + styleActive : styleTheme} onClick={() => setActive(5)}><AiFillHeart/></span>
                    </Link>
               </div>

               {/* input */}
               <form className={styles.formContainer}>
                   <input
                     className={styles.input}
                     placeholder='Search ...'
                   />
                   <span className={styles.iconSearch}><FaSearch/></span>
               </form>
               {/* user and notification */}
               <div className={styles.containerUser}>
                    <div>
                        <Link to="/home">
                            <span onClick={() => setOpenNotification(true)}  className={styleTheme + ' ' + styleNotification }><IoMdNotifications/></span>
                            <div onClick={() => setOpenNotification(false)} className={clsx(styles.overlay, {
                                [styles.active]: true
                            })}></div>
                        </Link>
                            <span>{openNotification  && <Notification/> }</span>
                            {console.log(openNotification)}
                    </div>
                    <div className={styles.user}>
                        <Link to='/user' style={{textDecoration: 'none'}}>
                            <div className={styles.userContainer}>
                                <img className={styles.imageUser} src={imageUser}/>
                                <h2 className={styles.userName}>Pham van cong</h2>
                            </div>
                        </Link>
                        <span className={clsx(styles.icon, styles.iconDashboardContainer)}>{<AiFillCaretDown/>}
                            <ul className={styles.iconDashboard}>
                                <Link to='/user' style={{textDecoration: 'none', color:'#fff'}}>
                                    <li className={styles.dashboardItem}>Trang cá nhân</li>
                                </Link>
                                <li className={styles.dashboardItem}>Dark mode</li>
                                <Link to='' style={{textDecoration: 'none'}}>
                                    <li className={styles.dashboardItem}><Logout/></li>
                                </Link>
                            </ul>
                        </span>
                    </div>

               </div>
            </div>

            <div className={clsx(styles.containerIcon, styles.iconMobile)}>
                    <Link to="/home">
                        <span className={active === 1 ? styleTheme + " " + styleActive : styleTheme} onClick={() => setActive(1)}><AiFillHome/></span>
                    </Link>
                    
                    <Link to="/home">
                        <span className={active === 2 ? styleTheme + " " + styleActive : styleTheme} onClick={() => setActive(2)}><AiFillCompass/></span>
                    </Link>
                    
                    <Link to="/home">
                        <span className={active === 3 ? styleTheme + " " + styleActive : styleTheme} onClick={() => setActive(3)}><FaUserFriends/></span>
                    </Link>
                    
                    <Link to="/home">
                        <span className={active === 4 ? styleTheme + " " + styleActive : styleTheme} onClick={() => setActive(4)}><AiFillMessage/></span>
                    </Link>
                    
                    <Link to="/home">
                        <span className={active === 5 ? styleTheme + " " + styleActive : styleTheme} onClick={() => setActive(5)}><AiFillHeart/></span>
                    </Link>
                    <Link to="/home">
                        <span className={active === 6 ? styleTheme + " " + styleActive : styleTheme} onClick={() => setActive(6)}><FaSearch/></span>
                    </Link>
                  
               </div>
        </div>
    );
}

export default Header;