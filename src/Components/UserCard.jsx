import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, skills, about, age, gender, photoUrl } = user;

  return (
    <div className="bg-gradient-to-b from-[#2e2e44] to-[#1d1d2e] rounded-xl overflow-hidden w-full max-w-sm mx-auto shadow-md shadow-white hover:shadow-pink-400 transition-transform duration-300 ease-in-out hover:-translate-y-1 p-6 text-white space-y-4">
      {/* Image */}
      <div className="w-full h-60 rounded-lg overflow-hidden">
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
          <span className="font-semibold text-white">About:</span> {about}
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
        <button className="px-5 py-2 rounded-full bg-gradient-to-r from-gray-700 to-gray-900 text-white font-medium shadow-md hover:from-gray-600 hover:to-gray-800 transition duration-300 ease-in-out hover:cursor-pointer">
          ❌ Ignore
        </button>
        <button className="px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-md hover:from-pink-600 hover:to-purple-700 transition duration-300 ease-in-out hover:cursor-pointer">
          🤝 Interested
        </button>
      </div>
    </div>
  );
};

export default UserCard;
