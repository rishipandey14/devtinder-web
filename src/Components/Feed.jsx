/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import {addUserInFeed} from '../utils/feedSlice'
import UserCard from './UserCard'

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if(feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {withCredentials: true});
      dispatch(addUserInFeed(res?.data?.data));
    } catch (err){
      console.log(err);
    }
  }

  useEffect(() => {
    getFeed();
  }, []);

  if(!feed) return;
  if(feed.length <= 0) return <h1 className='font-black text-center'>No new users found!</h1>
  
  return (
    <div className='flex justify-center my-2'>
      <UserCard user={feed[0]}/>
    </div>
  )
}

export default Feed