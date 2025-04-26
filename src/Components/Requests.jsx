import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestsSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res?.data?.data));
    } catch (err) {
      <Error error={err} />;
    }
  };
  
  const reviewRequest = async (status, requestId) => {
    try {
      await axios.post(BASE_URL + "/request/review/" + status + "/" + requestId, {}, {withCredentials: true});
      dispatch(removeRequest(requestId));
    } catch (err) {
      <Error error={err} />;
    }
  } 

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!requests) return;
  if (requests.length === 0) return <h2 className="font-black text-center">No new requests found</h2>;

  return (
    <div className="text-center my-10">
      <h2 className="text-3xl font-bold text-gray-200 mb-8">
        Connection requests
      </h2>
      <div className="w-full flex flex-col items-center">
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, about } =
          request?.fromUserId || {};

          return (
            <div
              key={_id}
              className="flex items-center gap-5 w-full max-w-2xl px-5 py-4 mb-4 bg-gray-600 rounded-2xl shadow-md hover:shadow-lg transition duration-200 hover:bg-gray-700"
            >
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
              <div className="flex gap-4 items-center justify-end ml-auto">
                <button 
                  className="btn bg-gradient-to-r from-green-300 to-green-500 text-white py-2 px-6 rounded-lg shadow-lg hover:from-green-500 hover:to-green-600 transition duration-300 ease-in-out transform hover:scale-105"
                  onClick={() =>  reviewRequest("accepted", request._id)}
                  >
                  Accept
                </button>
                <button 
                  className="btn bg-gradient-to-r from-red-300 to-red-500 text-white py-2 px-6 rounded-lg shadow-lg hover:from-red-500 hover:to-red-600 transition duration-300 ease-in-out transform hover:scale-105"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
