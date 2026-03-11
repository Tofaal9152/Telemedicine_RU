import React, { useCallback, useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import {
  mediaDevices,
  MediaStream,
  RTCSessionDescriptionType,
} from "react-native-webrtc";
import { useRouter } from "expo-router";
import { useSocket } from "../../../chat/hooks/useSocket";

import VideoPlayer from "./VideoPlayer";
import CallControls from "./CallControls";
import { usePeerStore } from "@/context/Peer";

const CallRoom = ({ room }: { room: string }) => {
  const socket = useSocket();
  const router = useRouter();

  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const [remoteEmail, setRemoteEmail] = useState<string | null>(null);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);

  const {
    createOffer,
    CreateAnswer,
    setRemoteDescription,
    sendStream,
    remoteStream,
    peer,
    handleEndCallResetAll,
  } = usePeerStore();

  const handleUserJoined = useCallback(
    async (data: { recipientEmail: string }) => {
      try {
        const offer = await createOffer();

        setTimeout(() => {
          socket?.emit("call-user", {
            offer,
            recipientEmail: data.recipientEmail,
          });
        }, 1000);

        setRemoteEmail(data.recipientEmail);
      } catch (error) {
        console.log("handleUserJoined error:", error);
      }
    },
    [createOffer, socket],
  );

  const handleIncomingCall = useCallback(
    async (data: { senderEmail: string; offer: RTCSessionDescriptionType }) => {
      try {
        const { senderEmail, offer } = data;
        const answer = await CreateAnswer(offer);

        socket?.emit("call-accepted", {
          answer,
          senderEmail,
        });

        setRemoteEmail(senderEmail);
      } catch (error) {
        console.log("handleIncomingCall error:", error);
      }
    },
    [CreateAnswer, socket],
  );

  const handleCallAccepted = useCallback(
    async (data: { answer: RTCSessionDescriptionType }) => {
      try {
        await setRemoteDescription(data.answer);
      } catch (error) {
        console.log("handleCallAccepted error:", error);
      }
    },
    [setRemoteDescription],
  );

  const getUserMediaStream = useCallback(async () => {
    try {
      const stream = await mediaDevices.getUserMedia({
        audio: true,
        video: {
          facingMode: "user",
          frameRate: 30,
        },
      });

      setMyStream(stream);
    } catch (error) {
      console.log("Error accessing media devices:", error);
      Alert.alert(
        "Permission required",
        "Camera and microphone permission না দিলে call কাজ করবে না।",
      );
    }
  }, []);

  const handleEndCall = useCallback(
    (data: { message: string }) => {
      if (myStream) {
        myStream.getTracks().forEach((track) => track.stop());
      }

      handleEndCallResetAll();
      setRemoteEmail(null);
      setMyStream(null);

      Alert.alert("Call ended", data.message || "Call has been ended.");
      router.replace("/");
    },
    [handleEndCallResetAll, myStream, router],
  );

  useEffect(() => {
    if (!socket) return;

    socket.on("user-joined", handleUserJoined);
    socket.on("incoming-call", handleIncomingCall);
    socket.on("call-accepted", handleCallAccepted);
    socket.on("end-call", handleEndCall);

    return () => {
      socket.off("user-joined", handleUserJoined);
      socket.off("incoming-call", handleIncomingCall);
      socket.off("call-accepted", handleCallAccepted);
      socket.off("end-call", handleEndCall);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncomingCall,
    handleCallAccepted,
    handleEndCall,
  ]);

  useEffect(() => {
    getUserMediaStream();
  }, [getUserMediaStream]);

  const handleNegotiationNeeded = useCallback(async () => {
    try {
      if (!peer || !remoteEmail) return;

      const localOffer = await peer.createOffer();
      await peer.setLocalDescription(localOffer);

      socket?.emit("call-user", {
        offer: localOffer,
        recipientEmail: remoteEmail,
      });
    } catch (error) {
      console.log("Negotiation error:", error);
    }
  }, [peer, remoteEmail, socket]);

  useEffect(() => {
    if (!peer) return;

    peer.addEventListener("negotiationneeded", handleNegotiationNeeded);

    return () => {
      peer.removeEventListener("negotiationneeded", handleNegotiationNeeded);
    };
  }, [peer, handleNegotiationNeeded]);

  useEffect(() => {
    if (myStream) {
      sendStream(myStream);
    }
  }, [myStream, sendStream]);

  const toggleAudio = () => {
    if (!myStream) return;

    myStream.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
      setIsMicOn(track.enabled);
    });
  };

  const toggleVideo = () => {
    if (!myStream) return;

    myStream.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
      setIsCamOn(track.enabled);
    });
  };

  const endCall = () => {
    socket?.emit("end-call", { room });
  };

  useEffect(() => {
    return () => {
      if (myStream) {
        myStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [myStream]);

  return (
    <View style={styles.container}>
      <VideoPlayer stream={remoteStream} isRemote />
      {myStream && <VideoPlayer stream={myStream} isRemote={false} />}

      <CallControls
        isMicOn={isMicOn}
        isCamOn={isCamOn}
        toggleAudio={toggleAudio}
        toggleVideo={toggleVideo}
        endCall={endCall}
      />
    </View>
  );
};

export default CallRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    overflow: "hidden",
    position: "relative",
  },
});
