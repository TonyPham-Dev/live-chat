import React from 'react';
import styles from './profile.module.css'
import ProFileContentLeft from './ProFileContentLeft';
import ProFileContentRight from './ProFileContentRight';
function ProfileContent(props) {
    return (
        <div className={styles.ProfileContentContainer}>
            <div className={styles.ProfileContentLeft}>
                <ProFileContentLeft/>
            </div>

            <div className={styles.ProfileContentRight}>
                <ProFileContentRight/>
            </div>
        </div>
    );
}

export default ProfileContent;