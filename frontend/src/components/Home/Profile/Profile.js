import React, { useEffect, useState } from "react";
import styles from "./profile.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import HeaderProfile from "./HeaderProfile";
import ProfileContent from "./ProfileContent";
// import
function Profile(props) {
  const apiServer = "http://localhost:3000";
  const { user } = useAuth0();
  const [userAdmin, setUserAdmin] = useState({});

//   useEffect(() => {
//     user &&
//       fetch(`${apiServer}/api/user/${user.nickname}`)
//         .then((response) => response.json())
//         .then((users) => setUserAdmin([users]));
//   }, [user]);
  return (
    <div className={styles.ProfileContainer}>
        <div className={styles.profile}>
          <HeaderProfile userAdmin={userAdmin} />
        </div>
        <div className={styles.profileContent}>
          <ProfileContent/>
        </div>
    </div>
  );
}

export default Profile;
