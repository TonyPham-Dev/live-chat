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

// edit post
import { BsFillImageFill } from "react-icons/bs";
import { IoIosVideocam } from "react-icons/io";
import { FaTimesCircle } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import { RiVideoFill } from "react-icons/ri";
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

  // handle edit post
  const [openFormPost, setOpenFromPost] = useState(false);
  const [valuePost, setValuePost] = useState("");

  //state image
  const [fileImage, setFileImage] = useState([]);
  const [saveFileImage, setSaveFileImage] = useState([]);
  // state video mp4
  const [fileVideo, setFileVideo] = useState([]);
  const [saveVideo, setSaveVideo] = useState([]);
  const [checkEditPost, setCheckEditPost] = useState(false);
  const [editPost, setEditPost] = useState({});
  const valueRef = useRef();
  const inputPostRef = useRef();

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
    }).then((response) => response.json());

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
    const config = {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };
    await fetch(`${apiServer}/api/posts/${id}`, config)
      .then((response) => {
        if (response.ok) {
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

  // edit post

  // clear up image when reload app
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(fileImage);
    };
  }, [fileImage]);

  // clear up video when reload app
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(fileVideo);
    };
  }, [fileVideo]);

  // handle input file image
  const handelInputFileImage = (e) => {
    Array.from(e.target.files).forEach((file) => {
      setFileImage((prev) => [...prev, file]);
      setSaveFileImage((prev) => [...prev, URL.createObjectURL(file)]);
    });
  };
  // remove file image
  const handleDeleteFile = (index) => {
    const fileRemove = saveFileImage.filter(
      (file, indexImage) => indexImage !== index
    );
    URL.revokeObjectURL(fileRemove);
    URL.revokeObjectURL(fileImage);

    setSaveFileImage(fileRemove);
    setFileImage(fileRemove);
  };

  // handle input file video mp4
  const handleVideoPostChange = (e) => {
    Array.from(e.target.files).forEach((file) => {
      setFileVideo((prev) => [...prev, file]);
      setSaveVideo((prev) => [...prev, URL.createObjectURL(file)]);
    });
  };

  // when click remove file video mp4
  const handleDeleteVideo = (index) => {
    const fileVideoRemove = saveVideo.filter(
      (file, indexVideo) => indexVideo !== index
    );
    URL.revokeObjectURL(fileVideoRemove);
    URL.revokeObjectURL(fileVideo);
    setSaveVideo(fileVideoRemove);
    setFileVideo(fileVideoRemove);
  };

  // open form edit post
  const handleOpenPostProfile = (post, id) => {
    setOpenFromPost(true);
    if (post) {
      setValuePost(post.body);
    }
    setSaveIdPost("");
    // valueRef.current.focus();
  };

  // handle eidt post when click button
  const handleEditPostHome = async (id) => {
    // post content
    const formData = new FormData();
    formData.append("body", valuePost); // text
    fileImage.forEach((image) => {
      formData.append("images", image); // image
    });

    fileVideo.forEach((video) => {
      formData.append("videos", video); // video
    });

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "multipart/form-data",
      },
    };
    await axios
      .put(`${apiServer}/api/posts/${id}`, formData, config)
      .then((response) => {
        if (response.status === 200) {
          setCheckEditPost(true);
          setEditPost(response.data.post);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // open from post content
    setOpenFromPost(false);
    // clear value post
    setValuePost("");
    setFileImage([]);
    setFileVideo([]);
    setSaveFileImage([]);
    setSaveVideo([]);
    // valueRef.current.focus();
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
                Xóa bài viết sẽ không thể thu hồi lại được, bạn có chắc xóa bài
                viết ?
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

      {/* edit post when click see more */}
      {openFormPost && (
        <div
          className={styles.OverLay}
          onClick={() => setOpenFromPost(false)}
        ></div>
      )}
      {openFormPost && (
        <div
          className={clsx(
            styles.writerContainer,
            styles.writerContainerProfile
          )}
        >
          <div className={styles.writePost}>
            <div className={styles.titlePostContainer}>
              <h4 className={styles.titlePost}>Create Post</h4>
              <span
                className={styles.iconClosePost}
                onClick={() => setOpenFromPost(false)}
              >
                <FaTimesCircle />
              </span>
            </div>
            {/* user admin */}
            <div className={styles.contentPost}>
              <div className={styles.userPost}>
                <img
                  className={styles.imageAdmin}
                  src={
                    user && checkObjectIsUndefined(user) ? user.picture : null
                  }
                />
                <h4>{user && checkObjectIsUndefined(user) ? user.name : ""}</h4>
              </div>
              <form>
                <InputEmoji
                  ref={valueRef}
                  value={valuePost}
                  className={styles.inputPost}
                  placeholder={`What's on your mind,${
                    user && checkObjectIsUndefined(user) ? user.name : ""
                  }?`}
                  onChange={setValuePost}
                />
              </form>

              {/* render image post */}
              {saveFileImage && fileVideo
                ? saveFileImage.map((image, index) => {
                    return (
                      <span className={styles.renderImagePost} key={index}>
                        <img className={styles.renderImage} src={image} />
                        <span
                          className={styles.removeImage}
                          onClick={() => handleDeleteFile(index)}
                        >
                          <TiDeleteOutline />
                        </span>
                      </span>
                    );
                  })
                : null}

              {/* render video mp4 post */}

              {/* post video */}

              {saveVideo &&
                saveVideo.map((video, index) => {
                  return (
                    <span className={styles.renderVideoPost} key={index}>
                      <video controls className={styles.renderVideo}>
                        <source src={video} />
                      </video>
                      <span
                        className={styles.removeVideo}
                        onClick={() => handleDeleteVideo(index)}
                      >
                        <TiDeleteOutline />
                      </span>
                    </span>
                  );
                })}
              <div className={styles.imageAndVideoAndStreaming}>
                {/* open form post image */}
                <span className={clsx(styles.iconInput, styles.image)}>
                  <form className={styles.fromPostImage}>
                    <label htmlFor="imageEdit">
                      <BsFillImageFill />
                    </label>
                    <label
                      htmlFor="imageEdit"
                      className={clsx(styles.titleIcon, styles.iconPost)}
                    >
                      Image
                    </label>
                    <input
                      className={styles.inputPostImage}
                      id="imageEdit"
                      type="file"
                      multiple
                      disabled={fileImage.length === 10}
                      onChange={(e) => handelInputFileImage(e)}
                    />
                  </form>
                </span>

                {/* open form post video mp4 */}
                <span className={clsx(styles.iconInput, styles.video)}>
                  <form>
                    <label htmlFor="videoEdit">
                      <RiVideoFill />
                    </label>
                    <label
                      htmlFor="videoEdit"
                      className={clsx(styles.titleIcon, styles.iconPost)}
                    >
                      Video
                    </label>
                    <input
                      className={styles.videoPost}
                      id="videoEdit"
                      type="file"
                      multiple
                      disabled={fileVideo.length >= 5}
                      accept="video/mp4,video/x-m4v,video/*"
                      onChange={(e) => handleVideoPostChange(e)}
                    />
                  </form>
                </span>

                {/* streaming */}
                <span className={clsx(styles.iconInput, styles.streaming)}>
                  <IoIosVideocam />
                  <span className={clsx(styles.titleIcon, styles.iconPost)}>
                    Streaming
                  </span>
                </span>
              </div>

              {/* post */}
              <div
                className={styles.buttonPost}
                onClick={() => handleEditPostHome(post.id)}
              >
                <button className={styles.button}>Edit Post</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* post */}
      <div className={styles.posts}>
        {/* user */}
        <div className={styles.user}>
          <Link
            to={`/user/${
              checkObjectIsUndefined(userData) && userData[post.author].nickname
            }`}
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
                <div
                  className={styles.iconOfRemovePost}
                  onClick={() => handleOpenPostProfile(post, post.id)}
                >
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
              {checkEditPost ? editPost.body : post.body}
            </h4>
          </div>
          {/* image content */}
          {/* {post.imgList.length > 0 && ( */}
          {post.imgList.length > 0 && (
            <div className={styles.imageContent}>
              <div ref={imageRef} className={styles.container}>
                {checkEditPost
                  ? checkObjectIsUndefined(editPost) &&
                    editPost.imgList.map((img, index) => {
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
                    })
                  : checkObjectIsUndefined(post) &&
                    post.imgList.map((img, index) => {
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
          {/* )} */}
          {/* video content */}
          {/* {post.vidList.length > 0 && ( */}
          {post.vidList.length > 0 && (
            <div className={styles.videoContent}>
              <div className={styles.imageContent}>
                <div ref={imageRef} className={styles.container}>
                  {checkEditPost
                    ? checkObjectIsUndefined(editPost) &&
                      editPost.vidList.map((video, index) => {
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
                      })
                    : checkObjectIsUndefined(post) &&
                      post.vidList.map((video, index) => {
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
          {/* )} */}
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
                      : post.like[0].likeCount - 1 + " người khác"
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
                          <Link
                            to={`/user/${
                              userData && userData[comment.author].nickname
                            }`}
                          >
                            <img
                              className={styles.userComment}
                              src={
                                userData && userData[comment.author].avatarUrl
                              }
                            />
                          </Link>
                          <div className={styles.contentComment}>
                            <Link
                              style={{ textDecoration: "none", color: "#fff" }}
                              to={`/user/${
                                userData && userData[comment.author].nickname
                              }`}
                            >
                              <h3 className={styles.nameUser}>
                                {userData && userData[comment.author].fullName}
                              </h3>
                            </Link>
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
                            {Moment(comment.createdAt).format("lll")}
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
