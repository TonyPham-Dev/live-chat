import React from "react";
import { Link } from "react-router-dom";
import { BsFillImageFill } from "react-icons/bs";
import { RiVideoFill } from "react-icons/ri";
import { IoIosVideocam } from "react-icons/io";
import { FiMoreHorizontal } from "react-icons/fi";
import postImage1 from "../PostContents/image/postImage1.jpg";
import postImage2 from "../PostContents/image/postImage2.jpg";
import styles from "./post.module.css";
import clsx from "clsx";

function Posts(props) {
  return (
    <div className={styles.postContainer}>
      {/* user */}
      <div className={styles.userPost}>
        <img className={styles.coverImage} src={postImage1} />
        <Link to="/user">
          <div className={styles.user}>
            <img className={styles.avatar} src={postImage2} />
            <div className={styles.nameUser}>
              <h5 className={styles.name}>Phạm Văn Công</h5>
              <h6 className={styles.title}>Frontend Developer</h6>
            </div>
          </div>
        </Link>
      </div>
      {/* follows */}
      <div className={styles.follows}>
        <div className={styles.followers}>
          <h3>11K</h3>
          <p>Followers</p>
        </div>
        <div className={styles.following}>
          <h3>1.4K</h3>
          <p>Following</p>
        </div>
      </div>

      {/* text */}
      <div className={styles.textareaContainer}>
        <form>
          <input
            className={styles.input}
            type="text"
            placeholder="What on your mind..."
          />
        </form>
        <div className={styles.imageAndVideoAndStreaming}>
          <span className={clsx(styles.iconInput, styles.image)}>
            <BsFillImageFill /> <span className={styles.titleIcon}>Image</span>
          </span>
          <span className={clsx(styles.iconInput, styles.video)}>
            <RiVideoFill />
            <span className={styles.titleIcon}>Video</span>
          </span>
          <span className={clsx(styles.iconInput, styles.streaming)}>
            <IoIosVideocam />
            <span className={styles.titleIcon}>Streaming</span>
          </span>
        </div>
      </div>

      {/* Lastest Activity */}
      <div className={styles.activityContainer}>
        <div className={styles.activityHeader}>
          <h5 className={styles.activityTitle}>Lastest Activity</h5>
          <span className={styles.activityIcon}>
            <FiMoreHorizontal />
          </span>
        </div>
        {/* activity */}

        <div className={styles.activityContent}>
          {/* render activity */}
          <Link to={"/home"} style={{ textDecoration: "none" }}>
            <div className={styles.activity}>
              <div className={styles.activityImage}>
                <img className={styles.activityAvatar} src={postImage2} />
              </div>
              <div>
                <h4 className={styles.activityName}>
                  Phạm Văn Công đã thích bài đăng
                </h4>
              </div>
            </div>
          </Link>
          <Link to={"/home"} style={{ textDecoration: "none" }}>
            <div className={styles.activity}>
              <div className={styles.activityImage}>
                <img className={styles.activityAvatar} src={postImage2} />
              </div>
              <div>
                <h4 className={styles.activityName}>
                  Phạm Văn Công đã thích bài đăng
                </h4>
              </div>
            </div>
          </Link>
          <Link to={"/home"} style={{ textDecoration: "none" }}>
            <div className={styles.activity}>
              <div className={styles.activityImage}>
                <img className={styles.activityAvatar} src={postImage2} />
              </div>
              <div>
                <h4 className={styles.activityName}>
                  Phạm Văn Công đã thích bài đăng
                </h4>
              </div>
            </div>
          </Link>
          <Link to={"/home"} style={{ textDecoration: "none" }}>
            <div className={styles.activity}>
              <div className={styles.activityImage}>
                <img className={styles.activityAvatar} src={postImage2} />
              </div>
              <div>
                <h4 className={styles.activityName}>
                  Phạm Văn Công đã thích bài đăng
                </h4>
              </div>
            </div>
          </Link>
          <Link to={"/home"} style={{ textDecoration: "none" }}>
            <div className={styles.activity}>
              <div className={styles.activityImage}>
                <img className={styles.activityAvatar} src={postImage2} />
              </div>
              <div>
                <h4 className={styles.activityName}>
                  Phạm Văn Công đã thích bài đăng
                </h4>
              </div>
            </div>
          </Link>
          <Link to={"/home"} style={{ textDecoration: "none" }}>
            <div className={styles.activity}>
              <div className={styles.activityImage}>
                <img className={styles.activityAvatar} src={postImage2} />
              </div>
              <div>
                <h4 className={styles.activityName}>
                  Phạm Văn Công đã thích bài đăng
                </h4>
              </div>
            </div>
          </Link>
          <Link to={"/home"} style={{ textDecoration: "none" }}>
            <div className={styles.activity}>
              <div className={styles.activityImage}>
                <img className={styles.activityAvatar} src={postImage2} />
              </div>
              <div>
                <h4 className={styles.activityName}>
                  Phạm Văn Công đã thích bài đăng
                </h4>
              </div>
            </div>
          </Link>
          <Link to={"/home"} style={{ textDecoration: "none" }}>
            <div className={styles.activity}>
              <div className={styles.activityImage}>
                <img className={styles.activityAvatar} src={postImage2} />
              </div>
              <div>
                <h4 className={styles.activityName}>
                  Phạm Văn Công đã thích bài đăng
                </h4>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Posts;
