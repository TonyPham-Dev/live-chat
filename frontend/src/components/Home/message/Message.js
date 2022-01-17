import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import styles from "./message.module.css";
import MessageLeft from "./MessageLeft";
import MessageRight from "./MessageRight";
function Message(props) {
  const userApi = `http://localhost:3000/api/user/`;
  const apiChat = "http://localhost:3000/api/chat/";
  const accessToken = localStorage.getItem("accessToken");
  const [message, setMessage] = useState([]);
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const {chatId} = useParams()
  useEffect(() => {
    fetch(apiChat + chatId, { headers: { authorization: `Bearer ${accessToken}` } })
      .then((response) => response.json())
      .then((chat) => {
        if(chat.success) {
          setMessage(prev => {
            const prevData = [...prev]
            prevData[prevData.findIndex(element => element._id == chatId)] = chat.chat
            return prevData
          })
        }
      })
  },[chatId])
  useEffect(() => {
    fetch(apiChat, { headers: { authorization: `Bearer ${accessToken}` } })
      .then((response) => response.json())
      .then((message) => {
        setMessage(message);
        if (message.length > 0 && !chatId) {
          navigate(`/message/${message[0]._id}`);
        }
        let userList = [];
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
              <MessageRight messages={message[message.findIndex(element => element._id == chatId)]} userData={userData} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Message;
