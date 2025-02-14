"use client";

import { useState, useEffect, useCallback } from "react";
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
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState(null);

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

  const handleDeleteClick = (e, connectionId, connection) => {
    e.preventDefault();
    setSelectedConnection({ id: connectionId, user: connection.user });
    setDeleteModalOpen(true);
    setActiveDropdown(null);
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setSelectedConnection(null);
  };

  const getConnections = useCallback(async () => {
    try {
      const res = await axios.get(BACKEND_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res?.data?.data));
    } catch (err) {
      // toast.error(err.response.data.message) ||
      //   toast.error("Failed to load connections");
    }
  }, []);

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
      navigate("/");
      await getConnections();
      toast.success("Connection removed successfully");
      setDeleteModalOpen(false);
      setSelectedConnection(null);
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

  useEffect(() => {
    getConnections();
    const interval = setInterval(() => {
      getConnections();
    }, 3000);
    return () => clearInterval(interval);
  }, [getConnections, dispatch]);

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
    <>
      <div className="w-[320px] bg-gray-800 border-r border-gray-700 flex flex-col h-screen">
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
            className="flex items-center p-2 text-white hover:text-pink-500 transition-all duration-300"
          >
            <LogOut className="w-5 h-6 mr-2" />
          </button>
        </div>

        <div className="p-4 flex gap-2">
          <Link
            to="/"
            onClick={() => setActiveTab("matches")}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors relative ${
              activeTab === "matches"
                ? "bg-pink-600 text-white"
                : "text-white/60 hover:text-white hover:bg-gray-700"
            }`}
          >
            <Users size={20} />
            <span>Matches</span>
            {requests?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {requests?.length > 99 ? "99+" : requests?.length}
              </span>
            )}
          </Link>
          <button
            onClick={() => setActiveTab("messages")}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === "messages"
                ? "bg-pink-600 text-white"
                : "text-white/60 hover:text-white hover:bg-gray-700"
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
                    className="bg-gray-700 p-3 rounded-lg flex items-center gap-3 transition-all duration-300 hover:bg-gray-600"
                  >
                    <div className="flex-shrink-0">
                      {request.fromUserId?.photoUrl ? (
                        <img
                          src={
                            request.fromUserId.photoUrl || "/placeholder.svg"
                          }
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
                <li key={connection.connectionId}>
                  <Link
                    to={`/chat/${connection.user._id}`}
                    state={{ connectionInfo: connection.user }}
                    className="bg-gray-700 p-3 rounded-lg flex items-center gap-3 transition-all duration-300 hover:bg-gray-600"
                  >
                    <div className="flex-shrink-0">
                      {connection?.user?.photoUrl ? (
                        <img
                          src={connection?.user?.photoUrl || "/placeholder.svg"}
                          alt={`${connection.user.firstName} ${connection.user.lastName}`}
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
                        onClick={(e) => {
                          e.preventDefault();
                          toggleDropdown(connection.connectionId);
                        }}
                      >
                        <MoreVertical
                          size={16}
                          className={
                            activeDropdown === connection.connectionId
                              ? "rotate-90 text-white"
                              : "text-white"
                          }
                        />
                      </button>
                      {activeDropdown === connection.connectionId && (
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-[1] menu p-2 text-white shadow bg-gray-700 rounded-box w-52"
                        >
                          <li>
                            <a
                              onClick={(e) => {
                                e.preventDefault();
                                console.log(
                                  "View profile",
                                  connection.user._id
                                );
                                toggleDropdown(connection.connectionId);
                              }}
                            >
                              View Profile
                            </a>
                          </li>
                          <li>
                            <a
                              onClick={(e) =>
                                handleDeleteClick(
                                  e,
                                  connection.connectionId,
                                  connection
                                )
                              }
                              className="text-red-500"
                            >
                              Delete
                            </a>
                          </li>
                        </ul>
                      )}
                    </div>
                  </Link>
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
            <div className="bg-gradient-to-r from-pink-600 to-pink-700 rounded-xl p-6 text-center text-white">
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
        <div className="mt-auto p-4 border-t border-gray-700">
          <ul className="space-y-2 text-sm">
            {[
              { to: "/privacy-policy", text: "Privacy Policy" },
              { to: "/terms", text: "Terms of Service" },
              { to: "/about-us", text: "About Us" },
              { to: "/disclaimer", text: "Disclaimer" },
              { to: "/refund-cancel", text: "Refund and Cancellation" },
              { to: "/shipping", text: "Shipping and Delivery" },
              { to: "/contact", text: "Contact Us" },
            ].map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <dialog
        id="delete_modal"
        className={`modal modal-bottom sm:modal-middle ${
          deleteModalOpen ? "modal-open" : ""
        }`}
      >
        <div className="modal-box bg-gray-800">
          <h3 className="font-bold text-lg text-white">Remove Connection</h3>
          <p className="py-4 text-white/80">
            Are you sure you want to remove{" "}
            {selectedConnection?.user?.firstName}{" "}
            {selectedConnection?.user?.lastName} from your connections? This
            action cannot be undone.
          </p>
          <div className="modal-action">
            <button
              className="btn btn-ghost text-white"
              onClick={handleCancelDelete}
            >
              Cancel
            </button>
            <button
              className="btn btn-error text-white"
              onClick={() => removeConnectionHandler(selectedConnection?.id)}
            >
              Remove
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={handleCancelDelete}>close</button>
        </form>
      </dialog>
    </>
  );
};

export default Sidebar;
