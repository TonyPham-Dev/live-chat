import Friends from "./Friends/Friends";
import Header from "./Header/Header";
import PostContents from "./PostContents/PostContents";
import {useAuth0} from '@auth0/auth0-react';
import {useNavigate} from 'react-router-dom';

function Home(){
    const {isAuthenticated} = useAuth0();
    const navigate = useNavigate();
    if(!isAuthenticated){
        navigate("/");
    }
    return(
        <>
        <Header />
        <Friends />
        <PostContents />
        </>
    );
}

export default Home;