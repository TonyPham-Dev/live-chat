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

// edit posts
import { BsFillImageFill } from "react-icons/bs";
import { IoIosVideocam } from "react-icons/io";
import { FaTimesCircle } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import { RiVideoFill } from "react-icons/ri";
import styles from "../PostContents/postContent.module.css";
function PostsProfile({ user, post, indexPost, setAllPost }) {
  const { user: userFromAuth0 } = useAuth0();
  const apiServer = "http://localhost:3000";
  const dashboardRef = useRef();
  const accessToken = localStorage.getItem("accessToken");
  const [text, setText] = useState("");
  const imageRef = useRef(null);
  const [saveIdPost, setSaveIdPost] = useState(null);
  const [openDashboard, setOpenDashboard] = useState(false);
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
  // count like post
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
        setAllPost((prev) => {
          const newPosts = [...prev];
          // index
          const index = prev.indexOf(prev.find((posts) => posts._id == id));
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
      setAllPost((prev) => {
        const newPosts = [...prev];
        const index = prev.indexOf(prev.find((post) => post._id == id));
        newPosts[index].comment[0] = response.data.comments;
        return newPosts;
      })
    );
  };

  // open dashboard
  const handleOpenDashboard = (id) => {
    setOpenDashboard(!openDashboard);
    if (saveIdPost) {
      setSaveIdPost("");
    } else {
      setSaveIdPost(id);
    }
    // setOpenDashboardDeletePost(!openDashboardDeletePost);
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
          setAllPost((prev) => {
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
        <div
          className="overlayBackground"
          onClick={() => setOpenDashboardDeletePost(false)}
        ></div>
      )}
      {openFormPost && (
        <div
          className={styles.overLayEditPost}
          onClick={() => setOpenFromPost(false)}
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
      )}

      {/* edit post */}
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
                    userFromAuth0 && checkObjectIsUndefined(userFromAuth0)
                      ? userFromAuth0.picture
                      : null
                  }
                />
                <h4>
                  {userFromAuth0 && checkObjectIsUndefined(userFromAuth0)
                    ? userFromAuth0.name
                    : ""}
                </h4>
              </div>
              <form>
                <InputEmoji
                  ref={valueRef}
                  value={valuePost}
                  className={styles.inputPost}
                  placeholder={`What's on your mind,${
                    userFromAuth0 && checkObjectIsUndefined(userFromAuth0)
                      ? userFromAuth0.name
                      : ""
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
      <div className={clsx(styles.posts, styles.postsProfile)}>
        {/* user */}
        <div className={styles.user}>
          <Link
            to={`/user/${checkObjectIsUndefined(user) && user.user.nickname}`}
            style={{ textDecoration: "none" }}
          >
            <div className={styles.userContainer}>
              <img
                className={styles.imageUser}
                src={
                  checkObjectIsUndefined(post) ? user.user.avatarUrl : undefined
                }
              />
              <div>
                <h4 style={{ color: "#fff", userSelect: "none" }}>
                  {checkObjectIsUndefined(user) && user.user.fullName}
                </h4>
                <h5 style={{ color: "#fff", marginTop: "5px" }}>
                  {Moment(post && post.createdAt).format("LLL")}
                </h5>
              </div>
            </div>
          </Link>
          {/* edit and remove post */}
          <div className={styles.removeAndEditPost}>
            <span
              className={clsx(styles.userMore, styles.userMoreProfile)}
              onClick={() => handleOpenDashboard(user.id)}
            >
              <FiMoreHorizontal />
            </span>
            {/* icons remove post */}
            {openDashboard && saveIdPost == user.id && (
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
            <h4 className={styles.titleContent} style={{ color: "#fff" }}>
              {user && post.body}
            </h4>
          </div>

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
                          // onClick={() => handleImageFullImage(img, index)}
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
                          // onClick={() => handleImageFullImage(img, index)}
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
          {/* count like and comment */}
          <div className={styles.likeAndComments}>
            <div className={styles.like}>
              <span className={styles.iconLike}>
                <span>
                  <AiFillLike />
                </span>
              </span>
              <span className={clsx(styles.countLike, styles.countLikeProfile)}>
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
              <span
                className={clsx(
                  styles.countComment,
                  styles.countCommentProfile
                )}
              >
                {post.comment[0].commentList &&
                  post.comment[0].commentList.length}
              </span>
              <span className={clsx(styles.comments, styles.commentProfile)}>
                Comment
              </span>
            </div>
          </div>
          {/* button like and comment and share*/}
          <div className={styles.likeAndCommentContainer}>
            <div
              className={
                checkObjectIsUndefined(post) &&
                userFromAuth0 &&
                post.like[0].likeList.includes(userFromAuth0.nickname)
                  ? clsx(styles.likeContainer, styles.likes)
                  : styles.likeContainer
              }
              onClick={() => handleCountLikePost(post.id)}
            >
              <span className={clsx(styles.iconLikes, styles.iconprofile)}>
                <BiLike />
              </span>
              <span className={clsx(styles.titleLike, styles.titleProfile)}>
                Like
              </span>
            </div>
            <div className={styles.commentContainer}>
              <span className={clsx(styles.iconComments, styles.iconprofile)}>
                <BiComment />
              </span>
              <span className={clsx(styles.titleComment, styles.titleProfile)}>
                Comment
              </span>
            </div>
            <div className={styles.shareContainer}>
              <span className={clsx(styles.iconShare, styles.iconprofile)}>
                <RiShareForwardLine />
              </span>
              <span className={clsx(styles.titleShare, styles.titleProfile)}>
                Share
              </span>
            </div>
          </div>
        </div>
        {/* input comment */}
        <div className={styles.inputCommentContainer}>
          <img
            src={userFromAuth0 && userFromAuth0.picture}
            className={styles.userInput}
          />
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
            {checkObjectIsUndefined(post) && post.comment[0].commentList
              ? sliceData.map((comment, index) => {
                  return (
                    <React.Fragment key={index}>
                      <div className={styles.item}>
                        <img
                          className={styles.userComment}
                          src={user.posts.usersData[comment.author].avatarUrl}
                        />
                        <div className={styles.contentComment}>
                          <h3 className={styles.nameUser}>
                            {user.posts.usersData[comment.author].fullName}
                          </h3>
                          <h4>{comment.content}</h4>
                        </div>
                      </div>
                      <div className={styles.commentEmoji}>
                        <span
                          className={clsx(
                            styles.itemIcon,
                            styles.itemIconProfile
                          )}
                        >
                          <BiLike />
                        </span>
                        <span
                          className={clsx(
                            styles.itemIcon,
                            styles.itemIconProfile
                          )}
                        >
                          <BiComment />
                        </span>
                        <span
                          className={clsx(
                            styles.itemIcon,
                            styles.itemIconProfile
                          )}
                        >
                          {Moment(comment.createdAt).format("LT")}
                        </span>
                      </div>
                    </React.Fragment>
                  );
                })
              : null}
            {post.comment[0].commentList.length > 2 && (
              <div
                className={styles.loadMoreComments}
                onClick={() => handleLoadMoreComment()}
              >
                <button
                  className={clsx(
                    styles.moreComments,
                    styles.moreCommentProfile
                  )}
                >
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

export default PostsProfile;
