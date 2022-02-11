// import icon react
import React, { useState, useEffect, memo } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { GoPrimitiveDot } from "react-icons/go";
import { FiMoreHorizontal } from "react-icons/fi";

import styles from "./friends.module.css";
import { useAuth0 } from "@auth0/auth0-react";

import imageUser from "./image/imageUser.jpg";
import User from "./User";
function Friends({ friends }) {
  const {logout} = useAuth0()
  const [openFromSearch, setOpenFromSearch] = useState(false);
  const [saveValueSearch, setSaveValueSearch] = useState([]);
  const [getNameFriend, setGetNameFriend] = useState("");

  // loading
  const [open, setOpen] = useState(true);

  // handle change value search
  const handleChangeSearch = (e) => {
    setSaveValueSearch((prev) => [...prev, e.target.value]);
  };
  const checkObjectIsUndefined = (obj) => {
    return obj && Object.keys(obj).length > 0;
  };
  const checkArrayIsNull = (array) => {
    return Object.keys(array).indexOf("names") !== -1;
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
        {/* user admin */}
        <User />
        <div className={styles.totalFriends}>
          <h3 className={styles.total}>{`${
            friends !== null && checkObjectIsUndefined(friends.contacts)
              ? friends.contacts.totalItems
              : ""
          } friends`}</h3>
        </div>
        <ul className={styles.listItem}>
          {/* render li */}
          {friends !== null && checkObjectIsUndefined(friends.contacts) ? (
            friends.contacts.connections.map((contact, index) => {
              return (
                <li key={index} className={styles.listFriends}>
                  <div className={styles.userContainer}>
                    <img
                      className={styles.friendsImage}
                      src="https://12guns.vn/code-tim-kiem-theo-ten-trong-java/imager_3161.jpg"
                    />
                    <h4 className={styles.friendsName}>
                      {checkArrayIsNull(contact)
                        ? contact.names[0].displayName
                        : "Không xác định"}
                    </h4>
                  </div>
                  <span className={styles.iconOnline}>
                    <GoPrimitiveDot />
                  </span>
                </li>
              );
            })
          ) : (
              <Backdrop
                sx={{
                  position: 'absolute',
                  top:'-40%',
                  background: "transparent",
                  color: "#2374e1",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={open}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
          )}
        </ul>
      </div>
    </div>
  );
}

export default memo(Friends);
