import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import WritePost from "./WritePost";
import InputEmoji from "react-input-emoji";
import { FiMoreHorizontal } from "react-icons/fi";
import { ImImages } from "react-icons/im";
import { AiFillLike } from "react-icons/ai";
import { BiLike, BiComment } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";
import styles from "./profile.module.css";
function ProFileContentRight({ user, postContent }) {
  console.log(user);
  const [text, setText] = useState("");
  const [saveText, setSaveText] = useState(["test"]);
  const [saveUrlImage, setSaveUrlImage] = useState([]);
  // handle enter of input text
  const handleOnEnter = () => {
    setSaveText((prev) => [...prev, text]);
  };

  // create URL file input
  const handleInputFile = (e) => {
    const imageIndex = e.target.files[0];
    // setStateImage(prev => [...prev,e.target.files[0]])
    const urlImage = URL.createObjectURL(imageIndex);
    setSaveUrlImage((prev) => [...prev, urlImage]);
  };
  return (
    <>
      {/* post profile */}
      <WritePost user={user} />

      {/* content when posts */}
      {/* render ở đây */}
      <div className={styles.profilePostContentUser}>
        {/* list item post */}
        <div className={styles.profileContainer}>
          {/* header user */}
          <div className={styles.profilePostUser}>
            <div className={styles.profileUser}>
              <img
                src={user && user.avatarUrl}
                className={styles.profileUserImage}
              />
              <div>
                <h3 style={{ color: "#fff", marginBottom: "5px" }}>
                  {user && user.fullName}
                </h3>
                <h5 className={styles.timePost}>20 tháng 12, 2021 lúc 15:02</h5>
              </div>
            </div>

            <div className={styles.PostUtlti}>
              <FiMoreHorizontal />
            </div>
          </div>
          {/* content post */}
          <div className={styles.itemPostProfile}>
            <h4 className={styles.titlePostProfile}>
              Phamcong da dang bai viet moiws Phamcong da dang bai viet
              moiwsPhamcong da dang bai viet moiwsPhamcong da dang bai viet
              moiwsPhamcong da dang bai viet moiwsPhamcong da dang bai viet
              moiwsPhamcong da dang bai viet moiwsPhamcong da dang bai viet
              moiwsPhamcong da dang bai viet moiwsPhamcong da dang bai viet
              moiwsPhamcong da dang bai viet moiwsPhamcong da dang bai viet
              moiws
            </h4>
          </div>
          <div className={styles.imagePost}>
            <img
              className={styles.imagePostProfile}
              src="https://images5.alphacoders.com/568/568499.jpg"
            />
            <img
              className={styles.imagePostProfile}
              src="https://images7.alphacoders.com/464/464252.jpg"
            />
            <img
              className={styles.imagePostProfile}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKLdI4mV8GjGEZxbOnxT7udpLO6SfQjAPpWoCtmifBiRiaCATHY20d0P7SvWnz2utPtxI&usqp=CAU"
            />
            <img
              className={styles.imagePostProfile}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKLdI4mV8GjGEZxbOnxT7udpLO6SfQjAPpWoCtmifBiRiaCATHY20d0P7SvWnz2utPtxI&usqp=CAU"
            />
            <img
              className={styles.imagePostProfile}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKLdI4mV8GjGEZxbOnxT7udpLO6SfQjAPpWoCtmifBiRiaCATHY20d0P7SvWnz2utPtxI&usqp=CAU"
            />
          </div>
        </div>
        <div className={styles.likeAndCommentsProfile}>
          <div className={styles.likeProfile}>
            <span className={styles.iconLikeProfile}>
              <AiFillLike />
            </span>
            <span className={styles.countLikeProfile}>50</span>
          </div>
          <div className={styles.commentProfile}>
            <span className={styles.countCommentProfile}>50</span>
            <span className={styles.commentsProfile}>Comment</span>
          </div>
        </div>

        <div className={styles.likeAndCommentContainerProfile}>
          <div className={styles.likeContainerProfile}>
            <span className={styles.iconLikesProfile}>
              <BiLike />
            </span>
            <span className={styles.titleLikeProfile}>Like</span>
          </div>
          <div className={styles.commentContainerProfile}>
            <span className={styles.iconCommentsProfile}>
              <BiComment />
            </span>
            <span className={styles.titleCommentProfile}>Comment</span>
          </div>
          <div className={styles.shareContainerProfile}>
            <span className={styles.iconShareProfile}>
              <RiShareForwardLine />
            </span>
            <span className={styles.titleShareProfile}>Share</span>
          </div>
        </div>

        {/* input comment */}
        <div className={styles.inputCommentContainerProfile}>
          <img
            src={user && user.avatarUrl}
            className={styles.userInputProfile}
          />
          <span className={styles.inputProfile}>
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
        <div className={styles.listCommentsProfile}>
          {/* render list comment */}
          {saveText.map((text, index) => {
            return (
              <div key={index} className={styles.listCommentProfile}>
                <div className={styles.itemProfile}>
                  <img
                    className={styles.userCommentProfile}
                    src={user && user.avatarUrl}
                  />
                  <div className={styles.contentCommentProfile}>
                    <h3 className={styles.nameUserProfile}>
                      {user && user.fullName}
                    </h3>
                    <h4>{text}</h4>
                  </div>
                </div>
                <div className={styles.commentEmojiProfile}>
                  <span className={styles.itemIconProfile}>
                    <BiLike />
                  </span>
                  <span className={styles.itemIconProfile}>
                    <BiComment />
                  </span>
                  <span className={styles.itemIconProfile}>2 Giờ</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* render */}
    </>
  );
}

export default ProFileContentRight;
