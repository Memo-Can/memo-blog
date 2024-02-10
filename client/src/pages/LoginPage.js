import {useState} from "react";
import {Navigate} from "react-router-dom";

export default function LoginPage(){
    const [userName, setUserName]= useState('');
    const [password, setPassword]= useState('');
    const [redirect, setRedirect]= useState(false);
    const setting = require('../setting.json');
    
    async function login(ev){
        ev.preventDefault();
        const response = await fetch(setting.urlApi+'/login',{
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({userName, password}),
            credentials:'include',
        });
        if(response.ok){
            setRedirect(true);
        }
        else{
            alert('wrong credentials');
        }
    }

    if(redirect){
        return<Navigate to={'/'}></Navigate>
    }

    return(
        <form className="login" onSubmit={login}>
            <h1>Login</h1>
            <input type="text" 
                placeholder="User" 
                value={userName}
                onChange={event => setUserName(event.target.value)}>
            </input>
            <input 
                type="password"  
                placeholder="Password" 
                value={password}
                onChange={event=> setPassword(event.target.value)}>
            </input>
            <button>Login</button>
        </form>
   );
}