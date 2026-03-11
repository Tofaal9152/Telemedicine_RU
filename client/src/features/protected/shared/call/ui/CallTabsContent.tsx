import React, { useCallback, useEffect } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSocket } from "@/hooks/useSocket";
import { useAuthStore } from "@/store/authStore";


const CallTabsContent = ({ doctorId, patientId }: {
    doctorId: string;
    patientId: string;

}) => {
  const router = useRouter();
  const socket = useSocket();
  const role = useAuthStore((state) => state.role);
  const userId = useAuthStore((state) => state.role);
  const token = useAuthStore((state) => state.token);

  const room = `room-call-${doctorId}-${patientId}`;

  const handleJoinRoom = useCallback(() => {
    if (!socket || !patientId|| !doctorId) {
      console.log("Invalid data for joining call room.");
      Alert.alert("Error", "Invalid data for joining call room.");
      return;
    }

    socket.emit("join-room", {
      room,
      name: userId ?? "Anonymous",
      role: role ?? "guest",
      email: token ?? "unknown@example.com",
    });
  }, [ socket, room, patientId, doctorId, userId, role, token]);

  const handleJoinedRoom = useCallback(
    (payload: { message: string }) => {
      console.log(payload?.message);
      router.push(`/appointment/paid/call/${room}`);
    },
    [router, room],
  );

  useEffect(() => {
    if (!socket) return;

    socket.on("joined-room", handleJoinedRoom);

    return () => {
      socket.off("joined-room", handleJoinedRoom);
    };
  }, [socket, handleJoinedRoom]);

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={handleJoinRoom}>
        <Ionicons name="videocam" size={20} color="#FFFFFF" />
        <Text style={styles.buttonText}>Join Video Call</Text>
      </Pressable>
    </View>
  );
};

export default CallTabsContent;

const styles = StyleSheet.create({
  container: {
    height: "80%",
    margin: 16,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 3,
    borderStyle: "dashed",
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#DC2626",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
