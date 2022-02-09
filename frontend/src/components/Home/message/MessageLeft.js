import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import imageUser from "./image/imageUser.jpg";
import styles from "./message.module.css";
import clsx from "clsx";
function MessageLeft(props) {
  console.log(props.messages);
  const { user } = useAuth0();
  const apiServer = "http://localhost:3000";
  const apiCreateMessage = "http://localhost:3000/api/chat/new";
  const apiFriends = `http://localhost:3000/api/user/friends/`;
  const accessToken = localStorage.getItem("accessToken");

  const [addUser, setAddUser] = useState([]);
  const [friends, setFriends] = useState([]);
  const [openContainerSearch, setOpenContainerSearch] = useState(false);

  const [valueSearch, setValueSearch] = useState("");
  const [userFromApi, setUserFromApi] = useState([]);
  const [getUserFromApi, setGetUserFromApi] = useState([]);
  const [active, setActive] = useState(0)
  const navigate = useNavigate();

  const checkObjectIsUndefined = (obj) => {
    return Object.keys(obj).length > 0;
  };
  useEffect(() => {
    user &&
      fetch(apiFriends + user.nickname, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then((response) => response.json())
        .then((listFriends) => {
          if (checkObjectIsUndefined(listFriends)) {
            // console.log(123);
            setFriends(listFriends);
          }
        });
  }, [user]);

  // search user
  useEffect(() => {
    valueSearch &&
      fetch(`${apiServer}/api/user/search/${valueSearch}`)
        .then((response) => response.json())
        .then((user) => setUserFromApi(user.users));
  }, [valueSearch]);

  // create new chat
  const handleCreateNewChat = (index) => {
    fetch(apiCreateMessage, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
      body: JSON.stringify({ users: [userFromApi[index].nickname] }),
    })
      .then((response) => response.json())
      .then((data) => navigate(`/message/${data.chat._id}`))
      .catch((error) => console.log(error));

    setValueSearch("");
    setOpenContainerSearch(false);
  };

  // handle convert box chat
  const handleConvertBoxChat = (message,index) => {
    navigate(`/message/${message._id}`);
    setActive(index)
  };
  return (
    <div className={styles.messageLeft}>
      <h3>Chat</h3>

      {/* body chat */}
      <div className={styles.messageChatHeader}>
        {/* icon search */}
        <div className={styles.messageSearch}>
          <span className={styles.iconSearch}>
            <input
              className={styles.inputSearch}
              value={valueSearch}
              onChange={(e) => setValueSearch(e.target.value)}
              placeholder="Search friends..."
              onClick={() => setOpenContainerSearch(!openContainerSearch)}
            />
            <span
              className={styles.iconContainer}
              onClick={() => setOpenContainerSearch(!openContainerSearch)}
            >
              <FaSearch />
            </span>
          </span>

          {openContainerSearch && (
            <ul className={styles.listFriendsSearch}>
              {userFromApi
                ? userFromApi.map((user, index) => {
                    return (
                      <li
                        className={styles.itemSearch}
                        key={index}
                        onClick={() => handleCreateNewChat(index)}
                      >
                        <img
                          className={styles.imageSearch}
                          src={
                            user
                              ? user.avatarUrl
                              : "data:image/jpeg;base64,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"
                          }
                        />
                        <span>{user && user.fullName}</span>
                      </li>
                    );
                  })
                : null}
            </ul>
          )}
        </div>
      </div>
      <div className={styles.messageBody}>
        <ul className={styles.messageBodyContainer}>
          {/* render list friends */}
          {user &&
            props.messages &&
            props.userData &&
            props.messages.map((message, index) => {
              const useFilter = message.users.filter(
                (users) => users != user.nickname
              );
              return (
                <li
                  key={index}
                  className={active == index ? clsx(styles.messageUserContainer, styles.activeBg) : styles.messageUserContainer}
                  onClick={() => handleConvertBoxChat(message, index)}
                >
                  <img
                    className={styles.imageUser}
                    src={props.userData[useFilter]}
                  />
                  <div className={styles.messageUseContent}>
                    <h4 className={styles.name}>{useFilter}</h4>
                    <h5 className={styles.content}>
                      <span style={{ color: "#666" }}>
                        You:
                        <span style={{ color: "#fff", marginLeft: "10px" }}>
                          {props.messages[index].messages.length > 0 && props.messages[index].messages[props.messages[index].messages.length - 1 ].type === 'text' ? props.messages[index].messages[props.messages[index].messages.length - 1 ].message[0] : 'Hình ảnh'}
                        </span>
                      </span>
                    </h5>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>

      <div className={styles.messageFooter}>
        <Link to={""} style={{ textDecoration: "none" }}>
          <div className={styles.downLoadContainer}>
            <h4 className={styles.downLoad}>
              <span style={{ marginRight: "10px", fontSize: "20px" }}>
                <AiOutlineCloudDownload />
              </span>
              Cài đặt ứng dụng Live Chat
            </h4>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default MessageLeft;
