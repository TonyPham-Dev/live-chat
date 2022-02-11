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
  const accessToken = localStorage.getItem("accessToken");
  const { username } = useParams();
  const [aboutUser, setAboutUser] = useState({});

  const [followUser, setFollowUser] = useState({});

  const checkObjectIsUndefined = (obj) => {
    return Object.keys(obj).length > 0;
  };
  useEffect(() => {
    username !== undefined &&
      axios
        .get(`${apiServer}/api/user/${username}?full=true`)
        .then((response) => {
          if (response.data.success) {
            setAboutUser(response.data);
            setFollowUser(response.data.user.follow[0]);
          }
        });
  }, [username]);
  return (
    <>
      {checkObjectIsUndefined(aboutUser) && (
        <div className={styles.ProfileContainer}>
          <div className={styles.profile}>
            <HeaderProfile
              user={aboutUser}
              follow={followUser}
              setFollowUser={setFollowUser}
            />
          </div>
          <div className={styles.profileContent}>
            <ProfileContent user={aboutUser} />
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
