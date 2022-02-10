import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
// import socket.io
import io from "socket.io-client";
// import react-icon
import {
  BsFillTelephoneFill,
  BsEmojiSmileFill,
  BsImages,
  BsLink45Deg,
} from "react-icons/bs";
import { MdSend } from "react-icons/md";
import { HiVideoCamera } from "react-icons/hi";
import { IoMdInformationCircle, IoMdAddCircle } from "react-icons/io";
import { MdMoreVert } from "react-icons/md";
import { RiShareForwardFill } from "react-icons/ri";
import { HiEmojiHappy } from "react-icons/hi";
import { AiFillLike, AiOutlineBars } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import { FaTimesCircle } from "react-icons/fa";
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

const serverUrl = "http://localhost:3000";
const listMessApi = "http://localhost:3000/api/chat";

function MessageRight(props) {
  console.log(props.messages.users);
  // scroll to bottom
  const messagesEnd = useRef();

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
  const [openImageFullScreen, setImageFullScreen] = useState();
  const inputRef = useRef();
  const itemMessRef = useRef();
  // handle button submit gửi
  const handleSubmitValue = () => {
    console.log(valueMess);
    // play load text
    if (valueMess.trim() !== "") {
      // setSaveValueMess((prev) => [
      //   ...prev,
      //   { user: user.nickname, message: valueMess, type: "text" },
      // ]);
      socketRef.current.emit("text-message", valueMess);
      setValueMess("");
    }

    // play load image
    if (valueInputFile.length > 0) {
      setSrcImage((prev) => [...prev, valueInputFile]);
      playLoadImage();
    }
    setValueInputFile([]);
    setImgs([]);
  };
  // scroll to bottom
  useEffect(() => {
    const scrollToBottom = () => {
      messagesEnd.current.scrollIntoView({ behavior: "smooth" });
    };
    scrollToBottom();
  }, [saveValueMess]);
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
        { user: nickName, message: message, type: "text" },
      ]);
    });

    socketRef.current = socket;
  }, []);
  useEffect(() => {
    socketRef.current.emit("change-room", chatId);
    setSaveValueMess([]);
    props.messages.messages.forEach((message) => {
      setSaveValueMess((prev) => [
        ...prev,
        { user: message.user, message: message.message, type: message.type },
      ]);
    });
  }, [props.messages]);

  useEffect(() => {}, [chatId]);
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
      setSaveValueMess((prev) => [
        ...prev,
        { user: user.nickname, message: imgList.fileList, type: "img" },
      ]);
      socketRef.current.emit("img-message", imgList.fileList);
    }
  };

  // handle key enter
  const handleEnterValueInput = () => {
    handleSubmitValue();
  };
  // handle click icon like
  const handleIconLike = () => {
    // setSaveValueMess((prev) => [
    //   ...prev,
    //   { user: user.nickname, message: "👍", type: "text" },
    // ]);
    itemMessRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
    socketRef.current.emit("text-message", "👍");
  };

  // handle input image click lấy link ảnh
  const handleInputImage = (e) => {
    Array.from(e.target.files).forEach((urlImage) => {
      setImgs((prev) => [...prev, urlImage]);
      setValueInputFile((prev) => [...prev, URL.createObjectURL(urlImage)]);
    });
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

  // open image
  const handleOpenImageMess = (image) => {
    setImageFullScreen(image.target.src);
  };

  // delete Image full screen
  const handleRemoveImageFullScreen = () => {
    setImageFullScreen(null);
  };
  return (
    <div className={styles.messageRight}>
      {/* message header */}
      {user && (
        <div className={styles.messageRightContainer}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* <Link to={"/message"}> */}
            <div
              className={styles.gobackMessage}
              onClick={() => props.setCurrentId(null)}
            >
              <AiOutlineBars />
            </div>
            {/* </Link> */}
            <Link
              to={`/user/${props.messages.users.filter(
                (users) => users !== user.nickname
              )}`}
              style={{ textDecoration: "none" }}
            >
              <div className={styles.messageUser}>
                <img
                  className={styles.messImage}
                  src={
                    props.userData[
                      props.messages.users.filter(
                        (users) => users != user.nickname
                      )
                    ]
                  }
                />
                <div>
                  <h3 className={styles.messageRightTitle}>
                    {props.messages.users.filter(
                      (users) => users != user.nickname
                    )}
                  </h3>

                  <span style={{ color: "#9BF66C" }}>online</span>
                </div>
              </div>
            </Link>
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
                      {user && value.type === "text" ? (
                        <h5 className={styles.itemLeft}> {value.message}</h5>
                      ) : null}

                      {/* {value.message} */}
                      <div className={styles.messageImagesContainer}>
                        {user && value.type === "img"
                          ? value.message.map((img, index) => (
                              <img
                                onClick={(img) => handleOpenImageMess(img)}
                                key={index}
                                className={styles.messageImages}
                                src={`http://localhost:3000/api/media/chat/${img}`}
                              />
                            ))
                          : null}
                      </div>
                    </div>
                  </li>
                ) : (
                  <li ref={itemMessRef} className={styles.messItemLeft}>
                    <div className={styles.itemContainer}>
                      {user && value.type === "text" ? (
                        <div className={styles.itemImageUser}>
                          {user && (
                            <img
                              className={styles.imageUserMessage}
                              src={
                                props.userData[
                                  props.messages.users.filter(
                                    (users) => users != user.nickname
                                  )
                                ]
                              }
                            />
                          )}
                          <h5 className={styles.itemRight}>{value.message}</h5>
                        </div>
                      ) : null}
                      <div className={styles.messageImagesContainer}>
                        {user && value.type === "img"
                          ? value.message.map((img, index) => (
                              <div
                                className={styles.userAlignImage}
                                key={index}
                              >
                                {user && (
                                  <img
                                    className={styles.imageUserMessage}
                                    src={
                                      props.userData[
                                        props.messages.users.filter(
                                          (users) => users != user.nickname
                                        )
                                      ]
                                    }
                                  />
                                )}
                                <img
                                  onClick={(img) => handleOpenImageMess(img)}
                                  className={styles.messageImages}
                                  src={`http://localhost:3000/api/media/chat/${img}`}
                                />
                              </div>
                            ))
                          : null}
                      </div>
                    </div>
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
                  </li>
                )}
              </div>
            );
          })}
          <div className="bottom" ref={messagesEnd}></div>
        </ul>
        {openImageFullScreen && (
          <div className={styles.imageFullScreen}>
            {openImageFullScreen && (
              <div
                className={styles.imageOverlay}
                onClick={() => setImageFullScreen(null)}
              ></div>
            )}
            <span
              className={styles.iconRemoveImage}
              onClick={() => handleRemoveImageFullScreen()}
            >
              <FaTimesCircle />
            </span>
            <img className={styles.imageFull} src={openImageFullScreen} />
          </div>
        )}

        {/* scroll bottom */}
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
                  <MdSend />
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
      </div>
    </div>
  );
}

export default MessageRight;
