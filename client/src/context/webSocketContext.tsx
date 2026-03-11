import { getSocket } from "@/lib/getSocket";
import React, { createContext, useMemo } from "react";
import { Socket } from "socket.io-client";


export const WebSocketContext = createContext<Socket>({} as Socket);

export const WebSocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const socket = useMemo(() => getSocket(), []);

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};
