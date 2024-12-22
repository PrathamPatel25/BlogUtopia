import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

export default function LogoutBtn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
    navigate("/");
  };
  return (
    <button
      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full md:text-white md:hover:bg-white/20"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}
