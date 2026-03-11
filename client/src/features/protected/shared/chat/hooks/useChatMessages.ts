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
  const [message, setMessage] = useState("");
  // always show latest messages when open chat screen, so refetchOnMount: true, staleTime: 0
  const PrevChat = useFetchData<any>({
    url: `/chats?doctorId=${doctorId}&patientId=${patientId}`,
    querykey: ["chat", doctorId, patientId],
    options: {
      refetchOnWindowFocus: true,
      refetchOnReconnect: true, // ✅ net back হলে auto refetch off
      refetchOnMount: true, // ✅ screen mount হলে auto refetch off
      staleTime: 0,
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

  const handleSendMessage = useCallback(() => {
    if (!message.trim()) return;

    const payload = {
      content: message.trim(),
      doctorId: doctorId,
      patientId: patientId,
      userId: userId,
    };
    console.log(payload);

    socket.emit("createMessage", payload);
    setMessage("");
  }, [message, doctorId, patientId, userId, socket]);

  return {
    messages,
    message,
    setMessage,
    handleSendMessage,
    PrevChat,
  };
};
