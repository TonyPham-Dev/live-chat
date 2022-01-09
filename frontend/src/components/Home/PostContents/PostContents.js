import React from 'react';

import imageUser from './image/imageUser.jpg'
import styles from './postContent.module.css'
function PostContents(props) {
    return (
        <div className={styles.app}>
            <div className={styles.posts}>
                <div className={styles.user}>
                    <div className={styles.userCOntainer}>
                        <img className={styles.imageUser} src={imageUser}/>
                        <h4>Phạm Văn Công</h4>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostContents;