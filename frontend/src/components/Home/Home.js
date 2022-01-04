import Friends from "./Friends/Friends";
import Header from "./Header/Header";
import PostContents from "./PostContents/PostContents";
// import {useAuth0} from '@auth0/auth0-react';
import { useNavigate } from "react-router-dom";
import Message from "./message/Message";
import { useEffect, memo, useState } from "react";

function Home() {
  return (
    <>
      <PostContents />
    </>
  );
}

export default Home;
