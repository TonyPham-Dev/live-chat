import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import AboutUser from "./AboutUser";
import styles from "./profile.module.css";

function ProFileContentLeft({ user }) {
  console.log(user);
  const apiServer = "http://localhost:3000";
  const accessToken = localStorage.getItem("accessToken");
  const [friends, setFriends] = useState([]);
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
  return (
    <></>
    // <div>
    //   {/* this is about user */}
    //   <div>
    //     <AboutUser />
    //   </div>

    //   {/* this is image when post */}
    //   <div className={styles.profileContentImage}>
    //     <div className={styles.profileImageContainer}>
    //       <h3 className={styles.allImagePost}>Ảnh</h3>
    //     </div>
    //     {/* {console.log(user.posts)} */}
    //     {checkObjectIsUndefined(user) &&
    //       user.posts.map((post, index) => {
    //         // {
    //         //   console.log(post);
    //         // }
    //         return (
    //           <div className={styles.profileAllImages} key={index}>
    //             {/* {checkObjectIsUndefined(post) &&
    //             post.imgList &&
    //             post.imgList.length > 0
    //               ? post.imgList.map((img, index) => {
    //                   <img
    //                     key={index}
    //                     className={styles.imageAllPost}
    //                     src={img}
    //                   />;
    //                 })
    //               : null} */}
    //           </div>
    //         );
    //       })}
    //   </div>

    //   {/* this is friends */}
    //   <div className={styles.profileContentFriends}>
    //     <div className={styles.profileAllFriends}>
    //       <div>
    //         <h3 className={styles.friendsTitle}>Bạn bè</h3>
    //         <h4 className={styles.totalFriends}>{`${
    //           friends !== null && checkObjectIsUndefined(friends.contacts)
    //             ? friends.contacts.totalItems
    //             : ""
    //         } người bạn`}</h4>
    //       </div>
    //       <div className={styles.allFriendsContainers}>
    //         {friends !== null && checkObjectIsUndefined(friends.contacts)
    //           ? friends.contacts.connections.map((friend, index) => {
    //               // {checkObjectIsUndefined(friends) && console.log(friend.names[0].displayName)}
    //               return (
    //                 <div className={styles.allFriendsContainer} key={index}>
    //                   <div className={styles.imageAlls}>
    //                     <img
    //                       className={styles.allFriends}
    //                       src="https://12guns.vn/code-tim-kiem-theo-ten-trong-java/imager_3161.jpg"
    //                     />
    //                   </div>
    //                   <div className={styles.friendsName}>
    //                     <h3 className={styles.nameFriends}>
    //                       {checkObjectIsUndefined(friends) &&
    //                         friend.names[0].displayName}
    //                     </h3>
    //                     {/* <h3>hello</h3> */}
    //                   </div>
    //                 </div>
    //               );
    //             })
    //           : null}
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default ProFileContentLeft;
