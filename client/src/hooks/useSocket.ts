import { WebSocketContext } from "@/context/webSocketContext";
import { useContext } from "react";


export const useSocket = () => {
  return useContext(WebSocketContext);
};
