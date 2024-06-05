import { useState } from "react";

export default function RegisterPage(){
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    async function register(ev){
        ev.preventDefault();
     
        const response = await fetch('http://localhost:4000/register',{
            method:'POST',
            body: JSON.stringify({userName,password}),
            headers:{'Content-Type':'application/json'},
        });
        if(response.status===200){
            alert("Registration successful.");
        }
        else 
            alert("Registration failed.");
    }
    return(
        <form className="register" onSubmit={register} >
            <h1>Register</h1>
            <input type="text" 
                placeholder="User" 
                value={userName} 
                onChange={ev => setUserName(ev.target.value)}>
            </input>
            <input type="password"  
                placeholder="Password" 
                value={password}
                onChange={ev => setPassword(ev.target.value)}>
            </input>
            <button>Register</button>
        </form>
    );
}