import React from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CallControlsProps {
  isMicOn: boolean;
  isCamOn: boolean;
  toggleAudio: () => void;
  toggleVideo: () => void;
  endCall: () => void;
}

const CallControls: React.FC<CallControlsProps> = ({
  isMicOn,
  isCamOn,
  toggleAudio,
  toggleVideo,
  endCall,
}) => {
  const handleEndCall = () => {
    Alert.alert(
      "End Call",
      "Ending the call will disconnect both sides. Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "End Call", style: "destructive", onPress: endCall },
      ]
    );
  };

  return (
    <View style={styles.wrapper}>
      <Pressable style={styles.controlBtn} onPress={toggleAudio}>
        <Ionicons
          name={isMicOn ? "mic" : "mic-off"}
          size={22}
          color={isMicOn ? "#fff" : "#ff4d4f"}
        />
      </Pressable>

      <Pressable style={styles.controlBtn} onPress={toggleVideo}>
        <Ionicons
          name={isCamOn ? "videocam" : "videocam-off"}
          size={22}
          color={isCamOn ? "#fff" : "#ff4d4f"}
        />
      </Pressable>

      <Pressable style={[styles.controlBtn, styles.endBtn]} onPress={handleEndCall}>
        <Ionicons name="call" size={22} color="#fff" style={styles.endIcon} />
      </Pressable>
    </View>
  );
};

export default CallControls;

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 26,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    backgroundColor: "rgba(0,0,0,0.45)",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 999,
  },
  controlBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "rgba(255,255,255,0.14)",
    alignItems: "center",
    justifyContent: "center",
  },
  endBtn: {
    backgroundColor: "#ef4444",
  },
  endIcon: {
    transform: [{ rotate: "135deg" }],
  },
});
