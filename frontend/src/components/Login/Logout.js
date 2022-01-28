import React from "react";
// import LogoutRemoveAuthentication, {RemoveAuthentication} from "./LogoutRemoveAuthentication";

function Logout({logout}) {
  return (
    <div>
      <button
        className="logout"
        onClick={logout}
      >
        log Out
      </button>
    </div>
  );
}

export default Logout;
