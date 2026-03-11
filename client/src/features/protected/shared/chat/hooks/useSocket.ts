import { useEffect } from "react";
import { socket } from "@/lib/socket";

export const useSocket = () => {
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      // app-wide singleton হলে এখানে disconnect না করাই ভালো
      // screen-level socket হলে disconnect করতে পারো
    };
  }, []);

  return socket;
};