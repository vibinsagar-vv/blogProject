import React from "react";
import AuthPage from "../components/pages/AuthPage";
import ForgotPasswod from "../components/pages/ForgotPasswod";
import OtpInput from "../components/pages/OtpInput";
import ProfilePage from "../components/pages/Profile";
import SearchProducts from "../components/pages/SearchProducts";
import { Route, Routes } from "react-router-dom";
import Home from "../components/pages/Home";
import MyNavbar from "../components/mainHeader";
import UpdateProfilePage from "../components/UpdateProfilePage";
import AddActivity from "../components/pages/AddActivity";

export default function UserPage() {
  return (
    <div>
      <div>
        <MyNavbar />
      </div>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/forgot-password" element={<ForgotPasswod />} />
          <Route path="/otp-verification" element={<OtpInput />} />
          <Route path="/profile/*" element={<ProfilePage />} />
          <Route path="/updateProfile" element={<UpdateProfilePage />} />
          <Route path="/AddActivity" element={<AddActivity/>} />
        </Routes>
      </main>
    </div>
  );
}
