import React, { useEffect, useState, memo } from "react";
import { GoPrimitiveDot } from "react-icons/go";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import styles from "./friends.module.css";
function User() {
  const apiServer = "http://localhost:3000";
  const { user } = useAuth0();
  const [users, setUsers] = useState({});
  // get user admin
  useEffect(() => {
    const getUser = () => {
      // console.log(user.nickname);
      user &&
        fetch(`${apiServer}/api/user/${user.nickname}`)
          .then((response) => response.json())
          .then((dataUser) => {
            setUsers(dataUser);
          });
    };
    getUser();
  }, [user]);

  const checkObjectIsNull = (object) => {
    return Object.keys(object).length > 0;
  };

  return (
    <div>
      <span className={styles.listFriends}>
        <Link
          to={`/user/${user && user.nickname}`}
          style={{ textDecoration: "none" }}
        >
          <div className={styles.userContainer}>
            <img
              className={styles.friendsImage}
              src={
                checkObjectIsNull(users)
                  ? users.user.avatarUrl
                  : "https://static2.yan.vn/YanNews/2167221/202003/dan-mang-du-trend-thiet-ke-avatar-du-kieu-day-mau-sac-tu-anh-mac-dinh-f4781c7a.jpg"
              }
            />
            <h4 className={styles.friendsName}>
              {checkObjectIsNull(users) ? (
                users.user.fullName
              ) : null}
            </h4>
          </div>
        </Link>
      </span>
    </div>
  );
}

export default memo(User);
