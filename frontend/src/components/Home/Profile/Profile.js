import React from 'react';

import styles from './profile.module.css'
import {useAuth0} from '@auth0/auth0-react'
function Profile(props) {
    const { user } = useAuth0
    return (
        <div className={styles.profile}>
            {JSON.stringify(user, null,2)}
            <h1>hello</h1>
        </div>
    );
}

export default Profile;