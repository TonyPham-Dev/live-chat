import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";

import React, { useState, useEffect, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Header from "./components/Home/Header/Header";
import Profile from "./components/Home/Profile/Profile";
import Friends from "./components/Home/Friends/Friends";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Message from "./components/Home/message/Message";
import PostContents from "./components/Home/PostContents/PostContents";
function App() {
  const { user, logout, isLoading } = useAuth0();

  const [useName, setUseName] = useState("");
  const [urlPhoto, setUrlPhoto] = useState("");
  const [authState, setAuthState] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && !isLoading) {
      navigate("/");
    } 
    user && setAuthState(true);
    user && setUseName(user.name);
    user && setUrlPhoto(user.picture);
  }, [user,isLoading]);

  const removeAuthentication = useCallback(() => {
    localStorage.removeItem("accessToken");

    // cookies
    const cookies = document.cookie;
    const cookiesObject = { cookieObj: cookies };
    document.cookie = `${cookiesObject.cookieObj}=`;
    logout();
    return false;
  }, [logout]);
  return (
    <div className="App">
        {authState && (
          <Header
            useName={useName}
            urlPhoto={urlPhoto}
            removeAuthentication={removeAuthentication}
          />
        )}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/message" element={<Message />} />
          <Route path="/message/:chatId" element={<Message />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/friends/:username" element={<Friends />} />
          <Route path="/home" element={<Home logOut ={removeAuthentication}/>} />
          <Route path="/user/:username" element={<Profile />} />
          <Route path="/posts/:id" element={<Home />} />
          <Route path="/like/:postId" element={<PostContents />} />
        </Routes>
    </div>
  );
}

export default App;
