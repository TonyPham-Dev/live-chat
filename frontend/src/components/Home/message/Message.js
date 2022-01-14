import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import styles from "./message.module.css";
import MessageLeft from "./MessageLeft";
import MessageRight from "./MessageRight";
function Message(props) {
  const accessToken = localStorage.getItem("accessToken");
  const [message, setMessage] = useState([]);
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const userApi = `http://localhost:3000/api/user/`;
    const apiChat = "http://localhost:3000/api/chat";
    fetch(apiChat, { headers: { authorization: `Bearer ${accessToken}` } })
      .then((response) => response.json())
      .then((message) => {
        console.log(message);
        setMessage(message);
        if (message.length > 0) {
          navigate(`/message/${message[0]._id}`);
        }
        let userList = [];
        console.log(message);
        message &&
          message.forEach((mess) => {
            userList = userList.concat(mess.users);
          });
        userList = Array.from(new Set(userList));

        const promiseList = userList.map((user) => {
          return fetch(userApi + user).then((res) => res.json());
        });
        Promise.all(promiseList)
          .then((datas) => {
            const objData = {};
            datas.forEach((data) => {
              objData[data.user.nickname] = data.user.avatarUrl;
            });
            setUserData(objData);
          })
          .catch((error) => {
            console.log(error);
          });
      });
  }, []);

  return (
    <>
      <div className={styles.message}>
        <div className={styles.messageContainer}>
          <div>
            {Object.entries(userData).length > 0 && (
              <MessageLeft messages={message} userData={userData} />
            )}
          </div>
          <div>
            {Object.entries(userData).length > 0 && (
              <MessageRight messages={message[0]} userData={userData} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Message;
