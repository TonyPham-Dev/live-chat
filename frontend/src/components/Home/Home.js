import Friends from "./Friends/Friends";
import Header from "./Header/Header";
import PostContents from "./PostContents/PostContents";
import Posts from "./Posts/Posts";
import Message from "./message/Message";
// import {useAuth0} from '@auth0/auth0-react';
import { useNavigate } from "react-router-dom";
import { useEffect, memo, useState } from "react";

import styles from './home.module.css'

function Home() {
    const accessToken = localStorage.getItem("accessToken");
    //   console.log(accessToken);
    // api localHost
    const apiServer = 'http://localhost:3000'

     // call api posts new
     useEffect(() => {
      const apiPost = `${apiServer}/api/posts/new`
      fetch(apiPost) //axios
          .then(response => response.json())
          .then(data => console.log(data))
    },[])
  return (
    <>
      <div className={styles.home}>
        <div className={styles.friends}>
          <Friends/>
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
