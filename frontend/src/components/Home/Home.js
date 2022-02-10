import React from "react";
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
import PostContentHeader from "./Posts/PostContentHeader";
export const HomeContext = React.createContext();
function Home({ logOut }) {
  const apiServer = "http://localhost:3000";

  const { user } = useAuth0();
  const accessToken = localStorage.getItem("accessToken");
  const [friends, setFriends] = useState(null);
  const [valuePost, setValuePost] = useState([]);
  const [userData, setUserData] = useState({});
  // id from post
  const [idPost, setIdPost] = useState("");
  const [allPost, setAllPost] = useState([]);
  const [savePage, setSavePage] = useState(1);
  const [lengthPage, setLengthPage] = useState(1);

  // file image and file video mp4
  const [fileImage, setFileImage] = useState([]);
  const [saveFileImage, setSaveFileImage] = useState([]);
  // state video mp4
  const [fileVideo, setFileVideo] = useState([]);
  const [saveVideo, setSaveVideo] = useState([]);

  const checkObjectIsUndefined = (obj) => {
    return Object.keys(obj).length > 0;
  };
  // friends
  useEffect(() => {
    user &&
      fetch(`${apiServer}/api/user/friends/${user.nickname}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then((response) => {
          if (response.status == 500) {
            logOut();
          }
          return response.json();
        })
        .then((listFriends) => {
          if (checkObjectIsUndefined(listFriends)) {
            setFriends(listFriends);
          }
        });
  }, [user]);

  // get post from /api/posts/new
  useEffect(async () => {
    if (idPost) {
      await axios.get(`${apiServer}/api/posts/${idPost}`).then((response) => {
        setValuePost((prev) => [...prev, response.data.post]);
      });
    }
  }, [idPost]);

  // get all post from GET /api/posts/(?page=x&all=true | | ?page=x)
  useEffect(async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    await axios
      .get(`${apiServer}/api/posts?page=${savePage}&all=true`, config)
      .then((response) => {
        if (checkObjectIsUndefined(response)) {
          setAllPost((prev) => [...prev, ...response.data.posts]);
          setUserData((prev) => {
            return { ...prev, ...response.data.usersData };
          });
          setLengthPage(response.data.pages);
        }
      });
  }, [user, savePage]);

  //create file image and file video

  return (
    <>
      <HomeContext.Provider value={{ IdPostHandle: setIdPost, id: idPost }}>
        <div className={styles.home}>
          <div className={styles.friends}>
            <Friends friends={friends} />
          </div>

          <div className={styles.postContents} id="testOverlay">
            <div className={styles.PostContentHeader}>
              <PostContentHeader
                setAllPost={setAllPost}
                fileImage={fileImage}
                setFileImage={setFileImage}
                saveFileImage={saveFileImage}
                setSaveFileImage={setSaveFileImage}
                fileVideo={fileVideo}
                setFileVideo={setFileVideo}
                saveVideo={saveVideo}
                setSaveVideo={setSaveVideo}
              />
            </div>
            <PostContents
              post={valuePost}
              allPost={allPost}
              userData={userData}
              setSavePage={setSavePage}
              savePage={savePage}
              lengthPage={lengthPage}
            />
          </div>

          <div className={styles.posts}>
            <Posts
              setAllPost={setAllPost}
              fileImage={fileImage}
              setFileImage={setFileImage}
              saveFileImage={saveFileImage}
              setSaveFileImage={setSaveFileImage}
              fileVideo={fileVideo}
              setFileVideo={setFileVideo}
              saveVideo={saveVideo}
              setSaveVideo={setSaveVideo}
            />
          </div>
        </div>
      </HomeContext.Provider>
    </>
  );
}

export default Home;
