import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import {removeUserFromFeed} from "../utils/feedSlice"

const UserCard = ({ user }) => {
  const {_id, firstName, lastName, skills, about, age, gender, photoUrl } = user;

  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, {withCredentials: true});
      dispatch(removeUserFromFeed(user._id));
    } catch(err) {
      <Error error={err} />;
    }
  }

  return user && (
    <div className="bg-gradient-to-b from-[#2e2e44] to-[#1d1d2e] rounded-xl overflow-hidden w-full max-w-sm mx-auto shadow-md shadow-white hover:shadow-pink-400 transition-transform duration-300 ease-in-out hover:-translate-y-1 p-6 text-white space-y-4 mb-10">
      {/* Image */}
      <div className="w-full h-52 rounded-lg overflow-hidden">
        <img
          src={photoUrl || "https://via.placeholder.com/150"}
          alt={`${firstName} ${lastName}`}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Name */}
      <h2 className="text-2xl font-bold text-center">
        {firstName} {lastName}
      </h2>

      {/* Age & Gender */}
      {(age || gender) && (
        <p className="text-sm text-center opacity-80">
          {age && <>🎂 <span className="font-medium">{age}</span></>}
          {age && gender && " | "}
          {gender && <>⚧ <span className="font-medium capitalize">{gender}</span></>}
        </p>
      )}

      {/* About */}
      {about && (
        <p className="text-sm text-gray-300 text-center">
          <span className="font-semibold text-white"></span> {about}
        </p>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div>
          <p className="font-semibold mb-1 text-center">Skills:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="bg-pink-600/80 text-white px-3 py-1 rounded-full text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-center gap-4 pt-2">
        <button 
          className="px-5 py-2 rounded-full bg-gradient-to-r from-gray-700 to-gray-900 text-white font-medium shadow-md hover:from-gray-600 hover:to-gray-800 transition duration-300 ease-in-out hover:cursor-pointer"
          onClick={() => handleSendRequest("ignored", _id)}
          >
          ❌ Ignore
        </button>
        <button 
          className="px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-md hover:from-pink-600 hover:to-purple-700 transition duration-300 ease-in-out hover:cursor-pointer"
          onClick={() => handleSendRequest("interested", _id)}
        >
          🤝 Interested
        </button>
      </div>
      
    </div>
  );
};

export default UserCard;
