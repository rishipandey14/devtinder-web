import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [emailId, setEmailId] = useState("rishi@gmail.com");
  const [password, setPassword] = useState("Rishi@1403");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const handleLogin = async ()  => {
    if(userData) return;
    try {
      const res = await axios.post(BASE_URL + "/login", {
        emailId,
        password,
      },{
        withCredentials : true
      });
      dispatch(addUser(res.data));
      return navigate("/feed");
      
    } catch (err) {
      if(err.status === 401) navigate("/login");
      setError(err?.response?.data || "Something went wrong");
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent px-4">
      <div className="bg-gray-900 text-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email:</label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              placeholder="Enter your email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>
  
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">Password:</label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
  
          {error && <p className="text-red-400 text-sm">{error}</p>}
  
          <button
            onClick={handleLogin}
            className="w-full py-2 mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
  
};

export default Login;
