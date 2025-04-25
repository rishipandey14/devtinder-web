import React from "react";

const ConnectionCard = ({ firstName, lastName, about, photoUrl }) => {
  return (
    <div className="flex items-center gap-5 w-full max-w-2xl px-5 py-4 mb-4 bg-gray-600 rounded-2xl shadow-md hover:shadow-lg transition duration-200 hover:bg-gray-700">
      <img
        src={photoUrl}
        alt={`${firstName}'s Profile`}
        className="w-20 h-20 rounded-full object-cover hover:cursor-pointer"
      />
      <div className="flex flex-col text-left">
        <h2 className="font-medium text-lg text-gray-100 hover:cursor-pointer">{firstName + " " + lastName}</h2>
        <p className="text-sm text-gray-400">{about}</p>
      </div>
    </div>
  );
};

export default ConnectionCard;
