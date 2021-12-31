import React from 'react';

import styles from './notification.module.css'
import imageUser from '../image/imageUser.jpg'
function Notification(props) {
    return (
        <div className={styles.notificationContainer}>
            <h4 className={styles.title}>Thông báo</h4>
            <ul className={styles.listItem}>
                
                {/* render li */}
                <li className={styles.item}>
                    <img className={styles.imageUser} src={imageUser}/>
                    <h5 className={styles.itemNotification}>{`Phạm Công đã nhắc đến bạn trong một bình luận`}</h5>
                </li>
                <li className={styles.item}>
                    <img className={styles.imageUser} src={imageUser}/>
                    <h5 className={styles.itemNotification}>{`Phạm Công đã nhắc đến bạn trong một bình luận`}</h5>
                </li>
                <li className={styles.item}>
                    <img className={styles.imageUser} src={imageUser}/>
                    <h5 className={styles.itemNotification}>{`Phạm Công đã nhắc đến bạn trong một bình luận`}</h5>
                </li>
                <li className={styles.item}>
                    <img className={styles.imageUser} src={imageUser}/>
                    <h5 className={styles.itemNotification}>{`Phạm Công đã nhắc đến bạn trong một bình luận`}</h5>
                </li>
                <li className={styles.item}>
                    <img className={styles.imageUser} src={imageUser}/>
                    <h5 className={styles.itemNotification}>{`Phạm Công đã nhắc đến bạn trong một bình luận`}</h5>
                </li>
                <li className={styles.item}>
                    <img className={styles.imageUser} src={imageUser}/>
                    <h5 className={styles.itemNotification}>{`Phạm Công đã nhắc đến bạn trong một bình luận`}</h5>
                </li>
                <li className={styles.item}>
                    <img className={styles.imageUser} src={imageUser}/>
                    <h5 className={styles.itemNotification}>{`Phạm Công đã nhắc đến bạn trong một bình luận`}</h5>
                </li>
                <li className={styles.item}>
                    <img className={styles.imageUser} src={imageUser}/>
                    <h5 className={styles.itemNotification}>{`Phạm Công đã nhắc đến bạn trong một bình luận`}</h5>
                </li>
                <li className={styles.item}>
                    <img className={styles.imageUser} src={imageUser}/>
                    <h5 className={styles.itemNotification}>{`Phạm Công đã nhắc đến bạn trong một bình luận`}</h5>
                </li>
                <li className={styles.item}>
                    <img className={styles.imageUser} src={imageUser}/>
                    <h5 className={styles.itemNotification}>{`Phạm Công đã nhắc đến bạn trong một bình luận`}</h5>
                </li>
            </ul>
        </div>
    );
}

export default Notification;