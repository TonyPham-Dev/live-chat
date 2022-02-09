import React, { memo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CgMore } from "react-icons/cg";
import { AiFillEye, AiFillWarning, AiTwotoneSetting } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { BsFillArchiveFill } from "react-icons/bs";
import { IoMdTimer } from "react-icons/io";
import { MdOutlineExpandMore } from "react-icons/md";
import coverImage from "../PostContents/image/coverImage.jpg";
import imageUser from "../PostContents/image/imageUser.jpg";
import styles from "./profile.module.css";
import clsx from "clsx";
import { useAuth0 } from "@auth0/auth0-react";
function HeaderProfile({ userAdmin, user, follow, setFollowUser }) {
  console.log(
    "🚀 ~ file: HeaderProfile.js ~ line 16 ~ HeaderProfile ~ follow",
    follow
  );
  // console.log(user);
  const apiServer = "http://localhost:3000";
  const accessToken = localStorage.getItem("accessToken");
  const { user: userFromAuth0 } = useAuth0();

  const [openSeeMore, setOpenSeeMore] = useState(false);
  const [openMore, setOpenMore] = useState(false);
  const [checkFollow, setCheckFollow] = useState(false);
  // check friends is null or undefined
  const checkObjectIsUndefined = (obj) => {
    return obj && Object.keys(obj).length > 0;
  };

  // submit follow
  const handleSubmitFollow = async () => {
    const config = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };
    if (checkObjectIsUndefined(user.user)) {
      await axios
        .get(`${apiServer}/api/follow/toggle/${user.user.nickname}`, config)
        .then((response) => {
          console.log(
            "🚀 ~ file: HeaderProfile.js ~ line 40 ~ .then ~ response",
            response
          );
          setFollowUser(response.data.follow);
        });
    }
  };

  return (
    <div>
      <div className={styles.pageProfile}>
        {/* header */}
        <div className={styles.headerProfile}>
          <div className={styles.coverImage}>
            <img className={styles.image} src={coverImage} />
            <div className={styles.avatarUser}>
              <img
                className={styles.avatar}
                src={
                  checkObjectIsUndefined(user) ? user.user.avatarUrl : undefined
                }
              />
            </div>
          </div>
        </div>
        <div className={styles.nameUser}>
          <h1>{checkObjectIsUndefined(user) && user.user.fullName}</h1>
        </div>
      </div>
      {/* see more */}
      <div className={styles.seeMore}>
        <ul className={styles.listItem}>
          <Link style={{ textDecoration: "none" }} to="/user">
            <span className={styles.item}>Bài viết</span>
          </Link>
          <Link style={{ textDecoration: "none" }} to="#">
            <span className={styles.item}>Giới thiệu</span>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/friends">
            <span className={styles.item}>Bạn bè</span>
          </Link>
          <Link style={{ textDecoration: "none" }} to="#">
            <span className={styles.item}>Ảnh</span>
          </Link>
          <Link style={{ textDecoration: "none" }} to="#">
            <span className={styles.item}>Video</span>
          </Link>

          {/* see more */}
          <div className={styles.MoreContainer}>
            <span
              className={clsx(styles.item, styles.more)}
              onClick={() => setOpenMore(!openMore)}
            >
              Xem Thêm
            </span>

            {openMore && (
              <div className={styles.listItemMore}>
                <Link
                  to="#"
                  className={styles.moreItemContainer}
                  style={{ textDecoration: "none" }}
                >
                  <span className={styles.moreItem}>Thể thao</span>
                </Link>
                <Link
                  to="#"
                  className={styles.moreItemContainer}
                  style={{ textDecoration: "none" }}
                >
                  <span className={styles.moreItem}>Âm nhạc</span>
                </Link>
                <Link
                  to="#"
                  className={styles.moreItemContainer}
                  style={{ textDecoration: "none" }}
                >
                  <span className={styles.moreItem}>Phim</span>
                </Link>
                <Link
                  to="#"
                  className={styles.moreItemContainer}
                  style={{ textDecoration: "none" }}
                >
                  <span className={styles.moreItem}>Chương trình TV</span>
                </Link>
                <Link
                  to="#"
                  className={styles.moreItemContainer}
                  style={{ textDecoration: "none" }}
                >
                  <span className={styles.moreItem}>Sách</span>
                </Link>
                <Link
                  to="#"
                  className={styles.moreItemContainer}
                  style={{ textDecoration: "none" }}
                >
                  <span className={styles.moreItem}>Ứng dụng và trò chơi</span>
                </Link>
                <Link
                  to="#"
                  className={styles.moreItemContainer}
                  style={{ textDecoration: "none" }}
                >
                  <span className={styles.moreItem}>Thích</span>
                </Link>
                <Link
                  to="#"
                  className={styles.moreItemContainer}
                  style={{ textDecoration: "none" }}
                >
                  <span className={styles.moreItem}>Sự Kiện</span>
                </Link>
                <Link
                  to="#"
                  className={styles.moreItemContainer}
                  style={{ textDecoration: "none" }}
                >
                  <span className={styles.moreItem}>Câu hỏi</span>
                </Link>
                <Link
                  to="#"
                  className={styles.moreItemContainer}
                  style={{ textDecoration: "none" }}
                >
                  <span className={styles.moreItem}>Bài đánh giá đã viết</span>
                </Link>
                <Link
                  to="#"
                  className={styles.moreItemContainer}
                  style={{ textDecoration: "none" }}
                >
                  <span className={styles.moreItem}>Nhóm</span>
                </Link>
                <Link
                  to="#"
                  className={styles.moreItemContainer}
                  style={{ textDecoration: "none" }}
                >
                  <span className={styles.moreItem}>Quản lý các phần</span>
                </Link>
              </div>
            )}
          </div>
        </ul>
        {/* follow user */}

        <div className={styles.buttonContainer}>
          <div className={styles.buttonLiked}>
            <button className={clsx(styles.button, styles.buttonLiked)}>
              {`${
                checkObjectIsUndefined(follow) && follow.following.length
              } Đang Follow`}
            </button>
          </div>
          <div className={styles.buttonEdit}>
            <button className={styles.button}>{`${
              checkObjectIsUndefined(follow) && follow.followed.length
            } Follower`}</button>
          </div>
          {/* button follow */}
          {checkObjectIsUndefined(user.user) &&
          checkObjectIsUndefined(userFromAuth0) &&
          user.user.nickname ===
            userFromAuth0.nickname ? null : checkObjectIsUndefined(follow) &&
            checkObjectIsUndefined(userFromAuth0) &&
            follow.followed.find((user) => {
              return user === userFromAuth0.nickname;
            }) ? (
            <div className={styles.buttonFollowContainer}>
              <button
                className={clsx(
                  styles.button,
                  styles.buttonLiked,
                  styles.buttonFollow
                )}
                onClick={handleSubmitFollow}
              >
                Hủy Follow
              </button>
            </div>
          ) : (
            <button
              className={clsx(
                styles.button,
                styles.buttonLiked,
                styles.removeButtonFollow
              )}
              onClick={handleSubmitFollow}
            >
              Follow
            </button>
          )}
          <div className={styles.buttonMoreContainer}>
            <button
              className={clsx(styles.button, styles.buttonMore)}
              onClick={() => setOpenSeeMore(!openSeeMore)}
            >
              <CgMore />
            </button>
            {openSeeMore && (
              <ul className={styles.seeMoreContainer}>
                <li className={styles.iconItem}>
                  <AiFillEye />
                  <span className={styles.contentIcon}>View As</span>
                </li>
                <li className={styles.iconItem}>
                  <FaSearch />
                  <span className={styles.contentIcon}>Search Profile</span>
                </li>
                <li className={styles.iconItem}>
                  <AiFillWarning />
                  <span className={styles.contentIcon}>Account Status</span>
                </li>
                <li className={styles.iconItem}>
                  <IoMdTimer />
                  <span className={styles.contentIcon}>Story Archive</span>
                </li>
                <li className={styles.iconItem}>
                  <AiTwotoneSetting />
                  <span className={styles.contentIcon}>
                    Profile and Tagging Settings
                  </span>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(HeaderProfile);
