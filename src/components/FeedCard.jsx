const FeedCard = ({ user }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden h-full">
      <div className="relative h-3/4">
        <img
          src={user.photoUrl}
          alt={`${user.firstName} ${user.lastName}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h2 className="text-white text-xl font-bold">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-gray-300 text-sm">{user.age} years old</p>
        </div>
      </div>
      <div className="p-4 h-1/4 overflow-y-auto">
        <p className="text-gray-600 mb-2">{user.about}</p>
        <div className="mb-2">
          <h3 className="text-sm font-semibold text-gray-700 mb-1">Skills:</h3>
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
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>{user.gender}</span>
          <span>{user.emailId}</span>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
