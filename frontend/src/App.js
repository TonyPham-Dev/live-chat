import {Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import Header from "./components/Home/Header/Header";
import Profile from "./components/Home/Profile/Profile";
import Friends from "./components/Home/Friends/Friends";
import PostContents from "./components/Home/PostContents/PostContents";
import Posts from "./components/Home/Posts/Posts";
import Login from "./components/Login/Login";
import Logout from "./components/Login/Logout";
import Home from './components/Home/Home';


function App() {
  return(
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/home' element={<Home/>}/>
        <Route path='/user' element={<Profile/>}/>
        {/* <Route path='/logout' element={<Logout/>}/> */}
      </Routes>
    </div>
  )
}

export default App;
