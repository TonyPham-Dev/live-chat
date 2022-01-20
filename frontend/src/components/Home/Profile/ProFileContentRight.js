import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import WritePost from "./WritePost";
import {FiMoreHorizontal} from "react-icons/fi";
import styles from './profile.module.css'
function ProFileContentRight(props) {
  const { user } = useAuth0();
  return (
    <>
        {/* post profile */}
        <WritePost/>

        {/* content when posts */}
        <div className={styles.profilePostContentUser}>
          <div className={styles.profilePostUser}>
              <div className={styles.profileUser}>
                  <img src={user && user.picture} className={styles.profileUserImage}/>
                <div>
                    <h3 style={{color:'#fff', marginBottom:'5px'}}>{user && user.name}</h3>
                    <h5 className={styles.timePost}>20 tháng 12, 2021 lúc 15:02</h5>
                </div>
              </div>

              <div className={styles.PostUtlti}>
                  <FiMoreHorizontal/>
              </div>
          </div>
        </div>
    </>
  );
}

export default ProFileContentRight;
