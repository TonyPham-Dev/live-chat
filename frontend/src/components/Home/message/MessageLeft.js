import React, {useEffect} from "react";
import { FaSearch } from "react-icons/fa";
import {AiOutlineCloudDownload} from "react-icons/ai"
import { IoIosAddCircle } from "react-icons/io";
import {useAuth0} from '@auth0/auth0-react';
import {Link} from 'react-router-dom'

import styles from "./message.module.css";
import imageUser from "./image/imageUser.jpg";

function MessageLeft(props) {
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
            console.log(props.messages[0].messages.pop().message)
            const useFilter =  message.users.filter(users => users != user.nickname)
            // console.log(props.messages);
              return (
                <li key={index} className={styles.messageUserContainer}>
                  <img className={styles.imageUser} src={props.userData[useFilter]} />
                  <div className={styles.messageUseContent}>
                    <h4 className={styles.name}>{useFilter}</h4>
                    <h5 className={styles.content}>
                      <span style={{ color: "#666" }}>You: 
                        <span style={{ color:'#fff', marginLeft: '10px'}}>{props.messages[0].messages.pop().message}</span>
                      </span> 
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
        <Link to={''} style={{textDecoration: "none"}}>
          <div className={styles.downLoadContainer}>
            <h4 className={styles.downLoad}><span style={{ marginRight: '10px', fontSize:'20px'}}><AiOutlineCloudDownload/></span>Cài đặt ứng dụng Live Chat</h4>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default MessageLeft;
