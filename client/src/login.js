import { useState } from "react";

function Login({ onLogin, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        onLogin(data.userId);
      });
  };
return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Login</h2>
        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:border-blue-500"
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Login
        </button>
        <p className="text-center mt-4 text-gray-500">No account? <button onClick={onSwitch} className="text-blue-600 font-semibold">Register</button></p>
      </div>
    </div>
  )
}

export default Login;
