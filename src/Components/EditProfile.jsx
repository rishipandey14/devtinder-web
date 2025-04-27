import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { showToast } from "../utils/toastSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about);
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState(user.skills || []);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const updateProfile = async () => {
    // clear Errors
    setError("");

    try {
      const res = await axios.put(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          about,
          photoUrl,
          skills,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data || res?.data));
      dispatch(showToast("Profile updated Successfully"))
    } catch (err) {
      setError(err?.response?.data);
    }
  };

  return (
    <div className="flex justify-center items-start my-10 gap-8 px-6">
      <div className="min-h-screen flex  items-center justify-center bg-transparent w-xl px-4">
        <div className="bg-gray-900 text-white rounded-2xl shadow-2xl p-8 w-full  max-w-md">
          <h2 className="text-3xl font-bold text-center mb-6">Profile</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                First Name :
              </label>
              <input
                name="first-name"
                type="text"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Last Name :
              </label>
              <input
                name="last-name"
                type="text"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Age :</label>
              <input
                name="age"
                type="number"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Gender :</label>
              <select
                name="gender"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Photo URL :
              </label>
              <input
                name="photo-url"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </div>
            <div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Skills :
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-600"
                    placeholder="Enter a skill"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded hover:cursor-pointer"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {skill}
                      <button
                        onClick={() => handleRemoveSkill(index)}
                        className="text-white hover:text-red-300 hover:cursor-pointer"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  About :
                </label>
                <textarea
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                ></textarea>
              </div>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              onClick={updateProfile}
              className="w-full py-2 mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition hover:cursor-pointer"
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 max-w-sm">
        <UserCard
          user={{ firstName, lastName, age, gender, photoUrl, skills, about }}
        />
      </div>
    </div>
  );
};

export default EditProfile;
