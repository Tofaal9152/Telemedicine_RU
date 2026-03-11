import React from "react";
import { View, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import CallRoom from "@/features/protected/shared/call/ui/room/CallRoom";

const RoomPage = () => {
  const { room } = useLocalSearchParams<{ room: string }>();

  return (
    <View style={styles.container}>
      <CallRoom room={room || ""} />
    </View>
  );
};

export default RoomPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
