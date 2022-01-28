import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
function Logout(props) {
  const { logout } = useAuth0();
  return (
      <div>
      <button
        className="logout"
        onClick={() => {
            // localStorage
            localStorage.removeItem("isLogin");
            localStorage.removeItem("accessToken")

            // cookies
            const cookies = document.cookie
            const cookiesObject = {cookieObj: cookies}
            document.cookie = `${cookiesObject.cookieObj}=`
            logout();
            return false;
        }}
      >
        log Out
      </button>
    </div>
  );
}

export default Logout;
