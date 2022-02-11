import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import WritePost from "./WritePost";
import PostsProfile from "./PostsProfile";
function ProFileContentRight({ user }) {
  const [allPost, setAllPost] = useState([]);

  const checkObjectIsUndefined = (obj) => {
    return Object.keys(obj).length > 0;
  };

  useEffect(() => {
    checkObjectIsUndefined(user) && setAllPost(user.posts.post);
  }, [user]);
  return (
    <>
      {/* post profile */}
      <WritePost user={user} setAllPost={setAllPost} />
      {/* render ở đây */}
      {allPost.length > 0 &&
        allPost.map((post, index) => {
          return (
            <React.Fragment key={index}>
              <PostsProfile
                user={user}
                post={post}
                indexPost={index}
                setAllPost={setAllPost}
              />
            </React.Fragment>
          );
        })}

      {/* render */}
    </>
  );
}

export default ProFileContentRight;
