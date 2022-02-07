import React, { useEffect, useState, useRef, memo } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "./Post";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./postContent.module.css";
import PostContentHeader from "../Posts/PostContentHeader";
function PostContents({ allPost, userData, setSavePage, lengthPage,savePage }) {

  const dashboardRef = useRef();
  const accessToken = localStorage.getItem("accessToken");
  const { user } = useAuth0();
  const [text, setText] = useState("");
  const [saveText, setSaveText] = useState([]);
  const imageRef = useRef(null);
  const [open, setOpen] = useState(true);
  const [posts, setPosts] = useState([]);
  const [imgFull, setImgFull] = useState("");
  const [id, setId] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [liked, setLiked] = useState(false);
  const [openDashboard, setOpenDashboard] = useState(false);
  const [saveIdPost, setSaveIdPost] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  // scroll to top when restart app
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (allPost.length > 0) {
      setAllPosts(allPost);
    }
  }, [allPost]);

  // const loadFunc = async (page) => {
  //   if (page >= countPage) {
  //     setHasMore(false);
  //   }
  //   console.log(page);
  // };
  return (
    <>
      {/* <div className={styles.app}> */}
        <InfiniteScroll
          dataLength={allPosts.length} //10
          next={() => setSavePage(prev => prev + 1)}
          hasMore={savePage < lengthPage}//? false : true
          scrollableTarget = 'testOverlay'
          loader={<Backdrop
            sx={{
              position: 'fixed',
              right: '0',
              bottom: '-90%',
              left: '0',
              minHeight:"100px",
              background:'transparent',
              color: "#2374e1",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={open}
          >
            <CircularProgress color="inherit" />
          </Backdrop>}
        >
          
          {allPosts.length > 0 &&
            allPosts.map((post, index) => {
              return (
                <React.Fragment key={index}>
                  <Post
                    post={post}
                    setAllPosts={setAllPosts}
                    userData={userData}
                    indexPost={index}
                  />
                </React.Fragment>
              );
            })}
        </InfiniteScroll>

        {/* loading cho nay */}
      {/* </div> */}
    </>
  );
}

export default memo(PostContents);
