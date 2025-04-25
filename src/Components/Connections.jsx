import React, { useEffect } from "react";
import Error from "./Error";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import ConnectionCard from "./ConnectionCard";


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
      <h2 className="text-3xl font-bold text-gray-200 mb-8">
        Connections
      </h2>
      <div className="w-full flex flex-col items-center">
        {connections.map(user => (
          <ConnectionCard key={user._id} {...user} />
        ))}
      </div>
    </div>
  );
};

export default Connections;
