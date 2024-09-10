import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "./UserContext";
import SearchBar from '../components/SearchBar'

export default function Header() {
  const {setUserInfo,userInfo,globalData,setGlobalData} = useContext(UserContext);

  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);


	// async function  handleSearch (term) {
	// 	const setting = require('../setting.json');
	// 	fetch(setting.urlApi+'/post/'+term).then(response=>{
	// 		response.json().then(data=>{
	// 			setGlobalData(data)
	// 		});
	// 	});
	
	// }; 

	async function  handleSearch (term) {
		 debugger;
		if(term) setGlobalData({search: term});
		else setGlobalData({});
	}; 


  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }
  const userName = userInfo?.userName;

  return (
    <header>
      <Link to="/" className="logo">MyBlog</Link>
      <nav>
        {userName && (
          <>
            <Link to="/create">Create new post</Link>
            <a onClick={logout}>Logout ({userName})</a>
          </>
        )}
        {!userName && (
          <>
            <Link to="/login">Login</Link>	
						<SearchBar onSearch={handleSearch}/>
          </>
        )}
      </nav>
    </header>
  );
}