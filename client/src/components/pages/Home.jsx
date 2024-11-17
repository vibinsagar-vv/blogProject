import React, { useEffect, useState } from "react";
import MyNavbar from "../mainHeader";
import Footer from "../Footer";
import { Link, useNavigate } from "react-router-dom";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivities } from "../../store/activitySlice";

export default function Home() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities.activities);

  useEffect(() => {
    // Dispatch to fetch activities
    dispatch(fetchActivities());
  }, [dispatch]);
  console.log("abc", activities);

  return (
    <div className="min-h-full">
      <div className="h-full min-h-[calc(100vh-65px)] pt-16">
        <div className="min-h-[calc(100vh-130px)] flex items-center justify-between p-6 bg-slate-200">
          <div className="container mx-auto md:px-4 my-6">
            <div className="flex flex-col items-center gap-16 md:gap-10 lg:gap-12 scrollbar-none overflow-x-auto  md:flex-wrap justify-center pb-16">
              {activities.map((activity, index) => (
                <Link
                  to={`/activity/${activity?._id}`}
                  key={index}
                  className="ml-3 md:ml-0 flex-shrink-0 md:w-96 w-[350px] bg-white shadow-blue-600 shadow-lg rounded-lg overflow-hidden hover:shadow-blue-600 hover:shadow-2xl transition-shadow duration-300 ease-in-out"
                >
                  <div className="relative w-fit h-fit bg-blue-300 flex items-center justify-center overflow-hidden">
                    {activity.images[0] ? (
                      <img
                        src={`https://blogproject-server.onrender.com/ActivityImages/${activity.images[0]}`}
                        alt={activity?.title}
                        className="p-1 rounded-xl w-fit h-fit transform object-fill transition-transform duration-500 ease-in-out"
                      />
                    ) : (
                      <img
                        src={noImage}
                        alt={activity?.title}
                        className="p-4 w-full h-full transform object-scale-down hover:scale-110 transition-transform duration-500 ease-in-out"
                      />
                    )}
                  </div>
                  <div className="w-full relative flex">
                    <div className="p-4 flex flex-col justify-between h-40 lg:h-48">
                      <h2 className="font-semibold text-lg lg:text-xl text-gray-800 truncate">
                        {activity?.title}
                      </h2>
                      <p className="text-sm text-gray-500 capitalize">
                        {activity?.description}
                      </p>
                      <p className="text-sm text-gray-700 font-bold">
                        creator : {activity?.creator_id?.name}
                      </p>
                    </div>
                    <div>
                      <button className="absolute bottom-14 right-14 px-3 py-2 w-24 rounded-full bg-blue-500 text-white font-bold">
                        Join
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="fixed top-24 right-10">
          <button
            onClick={() => {
              nav("/AddActivity");
            }}
            className="font-bold p-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600 hover:shadow-md hover:shadow-blue-800"
          >
            Add post
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
