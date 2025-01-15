import axios from "axios";
import { BACKEND_URL } from "../utils/config";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../redux/connectionSlice";
import { User } from "lucide-react";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
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

  useEffect(() => {
    getConnections();
  }, []);

  if (connections === null) {
    return <p className="text-center text-gray-500">No connections found</p>;
  }

  return (
    <div className="h-full">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Connections
      </h2>
      {connections ? (
        <ul className="space-y-3">
          {connections.map((connection) => (
            <li
              key={connection._id}
              className="bg-gray-50 p-3 rounded-lg shadow-md flex items-center gap-3 transition duration-300 ease-in-out hover:bg-gray-100"
            >
              <div className="flex-shrink-0">
                {connection?.photoUrl ? (
                  <img
                    src={connection.photoUrl || "/placeholder.svg"}
                    alt={`${connection.firstName} ${connection.lastName}`}
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                    <User className="text-white" size={24} />
                  </div>
                )}
              </div>
              <div className="flex-grow">
                <p className="font-semibold text-gray-800">{`${connection.firstName} ${connection.lastName}`}</p>
                <p className="text-sm text-gray-600">{connection.emailId}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
};

export default Connections;
