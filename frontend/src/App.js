import {Routes, Route, BrowserRouter } from 'react-router-dom'
import { useState, useEffect } from 'react';
import {useAuth0} from '@auth0/auth0-react';
import Header from "./components/Home/Header/Header";
import Profile from "./components/Home/Profile/Profile";
import Friends from "./components/Home/Friends/Friends";
// import PostContents from "./components/Home/PostContents/PostContents";
// import Posts from "./components/Home/Posts/Posts";
import Login from "./components/Login/Login";
// import Logout from "./components/Login/Logout";
import Home from './components/Home/Home';
import Message from './components/Home/message/Message';
import PostContents from './components/Home/PostContents/PostContents';
function App() {
    const { user} = useAuth0();
    const isLogin = localStorage.getItem("isLogin");

    const [useName, setUseName] = useState('');
    const [urlPhoto, setUrlPhoto] = useState('')
    const [authState, setAuthState] = useState(false)
    useEffect( () => {
        if(!isLogin){
             window.open("/");
        } 
         user && setAuthState(true)
         user && setUseName(user.name)
         user && setUrlPhoto(user.picture)
    },[user])
  return(
    <div className="App">
      <BrowserRouter>
        {
          authState && <Header useName={useName} urlPhoto={urlPhoto}/>
        }
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/message" element={<Message />} />
          <Route path="/message/:chatId" element={<Message/>} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/friends/:username" element={<Friends />} />
          <Route path='/home' element={<Home/>}/>
          <Route path='/user/:username' element={<Profile/>}/>
          <Route path='/posts/:id' element={<Home/>}/>
          <Route path='/like/:postId' element={<PostContents/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
