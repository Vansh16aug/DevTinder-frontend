import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { BACKEND_URL } from "../utils/config";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/userSlice";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { addRequest } from "../redux/requestSlice";

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
  const fetchRequest = async () => {
    try {
      const res = await axios.get(BACKEND_URL + "/user/requests", {
        withCredentials: true,
      });
      dispatch(addRequest(res?.data?.data));
    } catch (err) {
      toast.error(err.message);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  setInterval(()=>{
    fetchRequest();
  },3000)
  
  return (
    <div>
      <Navbar />
      <Toaster />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
