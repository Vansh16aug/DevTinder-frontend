import React from "react";
import { MapPin, Check, X } from "lucide-react";

const FeedCard = ({ user, swipeProgress }) => {
  const showYes = swipeProgress > 0;
  const showNo = swipeProgress < 0;
  const indicatorOpacity = Math.abs(swipeProgress);

  return (
    <div className="w-[25vw] h-[90vh] perspective-1000 perspective-origin-center transform-style-preserve-3d relative">
      <div className="w-full h-full absolute rounded-[20px] overflow-hidden shadow-lg cursor-pointer select-none transition-transform duration-500 ease-in-out transform hover:scale-105 bg-[#000]">
        <div
          className="h-full w-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${user.photoUrl})`,
            backgroundPosition: "50.3759% 73.1982%",
            backgroundSize: "126.233%",
          }}
        >
          <div className="w-full h-full bg-gradient-to-t from-black/70 to-transparent p-6 flex flex-col justify-end">
            <div className="mb-4">
              <h2 className="text-white text-3xl font-bold flex items-center">
                {user.firstName} {user.lastName} {user.age}
              </h2>
              {user.location && (
                <p className="text-gray-300 flex items-center mt-1">
                  <MapPin size={16} className="mr-1" />
                  {user.location}
                </p>
              )}
            </div>
            {user.skills && user.skills.length > 0 && (
              <div>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Yes indicator */}
      <div
        className={`absolute top-4 right-4 bg-green-500 rounded-full p-2 transition-opacity duration-200 ${
          showYes ? "opacity-100" : "opacity-0"
        }`}
        style={{ opacity: indicatorOpacity }}
      >
        <Check className="text-white" size={32} />
        <span className="text-white font-bold text-lg ml-1">YES</span>
      </div>

      {/* No indicator */}
      <div
        className={`absolute top-4 left-4 bg-red-500 rounded-full p-2 transition-opacity duration-200 ${
          showNo ? "opacity-100" : "opacity-0"
        }`}
        style={{ opacity: indicatorOpacity }}
      >
        <X className="text-white" size={32} />
        <span className="text-white font-bold text-lg ml-1">NO</span>
      </div>
    </div>
  );
};

export default FeedCard;
