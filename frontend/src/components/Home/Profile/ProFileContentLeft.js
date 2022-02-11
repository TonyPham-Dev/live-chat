import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import {FaTimesCircle} from 'react-icons/fa'
import AboutUser from "./AboutUser";
import styles from "./profile.module.css";

function ProFileContentLeft({ user }) {
  const { user: userFromAuth0 } = useAuth0();
  const apiServer = "http://localhost:3000";
  const accessToken = localStorage.getItem("accessToken");
  const [friends, setFriends] = useState([]);
  const [countImage, setCountImage] = useState(2);
  const [numberOfElement, setNumberOfElement] = useState(3);
  const [srcFullImage, setSrcFullImage] = useState("");
  const [openFullImage, setOpenFullImage] = useState(false);
  useEffect(async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken} `,
      },
    };
    await axios
      .get(`${apiServer}/api/user/friends/${user && user.nickname}`, config)
      .then((response) => setFriends(response.data));
  }, []);

  // check friends is null or undefined
  const checkObjectIsUndefined = (obj) => {
    return obj && Object.keys(obj).length > 0;
  };

  const sliceImage = user.posts.post.filter((image) => {
    if (image.imgList.length > 0) {
      return image.imgList.slice(0, countImage);
    }
  });
  // get all image when click xem them
  const handleGetAllImage = () => {};

  const handleFullImageProfile = (img, index) => {
    setSrcFullImage(img);
    setOpenFullImage(true);
  };

  return (
    <div>
      {/* this is about user */}
      <div>
        <AboutUser aboutUser={user} />
      </div>

      {/* this is image when post */}
      <div className={styles.profileContentImage}>
        <div className={styles.profileImageContainer}>
          <h3 className={styles.allImagePost}>Ảnh</h3>
          <h3 className={styles.getAllimage} onClick={handleGetAllImage}>
            Xem tất cả ảnh
          </h3>
        </div>
        <div className={styles.allImages}>
          {checkObjectIsUndefined(user) &&
            sliceImage.map((image, index) => {
              return (
                <div className={styles.profileAllImages} key={index}>
                  {image.imgList.map((img, index) => {
                    return (
                      <img
                        style={{
                          width: `calc(100% /${image.imgList.length}`,
                        }}
                        onClick={() => handleFullImageProfile(img, index)}
                        key={index}
                        src={`${apiServer}/api/media/${img}`}
                        className={styles.imageAllPost}
                      />
                    );
                  })}
                </div>
              );
            })}
        </div>
      </div>
      {/* this is friends */}
      {checkObjectIsUndefined(user) &&
      checkObjectIsUndefined(userFromAuth0) &&
      user.user.nickname === userFromAuth0.nickname ? (
        <div className={styles.profileContentFriends}>
          <div className={styles.profileAllFriends}>
            <div>
              <h3 className={styles.friendsTitle}>Bạn bè</h3>
              <h4 className={styles.totalFriends}>{`${
                friends !== null && checkObjectIsUndefined(friends.contacts)
                  ? friends.contacts.totalItems
                  : ""
              } người bạn`}</h4>
            </div>
            <div className={styles.allFriendsContainers}>
              {friends !== null && checkObjectIsUndefined(friends.contacts)
                ? friends.contacts.connections.map((friend, index) => {
                    return (
                      <div className={styles.allFriendsContainer} key={index}>
                        <div className={styles.imageAlls}>
                          <img
                            className={styles.allFriends}
                            src="https://12guns.vn/code-tim-kiem-theo-ten-trong-java/imager_3161.jpg"
                          />
                        </div>
                        <div className={styles.friendsName}>
                          <h3 className={styles.nameFriends}>
                            {checkObjectIsUndefined(friends) &&
                              friend.names[0].displayName}
                          </h3>
                          {/* <h3>hello</h3> */}
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      ) : null}
      {/*  full image */}
        {openFullImage && (
          <div
            className={styles.overlayFullImage}
            onClick={() => setOpenFullImage(false)}
          ></div>
        )}
        {openFullImage && srcFullImage ? (
          <div className={styles.fullImageContainer}>
            <img
              className={styles.fullImage}
              src={`${apiServer}/api/media/${srcFullImage}`}
              
            />
           
            <span onClick={() => setOpenFullImage(false)} className={styles.removeFullImage}><FaTimesCircle/></span>
          </div>
        ) : null}
    </div>
  );
}

export default ProFileContentLeft;
