import { User, Briefcase, Mail, MapPin } from "lucide-react";

const FeedCard = ({ user }) => {
  return (
    <div className="bg-white shadow-xl rounded-lg overflow-hidden h-full transition-all duration-300 ease-in-out hover:shadow-2xl -z-10">
      <div className="relative h-2/3">
        <img
          src={user.photoUrl || "/placeholder.svg"}
          alt={`${user.firstName} ${user.lastName}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h2 className="text-white text-2xl font-bold">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-gray-300 text-sm flex items-center">
            <User size={16} className="mr-2" />
            {user.age} years old • {user.gender}
          </p>
        </div>
      </div>
      <div className="p-4 h-1/3 overflow-y-auto">
        <p className="text-gray-600 mb-3 line-clamp-2">{user.about}</p>
        <div className="mb-3">
          <h3 className="text-sm font-semibold text-gray-700 mb-1 flex items-center">
            <Briefcase size={16} className="mr-2" />
            Skills:
          </h3>
          <div className="flex flex-wrap gap-1">
            {user.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col text-sm text-gray-500">
          <span className="flex items-center mb-1">
            <Mail size={16} className="mr-2" />
            {user.emailId}
          </span>
          <span className="flex items-center">
            <MapPin size={16} className="mr-2" />
            {user.location || "Location not specified"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
