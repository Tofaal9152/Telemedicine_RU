import { useCallback, useEffect, useState } from "react";
import { useFetchData } from "@/hooks/useFetchData";
import { useSocket } from "./useSocket";
import { useAuthStore } from "@/store/authStore";

export const useChatMessages = (
  room: string,
  doctorId: string,
  patientId: string,
) => {
  const userId = useAuthStore((state) => state.userId);
  const socket = useSocket();

  const [messages, setMessages] = useState<any[]>([]);

  const PrevChat = useFetchData<any>({
    url: `/chats?doctorId=${doctorId}&patientId=${patientId}`,
    querykey: ["chat", doctorId, patientId],
    options: {
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchOnMount: true,
      staleTime: 0,
      enabled: !!(doctorId && patientId),
    },
  });

  useEffect(() => {
    if (PrevChat.data) {
      setMessages(PrevChat.data);
    }
  }, [PrevChat.data]);

  useEffect(() => {
    if (!room) return;

    socket.emit("joinRoom", { room });

    return () => {
      socket.emit("leaveRoom", { room });
    };
  }, [socket, room]);

  useEffect(() => {
    const handleIncoming = (msg: any) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("onMessage", handleIncoming);

    return () => {
      socket.off("onMessage", handleIncoming);
    };
  }, [socket]);

  const handleSendMessage = useCallback(
    (text: string) => {
      if (!text.trim()) return;

      const payload = {
        content: text.trim(),
        doctorId,
        patientId,
        userId,
      };

      socket.emit("createMessage", payload);
    },
    [doctorId, patientId, userId, socket]
  );

  return {
    messages,
    handleSendMessage,
    PrevChat,
  };
};