import React, { useEffect, useState, useRef, memo } from "react";
import Post from "./Post"
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import Moment from "moment";
import axios from "axios";
import clsx from "clsx";
import { AiFillLike } from "react-icons/ai";
import { BiLike, BiComment, BiCommentEdit } from "react-icons/bi";
import {
  RiShareForwardLine,
  RiDeleteBin5Fill,
  RiDeleteBack2Fill,
} from "react-icons/ri";
import InputEmoji from "react-input-emoji";
import { MdModeEdit } from "react-icons/md";
import { GiEarthAsiaOceania } from "react-icons/gi";
import { BsCodeSlash, BsFillBellSlashFill, BsCalendar3 } from "react-icons/bs";

import { FiMoreHorizontal } from "react-icons/fi";
import styles from "./postContent.module.css";
const apiServer = "http://localhost:3000";
function PostContents({ post, allPost, userData }) {
  const dashboardRef = useRef();
  const accessToken = localStorage.getItem("accessToken");
  const { user } = useAuth0();
  const [text, setText] = useState("");
  const [saveText, setSaveText] = useState([]);
  const imageRef = useRef(null);
  const [posts, setPosts] = useState([]);
  const [imgFull, setImgFull] = useState("");
  const [id, setId] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [liked, setLiked] = useState(false);
  const [openDashboard, setOpenDashboard] = useState(false);
  const [saveIdPost, setSaveIdPost] = useState(null);

  // scroll to top when restart app
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (allPost.length > 0) {
      setAllPosts(allPost);
    }
  }, [allPost]);


  return (
    <>
      <div className={styles.app}>
        {allPosts.length > 0 &&
          allPosts.map((post, index) => {
            return (
              <React.Fragment key={index}>
                <Post post={post} setAllPosts={setAllPosts} userData={userData} indexPost={index} />
              </React.Fragment>
            );
          })}

        {/* loading cho nay */}
      </div>
    </>
  );
}

export default memo(PostContents);
