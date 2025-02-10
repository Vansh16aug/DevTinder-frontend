import io from "socket.io-client";
import { BACKEND_URL } from "./config";

export const createSocketConnection = () => {
  return io(BACKEND_URL);
};
