import React from 'react';
import {useAuth0} from '@auth0/auth0-react'
function Logout(props) {
    const { logout } = useAuth0();
    localStorage.removeItem("isLogin");
    return (
        <div>
            <button className='logout' onClick={() => logout()}>
                log Out
            </button>
        </div>
    );
}

export default Logout;