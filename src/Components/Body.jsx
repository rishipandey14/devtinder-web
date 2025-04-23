import React, { useEffect } from 'react';
import NavBar from './NavBar';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';
import {BASE_URL} from '../utils/constants';
import {addUser} from "../utils/userSlice"
import { useDispatch, useSelector } from 'react-redux';



const Body = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  

  useEffect(() => {
    const fetchUser = async () => {
      if (userData && userData.emailId) return;
      try {
        const res = await axios.get(BASE_URL + "/profile/view", {
          withCredentials: true,
        });
        dispatch(addUser(res.data));
      } catch(err) {
        if (err.response && err.response.status === 401) {
          return navigate("/login");
        }
        console.log(err);
      }
    };

    fetchUser();
  }, [userData, dispatch, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#50505d] via-[#1b1b3b] to-[#121225] text-white font-sans">
      <header className="shadow-md shadow-pink-600/10 z-50">
        <NavBar />
      </header>

      <main className="flex-grow p-4 sm:p-6 md:p-10">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>

      <footer className="bg-[#1a1a2e] border-t border-gray-700/20">
        <Footer />
      </footer>
    </div>
  )
}

export default Body