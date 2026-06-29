import { useState } from "react";

function Register({ onSwitch }) {
    const[name, setName]=useState('')
    const[email, setEmail]=useState('')
    const[password, setPassword]=useState('')
    
    const handleRegister = ()=>{ 
        fetch('http://localhost:5000/register', {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({name,email,password})
        })
        .then(res=>res.json())
        .then(data=> { alert('Registered successfully! Please login.')
        onSwitch()
      })
    }

    return( 
        <div> 
            <h2>Register</h2>
            <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)}/>
            <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
            <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
            <button onClick={handleRegister}>Register</button>
            <p>Already registered?<button onClick={onSwitch}>login</button></p>
        </div>
    )
    
}

export default Register