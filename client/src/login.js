import { useState} from 'react'

function Login({onLogin,onSwitch}) {
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')

    const handleLogin = () =>{ 
        fetch('http://localhost:5000/login',{ 
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({email,password})
        })
        .then(res=>res.json())
        .then(data=>{onLogin(data.userId)})
    }
      return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <p>No account? <button onClick={onSwitch}>Register</button></p>
    </div>
  )
}

export default Login