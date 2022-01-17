import Friends from "./Friends/Friends";
import Header from "./Header/Header";
import PostContents from "./PostContents/PostContents";
import Posts from "./Posts/Posts";
import Message from "./message/Message";
// import {useAuth0} from '@auth0/auth0-react';
import { useNavigate } from "react-router-dom";
import { useEffect, memo, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from './home.module.css'

function Home() {
    const {user} = useAuth0()
    const accessToken = localStorage.getItem("accessToken");
    const apiServer = 'http://localhost:3000'
    const [friends, setFriends] = useState(null)

     // call api friends contact
     const checkObjectIsUndefined = (obj) => {
      return Object.keys(obj).length > 0
    }
     useEffect(() => {
        user && fetch(`${apiServer}/api/user/friends/${user.nickname}`, {headers: {'Authorization':`Bearer ${accessToken}` }})
          .then(response => response.json())
          .then (listFriends => {
            if(checkObjectIsUndefined(listFriends)) {
              setFriends(listFriends)
            }
          })
     },[user])
   
  return (
    <>
      <div className={styles.home}>
        <div className={styles.friends}>
          <Friends friends = {friends}/>
        </div>

        <div className={styles.postContents}>
          <PostContents />
        </div>
        
        <div className={styles.posts}>
          <Posts/>
        </div>
      </div>
      
    </>
  );
}

export default Home;
