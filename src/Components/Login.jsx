import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import {showToast} from "../utils/toastSlice"

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  let [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const handleLogin = async () => {
    if (userData) return;
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data));
      console.log("Dispatching toast:", "Logged in Successfully");
      dispatch(showToast("Logged in Successfully"));
      navigate("/feed");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res?.data?.data));
      dispatch(showToast("Account created Successfully"))
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page
    if (isLoginForm) {
      await handleLogin();
    } else {
      await handleSignup();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent px-4">
      <div className="bg-gray-900 text-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">
          {isLoginForm ? "Login" : "Signup"}
        </h2>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          {!isLoginForm && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">
                  First name:
                </label>
                <input
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                  placeholder="Enter your First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Last name:
                </label>
                <input
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                  placeholder="Enter your Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              placeholder="Enter your email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password:
            </label>
            <input
              id="password"
              name="password"
              autoComplete={isLoginForm ? "current-password" : "new-password"}
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition hover:cursor-pointer"
          >
            {isLoginForm ? "Login" : "Signup"}
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          {isLoginForm ? (
            <>
              New User?{" "}
              <span
                className="text-purple-400 hover:underline cursor-pointer"
                onClick={() => setIsLoginForm(false)}
              >
                Signup
              </span>{" "}
              here
            </>
          ) : (
            <>
              Existing User?{" "}
              <span
                className="text-purple-400 hover:underline cursor-pointer"
                onClick={() => setIsLoginForm(true)}
              >
                Login
              </span>{" "}
              here
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
