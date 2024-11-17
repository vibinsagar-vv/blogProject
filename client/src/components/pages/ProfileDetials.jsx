import React, { useContext, useEffect, useState } from "react";
import Heading from "../../helpers/Heading";
import Context from "../../context/context";
import { MdEdit, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

export default function ProfileDetials() {
  const context = useContext(Context);
  const [user, SetUser] = useState({});

  const fetchUser = async () => {
    const userData = await context.fetchUserDetials();
    SetUser(userData.data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className=" w-full">
      <div className="absolute flex justify-center items-center w-8 h-8 md:w-20 md:h-10 top-3 right-2 md:top-10 md:right-10 md:p-2  bg-green-400 rounded-full hover:text-white cursor-pointer">
        <Link to={"update-profile"}>
          <span className="text-xl flex items-center text-center">
            <MdEdit />
            <span className="text-base hidden md:block">Edit</span>
          </span>
        </Link>
      </div>
      <div className="w-full  md:p-6 ">
        <h1 className="text-center text-4xl font-bold underline text-blue-900">PROFILE DETIALS</h1>
        <div className="md:p-4 overflow-scroll scrollbar-none">
          <div className="text-lg font-bold bg-blue-400 text-white py-2 my-10 text-center">
            Personal Information
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>Name:</strong>
            </div>
            <div>{user?.name}</div>
            <div>
              <strong>Email:</strong>
            </div>
            <div>{user?.email}</div>
            <div>
              <strong>Phone Number:</strong>
            </div>
            <div>{user?.phoneNumber}</div>
            <div>
              <strong>Date of Birth:</strong>
            </div>
            <div>{user?.dateOfBirth}</div>
            <div>
              <strong>Gender:</strong>
            </div>
            <div>{user?.gender}</div>
          </div>

          <div className="mt-6">
            <div className="text-lg font-bold bg-blue-400 text-white py-2 my-10 text-center">
              Address
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <strong>House Name/No.:</strong>
              </div>
              <div>{user?.address?.house}</div>
              <div>
                <strong>Country:</strong>
              </div>
              <div>{user?.address?.country}</div>
              <div>
                <strong>State:</strong>
              </div>
              <div>{user?.address?.state}</div>
              <div>
                <strong>District:</strong>
              </div>
              <div>{user?.address?.district}</div>
              <div>
                <strong>City:</strong>
              </div>
              <div>{user?.address?.city}</div>
              <div>
                <strong>Street:</strong>
              </div>
              <div>{user?.address?.street}</div>
              <div>
                <strong>Pincode:</strong>
              </div>
              <div>{user?.address?.pincode}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
