
import firebase from 'firebase';
import 'firebase/auth';
import MainFeed from './aux-components/main-feed';
import LeftBar from './panels/left-panel';
import RightBar from './panels/right-panel';
import './home.css'
import ProfileFeed from './aux-components/profile-feed';
import { useState } from 'react/cjs/react.development';
import {useAuthState} from "react-firebase-hooks/auth";
import CreateTweet from './aux-components/create-tweet';
import DefaultPic from './images/default-pic.jpg'

function Home() {
  const [user, loading, error] = useAuthState(firebase.auth());
  const render = () => {
    if (loading) {
      console.log('loading')
      return <h1>Loading...</h1>
    }
    else if (user) {
      return <div>
        <CreateTweet uid={firebase.auth().currentUser.uid} />
        <ProfileFeed uid={firebase.auth().currentUser.uid}></ProfileFeed>
      </div>
      
    }
  }
  
   return (
    <div className='home-main-div'>
        <LeftBar/>
        {render()}
        <RightBar/>
    </div>
  );
}

export default Home;
