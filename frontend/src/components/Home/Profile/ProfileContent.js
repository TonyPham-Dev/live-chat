import React, { useEffect, useState } from "react";
import styles from "./profile.module.css";
import ProFileContentLeft from "./ProFileContentLeft";
import ProFileContentRight from "./ProFileContentRight";
function ProfileContent({ user }) {
  // console.log(user);
  const [postContent, setPostContent] = useState([]);

  useEffect(() => {
    setPostContent(user.posts);
  }, [user]);
  return (
    <div className={styles.ProfileContentContainer}>
      <div className={styles.ProfileContentLeft}>
        <ProFileContentLeft user={user} />
      </div>

      <div className={styles.ProfileContentRight}>
        <ProFileContentRight postContent={postContent} user={user} />
      </div>
    </div>
  );
}

export default ProfileContent;
