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

// auth0
import {useAuth0} from '@auth0/auth0-react';

// emoji
import InputEmoji from "react-input-emoji";
import imageUser from "./image/imageUser.jpg";
import styles from "./message.module.css";
import clsx from "clsx";
import ImageMobile from "./ImageMobile";

const serverUrl = "http://localhost:3000"
const listMessApi = 'http://localhost:3000/api/chat'


function MessageRight(props) {
  // props.messages._id
  // auth0
  const socketRef = useRef()

  const {user} = useAuth0()
  // value input
  const [valueMess, setValueMess] = useState('');
  // save value input
  const [saveValueMess, setSaveValueMess] = useState([]);

  // const [openImage, setOpenImage] = useState(false);
  // file image
  const [valueInputFile, setValueInputFile] = useState([]);
  const inputRef = useRef();
  const itemMessRef = useRef();

  // handle button submit
  const handleSubmitValue = () => {
    setSaveValueMess((prev) => [...prev, {message:valueMess}]);
    setValueMess("");
    inputRef.current.focus();
    itemMessRef.current.scrollIntoView({ behavior: "smooth" });
    socketRef.current.emit("text-message", valueMess)
  };

  useEffect(() => {
    const socket = io(`${serverUrl}/message`, {
      path: "/chat",
      auth: {
        roomId: props.messages._id,
        token: localStorage.getItem("accessToken")
      }
    })


    socket.on('new-text', (nickName, message) => {
      setSaveValueMess((prev) => [...prev, {user:nickName, message:message}]);
    })
    
    socketRef.current = socket
    props.messages.messages.forEach((message) => {
      setSaveValueMess((prev) => [...prev, {user: message.user, message:message.message[0]}]);
    })
  },[])
  // handle key enter
  const handleEnterValueInput = (valueMess) => {
    setSaveValueMess((prev) => [...prev, {message:valueMess}]);
    itemMessRef.current && itemMessRef.current.scrollIntoView({ behavior: "smooth" });
    inputRef.current.focus();
    socketRef.current.emit("text-message", valueMess)
  };
  // handle click icon like
  const handleIconLike = () => {
    setSaveValueMess((prev) => [...prev, {message:'👍'}]);
    itemMessRef.current.scrollIntoView({ behavior: "smooth" });
    socketRef.current.emit("text-message", '👍')
  };

  useEffect(() => {
    // clean up
    return () => {
      valueInputFile && URL.revokeObjectURL(valueInputFile);
    };
  }, [valueInputFile]);

  // handle input image click
  const handleInputImage = (e) => {
    setValueInputFile([
      ...valueInputFile,
      URL.createObjectURL(e.target.files[0]),
    ]);
  };

  // remove file image
  const deleteImage = (e) => {
    const imageIndex = valueInputFile.filter((item, index) => index !== e);
    setValueInputFile(imageIndex);
  };
  return (
    <div className={styles.messageRight}>
      <div className={styles.imageMobile}>
        <ImageMobile />
      </div>
        {/* message header */}
      {user && <div className={styles.messageRightContainer}>
        <div className={styles.messageUser}>
          <img className={styles.messImage} src={props.userData[props.messages.users.filter(users => users != user.nickname)]} />
          <div>
            <h3 className={styles.messageRightTitle}>{props.messages.users.filter(users => users != user.nickname)}</h3>
           
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
      }

      {/* id: props.messages._id */}
      {/* content message */}
      <div className={styles.listItem}>
        <ul className={styles.messContainer}>
          {saveValueMess.map((value, index) => {
            return (
              <span ref={itemMessRef} className={styles.messItem} key={index}>
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
                <li className={styles.item}>{value.message}</li>
                <img />
              </span>
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
                    valueMess !== ""
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
                    valueMess !== ""
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
