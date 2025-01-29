import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../utils/config";
import { removeUser } from "../redux/userSlice";
import { addFeed, emptyFeed } from "../redux/feedSlice";
import { emptyRequest, removeRequest } from "../redux/requestSlice";
import {
  addConnection,
  emptyConnection,
  removeConnection,
} from "../redux/connectionSlice";
import toast from "react-hot-toast";
import {
  MessageSquare,
  Users,
  UserIcon,
  LogOut,
  User,
  Check,
  X,
  MoreVertical,
  BadgeCheck,
} from "lucide-react";

const Sidebar = () => {
  const user = useSelector((store) => store.user);
  const connections = useSelector((store) => store.connections);
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("matches");
  const [activeDropdown, setActiveDropdown] = useState(null);

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

  const getConnections = async () => {
    try {
      const res = await axios.get(BACKEND_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res?.data?.data));
    } catch (err) {
      toast.error(err.response.data.message) ||
        toast.error("Failed to load connections");
    }
  };

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BACKEND_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
      if (status === "accepted") {
        await getConnections();
      }
      toast.success(`Request ${status}`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const removeConnectionHandler = async (connectionId) => {
    try {
      await axios.delete(
        BACKEND_URL + "/user/connection/remove/" + connectionId,
        { withCredentials: true }
      );
      dispatch(removeConnection(connectionId));
      toast.success("Connection removed successfully");
      // await getConnections();
      try {
        const res = await axios.get(BACKEND_URL + "/user/feed", {
          withCredentials: true,
        });
        dispatch(addFeed(res?.data?.data));
      } catch (err) {
        console.error("Error fetching feed:", err);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to remove connection");
    }
  };

  // useEffect(() => {
  //   getConnections();
  // }, []);

  const handleAvatarClick = () => {
    if (location.pathname === "/profile") {
      navigate("/");
    } else {
      navigate("/profile");
    }
  };

  const toggleDropdown = (connectionId) => {
    if (activeDropdown === connectionId) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(connectionId);
    }
  };

  return (
    <div className="w-[320px] bg-[#242424] border-r border-white/10 flex flex-col h-screen">
      <div className="p-4 flex items-center justify-between">
        <div className="dropdown dropdown-right">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar relative"
            onClick={handleAvatarClick}
          >
            <div className="w-10 rounded-full">
              <img
                alt={user?.firstName}
                src={user?.photoUrl || "/placeholder.svg"}
              />
            </div>
            {/* {user?.verified && (
              <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-1">
                <BadgeCheck size={16} className="text-white" />
              </div>
            )} */}
          </div>
        </div>
        <div className="text-white">
          {`${user?.firstName}
          ${user?.lastName}`.length > 16
            ? `${user?.firstName} ${user?.lastName}`.slice(0, 16) + "..."
            : `${user?.firstName} ${user?.lastName}`}
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center p-2 text-white hover:text-fuchsia-700 transition-all duration-300"
        >
          <LogOut className="w-5 h-6 mr-2" />
        </button>
      </div>

      <div className="p-4 flex gap-2">
        <button
          onClick={() => setActiveTab("matches")}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors relative ${
            activeTab === "matches"
              ? "bg-pink-500 text-white"
              : "text-white/60 hover:text-white hover:bg-white/5"
          }`}
        >
          <Users size={20} />
          <span>Matches</span>
          {requests?.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {requests?.length > 99 ? "99+" : requests?.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab("messages")}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === "messages"
              ? "bg-pink-500 text-white"
              : "text-white/60 hover:text-white hover:bg-white/5"
          }`}
        >
          <MessageSquare size={20} />
          <span>Messages</span>
        </button>
      </div>

      <div className="flex-grow overflow-y-auto px-4 py-2">
        {activeTab === "matches" ? (
          requests && requests.length > 0 ? (
            <ul className="space-y-3">
              {requests.map((request) => (
                <li
                  key={request._id}
                  className="bg-white/5 p-3 rounded-lg flex items-center gap-3 transition-all duration-300 hover:bg-white/10"
                >
                  <div className="flex-shrink-0">
                    {request.fromUserId?.photoUrl ? (
                      <img
                        src={request.fromUserId.photoUrl || "/placeholder.svg"}
                        alt={`${request.fromUserId.firstName} ${request.fromUserId.lastName}`}
                        className="w-12 h-12 rounded-full object-cover border-2 border-pink-500"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center">
                        <User className="text-white" size={24} />
                      </div>
                    )}
                  </div>
                  <div className="flex-grow">
                    <p className="font-semibold text-white">
                      {`${request?.fromUserId?.firstName} ${request?.fromUserId?.lastName}`
                        .length > 10
                        ? `${request?.fromUserId?.firstName} ${request?.fromUserId?.lastName}`.slice(
                            0,
                            10
                          ) + "..."
                        : `${request?.fromUserId?.firstName} ${request?.fromUserId?.lastName}`}
                    </p>
                    <p className="text-sm text-white/60">
                      {request?.fromUserId?.emailId}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => reviewRequest("accepted", request?._id)}
                      className="p-2 bg-green-500 rounded-full hover:bg-green-600 transition-colors"
                    >
                      <Check size={16} className="text-white" />
                    </button>
                    <button
                      onClick={() => reviewRequest("rejected", request?._id)}
                      className="p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X size={16} className="text-white" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-white/60 p-4">
              No new match requests.
            </div>
          )
        ) : connections && connections?.length > 0 ? (
          <ul className="space-y-3">
            {connections.map((connection) => (
              <li
                key={connection?.connectionId}
                className="bg-base-200 p-3 rounded-lg flex items-center gap-3 transition-all duration-300 hover:bg-base-100"
              >
                <div className="flex-shrink-0">
                  {connection?.user?.photoUrl ? (
                    <img
                      src={connection?.user?.photoUrl || "/placeholder.svg"}
                      alt={`${connection.user.firstName} ${connection.user.lastName}`}
                      className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                      <User className="text-primary-content" size={24} />
                    </div>
                  )}
                </div>
                <div className="flex-grow">
                  <p className="font-semibold text-base-content">
                    {`${connection.user.firstName} ${connection.user.lastName}`
                      .length > 10
                      ? `${connection.user.firstName} ${connection.user.lastName}`.slice(
                          0,
                          10
                        ) + "..."
                      : `${connection.user.firstName} ${connection.user.lastName}`}
                  </p>
                </div>
                <div className="dropdown dropdown-end">
                  <button
                    tabIndex={0}
                    className="btn btn-ghost btn-circle btn-sm"
                    onClick={() => toggleDropdown(connection.connectionId)}
                  >
                    <MoreVertical
                      size={16}
                      className={
                        activeDropdown === connection.connectionId
                          ? "rotate-90"
                          : ""
                      }
                    />
                  </button>
                  {activeDropdown === connection.connectionId && (
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <a
                          onClick={() => {
                            console.log("View profile", connection.user._id);
                            toggleDropdown(connection.connectionId);
                          }}
                        >
                          View Profile
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => {
                            removeConnectionHandler(connection.connectionId);
                            toggleDropdown(connection.connectionId);
                          }}
                          className="text-error"
                        >
                          Delete
                        </a>
                      </li>
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-white/60 p-4">
            No connections yet. Start matching to connect!
          </div>
        )}
      </div>

      {connections?.length === 0 && requests?.length === 0 && (
        <div className="px-4 py-6">
          <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl p-6 text-center text-white">
            <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
              <UserIcon size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Start Matching</h3>
            <p className="text-sm text-white/80 mb-4">
              Matches will appear here once you start connecting with people.
            </p>
            <div className="text-sm text-white/60">0 connections</div>
          </div>
        </div>
      )}
      <div className="mt-auto p-4 border-t border-white/10">
        <ul className="space-y-2 text-sm">
          <li>
            <Link
              to="/privacy-policy"
              className="text-white/60 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link
              to="/terms"
              className="text-white/60 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-white/60 hover:text-white transition-colors"
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
