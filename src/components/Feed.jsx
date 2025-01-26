import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BACKEND_URL } from "../utils/config";
import FeedCard from "./FeedCard";
import { addFeed, removeFeed } from "../redux/feedSlice";
import { Heart, X } from "lucide-react";
import toast from "react-hot-toast";
import TinderCard from "react-tinder-card";

const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector((store) => store.feed);
  const user = useSelector((store) => store.user);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [swipeProgress, setSwipeProgress] = useState(0);
  const cardRefs = useRef([]);

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

  const onSwipe = async (direction, userId) => {
    setSwipeDirection(direction);
    if (direction === "right") {
      await handleSendRequest("interested", userId);
    } else if (direction === "left") {
      await handleSendRequest("ignored", userId);
    }
    // Reset swipe direction after a short delay
    setTimeout(() => {
      setSwipeDirection(null);
      setSwipeProgress(0);
    }, 300);
  };

  const onSwipeProgress = (direction, progress) => {
    setSwipeDirection(direction);
    setSwipeProgress(progress);
  };

  useEffect(() => {
    getFeed();
  }, [user]); // Added user dependency to useEffect

  const handleButtonClick = async (direction) => {
    if (feedData.length > 0) {
      const currentCard = cardRefs.current[feedData.length - 1];
      if (currentCard) {
        await currentCard.swipe(direction);
      }
    }
  };

  if (!user?.verified) {
    return (
      <div className="flex h-screen bg-[#1a1a1a]">
        <div className="flex-1 flex justify-center items-center text-pink-500">
          Please complete profile verification to access the feed.
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-screen bg-[#1a1a1a]">
        <div className="flex-1 flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-pink-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen bg-[#1a1a1a]">
        <div className="flex-1 flex justify-center items-center text-pink-500">
          {error}
        </div>
      </div>
    );
  }

  const getButtonScale = (isLike) => {
    const baseScale = 1;
    const maxScaleIncrease = 0.3;
    const scaleIncrease = Math.abs(swipeProgress) * maxScaleIncrease;

    if ((isLike && swipeProgress > 0) || (!isLike && swipeProgress < 0)) {
      return baseScale + scaleIncrease;
    }
    return baseScale;
  };

  return (
    <div className="flex h-screen bg-[#1a1a1a] select-none overflow-hidden">
      <main className="flex-1 flex items-center justify-center">
        {feedData?.length > 0 ? (
          <div className="relative h-[calc(100vh-2rem)] aspect-[3/4] max-w-md mx-auto">
            <div className="cards-container">
              {feedData.map((user, index) => (
                <TinderCard
                  ref={(el) => (cardRefs.current[index] = el)}
                  key={user._id}
                  onSwipe={(dir) => onSwipe(dir, user._id)}
                  onCardLeftScreen={() => dispatch(removeFeed(user._id))}
                  onSwipeProgress={(dir, progress) =>
                    onSwipeProgress(dir, progress)
                  }
                  preventSwipe={["up", "down"]}
                  className="absolute touch-none"
                >
                  <FeedCard
                    user={user}
                    swipeProgress={
                      swipeDirection === "left"
                        ? -swipeProgress
                        : swipeDirection === "right"
                        ? swipeProgress
                        : 0
                    }
                  />
                </TinderCard>
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
              <button
                onClick={() => handleButtonClick("left")}
                className="gamepad-button-wrapper pointer-events-auto"
                style={{
                  transform: `scale(${getButtonScale(false)})`,
                  zIndex: swipeDirection === "left" ? 10 : 0,
                }}
              >
                <div className="gamepad-button bg-white/50 hover:bg-white/60 text-gray-800 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-75 opacity-50 hover:opacity-100">
                  <X size={32} strokeWidth={3} />
                </div>
              </button>
              <button
                onClick={() => handleButtonClick("right")}
                className="gamepad-button-wrapper pointer-events-auto"
                style={{
                  transform: `scale(${getButtonScale(true)})`,
                  zIndex: swipeDirection === "right" ? 10 : 0,
                }}
              >
                <div className="gamepad-button bg-pink-500 hover:bg-pink-600 text-white w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-75 opacity-50 hover:opacity-100">
                  <Heart size={32} strokeWidth={3} fill="currentColor" />
                </div>
              </button>
            </div>
          </div>
        ) : (
          <div className="text-white/60 text-center px-4 max-w-md">
            <div className="w-64 h-64 mx-auto mb-6 bg-pink-500/20 rounded-xl flex items-center justify-center">
              <Heart size={64} className="text-pink-500/50" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Start Matching</h3>
            <p className="text-sm">
              No more profiles to show. Check back later!
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Feed;
