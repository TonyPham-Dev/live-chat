import React, {useEffect} from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import {useAuth0} from '@auth0/auth0-react';

import styles from "./message.module.css";
import imageUser from "./image/imageUser.jpg";

function MessageLeft(props) {
  console.log(props.messages);
  useEffect (() => {
    const apiUse = `http://localhost:3000/api/user/`
  },[])

  
  const {user} = useAuth0() 
 
  return (
    <div className={styles.messageLeft}>
      <div className={styles.messageChatHeader}>
        <h3>Chat</h3>
        {/* icon search */}
        <div>
          <span style={{ marginRight: "20px", cursor: "pointer" }}>
            <FaSearch />
          </span>
          <span style={{ cursor: "pointer" }}>
            <IoIosAddCircle />
          </span>
        </div>
      </div>

      {/* body chat */}
      <div className={styles.messageBody}>
        <ul className={styles.messageBodyContainer}>
       
          {/* render list friends */}
          { user &&  (props.messages && props.userData) && props.messages.map ((message,index) => {
            
            const useFilter =  message.users.filter(users => users != user.nickname)
            // console.log(props.messages);
              return (
                <li key={index} className={styles.messageUserContainer}>
                  <img className={styles.imageUser} src={props.userData[useFilter]} />
                  <div className={styles.messageUseContent}>
                    <h4 className={styles.name}>{useFilter}</h4>
                    <h5 className={styles.content}>
                      <span style={{ color: "#666" }}>You: </span> 
                      <li></li>
                    </h5>
                  </div>
                </li> 
              )
          })}

          {/* <li className={styles.messageUserContainer}>
            <img className={styles.imageUser} src={imageUser} />
            <div className={styles.messageUseContent}>
              <h4 className={styles.name}>Phạm Văn Công</h4>
              <h5 className={styles.content}>
                <span style={{ color: "#666" }}>You: </span> xin chào các bạn đã
                đến với live chat
              </h5>
            </div>
          </li> */}

         
        </ul>
      </div>

      <div className={styles.messageFooter}>
        <button className={styles.messageButton}>Submit Google</button>
      </div>
    </div>
  );
}

export default MessageLeft;
