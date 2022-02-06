import React, { useEffect, useState } from "react";
import styles from "./profile.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import HeaderProfile from "./HeaderProfile";
import ProfileContent from "./ProfileContent";
import axios from "axios";
// import
function Profile(props) {
  const apiServer = "http://localhost:3000";
  const { user } = useAuth0();
  const { username } = useParams();
  const [aboutUser, setAboutUser] = useState({});
  // console.log(aboutUser);
  useEffect(() => {
    username !== undefined &&
      axios
        .get(`${apiServer}/api/user/${username}?full=true`)
        .then((response) => {
          if (response.data.success) {
            setAboutUser(response.data);
          }
        });
  }, [username]);

  return (
    <div className={styles.ProfileContainer}>
      <div className={styles.profile}>
        <HeaderProfile user={aboutUser} />
      </div>
      <div className={styles.profileContent}>
        <ProfileContent user={aboutUser} />
      </div>
    </div>
  );
}

export default Profile;
