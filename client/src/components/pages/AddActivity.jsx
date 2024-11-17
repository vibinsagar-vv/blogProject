import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { MdUpload, MdDelete } from "react-icons/md";
import DisplayProductImage from "../DisplayProductImage";
import AXIOS from "axios";
import { AiFillPicture } from "react-icons/ai";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AddActivity({ onClose, fetchData }) {
  const [images, setImages] = useState([]);
  const nav = useNavigate();
  const [imagePreviews, setImagePreviews] = useState([]);
  const [data, SetData] = useState({
    title: "",
  });
  console.log("preview", imagePreviews);

  const [fullScreenImage, SetFullScreenImage] = useState("");
  const [openFullScreenImage, SetOpenFullScreenImage] = useState(false);

  const handleOnChange = (e) => {
    SetData({ ...data, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [...images, ...files];
    setImages(newImages);

    const previews = newImages.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleImageDelete = (index) => {
    const newImages = [...images];
    const newPreviews = [...imagePreviews];
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("data", data);

    const formData = new FormData();

    for (let key in data) {
      formData.append(key, data[key]);
    }

    images.forEach((item) => formData.append("images", item));

    console.log(formData.getAll("images"));

    const resData = await AXIOS.post(
      "https://blogproject-server.onrender.com/user/AddActivity",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.getItem("token"),
        },
      }
    );
    if (resData.data.success) {
      toast.success(resData.data.message);
      nav("/");
    }
    if (resData.data.error) {
      toast.error(resData.data.message);
      nav("/");
    }
  };

  console.log("data", data);
  return (
    <div className="fixed bg-blue-400 bg-opacity-50 w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white shadow-md shadow-blue-500 hover:shadow-blue-500 hover:shadow-lg p-4 pb-10 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Add Activity</h2>
          <div
            className="w-fit ml-auto text-2xl hover:text-pink-900 cursor-pointer"
            onClick={() => nav("/")}
          >
            <IoIosCloseCircle />
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="grid p-4 gap-2 overflow-y-scroll h-full"
        >
          <div className="relative">
            <input
              type="text"
              id="title"
              name="title"
              value={data.title}
              onChange={handleOnChange}
              className="block ring-0 border-0 px-2.5 pb-0.5 pt-4 w-full text-sm text-gray-900 bg-transparent border-b-[3px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="title"
              className="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-1   origin-[0] peer-focus:text-blue-500 px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Title <span className="text-red-600">*</span>
            </label>
          </div>
          <div className="mt-10 relative">
            <textarea
              name="description"
              id="description"
              className="block px-2.5 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer"
              placeholder=" "
              rows="4"
              onChange={handleOnChange}
            />
            <label
              htmlFor="description"
              className="absolute text-xl font-semibold text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-1 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-75 peer-placeholder-shown:-translate-y-4 peer-placeholder-shown:top-2"
            >
              Description<span className="text-red-600">*</span>
            </label>
          </div>

          <label className="mt-3 text-gray-500 font-semibold">
            Product Images :
          </label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 group bg-slate-100 hover:bg-blue-50  border hover:border-blue-300 rounded h-36 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 group-hover:text-blue-500 flex justify-center items-center flex-col gap-2">
                <span className="text-4xl">
                  <AiFillPicture />
                </span>
                <p className="text-sm">Click here to Upload Images</p>
                <input
                  className="hidden"
                  type="file"
                  multiple
                  name="uploadImageInput"
                  id="uploadImageInput"
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </label>
          <div className="flex">
            <div className="flex max-w-xl items-center gap-2 overflow-x-scroll scrollbar-none py-5">
              {imagePreviews[0] ? (
                imagePreviews.map((image, index) => {
                  return (
                    <div className="relative group">
                      <div className=" w-32 h-40">
                        <img
                          key={index}
                          src={image}
                          width={100}
                          height={100}
                          className="bg-white py-4 border flex justify-center items-center cursor-pointer w-fit max-h-40 mx-auto min-h-40 h-fit"
                          alt={image}
                          onClick={() => {
                            SetOpenFullScreenImage(true);
                            SetFullScreenImage(image);
                          }}
                        />
                      </div>
                      <div
                        className="absolute bottom-1 right-1 p-1 text-xs text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer"
                        onClick={() => {
                          handleImageDelete(index);
                        }}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-red-600 text-xs">*Upload an Image</p>
              )}
            </div>
          </div>

          <button className="px-3 mt-3 py-2 bg-blue-500 text-white mb-10 rounded-lg hover:bg-blue-700">
            Add Activity
          </button>
        </form>
      </div>
      {/* display image full screen */}

      {openFullScreenImage && (
        <DisplayProductImage
          onClose={() => SetOpenFullScreenImage(false)}
          imageName={fullScreenImage}
        />
      )}
    </div>
  );
}
