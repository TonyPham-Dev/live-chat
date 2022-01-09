import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Slider from "react-slick";
import styles from "./message.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function ImageMobile(props) {
  const {user} = useAuth0()
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };
  return (
    <div className={styles.mobileImageContainer}>
        <Slider {...settings}>
          <div className={styles.slider}>
            {user && <img className={styles.mobileImage} src={props.userData[ props.messages.users.filter((users) => users != user.nickname) ]} /> }
          </div>
         
      </Slider>
      </div>
  );
}

export default ImageMobile;
