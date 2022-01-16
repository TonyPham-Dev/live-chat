import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import InputEmoji from "react-input-emoji";
import { Link } from "react-router-dom";
import { BsFillImageFill } from "react-icons/bs";
import { RiVideoFill } from "react-icons/ri";
import { IoIosVideocam } from "react-icons/io";
import { FiMoreHorizontal } from "react-icons/fi";
import { FaTimesCircle } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import postImage1 from "../PostContents/image/postImage1.jpg";
import postImage2 from "../PostContents/image/postImage2.jpg";
import coverImage from "../PostContents/image/coverImage.jpg"
import styles from "./post.module.css";
import clsx from "clsx";
import Notification from "./Notification";

function Posts(props) {
  const urlServer = 'http://localhost:3000'
  const accessToken = localStorage.getItem('accessToken')
  const { user } = useAuth0();
  const [openFormPost, setOpenFromPost] = useState(false);
  const [valuePost, setValuePost] = useState("");

  //state image
  const [fileImage, setFileImage] = useState([]);
  const [saveFileImage, setSaveFileImage] = useState([]);
  // state video mp4
  const [fileVideo, setFileVideo] = useState([]);
  const [saveVideo, setSaveVideo] = useState([]);

  // // warning when video > 5
  // const [warning, setWarning] = useState(false);
  const valueRef = useRef();

  // submit value input post
  const submitValuePost = () => {
    // post content 
    const formData = new FormData();
    formData.append('body',valuePost) // text

    fileImage.map(image => {
      formData.append('images',image) // image
      console.log(image);
    })

    fileVideo.map(video => {
      formData.append('videos', video) // video
      console.log(video);
    })

    console.log(formData.values());
    const config = {     
      headers: { 
        'Authorization': `Bearer ${accessToken}`,
        'content-type': 'multipart/form-data',
      },
      'data': formData
    }
    axios.post(`${urlServer}/api/posts/new`, formData, config) // chỗ này
      .then(response => {
          console.log(response);
      })
      .catch(error => {
          console.log(error);
      });


    // open from post content
    setOpenFromPost(false);
    // clear value post
    setValuePost("");
    setFileImage([])
    setFileVideo([])
    setSaveFileImage([])
    setSaveVideo([])
    valueRef.current.focus();
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
    setFileImage((prev) => [...prev, e.target.files[0]]);
    setSaveFileImage((prev) => [
      ...prev,
      URL.createObjectURL(e.target.files[0]),
    ]);
  };
  // remove file image
  const handleDeleteFile = (index) => {
    const fileRemove = saveFileImage.filter(
      (file, indexImage) => indexImage !== index
    );
    URL.revokeObjectURL(fileRemove);
    setSaveFileImage(fileRemove);
  };

  // handle input file video mp4
  const handleVideoPostChange = (e) => {
    setFileVideo((prev) => [...prev, e.target.files[0]]);
    setSaveVideo((prev) => [...prev, URL.createObjectURL(e.target.files[0])]);
  };

  // when click remove file video mp4
  const handleDeleteVideo = (index) => {
    const fileVideoRemove = saveVideo.filter(
      (file, indexVideo) => indexVideo !== index
    );
    URL.revokeObjectURL(fileVideoRemove);
    setSaveVideo(fileVideoRemove);
  };
  
  return (
    <div className={styles.postContainer}>
      {/* input posts */}

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
                <img className={styles.imageAdmin} src={user && user.picture} />
                <h4>{user && user.name}</h4>
              </div>
              <form>
                <InputEmoji
                  ref={valueRef}
                  value={valuePost}
                  className={styles.inputPost}
                  placeholder={`What's on your mind,${user && user.name}?`}
                  onChange={setValuePost}
                />
              </form>

              {/* render image post */}
              {saveFileImage
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

      {openFormPost && <div className={styles.OverLay}></div>}

      {/* user */}
      <div className={styles.userPost}>
        <img
          className={styles.coverImage}
          src={coverImage}
        />
        <Link to="/user">
          <div className={styles.user}>
            <img className={styles.avatar} src={user && user.picture} />
            <div className={styles.nameUser}>
              <h5 className={styles.name}>{user && user.name}</h5>
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
        <form onClick={() => setOpenFromPost(!openFormPost)}>
          <InputEmoji
            className={styles.inputPost}
            placeholder={`What's on your mind,${user && user.name}?`}
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

      <div>
        <Notification/>
      </div>
    </div>
  );
}

export default Posts;
