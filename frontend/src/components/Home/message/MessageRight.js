import React, { useState, useRef, useEffect } from "react";

// import socket.io
import io from "socket.io-client";
// import react-icon
import {
  BsFillTelephoneFill,
  BsEmojiSmileFill,
  BsImages,
  BsLink45Deg,
} from "react-icons/bs";
import { HiVideoCamera } from "react-icons/hi";
import { IoMdInformationCircle, IoMdAddCircle } from "react-icons/io";
import { MdMoreVert } from "react-icons/md";
import { RiShareForwardFill } from "react-icons/ri";
import { HiEmojiHappy } from "react-icons/hi";
import { AiFillLike } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";

import { useParams } from "react-router-dom";
// axios
import axios from "axios";
// auth0
import { useAuth0 } from "@auth0/auth0-react";

// emoji
import InputEmoji from "react-input-emoji";
import imageUser from "./image/imageUser.jpg";
import styles from "./message.module.css";
import clsx from "clsx";
import ImageMobile from "./ImageMobile";

const serverUrl = "http://localhost:3000";
const listMessApi = "http://localhost:3000/api/chat";

function MessageRight(props) {
  console.log(props.messages)
  // scroll to bottom
  const messagesEnd = useRef();
  useEffect(() => {
    scrollToBottom();
  }, []);
  useEffect(() => {
    scrollToBottom();
  });
  const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  const socketRef = useRef();
  const { chatId } = useParams();
  const { user } = useAuth0();
  // value input
  const [valueMess, setValueMess] = useState("");
  // save value input
  const [saveValueMess, setSaveValueMess] = useState([]);

  // const [openImage, setOpenImage] = useState(false);
  // file image
  const [valueInputFile, setValueInputFile] = useState([]);
  const [imgs, setImgs] = useState([]);
  const [srcImage, setSrcImage] = useState([]);
  const [openButtonImage, setOpenButtonImage] = useState(false);
  const inputRef = useRef();
  const itemMessRef = useRef();

  // handle button submit gửi
  const handleSubmitValue = () => {
    // play load text
    setSaveValueMess((prev) => [
      ...prev,
      { user: user.nickname, message: valueMess, image: null },
    ]);
    setValueMess("");
    inputRef.current.focus();
    itemMessRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
    socketRef.current.emit("text-message", valueMess);

    // play load image
    if (valueInputFile.length > 0) {
      setSrcImage((prev) => [...prev, valueInputFile]);
      playLoadImage();
     
    }
  };
  // message chat
  useEffect(() => {
    const socket = io(`${serverUrl}/message`, {
      path: "/chat",
      auth: {
        roomId: props.messages._id,
        token: localStorage.getItem("accessToken"),
      },
    });

    socket.on("new-text", (nickName, message) => {
      setSaveValueMess((prev) => [
        ...prev,
        { user: nickName, message: message, type: "text"},
      ]);
    });

    socketRef.current = socket;
    props.messages.messages.forEach((message) => {
      setSaveValueMess((prev) => [...prev, { user: message.user, message: message.message,type: message.type},
      ]);
    });
  }, []);

  // message image ảnh gửi lên server
  const playLoadImage = async () => {
    const formData = new FormData();
    imgs.forEach((file) => {
      formData.append("images", file);
    });
    const imgList = await axios
      .post(`${serverUrl}/api/chat/img/${chatId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((data) => data.data);
    if (imgList.success) {
      setSaveValueMess((prev) => [...prev, { user: user.nickname, message: imgList.fileList,type: 'img'}])
      socketRef.current.emit("img-message", imgList.fileList);
    }
  };

  // handle key enter
  const handleEnterValueInput = (valueMess) => {
    setSaveValueMess((prev) => [
      ...prev,
      { user: user.nickname, message: valueMess },
    ]);
    itemMessRef.current &&
      itemMessRef.current.scrollIntoViewIfNeeded({
        block: "nearest",
        behavior: "smooth",
        inline: "start",
      });
    inputRef.current.focus();
    socketRef.current.emit("text-message", valueMess);
  };
  // handle click icon like
  const handleIconLike = () => {
    setSaveValueMess((prev) => [
      ...prev,
      { user: user.nickname, message: "👍" },
    ]);
    itemMessRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
    socketRef.current.emit("text-message", "👍");
  };

  // handle input image click lấy link ảnh
  const handleInputImage = (e) => {
    setImgs((prev) => [...prev, e.target.files[0]]); 
    setValueInputFile((prev) => [...prev, URL.createObjectURL(e.target.files[0])]);
  };

  // remove file image
  const deleteImage = (e) => {
    const imageIndex = valueInputFile.filter((item, index) => index !== e);
    setImgs((prev) => prev.splice(e, 1));
    setValueInputFile(imageIndex);
    valueInputFile && URL.revokeObjectURL(valueInputFile[e]);
    setSrcImage([]);
  };
  // open button image
  const handleOpenButtonImage = () => {
    setOpenButtonImage(true);
  };
  return (
    <div className={styles.messageRight}>
      <div className={styles.imageMobile}>
        <ImageMobile userData = {props.userData} messages = {props.messages} />
      </div>
      {/* message header */}
      {user && (
        <div className={styles.messageRightContainer}>
          <div className={styles.messageUser}>
            <img
              className={styles.messImage}
              src={
                props.userData[
                  props.messages.users.filter((users) => users != user.nickname)
                ]
              }
            />
            <div>
              <h3 className={styles.messageRightTitle}>
                {props.messages.users.filter((users) => users != user.nickname)}
              </h3>

              <span style={{ color: "#9BF66C" }}>online</span>
            </div>
          </div>

          <div className={styles.messageRightIcon}>
            <span className={styles.icon}>
              <BsFillTelephoneFill />
            </span>
            <span className={styles.icon}>
              <HiVideoCamera />
            </span>
            <span className={styles.icon}>
              <IoMdInformationCircle />
            </span>
          </div>
        </div>
      )}

      {/* content message */}
      <div className={styles.listItem}>
        <ul className={styles.messContainer}>
          {saveValueMess.map((value, index) => {
            // console.log(value);
            return (
              <div key={index}>
                {user && value.user === user.nickname ? (
                  <li ref={itemMessRef} className={styles.messItemRight}>
                    <div className={styles.iconItemContainer}>
                      <span className={styles.iconItem}>
                        <MdMoreVert />
                      </span>
                      <span className={styles.iconItem}>
                        <RiShareForwardFill />
                      </span>
                      <span className={styles.iconItem}>
                        <HiEmojiHappy />
                      </span>
                    </div>
                    <div className={styles.itemContainer}>
                    {console.log(saveValueMess.message)}
                        {user && value.type === 'text' ? <h5 className={styles.itemLeft}> {value.message }</h5>: null }

                        {/* {value.message} */}
                        {user && value.type === 'img' ? <img className={styles.messageImages} src={`http://localhost:3000/api${value.message}`}/> : null}
                      
                    </div>
                  </li>
                ) : (
                  <li ref={itemMessRef} className={styles.messItemLeft}>
                    <div className={styles.iconItemContainer}>
                      <span className={styles.iconItem}>
                        <MdMoreVert />
                      </span>
                      <span className={styles.iconItem}>
                        <RiShareForwardFill />
                      </span>
                      <span className={styles.iconItem}>
                        <HiEmojiHappy />
                      </span>
                    </div>
                    <div className={styles.itemContainer}>
                      
                      {user && value.type === 'text' ?<h5 className={styles.itemRight}> value.message </h5>: null }
                    
                      {user && value.type === 'img' ? <img className={styles.messageImages} src={`http://localhost:3000/api${value.message}`}/> : null}
                      
                    </div>
                  </li>
                )}
              </div>
            );
          })}
        </ul>
        {/* list image */}
        <div className={styles.listImageContainer}>
          {valueInputFile.length > 0 &&
            valueInputFile.map((value, index) => {
              return (
                <div key={index} className={styles.avatarContainer}>
                  <img src={value} className={styles.imageFile} />
                  <span
                    className={styles.deleteImage}
                    onClick={() => deleteImage(index)}
                  >
                    <TiDelete />
                  </span>
                </div>
              );
            })}
        </div>
      </div>

      {/* message footer */}
      <div className={styles.messageRightFooter}>
        <div className={styles.formMess}>
          <div className={styles.messEmojiContainer}>
            <span className={styles.messEmoji}>
              <IoMdAddCircle />
            </span>
            <form>
              <label htmlFor="inputImage" className={styles.messEmoji}>
                <BsImages />
              </label>
              <input
                type="file"
                id="inputImage"
                disabled={valueInputFile.length === 10}
                multiple
                onChange={handleInputImage}
                onClick={handleOpenButtonImage}
              />
            </form>
            <span className={styles.messEmoji}>
              <BsLink45Deg />
            </span>
          </div>
          <form>
            <span className={styles.messageRightInput}>
              <InputEmoji
                ref={inputRef}
                value={valueMess}
                onChange={setValueMess}
                onEnter={handleEnterValueInput}
                cleanOnEnter
                placeholder="message..."
              />
              <div className={styles.buttonContainer}>
                <span
                  className={
                    openButtonImage || valueMess !== ""
                      ? clsx(styles.active, styles.messageRightButton)
                      : styles.messageRightButton
                  }
                  onClick={handleSubmitValue}
                >
                  Gửi
                </span>
                <span
                  onClick={handleIconLike}
                  className={
                    openButtonImage || valueMess !== ""
                      ? styles.iconLike
                      : clsx(styles.active, styles.iconLike)
                  }
                >
                  <AiFillLike />
                </span>
              </div>
            </span>
          </form>
        </div>
        <div className="bottom" ref={messagesEnd}></div>
      </div>
    </div>
  );
}

export default MessageRight;
