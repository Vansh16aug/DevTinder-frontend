import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../utils/config";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/userSlice";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { addRequest } from "../redux/requestSlice";
import Sidebar from "./Sidebar";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      if (userData) return;
      const user = await axios.get(BACKEND_URL + "/profile", {
        withCredentials: true,
      });
      dispatch(addUser(user.data.data));
    } catch (err) {
      navigate("/login");
      console.log(err.message);
    }
  };
  // console.log(navigator.geolocation);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (userData !== null && !userData?.verified) {
      // toast.error("Please complete profile verification to access the feed.");
      navigate("/profile");
    } else {
      const fetchRequest = async () => {
        try {
          const res = await axios.get(BACKEND_URL + "/user/requests", {
            withCredentials: true,
          });
          dispatch(addRequest(res?.data?.data));
        } catch (err) {
          console.log(err.message);
        }
      };

      // Initial fetch
      fetchRequest();

      // Set up interval for subsequent fetches
      const intervalId = setInterval(fetchRequest, 4000);

      // Clean up the interval when the component unmounts or when verification status changes
      return () => clearInterval(intervalId);
    }
  }, [userData?.verified, userData]);

  return (
    <div className="flex h-screen bg-gray-900">
      {userData && <Sidebar />}
      <div className="flex-1 overflow-y-auto">
        <Toaster />
        <Outlet />
      </div>
    </div>
  );
};

export default Body;
