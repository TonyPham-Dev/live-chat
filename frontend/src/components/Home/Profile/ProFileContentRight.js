import React, { useState, useRef, useEffect, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import WritePost from "./WritePost";
import InputEmoji from "react-input-emoji";
import { FiMoreHorizontal } from "react-icons/fi";
import { ImImages } from "react-icons/im";
import { AiFillLike } from "react-icons/ai";
import { BiLike, BiComment } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";
import styles from "./profile.module.css";
import PostsProfile from "./PostsProfile";
function ProFileContentRight({ user, postContent }) {
  console.log(user);
  const [text, setText] = useState("");
  const [saveText, setSaveText] = useState(["test"]);
  const [saveUrlImage, setSaveUrlImage] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  // call api

  const apiServer = "http://localhost:3000";
  const accessToken = localStorage.getItem("accessToken");
  const [friends, setFriends] = useState(null);
  const [valuePost, setValuePost] = useState([]);
  const [userData, setUserData] = useState({});
  // id from post
  const [idPost, setIdPost] = useState("");
  const [allPost, setAllPost] = useState([]);
  // handle enter of input text
  const handleOnEnter = () => {
    setSaveText((prev) => [...prev, text]);
  };

  // create URL file input
  const handleInputFile = (e) => {
    const imageIndex = e.target.files[0];
    // setStateImage(prev => [...prev,e.target.files[0]])
    const urlImage = URL.createObjectURL(imageIndex);
    setSaveUrlImage((prev) => [...prev, urlImage]);
  };
  // scroll to top when restart app
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (allPost.length > 0) {
      setAllPosts(allPost);
    }
  }, [allPost]);

  const checkObjectIsUndefined = (obj) => {
    return Object.keys(obj).length > 0;
  };
  // friends
  // useEffect(() => {
  //   user &&
  //     fetch(`${apiServer}/api/user/friends/${user.nickname}`, {
  //       headers: { Authorization: `Bearer ${accessToken}` },
  //     })
  //       .then((response) => {
  //         if (response.status == 500) {
  //           logOut();
  //         }
  //         return response.json();
  //       })
  //       .then((listFriends) => {
  //         if (checkObjectIsUndefined(listFriends)) {
  //           setFriends(listFriends);
  //         }
  //       });
  // }, [user]);

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
      .get(`${apiServer}/api/posts?page=1&all=true`, config)
      .then((response) => {
        if (checkObjectIsUndefined(response)) {
          setAllPost(response.data.posts);
          setUserData(response.data.usersData);
        }
      });
  }, [user]);
  return (
    <>
      {/* post profile */}
      <WritePost user={user} />

      {/* content when posts */}
      {/* render ở đây */}
      {allPosts.length > 0 &&
        allPosts.map((post, index) => {
          return (
            <React.Fragment key={index}>
              <PostsProfile
                user={user}
                // post={valuePost}
                post={post}
                // userData={userData}
                indexPost={index}
              />
            </React.Fragment>
          );
        })}

      {/* render */}
    </>
  );
}

export default ProFileContentRight;
