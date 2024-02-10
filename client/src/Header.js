import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import setting from './setting.json';
//import { useEffect } from 'react';

export default function Header(){
  const [userName,setUserName] =useState(null);
  useEffect(()=>{
    fetch(setting.urlApi+'/profile',{
      credentials:'include',
    }).then(response=>{
      response.json().then(userInfo=>{
        setUserName(userInfo.userName);
      });
    });
  },[]);

  function logout(){
    fetch(setting.urlApi+'/logout',{
      credentials:'include',
      method:'POST',
    });
    setUserName(null);
  }

  return(
    <header>
        <Link to='/' className='logo'>Memo Blog</Link>
        <nav>
          {userName && (
            <>
              <Link to="/create">Create new post</Link>
         
              <Link onClick={logout}>Logout</Link>
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