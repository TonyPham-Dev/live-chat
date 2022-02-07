import React, { useEffect, useState } from "react";
import styles from "./profile.module.css";
import ProFileContentLeft from "./ProFileContentLeft";
import ProFileContentRight from "./ProFileContentRight";
function ProfileContent({ user }) {
  return (
    <div className={styles.ProfileContentContainer}>
      <div className={styles.ProfileContentLeft}>
        <ProFileContentLeft user={user} />
      </div>

      <div className={styles.ProfileContentRight}>
        <ProFileContentRight user={user} />
      </div>
    </div>
  );
}

export default ProfileContent;
