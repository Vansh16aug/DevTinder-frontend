import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BACKEND_URL } from "../utils/config";
import FeedCard from "./FeedCard";
import { addFeed, removeFeed } from "../redux/feedSlice";
import Connections from "./Connections";
import { Menu, X } from "lucide-react";
import toast from "react-hot-toast";

const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector((store) => store.feed);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  const getFeed = async () => {
    if (feedData && feedData.length > 0) {
      setIsLoading(false);
      return;
    }
    try {
      const res = await axios.get(BACKEND_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching feed:", err);
      setError("Failed to load feed. Please try again later.");
      setIsLoading(false);
    }
  };

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BACKEND_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(userId));
    } catch (err) {
      toast.error(err.response.data.message) ||
        toast.error("Failed to send request");
    }
  };

  useEffect(() => {
    getFeed();
  }, []);


  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col md:flex-row bg-gray-100">
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 right-4 z-50 bg-blue-500 text-white p-2 rounded-full shadow-lg"
      >
        {showSidebar ? <X size={24} /> : <Menu size={24} />}
      </button>
      <div
        className={`w-full md:w-1/4 bg-white p-4 overflow-y-auto transition-all duration-300 ease-in-out ${
          showSidebar ? "fixed inset-0 z-30" : "hidden"
        } md:block md:relative md:z-10 shadow-lg`}
      >
        <Connections />
      </div>
      <div className="w-full md:w-3/4 flex flex-col items-center p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Feed
        </h1>
        {feedData?.length > 0 ? (
          <div className="relative w-full max-w-md h-[60vh] mb-6">
            {feedData.map((user, index) => (
              <div
                key={user._id}
                className="absolute top-0 left-0 w-full h-full transition-all duration-300 ease-in-out"
                style={{
                  zIndex: feedData.length - index,
                  transform: `scale(${1 - index * 0.05}) translateY(${
                    index * 10
                  }px)`,
                  opacity: index === 0 ? 1 : 0.7,
                }}
              >
                <FeedCard user={user} />

                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => handleSendRequest("ignored", user._id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                  >
                    Ignore
                  </button>
                  <button
                    onClick={() => handleSendRequest("interested", user._id)}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                  >
                    Interested
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No more users to show</div>
        )}
      </div>
    </div>
  );
};

export default Feed;
