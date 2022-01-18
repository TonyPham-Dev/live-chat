import React, { memo, useState } from "react";
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
function HeaderProfile({ userAdmin }) {
  const { user } = useAuth0();
  const [openSeeMore, setOpenSeeMore] = useState(false);
  const [openMore, setOpenMore] = useState(false);
  return (
    <div>
      <div className={styles.pageProfile}>
        {/* header */}
        <div className={styles.headerProfile}>
          <div className={styles.coverImage}>
            <img className={styles.image} src={coverImage} />
            <div className={styles.avatarUser}>
              <img className={styles.avatar} src={user && user.picture} />
            </div>
          </div>
        </div>
        <div className={styles.nameUser}>
          <h1>{user && user.name}</h1>
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
          <div className={styles.buttonEdit}>
            <button className={styles.button}>Edit Profile</button>
          </div>
          <div className={styles.buttonLiked}>
            <button className={clsx(styles.button, styles.buttonLiked)}>
              Liked Post
            </button>
          </div>
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
