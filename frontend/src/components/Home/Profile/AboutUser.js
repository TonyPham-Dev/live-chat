import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Moment from "moment";
import { Link } from "react-router-dom";
import styles from "./profile.module.css";
import { ImHome3 } from "react-icons/im";
import { AiFillHeart } from "react-icons/ai";
import { MdAccessTimeFilled, MdContacts } from "react-icons/md";
function AboutUser({ aboutUser }) {
  const checkObjectIsUndefined = (obj) => {
    return obj && Object.keys(obj).length > 0;
  };
  return (
    <div className={styles.aboutContainer}>
      <h3 style={{ color: "#e4e6eb" }}>Giới thiệu</h3>
      <div className={styles.AboutUser}>
        <span className={styles.infomationUser}>
          <ImHome3 />
          <h4 style={{ marginLeft: "8px" }}>Sống tại Việt Nam</h4>
        </span>
        <span className={styles.infomationUser}>
          <AiFillHeart />
          <h4 style={{ marginLeft: "8px" }}>Độc Thân</h4>
        </span>
        <span className={styles.infomationUser}>
          <MdAccessTimeFilled />
          <h4 style={{ marginLeft: "8px" }}>
            {checkObjectIsUndefined(aboutUser)
              ? `Tham gia vào ${Moment(aboutUser && aboutUser.user.createdAt).format(
                  "DD-MM-YYYY"
                )}`
              : ""}
          </h4>
        </span>
        <span className={styles.infomationUser}>
          <MdContacts />
          <a
            className={styles.linkEmail}
            href={`mailto:${
              checkObjectIsUndefined(aboutUser) && aboutUser.user.email
            }`}
          >
            <h4 style={{ marginLeft: "8px" }}>
              {checkObjectIsUndefined(aboutUser)
                ? `Liên hệ ${aboutUser && aboutUser.user.email}`
                : ""}
            </h4>
          </a>
        </span>
        {/* button settings */}
        <div className={styles.buttons}>
          <button className={styles.buttonProfile}>Chỉnh sửa bài viết</button>
        </div>
        <div className={styles.buttons}>
          <button className={styles.buttonProfile}>Thêm sở thích</button>
        </div>
        <div className={styles.buttons}>
          <button className={styles.buttonProfile}>
            Thêm nội dung đáng chú ý
          </button>
        </div>
      </div>
    </div>
  );
}

export default AboutUser;
