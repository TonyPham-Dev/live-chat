import React, {memo} from 'react';
import {Link} from 'react-router-dom'
import {FiMoreHorizontal} from 'react-icons/fi'
import postImage2 from '../PostContents/image/postImage2.jpg'
import styles from './post.module.css'
function Notification(props) {
    return (
        <div>
            {/* Lastest Activity */}
            <div className={styles.activityContainer}>
                <div className={styles.activityHeader}>
                <h5 className={styles.activityTitle}>Lastest Activity</h5>
                <span className={styles.activityIcon}>
                    <FiMoreHorizontal />
                </span>
                </div>
                {/* activity */}

                <div className={styles.activityContent}>
                {/* render activity */}
                <Link to={"/home"} style={{ textDecoration: "none" }}>
                    <div className={styles.activity}>
                    <div className={styles.activityImage}>
                        <img className={styles.activityAvatar} src={postImage2} />
                    </div>
                    <div>
                        <h4 className={styles.activityName}>
                        Phạm Văn Công đã thích bài đăng
                        </h4>
                    </div>
                    </div>
                </Link>
                <Link to={"/home"} style={{ textDecoration: "none" }}>
                    <div className={styles.activity}>
                    <div className={styles.activityImage}>
                        <img className={styles.activityAvatar} src={postImage2} />
                    </div>
                    <div>
                        <h4 className={styles.activityName}>
                        Phạm Văn Công đã thích bài đăng
                        </h4>
                    </div>
                    </div>
                </Link>
                <Link to={"/home"} style={{ textDecoration: "none" }}>
                    <div className={styles.activity}>
                    <div className={styles.activityImage}>
                        <img className={styles.activityAvatar} src={postImage2} />
                    </div>
                    <div>
                        <h4 className={styles.activityName}>
                        Phạm Văn Công đã thích bài đăng
                        </h4>
                    </div>
                    </div>
                </Link>
                <Link to={"/home"} style={{ textDecoration: "none" }}>
                    <div className={styles.activity}>
                    <div className={styles.activityImage}>
                        <img className={styles.activityAvatar} src={postImage2} />
                    </div>
                    <div>
                        <h4 className={styles.activityName}>
                        Phạm Văn Công đã thích bài đăng
                        </h4>
                    </div>
                    </div>
                </Link>
                <Link to={"/home"} style={{ textDecoration: "none" }}>
                    <div className={styles.activity}>
                    <div className={styles.activityImage}>
                        <img className={styles.activityAvatar} src={postImage2} />
                    </div>
                    <div>
                        <h4 className={styles.activityName}>
                        Phạm Văn Công đã thích bài đăng
                        </h4>
                    </div>
                    </div>
                </Link>
                <Link to={"/home"} style={{ textDecoration: "none" }}>
                    <div className={styles.activity}>
                    <div className={styles.activityImage}>
                        <img className={styles.activityAvatar} src={postImage2} />
                    </div>
                    <div>
                        <h4 className={styles.activityName}>
                        Phạm Văn Công đã thích bài đăng
                        </h4>
                    </div>
                    </div>
                </Link>
                <Link to={"/home"} style={{ textDecoration: "none" }}>
                    <div className={styles.activity}>
                    <div className={styles.activityImage}>
                        <img className={styles.activityAvatar} src={postImage2} />
                    </div>
                    <div>
                        <h4 className={styles.activityName}>
                        Phạm Văn Công đã thích bài đăng
                        </h4>
                    </div>
                    </div>
                </Link>
                <Link to={"/home"} style={{ textDecoration: "none" }}>
                    <div className={styles.activity}>
                    <div className={styles.activityImage}>
                        <img className={styles.activityAvatar} src={postImage2} />
                    </div>
                    <div>
                        <h4 className={styles.activityName}>
                        Phạm Văn Công đã thích bài đăng
                        </h4>
                    </div>
                    </div>
                </Link>
                </div>
            </div>
        </div>
    );
}

export default memo(Notification);