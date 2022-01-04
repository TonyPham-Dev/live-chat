import React from "react";
import Slider from "react-slick";
import styles from "./message.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import imageUser from "./image/imageUser.jpg";
function ImageMobile(props) {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };
  return (
    <div className={styles.mobileImageContainer}>
        <Slider {...settings}>
          <div className={styles.slider}>
            <img className={styles.mobileImage} src={imageUser} />
          </div>
          <div className={styles.slider}>
            <img className={styles.mobileImage} src={imageUser} />
          </div>
          <div className={styles.slider}>
            <img className={styles.mobileImage} src={imageUser} />
          </div>
          <div className={styles.slider}>
            <img className={styles.mobileImage} src={imageUser} />
          </div>
          <div className={styles.slider}>
            <img className={styles.mobileImage} src={imageUser} />
          </div>
          <div className={styles.slider}>
            <img className={styles.mobileImage} src={imageUser} />
          </div>
      </Slider>
      </div>
  );
}

export default ImageMobile;
