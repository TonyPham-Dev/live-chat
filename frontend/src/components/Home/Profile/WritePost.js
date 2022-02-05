import React, { useState, useRef, useEffect, useContext, memo } from "react";
import axios from "axios";
import InputEmoji from "react-input-emoji";
import { useAuth0 } from "@auth0/auth0-react";
import clsx from "clsx";
import { BsFillImageFill } from "react-icons/bs";
import { IoIosVideocam } from "react-icons/io";
import { FiMoreHorizontal } from "react-icons/fi";
import { FaTimesCircle } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import { RiVideoFill } from "react-icons/ri";
import styles from "../Posts/post.module.css";
function WritePost({ user }) {
  console.log(user);
  const apiServer = "http://localhost:3000";
  const accessToken = localStorage.getItem("accessToken");
  const [openFormPost, setOpenFromPost] = useState(false);
  const [valuePost, setValuePost] = useState("");

  //state image
  const [fileImage, setFileImage] = useState([]);
  const [saveFileImage, setSaveFileImage] = useState([]);
  // state video mp4
  const [fileVideo, setFileVideo] = useState([]);
  const [saveVideo, setSaveVideo] = useState([]);

  const [allPost, setAllPost] = useState([]);

  const [userData, setUserData] = useState({});
  const [idPost, setIdPost] = useState("");
  const valueRef = useRef();
  // get all post from GET /api/posts/(?page=x&all=true | | ?page=x)
  useEffect(async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    await axios
      .get(`${apiServer}/api/posts?page=1&all=true`, config)
      .then((response) => {
        if (checkObjectIsUndefined(response)) {
          setAllPost(response.data.posts);
          setUserData(response.data.usersData);
        }
      });
  }, [user]);
  // submit value input post
  const submitValuePost = async () => {
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
      .post(`${apiServer}/api/posts/new`, formData, config)
      .then((response) => {
        setIdPost(response.data.post.id);
        setAllPost((prev) => [response.data.post, ...prev]);
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

  const checkObjectIsUndefined = (obj) => {
    return Object.keys(obj).length > 0;
  };
  return (
    <div className={styles.postContainer}>
      {openFormPost && (
        <div className={styles.writerContainer}>
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
                <img className={styles.imageAdmin} src={checkObjectIsUndefined(user) ? user.user.avatarUrl : undefined} />
                <h4>{checkObjectIsUndefined(user) && user.user.fullName}</h4>
              </div>
              <form>
                <InputEmoji
                  ref={valueRef}
                  value={valuePost}
                  className={styles.inputPost}
                  placeholder={`What's on your mind,${checkObjectIsUndefined(user) && user.user.fullName}?`}
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
                    <label htmlFor="imagePost">
                      <BsFillImageFill />
                    </label>
                    <label
                      htmlFor="imagePost"
                      className={clsx(styles.titleIcon, styles.iconPost)}
                    >
                      Image
                    </label>
                    <input
                      className={styles.inputPostImage}
                      id="imagePost"
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
                    <label htmlFor="videoPost">
                      <RiVideoFill />
                    </label>
                    <label
                      htmlFor="videoPost"
                      className={clsx(styles.titleIcon, styles.iconPost)}
                    >
                      Video
                    </label>
                    <input
                      className={styles.videoPost}
                      id="videoPost"
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
              <div className={styles.buttonPost} onClick={submitValuePost}>
                <button className={styles.button}>Post</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {openFormPost && <div className={styles.OverLay} 
        onClick={() => setOpenFromPost(false)}
          ></div>}

      <div className={clsx(styles.textareaContainer, styles.profilePost)}>
        <form className={styles.profilePostContent} onClick={() => setOpenFromPost(!openFormPost)}>
          <div className={styles.profileRightUser}>
            <img className={styles.profileImage} src={user && user.avatarUrl} />
          </div>
          <InputEmoji
            className={styles.inputPost}
            placeholder={`What's on your mind,${user && user.fullName}?`}
          />
        </form>
        <div className={styles.textareaContainer}>
          <div className={styles.imageAndVideoAndStreaming}>
            <span className={clsx(styles.iconInput, styles.image)}>
              <BsFillImageFill />
              <span className={(styles.titleIcon, styles.textProfile)}>
                Image
              </span>
            </span>
            <span className={clsx(styles.iconInput, styles.video)}>
              <RiVideoFill />
              <span className={(styles.titleIcon, styles.textProfile)}>
                Video
              </span>
            </span>
            <span className={clsx(styles.iconInput, styles.streaming)}>
              <IoIosVideocam />
              <span className={(styles.titleIcon, styles.textProfile)}>
                Streaming
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(WritePost);
