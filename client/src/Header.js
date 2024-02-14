import { useContext,useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import setting from './setting.json';
import { UserContext} from './UserContext';

export default function Header(){
  const {setUserInfo, userInfo}= useContext(UserContext);
  useEffect(()=>{
    fetch(setting.urlApi+'/profile',{
      credentials:'include',
    }).then(response=>{
      response.json().then(userInfo=>{
        setUserInfo(userInfo);
      });
    });
  },[]);

  function logout(){
    fetch(setting.urlApi+'/logout',{
      credentials:'include',
      method:'POST',
    });
    setUserInfo(null);
  }

  const userName = userInfo?.userName;
  // console.log(userName);
  return(
    <header>
        <Link to="/" className="logo">Memo Blog</Link>
        <nav>
          {userName && (
            <>
              <Link to="/create">Create new post</Link>
              <Link onClick={logout}>Logout</Link>
              {/* <a onClick={logout}>Logout</a> */}
            </>
          )}
          {!userName &&(
            <>
              <Link to='/login'>Login</Link>
              <Link to='/register'>Register</Link>
            </>
          )}
         
        </nav>
    </header>
  );
}