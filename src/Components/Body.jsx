/* eslint-disable react-hooks/exhaustive-deps */
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

  const fetchUser = async () => {
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

  useEffect(() => {
    if (!userData) fetchUser();
  }, [userData]);

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Body