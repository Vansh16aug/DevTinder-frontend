import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils/config";
import { removeUser } from "../redux/userSlice";
import { Bell, Home, LogOut, User } from "lucide-react";
import { useState } from "react";
import { emptyFeed, removeFeed } from "../redux/feedSlice";
import { emptyRequest, removeRequest } from "../redux/requestSlice";
import {
  addConnection,
  emptyConnection,
  removeConnection,
} from "../redux/connectionSlice";
import toast from "react-hot-toast";

function Navbar() {
  const user = useSelector((store) => store.user);
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(
        BACKEND_URL + "/logout",
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUser());
      dispatch(emptyFeed());
      dispatch(emptyConnection());
      dispatch(emptyRequest());
      navigate("/login");
    } catch (err) {
      console.log(err.message);
    }
  };
  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BACKEND_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      const response = await axios.get(BACKEND_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(response?.data?.data));
      dispatch(removeRequest(_id));
      console.log(res);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Dev Tinder
        </Link>
      </div>
      {user && (
        <div className="flex-none gap-4">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="indicator">
                <Bell className="h-5 w-5" />
                {requests?.length > 0 && (
                  <span className="badge badge-sm badge-primary indicator-item">
                    {requests.length}
                  </span>
                )}
              </div>
            </div>
            {isOpen && (
              <div
                tabIndex={0}
                className="card dropdown-content card-compact mt-3 w-80 bg-base-100 shadow-xl z-10"
              >
                <div className="card-body">
                  <h3 className="card-title text-lg font-bold">
                    Notifications
                  </h3>
                  {requests?.length > 0 ? (
                    <ul className="menu bg-base-100 w-full p-0 [&_li>*]:rounded-none">
                      {requests.map((req) => (
                        <li
                          key={req.fromUserId.id}
                          className="border-b border-base-200 last:border-b-0"
                        >
                          <div className="flex items-center p-4 hover:bg-base-200 transition-colors duration-200">
                            <div className="avatar">
                              <div className="w-12 rounded-full">
                                <img
                                  src={
                                    req?.fromUserId?.photoUrl ||
                                    "/placeholder.svg"
                                  }
                                  alt={req?.fromUserId?.firstName}
                                />
                              </div>
                            </div>
                            <div className="ml-4 flex-grow">
                              <p className="font-semibold">
                                {req?.fromUserId?.firstName}
                              </p>
                              <p className="text-sm text-base-content/70">
                                is interested in you
                              </p>
                            </div>
                            <div className="flex flex-col gap-2">
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() =>
                                  reviewRequest("accepted", req._id)
                                }
                              >
                                Accept
                              </button>
                              <button
                                className="btn btn-ghost btn-sm"
                                onClick={() =>
                                  reviewRequest("rejected", req._id)
                                }
                              >
                                Ignore
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-4 text-center text-base-content/70">
                      No new notifications
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="hidden md:block">
            <span className="text-base-content/70">Welcome,</span>{" "}
            <span className="font-semibold">{user.firstName}</span>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt={user?.firstName}
                  src={user?.photoUrl || "/placeholder.svg"}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/" className="flex items-center p-2">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/profile" className="flex items-center p-2">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center p-2"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
