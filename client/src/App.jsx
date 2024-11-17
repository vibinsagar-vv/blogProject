import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./components/pages/Home";
import "./App.css";
// import Header from "./components/Header"
import Footer from "./components/Footer";
// import Login from "./components/pages/Login"
import ForgotPasswod from "./components/pages/ForgotPasswod";
import SignUp from "./components/pages/SignUp";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import AXIOS from "axios";
import Context from "./context/context";
import { useDispatch } from "react-redux";
import { setUserDetials } from "./store/userSlice";
import fetchProduct from "./helpers/contextFun";
import UserPage from "./Users/UserPage";
function App() {
  const dispatch = useDispatch();
  const [userDetial, SetUserDetial] = useState({});
  const url = useLocation();
  console.log(url);

  const fetchUserDetials = async () => {
    try {
      const header = {
        token: localStorage.getItem("token") || "",
      };
      const resData = await AXIOS.get(
        "https://blogproject-server.onrender.com/user/user-detials",
        { headers: header }
      );
      SetUserDetial(resData.data.data);

      if (resData.data.success) {
        dispatch(setUserDetials(resData.data.data));
      }
      return resData.data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    //user Detials
    fetchUserDetials();
  }, []);

  return (
    <>
      <Context.Provider
        value={{
          verified: false,
          userDetial,
          fetchUserDetials, //user detial fetch
        }}
      >
        <ToastContainer
          position="top-right"
          autoClose={500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          transition={Bounce}
          pauseOnHover
          theme="colored"
        />
        <main className=" bg-white">
          <Routes>
            <Route path="/*" element={<UserPage />} />
          </Routes>
        </main>
      </Context.Provider>
    </>
  );
}

export default App;
