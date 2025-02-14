import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { createSocketConnection } from "../utils/sockets.js";
import { BACKEND_URL } from "../utils/config";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";

export default function Chat() {
  const { targetId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isTargetOnline, setIsTargetOnline] = useState(false);
  const [lastSeen, setLastSeen] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const dropdownRef = useRef(null);
  const socketRef = useRef(null);
  const location = useLocation();
  const connectionInfo = location.state?.connectionInfo;
  const navigate = useNavigate();

  const fetchChatMessages = async () => {
    const chat = await axios.get(BACKEND_URL + "/chat/" + targetId, {
      withCredentials: true,
    });
    if (!chat?.data?.messages) return;

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text, createdAt } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
        createdAt,
      };
    });
    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, [targetId, user]);

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();

    socketRef.current = socket;

    socket.emit("userOnline", { userId });

    socket.emit("joinChat", {
      firstName: user?.firstName,
      userId,
      targetId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text, createdAt }) => {
      setMessages((messages) => [
        ...messages,
        {
          firstName,
          lastName,
          text,
          createdAt: new Date(createdAt).toISOString(),
        },
      ]);
    });

     socket.on("userStatusChanged", ({ userId: changedUserId, status }) => {
       if (changedUserId === targetId) {
         setIsTargetOnline(status === "online");
         if (status === "offline") {
           setLastSeen(new Date().toISOString());
         }
       }
     });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetId, user?.firstName]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      const handleScroll = () => {
        const isScrolledToBottom =
          scrollContainer.scrollHeight - scrollContainer.scrollTop ===
          scrollContainer.clientHeight;
        setShowScrollButton(!isScrolledToBottom);
      };
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetId,
      text: newMessage,
      createdAt: new Date().toISOString(),
    });
    setNewMessage("");
  };

  const handleEmojiClick = (emojiObject) => {
    setNewMessage((prevMessage) => prevMessage + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleClearChat = () => {
    setMessages([]);
    setShowDropdown(false);
  };

  const handleSearch = () => {
    // Implement search functionality
    setShowDropdown(false);
  };

  const handleViewProfile = () => {
    // Implement view profile functionality
    setShowDropdown(false);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const groupMessagesByDate = (messages) => {
    const groupedMessages = {};
    messages.forEach((msg) => {
      const date = new Date(msg.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      if (!groupedMessages[date]) {
        groupedMessages[date] = [];
      }
      groupedMessages[date].push(msg);
    });
    return groupedMessages;
  };

const formatDateHeader = (date) => {
  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return date === today ? "Today" : date;
};

  const groupedMessages = groupMessagesByDate(messages);

  const formatLastSeen = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffMinutes < 1) return "just now";
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <div className="flex-grow overflow-hidden">
        <div className="h-full flex flex-col">
          {/* Enhanced Header */}
          <div className="p-4 bg-gray-800 shadow-md border-b border-gray-700">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={connectionInfo?.photoUrl || "/placeholder.svg"}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-primary ring-offset-2 bg-gray-700"
                  alt={`${connectionInfo?.firstName} ${connectionInfo?.lastName}`}
                />
                {/* <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div> */}
              </div>

              <div className="flex-1">
                <h2 className="text-lg font-semibold">
                  {connectionInfo?.firstName} {connectionInfo?.lastName}
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm opacity-70">
                    {connectionInfo?.emailId}
                  </span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                  {isTargetOnline ? (
                    <span className="text-sm text-green-500">Online</span>
                  ) : (
                    <span className="text-sm text-gray-400">
                      Last seen {formatLastSeen(lastSeen)}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  className="btn btn-ghost btn-sm btn-circle"
                  onClick={() => navigate("/")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 3l-6 6m0 0V4m0 5h5M5 21l6-6m0 0v5m0-5H4"
                    />
                  </svg>
                </button>
                <div className="relative" ref={dropdownRef}>
                  <button
                    className="btn btn-ghost btn-sm btn-circle"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </button>

                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                      >
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                          onClick={handleSearch}
                          role="menuitem"
                        >
                          Search
                        </button>
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                          onClick={handleViewProfile}
                          role="menuitem"
                        >
                          View Profile
                        </button>
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                          onClick={handleClearChat}
                          role="menuitem"
                        >
                          Clear Chat
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Messages Section */}
          <div
            className="flex-grow overflow-y-auto p-4"
            ref={scrollContainerRef}
          >
            {Object.entries(groupedMessages).map(([date, messages]) => (
              <div key={date}>
                <div className="text-center text-sm opacity-50 my-4">
                  {formatDateHeader(date)}
                </div>
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`chat ${
                      user.firstName === msg.firstName
                        ? "chat-end"
                        : "chat-start"
                    }`}
                  >
                    <div className="chat-bubble flex gap-5 items-center justify-center bg-gray-700 text-white">
                      <div>{msg.text}</div>
                      <time className="text-xs opacity-50">
                        {formatTime(msg.createdAt)}
                      </time>
                    </div>
                  </div>
                ))}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Scroll Button */}
          {showScrollButton && (
            <div className="absolute bottom-24 right-8">
              <button
                className="btn btn-circle btn-sm btn-primary"
                onClick={scrollToBottom}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Message Input Section */}
      <div className="p-4 bg-gray-800 border-t border-gray-700 relative">
        {showEmojiPicker && (
          <div ref={emojiPickerRef} className="absolute bottom-20 left-4 z-10">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex gap-2"
        >
          <button
            type="button"
            className="btn btn-ghost btn-circle"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <input
            type="text"
            placeholder="Type your message..."
            className="input input-bordered flex-grow bg-gray-700 text-white border-gray-600"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button type="submit" className="btn btn-primary btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
