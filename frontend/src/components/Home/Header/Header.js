import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AiFillHome,
  AiFillCompass,
  AiFillMessage,
  AiFillHeart,
  AiFillCaretDown,
} from "react-icons/ai";
import { FaUserFriends, FaSearch } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import clsx from "clsx";

import Notification from "./notification/Notification";
import Logout from "../../Login/Logout";
import logo from "../Header/image/logo.jpg";
import imageUser from "../Header/image/imageUser.jpg";
import styles from "./header.module.css";

function Header(props) {
  const styleTheme = styles.icon;
  const styleActive = styles.active;
  const styleNotification = styles.notification;
  const [active, setActive] = useState(1);
  const [openNotification, setOpenNotification] = useState(false);

  const [openDashboard, setDashboard] = useState(false);
  console.log("re-render");
  return (
    <div className={styles.headerContainer}>
      <div className={styles.container}>
        {/* logo */}
        <div className={styles.logoContainer}>
          <Link to="/home" replace>
            <img src={logo} className={styles.logo} />
          </Link>
        </div>

        {/* icon */}
        <div className={styles.containerIcon}>
          <Link to="/home">
            <span
              className={
                active === 1 ? styleTheme + " " + styleActive : styleTheme
              }
              onClick={() => setActive(1)}
            >
              <AiFillHome />
            </span>
          </Link>

          <Link to="">
            <span
              className={
                active === 2 ? styleTheme + " " + styleActive : styleTheme
              }
              onClick={() => setActive(2)}
            >
              <AiFillCompass />
            </span>
          </Link>

          <Link to="/friends">
            <span
              className={
                active === 3 ? styleTheme + " " + styleActive : styleTheme
              }
              onClick={() => setActive(3)}
            >
              <FaUserFriends />
            </span>
          </Link>

          <Link to="/message">
            <span
              className={
                active === 4 ? styleTheme + " " + styleActive : styleTheme
              }
              onClick={() => setActive(4)}
            >
              <AiFillMessage />
            </span>
          </Link>

          <Link to="">
            <span
              className={
                active === 5 ? styleTheme + " " + styleActive : styleTheme
              }
              onClick={() => setActive(5)}
            >
              <AiFillHeart />
            </span>
          </Link>
        </div>

        {/* input */}
        <form className={styles.formContainer}>
          <input className={styles.input} placeholder="Search ..." />
          <span className={styles.iconSearch}>
            <FaSearch />
          </span>
        </form>
        {/* user and notification */}
        <div className={styles.containerUser}>
          <div>
            <span
              onClick={() => setOpenNotification(!openNotification)}
              className={styleTheme + " " + styleNotification}
            >
              <IoMdNotifications />
            </span>
            <span>{openNotification && <Notification />}</span>
          </div>
          <div className={styles.user}>
            <Link to="/user" style={{ textDecoration: "none" }}>
              <div className={styles.userContainer}>
                <img className={styles.imageUser} src={props.urlPhoto} />
                <h2 className={styles.userName}>{props.useName}</h2>
              </div>
            </Link>

            {/* dashboard */}
            <span
              className={clsx(styles.icon, styles.iconDashboardContainer)}
              onClick={() => setDashboard(!openDashboard)}
            >
              {<AiFillCaretDown />}
              {openDashboard && (
                <ul
                  className={
                    openDashboard
                      ? styles.iconDashboard
                      : `${styles.iconDashboard} ${styles.disable}`
                  }
                >
                  <Link
                    to="/user"
                    style={{ color: "#fff", textDecoration: "none" }}
                  >
                    <li className={styles.dashboardItem}>Trang cá nhân</li>
                  </Link>
                  <li className={styles.dashboardItem}>Dark mode</li>
                  <Link to="" style={{ textDecoration: "none" }}>
                    <li className={styles.dashboardItem}>
                      <Logout />
                    </li>
                  </Link>
                </ul>
              )}
            </span>
          </div>
        </div>
      </div>

      <div className={clsx(styles.containerIcon, styles.iconMobile)}>
        <Link to="/home">
          <span
            className={
              active === 1 ? styleTheme + " " + styleActive : styleTheme
            }
            onClick={() => setActive(1)}
          >
            <AiFillHome />
          </span>
        </Link>

        <Link to="">
          <span
            className={
              active === 2 ? styleTheme + " " + styleActive : styleTheme
            }
            onClick={() => setActive(2)}
          >
            <AiFillCompass />
          </span>
        </Link>

        <Link to="/friends">
          <span
            className={
              active === 3 ? styleTheme + " " + styleActive : styleTheme
            }
            onClick={() => setActive(3)}
          >
            <FaUserFriends />
          </span>
        </Link>

        <Link to="/message">
          <span
            className={
              active === 4 ? styleTheme + " " + styleActive : styleTheme
            }
            onClick={() => setActive(4)}
          >
            <AiFillMessage />
          </span>
        </Link>

        <Link to="">
          <span
            className={
              active === 5 ? styleTheme + " " + styleActive : styleTheme
            }
            onClick={() => setActive(5)}
          >
            <AiFillHeart />
          </span>
        </Link>
        <Link to="">
          <span
            className={
              active === 6 ? styleTheme + " " + styleActive : styleTheme
            }
            onClick={() => setActive(6)}
          >
            <FaSearch />
          </span>
        </Link>
      </div>
    </div>
  );
}

export default Header;
