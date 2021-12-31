import React from 'react';
import {useAuth0} from '@auth0/auth0-react'
function Profile(props) {
    const { user } = useAuth0
    return (
        <div>
            {JSON.stringify(user, null,2)}
            <h1>hello</h1>
        </div>
    );
}

export default Profile;