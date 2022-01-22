import React, {memo} from 'react';
import InputEmoji from "react-input-emoji";
import { useAuth0 } from "@auth0/auth0-react";
import clsx from "clsx";
import { BsFillImageFill } from "react-icons/bs";
import { RiVideoFill } from "react-icons/ri";
import { IoIosVideocam } from "react-icons/io";
import styles from "../Posts/post.module.css";
function WritePost({user}) {
    return (
      <div className={clsx(styles.textareaContainer, styles.profilePost)}>
        <form className={styles.profilePostContent}>
          <div className={styles.profileRightUser}>
            <img className={styles.profileImage} src={user && user.avatarUrl} />
          </div>
          <InputEmoji
            className={styles.inputPost}
            placeholder={`What's on your mind,${user && user.fullName}?`}
          />
        </form>
        <div className={styles.imageAndVideoAndStreaming}>
          <span className={clsx(styles.iconInput, styles.image)}>
            <BsFillImageFill /> <span className={clsx(styles.titleIcon, styles.ProfileTitlePost)}>Image</span>
          </span>
          <span className={clsx(styles.iconInput, styles.video)}>
            <RiVideoFill />
            <span className={clsx(styles.titleIcon, styles.ProfileTitlePost)}>Video</span>
          </span>
          <span className={clsx(styles.iconInput, styles.streaming)}>
            <IoIosVideocam />
            <span className={clsx(styles.titleIcon, styles.ProfileTitlePost)}>Streaming</span>
          </span>
        </div>
      </div>

    );
}

export default memo(WritePost);