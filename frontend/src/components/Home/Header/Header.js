import React, { useState, useEffect, memo } from "react";
import { Link, useLocation } from "react-router-dom";
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
import { useAuth0 } from "@auth0/auth0-react";
import imageUser from "../Header/image/imageUser.jpg";
import styles from "./header.module.css";

function Header(props) {
  const { user } = useAuth0();
  const styleTheme = styles.icon;
  const styleActive = styles.active;
  const styleNotification = styles.notification;
  const [active, setActive] = useState(1);
  const [openNotification, setOpenNotification] = useState(false);

  const [openDashboard, setDashboard] = useState(false);
  const location = useLocation();
  useEffect(() => {
    switch (true) {
      case location.pathname.startsWith("/home"):
        setActive(1);
        break;
      case location.pathname.startsWith("/friends"):
        setActive(3);
        break;
      case location.pathname.startsWith("/message"):
        setActive(4);
        break;
    }
  }, []);
  return (
    <div className={styles.headerContainer}>
      {/* header_headerContainer__esYb5 */}
      <div className={styles.container}>
        {/* logo */}
        <div className={styles.logoContainer}>
          <Link to="/home" replace onClick={() => window.location.reload()}>
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

          <Link to="#">
            <span
              className={
                active === 2 ? styleTheme + " " + styleActive : styleTheme
              }
            >
              <AiFillCompass />
            </span>
          </Link>

          <Link to="#">
            <span
              className={
                active === 3 ? styleTheme + " " + styleActive : styleTheme
              }
              // onClick={() => setActive(3)}
            >
              <FaUserFriends />
            </span>
          </Link>

          <Link to={active === 4 ? "#" : "/message"}>
            <span
              className={
                active === 4 ? styleTheme + " " + styleActive : styleTheme
              }
              onClick={() => setActive(4)}
            >
              <AiFillMessage />
            </span>
          </Link>

          <Link to="#">
            <span
              className={
                active === 5 ? styleTheme + " " + styleActive : styleTheme
              }
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
            <Link
              to={`/user/${user.nickname}`}
              style={{ textDecoration: "none" }}
            >
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
                    to={`/user/${user.nickname}`}
                    style={{ color: "#fff", textDecoration: "none" }}
                  >
                    <li className={styles.dashboardItem}>Trang cá nhân</li>
                  </Link>
                  <li className={styles.dashboardItem}>Dark mode</li>
                  <Link to="" style={{ textDecoration: "none" }}>
                    <li className={styles.dashboardItem}>
                      <Logout logout={props.removeAuthentication} />
                    </li>
                  </Link>
                </ul>
              )}
            </span>
          </div>
        </div>
      </div>

      <div className={clsx(styles.containerIcon, styles.iconMobile)}>
        <Link to={"/home"}>
          <span
            className={
              active === 1 ? styleTheme + " " + styleActive : styleTheme
            }
            onClick={() => setActive(1)}
          >
            <AiFillHome />
          </span>
        </Link>

        <Link to="#">
          <span
            className={
              active === 2 ? styleTheme + " " + styleActive : styleTheme
            }
          >
            <AiFillCompass />
          </span>
        </Link>

        <Link to="#">
          <span
            className={
              active === 3 ? styleTheme + " " + styleActive : styleTheme
            }
            // onClick={() => setActive(3)}
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

        <Link to="#">
          <span
            className={
              active === 5 ? styleTheme + " " + styleActive : styleTheme
            }
          >
            <AiFillHeart />
          </span>
        </Link>
      </div>
    </div>
  );
}

export default memo(Header);
