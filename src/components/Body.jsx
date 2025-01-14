import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { BACKEND_URL } from "../utils/config";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/userSlice";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

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
      if (err.status === 401) {
        navigate("/login");
      }
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
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
