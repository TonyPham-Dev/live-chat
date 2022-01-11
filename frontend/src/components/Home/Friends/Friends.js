import React, { useState } from "react";
import { GoPrimitiveDot } from "react-icons/go";
// import icon react
import { FiMoreHorizontal } from "react-icons/fi";
import styles from "./friends.module.css";

import imageUser from "./image/imageUser.jpg";
function Friends(props) {
  const [openFromSearch, setOpenFromSearch] = useState(false);
  const [saveValueSearch, setSaveValueSearch] = useState([]);

  const handleChangeSearch = (e) => {
    setSaveValueSearch((prev) => [...prev, e.target.value]);
    console.log(saveValueSearch);
  };
  return (
    <div className={styles.app}>
      {/* header friends */}
      <div className={styles.header}>
        <h3 className={styles.title}>Friends</h3>
        <span className={styles.iconMore}>
          <FiMoreHorizontal />
        </span>
      </div>

      {/* search friends */}
      <form className={styles.formSearchFriends}>
        <input
          className={styles.inputSearch}
          placeholder="Search friends..."
          onClick={() => setOpenFromSearch(!openFromSearch)}
          onChange={(e) => handleChangeSearch(e)}
        />
        {openFromSearch && (
          <ul className={styles.listFriendsSearch}>
            {/* render list friends */}
            {/* render with saveValueSearch.map() */}
            <li className={styles.itemSearch}>Pham cong</li>
            <li className={styles.itemSearch}>Pham cong</li>
            <li className={styles.itemSearch}>Pham cong</li>
            <li className={styles.itemSearch}>Pham cong</li>
            <li className={styles.itemSearch}>Pham cong</li>
          </ul>
        )}
      </form>

      {/* list friends */}
      <div className={styles.friendsContainer}>
        <ul className={styles.listItem}>
          {/* render li */}
          <li className={styles.listFriends}>
            <div className={styles.userContainer}>
              <img className={styles.friendsImage} src={imageUser} />
              <h4 className={styles.friendsName}>Phạm Văn Công</h4>
            </div>
            <span className={styles.iconOnline}>
              <GoPrimitiveDot />
            </span>
          </li>
          <li className={styles.listFriends}>
            <div className={styles.userContainer}>
              <img className={styles.friendsImage} src={imageUser} />
              <h4 className={styles.friendsName}>Phạm Văn Công</h4>
            </div>
            <span className={styles.iconOnline}>
              <GoPrimitiveDot />
            </span>
          </li>
          <li className={styles.listFriends}>
            <div className={styles.userContainer}>
              <img className={styles.friendsImage} src={imageUser} />
              <h4 className={styles.friendsName}>Phạm Văn Công</h4>
            </div>
            <span className={styles.iconOnline}>
              <GoPrimitiveDot />
            </span>
          </li>
          <li className={styles.listFriends}>
            <div className={styles.userContainer}>
              <img className={styles.friendsImage} src={imageUser} />
              <h4 className={styles.friendsName}>Phạm Văn Công</h4>
            </div>
            <span className={styles.iconOnline}>
              <GoPrimitiveDot />
            </span>
          </li>
          <li className={styles.listFriends}>
            <div className={styles.userContainer}>
              <img className={styles.friendsImage} src={imageUser} />
              <h4 className={styles.friendsName}>Phạm Văn Công</h4>
            </div>
            <span className={styles.iconOnline}>
              <GoPrimitiveDot />
            </span>
          </li>
          <li className={styles.listFriends}>
            <div className={styles.userContainer}>
              <img className={styles.friendsImage} src={imageUser} />
              <h4 className={styles.friendsName}>Phạm Văn Công</h4>
            </div>
            <span className={styles.iconOnline}>
              <GoPrimitiveDot />
            </span>
          </li>
          <li className={styles.listFriends}>
            <div className={styles.userContainer}>
              <img className={styles.friendsImage} src={imageUser} />
              <h4 className={styles.friendsName}>Phạm Văn Công</h4>
            </div>
            <span className={styles.iconOnline}>
              <GoPrimitiveDot />
            </span>
          </li>
          <li className={styles.listFriends}>
            <div className={styles.userContainer}>
              <img className={styles.friendsImage} src={imageUser} />
              <h4 className={styles.friendsName}>Phạm Văn Công</h4>
            </div>
            <span className={styles.iconOnline}>
              <GoPrimitiveDot />
            </span>
          </li>
          <li className={styles.listFriends}>
            <div className={styles.userContainer}>
              <img className={styles.friendsImage} src={imageUser} />
              <h4 className={styles.friendsName}>Phạm Văn Công</h4>
            </div>
            <span className={styles.iconOnline}>
              <GoPrimitiveDot />
            </span>
          </li>
          <li className={styles.listFriends}>
            <div className={styles.userContainer}>
              <img className={styles.friendsImage} src={imageUser} />
              <h4 className={styles.friendsName}>Phạm Văn Công</h4>
            </div>
            <span className={styles.iconOnline}>
              <GoPrimitiveDot />
            </span>
          </li>
          <li className={styles.listFriends}>
            <div className={styles.userContainer}>
              <img className={styles.friendsImage} src={imageUser} />
              <h4 className={styles.friendsName}>Phạm Văn Công</h4>
            </div>
            <span className={styles.iconOnline}>
              <GoPrimitiveDot />
            </span>
          </li>
          <li className={styles.listFriends}>
            <div className={styles.userContainer}>
              <img className={styles.friendsImage} src={imageUser} />
              <h4 className={styles.friendsName}>Phạm Văn Công</h4>
            </div>
            <span className={styles.iconOnline}>
              <GoPrimitiveDot />
            </span>
          </li>
          <li className={styles.listFriends}>
            <div className={styles.userContainer}>
              <img className={styles.friendsImage} src={imageUser} />
              <h4 className={styles.friendsName}>Phạm Văn Công</h4>
            </div>
            <span className={styles.iconOnline}>
              <GoPrimitiveDot />
            </span>
          </li>
          <li className={styles.listFriends}>
            <div className={styles.userContainer}>
              <img className={styles.friendsImage} src={imageUser} />
              <h4 className={styles.friendsName}>Phạm Văn Công</h4>
            </div>
            <span className={styles.iconOnline}>
              <GoPrimitiveDot />
            </span>
          </li>
          <li className={styles.listFriends}>
            <div className={styles.userContainer}>
              <img className={styles.friendsImage} src={imageUser} />
              <h4 className={styles.friendsName}>Phạm Văn Công</h4>
            </div>
            <span className={styles.iconOnline}>
              <GoPrimitiveDot />
            </span>
          </li>
          <li className={styles.listFriends}>
            <div className={styles.userContainer}>
              <img className={styles.friendsImage} src={imageUser} />
              <h4 className={styles.friendsName}>Phạm Văn Công</h4>
            </div>
            <span className={styles.iconOnline}>
              <GoPrimitiveDot />
            </span>
          </li>
          <li className={styles.listFriends}>
            <div className={styles.userContainer}>
              <img className={styles.friendsImage} src={imageUser} />
              <h4 className={styles.friendsName}>Phạm Văn Công</h4>
            </div>
            <span className={styles.iconOnline}>
              <GoPrimitiveDot />
            </span>
          </li>
          <li className={styles.listFriends}>
            <div className={styles.userContainer}>
              <img className={styles.friendsImage} src={imageUser} />
              <h4 className={styles.friendsName}>Phạm Văn Công</h4>
            </div>
            <span className={styles.iconOnline}>
              <GoPrimitiveDot />
            </span>
          </li>
          <li className={styles.listFriends}>
            <div className={styles.userContainer}>
              <img className={styles.friendsImage} src={imageUser} />
              <h4 className={styles.friendsName}>Phạm Văn Công</h4>
            </div>
            <span className={styles.iconOnline}>
              <GoPrimitiveDot />
            </span>
          </li>
          <li className={styles.listFriends}>
            <div className={styles.userContainer}>
              <img className={styles.friendsImage} src={imageUser} />
              <h4 className={styles.friendsName}>Phạm Văn Công</h4>
            </div>
            <span className={styles.iconOnline}>
              <GoPrimitiveDot />
            </span>
          </li>
          <li className={styles.listFriends}>
            <div className={styles.userContainer}>
              <img className={styles.friendsImage} src={imageUser} />
              <h4 className={styles.friendsName}>Phạm Văn Công</h4>
            </div>
            <span className={styles.iconOnline}>
              <GoPrimitiveDot />
            </span>
          </li>
          <li className={styles.listFriends}>
            <div className={styles.userContainer}>
              <img className={styles.friendsImage} src={imageUser} />
              <h4 className={styles.friendsName}>Phạm Văn Công</h4>
            </div>
            <span className={styles.iconOnline}>
              <GoPrimitiveDot />
            </span>
          </li>
          <li className={styles.listFriends}>
            <div className={styles.userContainer}>
              <img className={styles.friendsImage} src={imageUser} />
              <h4 className={styles.friendsName}>Phạm Văn Công</h4>
            </div>
            <span className={styles.iconOnline}>
              <GoPrimitiveDot />
            </span>
          </li>
          <li className={styles.listFriends}>
            <div className={styles.userContainer}>
              <img className={styles.friendsImage} src={imageUser} />
              <h4 className={styles.friendsName}>Phạm Văn Công</h4>
            </div>
            <span className={styles.iconOnline}>
              <GoPrimitiveDot />
            </span>
          </li>
          <li className={styles.listFriends}>
            <div className={styles.userContainer}>
              <img className={styles.friendsImage} src={imageUser} />
              <h4 className={styles.friendsName}>Phạm Văn Công</h4>
            </div>
            <span className={styles.iconOnline}>
              <GoPrimitiveDot />
            </span>
          </li>
          <li className={styles.listFriends}>
            <div className={styles.userContainer}>
              <img className={styles.friendsImage} src={imageUser} />
              <h4 className={styles.friendsName}>Phạm Văn Công</h4>
            </div>
            <span className={styles.iconOnline}>
              <GoPrimitiveDot />
            </span>
          </li>
          <li className={styles.listFriends}>
            <div className={styles.userContainer}>
              <img className={styles.friendsImage} src={imageUser} />
              <h4 className={styles.friendsName}>Phạm Văn Công</h4>
            </div>
            <span className={styles.iconOnline}>
              <GoPrimitiveDot />
            </span>
          </li>
          <li className={styles.listFriends}>
            <div className={styles.userContainer}>
              <img className={styles.friendsImage} src={imageUser} />
              <h4 className={styles.friendsName}>Phạm Văn Công</h4>
            </div>
            <span className={styles.iconOnline}>
              <GoPrimitiveDot />
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Friends;
