/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Error from "./Error";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      <Error error={err} />;
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0) return <h2>No connection found</h2>;

  return (
    <div className="text-center my-10">
      <h2 className="text-3xl font-bold text-gray-200 mb-8">Connections</h2>
      <div className="w-full flex flex-col items-center">
        {connections.map((user) => {
          
          const {_id, firstName, lastName, photoUrl, about} = user;

          return (
            <div key={_id} className="flex items-center gap-5 w-full max-w-2xl px-5 py-4 mb-4 bg-gray-600 rounded-2xl shadow-md hover:shadow-lg transition duration-200 hover:bg-gray-700">
              <img
                src={photoUrl}
                alt={`${firstName}'s Profile`}
                className="w-20 h-20 rounded-full object-cover hover:cursor-pointer"
              />
              <div className="flex flex-col text-left">
                <h2 className="font-medium text-lg text-gray-100 hover:cursor-pointer">
                  {firstName + " " + lastName}
                </h2>
                <p className="text-sm text-gray-400">{about}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
