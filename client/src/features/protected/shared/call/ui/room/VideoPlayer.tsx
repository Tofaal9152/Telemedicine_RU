import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MediaStream, RTCView } from "react-native-webrtc";

interface VideoPlayerProps {
  stream: MediaStream | null;
  isRemote: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ stream, isRemote }) => {
  const streamURL = stream ? stream.toURL() : null;

  if (!streamURL && isRemote) {
    return (
      <View style={[styles.videoContainer, styles.remoteVideo]}>
        <View style={styles.waitingContainer}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.waitingText}>Waiting for user to join...</Text>
        </View>
      </View>
    );
  }

  if (!streamURL) return null;

  return (
    <View
      style={[
        styles.videoContainer,
        isRemote ? styles.remoteVideo : styles.localVideo,
      ]}
    >
      <RTCView
        streamURL={streamURL}
        style={styles.video}
        objectFit="cover"
        mirror={!isRemote}
      />
    </View>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  videoContainer: {
    position: "absolute",
    overflow: "hidden",
    backgroundColor: "#111",
  },
  remoteVideo: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  localVideo: {
    top: 20,
    right: 16,
    width: 130,
    height: 190,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    zIndex: 5,
  },
  video: {
    width: "100%",
    height: "100%",
  },
  waitingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  waitingText: {
    color: "#d1d5db",
    marginTop: 12,
    fontSize: 16,
  },
});
