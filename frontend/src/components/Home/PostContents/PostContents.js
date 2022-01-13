import React, { useEffect, useState, useRef, memo } from "react";
import {useAuth0} from '@auth0/auth0-react'
import {Link} from 'react-router-dom'
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

function PostContents(props) {
  const {user} = useAuth0()
  const [lengthImage, setLengthImage] = useState();
  const [text, setText] = useState("");
  const [saveText, setSaveText] = useState(["test"]);
  const [saveUrlImage, setSaveUrlImage] = useState([]);
  const imageRef = useRef(null);


  // handle enter of input text
  const handleOnEnter = () => {
    setSaveText((prev) => [...prev, text]);
  };

  // get count element of post image
  useEffect(() => {
    const elementCount = imageRef.current.childNodes.length;
    setLengthImage(elementCount);
  });
    // revokeURL image 
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(saveUrlImage);
    };
  }, [saveUrlImage]);

 

  // create URL file input
  const handleInputFile = (e) => {
    const imageIndex = e.target.files[0];
    // setStateImage(prev => [...prev,e.target.files[0]])
    const urlImage = URL.createObjectURL(imageIndex);
    setSaveUrlImage((prev) => [...prev, urlImage]);
  };

  // delete image comment
  const handleDeleteImageComment = (index) => {
    saveUrlImage &&
      setSaveUrlImage((prev) =>
        prev.filter((item, indexItem) => index !== indexItem)
      );
  };
  return (
    <div className={styles.app}>
      <div className={styles.posts}>
        {/* user */}
        <div className={styles.user}>
          <Link to='/user' style={{textDecoration: "none" }}>
            <div className={styles.userContainer}>
              <img className={styles.imageUser} src={user && user.picture} />
              <div>
                <h4 style={{ color: "#3a3b3c" }}>{user && user.name}</h4>
                <h5 style={{ color: "#3a3b3c", marginTop: "5px" }}>20 phút</h5>
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
            <h4 className={styles.titleContent}>
              Phạm Công vừa đăng một bài viếtPhạm Công vừa đăng một bài viếtPhạm
              Công vừa đăng một bài viếtPhạm Công vừa đăng một bài viếtPhạm Công
              vừa đăng một bài viếtPhạm Công vừa đăng một bài viếtPhạm Công vừa
              đăng một bài viết
            </h4>
          </div>

          {/* image content */}
          <div className={styles.imageContent}>
            <div ref={imageRef} className={styles.container}>
              <img
                className={clsx(styles.postImage)}
                style={{ width: `calc(100% / ${lengthImage})` }}
                src={postImage1}
              />
              <img
                className={clsx(styles.postImage)}
                style={{ width: `calc(100% / ${lengthImage})` }}
                src={postImage2}
              />
              <img
                className={clsx(styles.postImage)}
                style={{ width: `calc(100% / ${lengthImage})` }}
                src={postImage3}
              />
              <img
                className={clsx(styles.postImage)}
                style={{ width: `calc(100% / ${lengthImage})` }}
                src={postImage4}
              />
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
          <img src={user && user.picture} className={styles.userInput} />
          <span className={styles.input}>
            <InputEmoji
              value={text}
              onChange={setText}
              cleanOnEnter
              onEnter={handleOnEnter}
              placeholder="Write a comment..."
            />
          </span>
          <form className={styles.form}>
            <label htmlFor="fileComment" className={styles.commentImage}>
              <ImImages />
            </label>
            <input
              className={styles.fileComment}
              id="fileComment"
              type="file"
              onChange={handleInputFile}
            />
          </form>
        </div>
        {/* comment images */}
        <div className={styles.renderImages}>
          {saveUrlImage &&
            saveUrlImage.map((image, index) => {
              return (
                <div key={index} className={styles.imageCommentContainer}>
                  <img src={image} className={styles.imageComments} />
                  <span
                    onClick={() => handleDeleteImageComment(index)}
                    className={styles.deleteImage}
                  >
                    <TiDeleteOutline />
                  </span>
                </div>
              );
            })}
        </div>
        {/* list comments */}
        <div className={styles.listComments}>
          {/* render list comment */}
          {saveText.map((text, index) => {
            return (
              <div key={index} className={styles.listComment}>
                <div className={styles.item}>
                  <img className={styles.userComment} src={user && user.picture} />
                  <div className={styles.contentComment}>
                    <h3 className={styles.nameUser}>{user && user.name}</h3>
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
      <div className={styles.posts}>
        {/* user */}
        <div className={styles.user}>
          <Link to='/user' style={{textDecoration: "none" }}>
            <div className={styles.userContainer}>
              <img className={styles.imageUser} src={user && user.picture} />
              <div>
                <h4 style={{ color: "#3a3b3c" }}>{user && user.name}</h4>
                <h5 style={{ color: "#3a3b3c", marginTop: "5px" }}>20 phút</h5>
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
            <h4 className={styles.titleContent}>
              Phạm Công vừa đăng một bài viếtPhạm Công vừa đăng một bài viếtPhạm
              Công vừa đăng một bài viếtPhạm Công vừa đăng một bài viếtPhạm Công
              vừa đăng một bài viếtPhạm Công vừa đăng một bài viếtPhạm Công vừa
              đăng một bài viết
            </h4>
          </div>

          {/* image content */}
          <div className={styles.imageContent}>
            <div ref={imageRef} className={styles.container}>
              <img
                className={clsx(styles.postImage)}
                style={{ width: `calc(100% / ${lengthImage})` }}
                src={postImage1}
              />
              <img
                className={clsx(styles.postImage)}
                style={{ width: `calc(100% / ${lengthImage})` }}
                src={postImage2}
              />
              <img
                className={clsx(styles.postImage)}
                style={{ width: `calc(100% / ${lengthImage})` }}
                src={postImage3}
              />
              <img
                className={clsx(styles.postImage)}
                style={{ width: `calc(100% / ${lengthImage})` }}
                src={postImage4}
              />
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
          <img src={user && user.picture} className={styles.userInput} />
          <span className={styles.input}>
            <InputEmoji
              value={text}
              onChange={setText}
              cleanOnEnter
              onEnter={handleOnEnter}
              placeholder="Write a comment..."
            />
          </span>
          <form className={styles.form}>
            <label htmlFor="fileComment" className={styles.commentImage}>
              <ImImages />
            </label>
            <input
              className={styles.fileComment}
              id="fileComment"
              type="file"
              onChange={handleInputFile}
            />
          </form>
        </div>
        {/* comment images */}
        <div className={styles.renderImages}>
          {saveUrlImage &&
            saveUrlImage.map((image, index) => {
              return (
                <div key={index} className={styles.imageCommentContainer}>
                  <img src={image} className={styles.imageComments} />
                  <span
                    onClick={() => handleDeleteImageComment(index)}
                    className={styles.deleteImage}
                  >
                    <TiDeleteOutline />
                  </span>
                </div>
              );
            })}
        </div>
        {/* list comments */}
        <div className={styles.listComments}>
          {/* render list comment */}
          {saveText.map((text, index) => {
            return (
              <div key={index} className={styles.listComment}>
                <div className={styles.item}>
                  <img className={styles.userComment} src={user && user.picture} />
                  <div className={styles.contentComment}>
                    <h3 className={styles.nameUser}>{user && user.name}</h3>
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
      <div className={styles.posts}>
        {/* user */}
        <div className={styles.user}>
          <Link to='/user' style={{textDecoration: "none" }}>
            <div className={styles.userContainer}>
              <img className={styles.imageUser} src={user && user.picture} />
              <div>
                <h4 style={{ color: "#3a3b3c" }}>{user && user.name}</h4>
                <h5 style={{ color: "#3a3b3c", marginTop: "5px" }}>20 phút</h5>
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
            <h4 className={styles.titleContent}>
              Phạm Công vừa đăng một bài viếtPhạm Công vừa đăng một bài viếtPhạm
              Công vừa đăng một bài viếtPhạm Công vừa đăng một bài viếtPhạm Công
              vừa đăng một bài viếtPhạm Công vừa đăng một bài viếtPhạm Công vừa
              đăng một bài viết
            </h4>
          </div>

          {/* image content */}
          <div className={styles.imageContent}>
            <div ref={imageRef} className={styles.container}>
              <img
                className={clsx(styles.postImage)}
                style={{ width: `calc(100% / ${lengthImage})` }}
                src={postImage1}
              />
              <img
                className={clsx(styles.postImage)}
                style={{ width: `calc(100% / ${lengthImage})` }}
                src={postImage2}
              />
              <img
                className={clsx(styles.postImage)}
                style={{ width: `calc(100% / ${lengthImage})` }}
                src={postImage3}
              />
              <img
                className={clsx(styles.postImage)}
                style={{ width: `calc(100% / ${lengthImage})` }}
                src={postImage4}
              />
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
          <img src={user && user.picture} className={styles.userInput} />
          <span className={styles.input}>
            <InputEmoji
              value={text}
              onChange={setText}
              cleanOnEnter
              onEnter={handleOnEnter}
              placeholder="Write a comment..."
            />
          </span>
          <form className={styles.form}>
            <label htmlFor="fileComment" className={styles.commentImage}>
              <ImImages />
            </label>
            <input
              className={styles.fileComment}
              id="fileComment"
              type="file"
              onChange={handleInputFile}
            />
          </form>
        </div>
        {/* comment images */}
        <div className={styles.renderImages}>
          {saveUrlImage &&
            saveUrlImage.map((image, index) => {
              return (
                <div key={index} className={styles.imageCommentContainer}>
                  <img src={image} className={styles.imageComments} />
                  <span
                    onClick={() => handleDeleteImageComment(index)}
                    className={styles.deleteImage}
                  >
                    <TiDeleteOutline />
                  </span>
                </div>
              );
            })}
        </div>
        {/* list comments */}
        <div className={styles.listComments}>
          {/* render list comment */}
          {saveText.map((text, index) => {
            return (
              <div key={index} className={styles.listComment}>
                <div className={styles.item}>
                  <img className={styles.userComment} src={user && user.picture} />
                  <div className={styles.contentComment}>
                    <h3 className={styles.nameUser}>{user && user.name}</h3>
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
      <div className={styles.posts}>
        {/* user */}
        <div className={styles.user}>
          <Link to='/user' style={{textDecoration: "none" }}>
            <div className={styles.userContainer}>
              <img className={styles.imageUser} src={user && user.picture} />
              <div>
                <h4 style={{ color: "#3a3b3c" }}>{user && user.name}</h4>
                <h5 style={{ color: "#3a3b3c", marginTop: "5px" }}>20 phút</h5>
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
            <h4 className={styles.titleContent}>
              Phạm Công vừa đăng một bài viếtPhạm Công vừa đăng một bài viếtPhạm
              Công vừa đăng một bài viếtPhạm Công vừa đăng một bài viếtPhạm Công
              vừa đăng một bài viếtPhạm Công vừa đăng một bài viếtPhạm Công vừa
              đăng một bài viết
            </h4>
          </div>

          {/* image content */}
          <div className={styles.imageContent}>
            <div ref={imageRef} className={styles.container}>
              <img
                className={clsx(styles.postImage)}
                style={{ width: `calc(100% / ${lengthImage})` }}
                src={postImage1}
              />
              <img
                className={clsx(styles.postImage)}
                style={{ width: `calc(100% / ${lengthImage})` }}
                src={postImage2}
              />
              <img
                className={clsx(styles.postImage)}
                style={{ width: `calc(100% / ${lengthImage})` }}
                src={postImage3}
              />
              <img
                className={clsx(styles.postImage)}
                style={{ width: `calc(100% / ${lengthImage})` }}
                src={postImage4}
              />
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
          <img src={user && user.picture} className={styles.userInput} />
          <span className={styles.input}>
            <InputEmoji
              value={text}
              onChange={setText}
              cleanOnEnter
              onEnter={handleOnEnter}
              placeholder="Write a comment..."
            />
          </span>
          <form className={styles.form}>
            <label htmlFor="fileComment" className={styles.commentImage}>
              <ImImages />
            </label>
            <input
              className={styles.fileComment}
              id="fileComment"
              type="file"
              onChange={handleInputFile}
            />
          </form>
        </div>
        {/* comment images */}
        <div className={styles.renderImages}>
          {saveUrlImage &&
            saveUrlImage.map((image, index) => {
              return (
                <div key={index} className={styles.imageCommentContainer}>
                  <img src={image} className={styles.imageComments} />
                  <span
                    onClick={() => handleDeleteImageComment(index)}
                    className={styles.deleteImage}
                  >
                    <TiDeleteOutline />
                  </span>
                </div>
              );
            })}
        </div>
        {/* list comments */}
        <div className={styles.listComments}>
          {/* render list comment */}
          {saveText.map((text, index) => {
            return (
              <div key={index} className={styles.listComment}>
                <div className={styles.item}>
                  <img className={styles.userComment} src={user && user.picture} />
                  <div className={styles.contentComment}>
                    <h3 className={styles.nameUser}>{user && user.name}</h3>
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
    
    </div>
  );
}

export default memo(PostContents);
