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
    <div className="flex justify-center">
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="card-body bg-base-200 my-20  border border-gray-300 shadow-lg p-6 rounded-lg w-96 ">
          <h2 className="card-title justify-center text-2xl">Login</h2>

          <div>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Email: </span>
              </div>
              <input
                id="email"
                name="email"
                type="email"
                className="input input-bordered w-full mb-4"
                placeholder="Enter Email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
            
            <label className="form-control w-full max-w-xs my-2" >
              <div className="label">
                <span className="label-text">Password:</span>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                className="input input-bordered w-full mb-6"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary hover:bg-purple-700" onClick={handleLogin }>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
