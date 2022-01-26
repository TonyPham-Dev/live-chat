import React from 'react'; 
import Friends from "./Friends/Friends";
import Header from "./Header/Header";
import PostContents from "./PostContents/PostContents";
import Posts from "./Posts/Posts";
import Message from "./message/Message";
// import {useAuth0} from '@auth0/auth0-react';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, memo, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./home.module.css";
export const HomeContext = React.createContext()
function Home() {
  
  const apiServer = "http://localhost:3000";

  const { user } = useAuth0();
  const accessToken = localStorage.getItem("accessToken");
  const [friends, setFriends] = useState(null);
  const [valuePost, setValuePost] = useState([]);
  const [userData, setUserData] = useState({})
  // id from post
  const [idPost, setIdPost] = useState('');
  const [allPost, setAllPost] = useState([])
  const checkObjectIsUndefined = (obj) => {
    return Object.keys(obj).length > 0;
  };
  // friends
  useEffect(() => {
    user &&
      fetch(`${apiServer}/api/user/friends/${user.nickname}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then((response) => response.json())
        .then((listFriends) => {
          if (checkObjectIsUndefined(listFriends)) {
            setFriends(listFriends);
          }
        });
  }, [user]);

  
  // get post from /api/posts/new
  useEffect(async () => {
    if(idPost) {
      await axios.get(`${apiServer}/api/posts/${idPost}`)
      .then(response => {
        setValuePost(prev => [...prev,response.data.post]);
        
      })
    }
  }, [idPost]);

  // get all post from GET /api/posts/(?page=x&all=true | | ?page=x)
  useEffect( async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    }
    await axios.get(`${apiServer}/api/posts?page=1&all=true`,config)
      .then(response => {
        if(checkObjectIsUndefined(response))  { 
          setAllPost(response.data.posts)
          setUserData(response.data.usersData)
        }
      })
  },[user])


  return (
    <>
    <HomeContext.Provider value={{IdPostHandle:setIdPost, id:idPost}}>
      <div className={styles.home}>
        <div className={styles.friends}>
          <Friends friends={friends} />
        </div>

        <div className={styles.postContents}>
          <PostContents Post = {valuePost} allPost = {allPost} userData={userData}/>
        </div>

        <div className={styles.posts}>
          <Posts />
        </div>
      </div>
    </HomeContext.Provider>
    </>
  );
}

export default Home;
