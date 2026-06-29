import { useState } from "react";

function Register({ onSwitch }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Registered successfully! Please login.");
        onSwitch();
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Register
        </h2>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 mb-4"
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 mb-4"
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 mb-4"
        />
        <button
          onClick={handleRegister}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Register
        </button>
        <p className="text-center mt-4 text-gray-500">
          Already registered?{" "}
          <button onClick={onSwitch} className="text-blue-600 font-semibold">
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;
