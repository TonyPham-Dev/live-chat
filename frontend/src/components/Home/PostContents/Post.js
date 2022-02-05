import React, { useEffect, useState, useRef, memo } from "react";
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
import { TiDelete } from "react-icons/ti";
import InputEmoji from "react-input-emoji";
import { MdModeEdit } from "react-icons/md";
import { GiEarthAsiaOceania } from "react-icons/gi";
import { BsCodeSlash, BsFillBellSlashFill, BsCalendar3 } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";
import styles from "./postContent.module.css";
function Post({ post, userData, indexPost, setAllPosts }) {
  const apiServer = "http://localhost:3000";
  const dashboardRef = useRef();
  const accessToken = localStorage.getItem("accessToken");
  const { user } = useAuth0();
  const [text, setText] = useState("");
  const [saveText, setSaveText] = useState([]);
  const imageRef = useRef(null);
  const [posts, setPosts] = useState([]);
  const [imgFull, setImgFull] = useState("");
  const [id, setId] = useState("");
  //   const [allPosts, setAllPosts] = useState([]);
  const [liked, setLiked] = useState(false);
  const [openDashboard, setOpenDashboard] = useState(false);
  const [saveIdPost, setSaveIdPost] = useState(null);
  const [openDashboardDeletePost, setOpenDashboardDeletePost] = useState(false);
  const [numberOfElement, setNumberOfElement] = useState(3);
  // scroll to top when restart app
  //   useEffect(() => {
  //     window.scrollTo({ top: 0, behavior: "smooth" });
  //   }, []);
  //   // check is null or undefined
  const checkObjectIsUndefined = (obj) => {
    return Object.keys(obj).length > 0;
  };

  // go to post id
  const handleImageFullImage = (img, index) => {
    setImgFull(img);
  };

  const handleCountLikePost = async (id) => {
    const config = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };
    // button like
    await axios
      .post(`${apiServer}/api/like/toggle/${id}`, {}, config)

      .catch((error) => {
        console.log(error);
      });

    // get like of post
    await axios.get(`${apiServer}/api/like/${id}`).then((response) => {
      if (response.data.success) {
        setAllPosts((prev) => {
          const newPosts = [...prev];
          // index
          const index = prev.indexOf(prev.find((post) => post._id == id));
          // set lại
          newPosts[index].like[0] = response.data.likes;
          return newPosts;
        });
      }
    });
  };
  // post comment in post
  const handleOnEnter = async (id) => {
    // post comment
    await fetch(`${apiServer}/api/comments/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ content: text }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

    // get comments
    await axios.get(`${apiServer}/api/comments/${id}`).then((response) =>
      setAllPosts((prev) => {
        const newPosts = [...prev];
        const index = prev.indexOf(prev.find((post) => post._id == id));
        newPosts[index].comment[0] = response.data.comments;
        return newPosts;
      })
    );
  };

  // open dashboard
  const handleOpenDashboard = (id) => {
    if (saveIdPost) {
      setSaveIdPost("");
    } else {
      setSaveIdPost(id);
    }
    // setOpenDashboard(!openDashboard)
  };

  // delete Post
  const handleDeletePost = async (id, index) => {
    console.log(id);
    const config = {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };
    await fetch(`${apiServer}/api/posts/${id}`, config)
      .then((response) => {
        if (response.ok) {
          console.log(index);
          setAllPosts((prev) => {
            const newPost = [...prev];
            newPost.splice(index, 1);
            return newPost;
          });
          setSaveIdPost("");
        }
        response.json();
      })
      .then((data) => {})
      .catch((err) => console.log(err));
    setOpenDashboardDeletePost(false);
  };

  // giới hạn comment là 3
  const sliceData = post.comment[0].commentList.slice(0, numberOfElement);

  const handleLoadMoreComment = () => {
    setNumberOfElement(numberOfElement + numberOfElement);
  };
  return (
    <>
      {openDashboardDeletePost && (
        // <div>
          <div
            className="overlayBackground"
            onClick={() => setOpenDashboardDeletePost(false)}
          ></div>
      )}
     {openDashboardDeletePost && (
          <div className={styles.dashboardDeletePost}>
            <div className={styles.dashboard}>
              <div className={styles.dashboardHeader}>
                <h3>Xóa bài viết</h3>
                <span
                  className={styles.iconDeletePost}
                  onClick={() => setOpenDashboardDeletePost(false)}
                >
                  <TiDelete />
                </span>
              </div>
              <div className={styles.dashboardContent}>
                <h4>
                  Xóa bài viết sẽ không thể thu hồi lại được, bạn có chắc xóa
                  bài viết ?
                </h4>
              </div>
              <div className={styles.dashboardButton}>
                <button
                  className={styles.ButtonClear}
                  onClick={() => setOpenDashboardDeletePost(false)}
                >
                  Huỷ
                </button>
                <button
                  className={styles.ButtonDelete}
                  onClick={() => handleDeletePost(post.id, indexPost)}
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        // </div>
      )}
      <div className={styles.posts}>
        {/* user */}
        <div className={styles.user}>
          <Link
            to={`/user/${user && user.nickname}?full=true`}
            style={{ textDecoration: "none" }}
          >
            <div className={styles.userContainer}>
              {userData[post.author].avatarUrl && (
                <img
                  className={styles.imageUser}
                  src={userData[post.author].avatarUrl}
                />
              )}
              <div>
                <h4 style={{ color: "#3a3b3c", userSelect: "none" }}>
                  {userData && userData[post.author].fullName}
                </h4>
                <h5 style={{ color: "#3a3b3c", marginTop: "5px" }}>
                  {Moment(post.createdAt).format("LLL")}
                </h5>
              </div>
            </div>
          </Link>
          {/* edit and remove post */}
          <div className={styles.removeAndEditPost}>
            <span
              className={styles.userMore}
              onClick={() => handleOpenDashboard(post.id)}
            >
              <FiMoreHorizontal />
            </span>
            {/* icons remove post */}
            {saveIdPost == post.id && (
              <span
                ref={dashboardRef}
                className={clsx(
                  styles.removeAndEditPostContainer,
                  styles.clickDashboard
                )}
              >
                <div className={styles.iconOfRemovePost}>
                  <span className={styles.iconOfDashboard}>
                    <MdModeEdit />
                  </span>
                  <span>Chỉnh sửa bài viết</span>
                </div>
                <div className={styles.iconOfRemovePost}>
                  <span className={styles.iconOfDashboard}>
                    <BiCommentEdit />
                  </span>
                  <span>Xem lịch sử chỉnh sửa</span>
                </div>
                <div className={styles.iconOfRemovePost}>
                  <span className={styles.iconOfDashboard}>
                    <GiEarthAsiaOceania />
                  </span>
                  <span>Chỉnh sửa đối tượng</span>
                </div>
                <div
                  className={styles.iconOfRemovePost}
                  onClick={() => {
                    setOpenDashboardDeletePost(true);
                    setSaveIdPost("");
                  }}
                >
                  <span className={styles.iconOfDashboard}>
                    <RiDeleteBin5Fill />
                  </span>
                  <span>Xóa bài viết</span>
                </div>
                <div className={styles.iconOfRemovePost}>
                  <span className={styles.iconOfDashboard}>
                    <BsCodeSlash />
                  </span>
                  <span>Nhúng</span>
                </div>
                <div className={styles.iconOfRemovePost}>
                  <span className={styles.iconOfDashboard}>
                    <BsFillBellSlashFill />
                  </span>
                  <span>Tắt thông báo bài viết</span>
                </div>
                <div className={styles.iconOfRemovePost}>
                  <span className={styles.iconOfDashboard}>
                    <BsCalendar3 />
                  </span>
                  <span>Chỉnh sửa ngày</span>
                </div>
                <div className={styles.iconOfRemovePost}>
                  <span className={styles.iconOfDashboard}>
                    <RiDeleteBack2Fill />
                  </span>
                  <span>Ẩn khỏi trang cá nhân</span>
                </div>
              </span>
            )}
          </div>
        </div>
        {/* content */}
        <div className={styles.content}>
          {/* title content */}
          <div>
            <h4 className={styles.titleContent} style={{ color: "#3a3a3a" }}>
              {/* {console.log(post.body)} */}
              {post.body}
            </h4>
          </div>

          {/* image content */}
          {post.imgList.length > 0 && (
            <div className={styles.imageContent}>
              <div ref={imageRef} className={styles.container}>
                {post.imgList.map((img, index) => {
                  return (
                    <img
                      key={index}
                      style={{
                        width: `calc(100% /${post.imgList.length}`,
                      }}
                      className={styles.postImage}
                      src={`${apiServer}/api/media/${img}`}
                      onClick={() => handleImageFullImage(img, index)}
                    />
                  );
                })}
              </div>
            </div>
          )}
          {/* video content */}
          {post.vidList.length > 0 && (
            <div className={styles.videoContent}>
              <div className={styles.imageContent}>
                <div ref={imageRef} className={styles.container}>
                  {post.vidList.map((video, index) => {
                    return (
                      <video
                        key={index}
                        style={{
                          width: `calc(100% /${post.vidList.length}`,
                        }}
                        controls
                        className={styles.postVideo}
                        src={`${apiServer}/api/media/${video}`}
                        // onClick={() => handleImageFullImage(img, index)}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          {/* count like and comment */}
          <div className={styles.likeAndComments}>
            <div className={styles.like}>
              <span className={styles.iconLike}>
                <span>
                  <AiFillLike />
                </span>
              </span>
              <span className={styles.countLike}>
                {post.like[0].likeList.length > 0 &&
                  `${post.like[0].likeList[0] ? "Bạn" : ""} ${
                    post.like[0].likeCount - 1 == 0 ? "" : "cùng"
                  } ${
                    post.like[0].likeCount - 1 == 0
                      ? ""
                      : post.like[0].likeCount + " người khác"
                  }`}
              </span>
            </div>
            <div className={styles.comment}>
              <span className={styles.countComment}>
                {post.comment[0].commentList &&
                  post.comment[0].commentList.length}
              </span>
              <span className={styles.comments}>Comment</span>
            </div>
          </div>
          {/* button like and comment and share*/}
          <div className={styles.likeAndCommentContainer}>
            <div
              className={
                post && post.like[0].likeList.includes(user && user.nickname)
                  ? clsx(styles.likeContainer, styles.likes)
                  : styles.likeContainer
              }
              onClick={() => handleCountLikePost(post.id)}
            >
              <span className={styles.iconLikes}>
                <BiLike />
              </span>
              <span className={styles.titleLike}>Like</span>
            </div>
            <div className={styles.commentContainer}>
              <span className={styles.iconComments}>
                <BiComment />
              </span>
              <span className={styles.titleComment}>Comment</span>
            </div>
            <div className={styles.shareContainer}>
              <span className={styles.iconShare}>
                <RiShareForwardLine />
              </span>
              <span className={styles.titleShare}>Share</span>
            </div>
          </div>
        </div>
        {/* input comment */}
        <div className={styles.inputCommentContainer}>
          <img src={user && user.picture} className={styles.userInput} />
          <span className={styles.input}>
            <InputEmoji
              value={text}
              onChange={setText}
              cleanOnEnter
              onEnter={() => handleOnEnter(post.id)}
              placeholder="Write a comment..."
            />
          </span>
        </div>

        {/* list comments */}
        <div className={styles.listComments}>
          {/* render list comment */}
          {/* {saveText.map((text, index) => { */}
          {/* return ( */}
          <div className={styles.listComment}>
            {checkObjectIsUndefined(post.comment[0]) &&
            post.comment[0].commentList
              ? sliceData.map((comment, index) => {
                  return (
                    <React.Fragment key={index}>
                      <div key={index}>
                        <div className={styles.item}>
                          <img
                            className={styles.userComment}
                            src={user && user.picture}
                          />
                          <div className={styles.contentComment}>
                            <h3 className={styles.nameUser}>
                              {user && user.name}
                            </h3>
                            <h4>{comment.content}</h4>
                          </div>
                        </div>
                        <div className={styles.commentEmoji}>
                          <span className={styles.itemIcon}>
                            <BiLike />
                          </span>
                          <span className={styles.itemIcon}>
                            <BiComment />
                          </span>
                          <span className={styles.itemIcon}>
                            {Moment(comment.createdAt).format("LT")}
                          </span>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })
              : null}
            {/* load more comments */}
            {post.comment[0].commentList.length > 2 && (
              <div
                className={styles.loadMoreComments}
                onClick={() => handleLoadMoreComment()}
              >
                <button className={styles.moreComments}>
                  Xem thêm bình luận
                </button>
              </div>
            )}
          </div>
          {/* })} */}
        </div>
      </div>
    </>
  );
}

export default Post;
