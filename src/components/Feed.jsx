import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BACKEND_URL } from "../utils/config";
import FeedCard from "./FeedCard";
import { addFeed, removeFeed } from "../redux/feedSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector((store) => store.feed);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    getFeed();
  }, []);

  const handleInterested = () => {
    // Here you can add logic to handle the "Interested" action
    // For now, we'll just remove the top profile
    if (feedData.length > 0) {
      dispatch(removeFeed(feedData[0].id));
    }
  };

  const handleIgnore = () => {
    // Here you can add logic to handle the "Ignore" action
    // For now, we'll just remove the top profile
    if (feedData.length > 0) {
      dispatch(removeFeed(feedData[0].id));
    }
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
    <div className="container mx-auto px-4 py-8 h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center">User Feed</h1>
      <div className="relative w-full max-w-md h-[60vh]">
        {feedData.map((user, index) => (
          <div
            key={user._id}
            className="absolute top-0 left-0 w-full h-full"
            style={{
              zIndex: feedData.length - index,
              transform: `scale(${1 - index * 0.05})`,
              opacity: index === 0 ? 1 : 0.7,
            }}
          >
            <FeedCard user={user} />
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6 gap-4">
        <button
          onClick={handleIgnore}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
        >
          Ignore
        </button>
        <button
          onClick={handleInterested}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
        >
          Interested
        </button>
      </div>
    </div>
  );
};

export default Feed;
