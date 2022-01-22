import React, { useEffect, useState, useRef, memo, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import Moment from "moment";
import clsx from "clsx";
import { AiFillLike } from "react-icons/ai";
import { BiLike, BiComment } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";
import InputEmoji from "react-input-emoji";
import { ImImages } from "react-icons/im";
import { TiDeleteOutline } from "react-icons/ti";

import imageUser from "./image/imageUser.jpg";
import postImage1 from "./image/postImage1.jpg";
import postImage2 from "./image/postImage2.jpg";
import postImage3 from "./image/postImage3.jpg";
import postImage4 from "./image/postImage4.jpg";
import { FiMoreHorizontal } from "react-icons/fi";
import styles from "./postContent.module.css";
const apiServer = "http://localhost:3000";
function PostContents({ Post, allPost }) {
  const { user } = useAuth0();
  const [text, setText] = useState("");
  const [saveText, setSaveText] = useState(["test"]);
  const imageRef = useRef(null);
  const [posts, setPosts] = useState([]);
  const [imgFull, setImgFull] = useState("");

  // handle enter of input text
  const handleOnEnter = () => {
    setSaveText((prev) => [...prev, text]);
  };

  // scroll to top when restart app
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [allPost]);
  // check is null or undefined
  const checkObjectIsUndefined = (obj) => {
    return Object.keys(obj).length > 0;
  };

  // go to post id
  const handleImageFullImage = (img, index) => {
    setImgFull(img);
  };
  return (
    <>
      <div className={styles.app}>
        {allPost.length > 0 &&
          allPost.map((post, index) => {
            {
              console.log(post);
            }
            return (
              <div className={styles.posts} key={index}>
                {/* user */}
                <div className={styles.user}>
                  <Link to="/user" style={{ textDecoration: "none" }}>
                    <div className={styles.userContainer}>
                      <img
                        className={styles.imageUser}
                        src={user && user.picture}
                      />
                      <div>
                        <h4 style={{ color: "#3a3b3c" }}>{post.author}</h4>
                        <h5 style={{ color: "#3a3b3c", marginTop: "5px" }}>
                          {Moment(post.createdAt).format("LTS")}
                        </h5>
                      </div>
                    </div>
                  </Link>
                  <div>
                    <span className={styles.userMore}>
                      <FiMoreHorizontal />
                    </span>
                  </div>
                </div>
                {/* content */}
                <div className={styles.content}>
                  {/* title content */}
                  <div>
                    <h4
                      className={styles.titleContent}
                      style={{ color: "#3a3a3a" }}
                    >
                      {post.body}
                    </h4>
                  </div>

                  {/* image content */}
                  <div className={styles.imageContent}>
                    <div ref={imageRef} className={styles.container}>
                      {console.log(post.imgList.length)}
                      {post.imgList.map((img, index) => {
                        return (
                          <img
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
                  {/* video content */}
                  <div className={styles.videoContent}>
                    <div className={styles.imageContent}>
                      <div ref={imageRef} className={styles.container}>
                        
                        {post.vidList.map((video, index) => {
                          return (
                            <video
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
                  <div className={styles.likeAndComments}>
                    <div className={styles.like}>
                      <span className={styles.iconLike}>
                        <AiFillLike />
                      </span>
                      <span className={styles.countLike}>50</span>
                    </div>
                    <div className={styles.comment}>
                      <span className={styles.countComment}>50</span>
                      <span className={styles.comments}>Comment</span>
                    </div>
                  </div>

                  <div className={styles.likeAndCommentContainer}>
                    <div className={styles.likeContainer}>
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
                  <img
                    src={user && user.picture}
                    className={styles.userInput}
                  />
                  <span className={styles.input}>
                    <InputEmoji
                      value={text}
                      onChange={setText}
                      cleanOnEnter
                      onEnter={handleOnEnter}
                      placeholder="Write a comment..."
                    />
                  </span>
                </div>

                {/* list comments */}
                <div className={styles.listComments}>
                  {/* render list comment */}
                  {saveText.map((text, index) => {
                    return (
                      <div key={index} className={styles.listComment}>
                        <div className={styles.item}>
                          <img
                            className={styles.userComment}
                            src={user && user.picture}
                          />
                          <div className={styles.contentComment}>
                            <h3 className={styles.nameUser}>
                              {user && user.name}
                            </h3>
                            <h4>{text}</h4>
                          </div>
                        </div>
                        <div className={styles.commentEmoji}>
                          <span className={styles.itemIcon}>
                            <BiLike />
                          </span>
                          <span className={styles.itemIcon}>
                            <BiComment />
                          </span>
                          <span className={styles.itemIcon}>2 Giờ</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

        {/* loading cho nay */}
      </div>
    </>
  );
}

export default memo(PostContents);
