import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  MediaStream,
  RTCPeerConnection,
  RTCSessionDescriptionType,
  RTCTrackEvent,
} from "react-native-webrtc";

interface PeerContextType {
  peer: RTCPeerConnection | null;
  createOffer: () => Promise<RTCSessionDescriptionInit>;
  CreateAnswer: (
    offer: RTCSessionDescriptionType
  ) => Promise<RTCSessionDescriptionInit>;
  setRemoteDescription: (answer: RTCSessionDescriptionType) => Promise<void>;
  remoteStream: MediaStream | null;
  sendStream: (stream: MediaStream) => void;
  handleEndCallResetAll: () => void;
}

const peerContext = createContext<PeerContextType | null>(null);

export const usePeerStore = () => {
  const context = useContext(peerContext);
  if (!context) {
    throw new Error("usePeerStore must be used within a PeerProvider");
  }
  return context;
};

export const PeerProvider = ({ children }: { children: React.ReactNode }) => {
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [peer, setPeer] = useState<RTCPeerConnection | null>(null);

  useEffect(() => {
    const pc = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:global.stun.twilio.com:3478",
          ],
        },
      ],
    });

    setPeer(pc);

    return () => {
      pc.close();
    };
  }, []);

  const createOffer = useCallback(async () => {
    if (!peer) throw new Error("Peer connection not ready yet");

    try {
      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);
      return offer;
    } catch (error) {
      console.log("Error creating offer:", error);
      throw error;
    }
  }, [peer]);

  const CreateAnswer = useCallback(
    async (offer: RTCSessionDescriptionType) => {
      if (!peer) throw new Error("Peer connection not ready yet");

      try {
        await peer.setRemoteDescription(offer);
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);
        return answer;
      } catch (error) {
        console.log("Error answering call:", error);
        throw error;
      }
    },
    [peer]
  );

  const setRemoteDescription = useCallback(
    async (answer: RTCSessionDescriptionType) => {
      if (!peer) throw new Error("Peer connection not ready yet");

      const currentState = peer.signalingState;

      if (
        currentState !== "have-local-offer" &&
        currentState !== "have-remote-offer"
      ) {
        console.log("Skipped setRemoteDescription, state:", currentState);
        return;
      }

      try {
        await peer.setRemoteDescription(answer);
      } catch (error) {
        console.log("Error setting remote description:", error);
        throw error;
      }
    },
    [peer]
  );

  const sendStream = useCallback(
    (stream: MediaStream) => {
      if (!peer) return;

      try {
        const senders = peer.getSenders();

        stream.getTracks().forEach((track) => {
          const alreadyAdded = senders.some(
            (sender) => sender.track?.id === track.id
          );

          if (!alreadyAdded) {
            peer.addTrack(track, stream);
          }
        });
      } catch (error) {
        console.log("Error sending stream:", error);
      }
    },
    [peer]
  );

  const handleTrackEvent = useCallback((event: RTCTrackEvent) => {
    const [firstStream] = event.streams;
    if (firstStream) {
      setRemoteStream(firstStream);
    }
  }, []);

  useEffect(() => {
    if (!peer) return;

    peer.addEventListener("track", handleTrackEvent);

    return () => {
      peer.removeEventListener("track", handleTrackEvent);
    };
  }, [peer, handleTrackEvent]);

  const handleEndCallResetAll = useCallback(() => {
    if (peer) {
      peer.getSenders().forEach((sender) => {
        try {
          sender.replaceTrack(null);
        } catch (error) {
          console.log("replaceTrack cleanup error:", error);
        }
      });

      peer.close();
    }

    if (remoteStream) {
      remoteStream.getTracks().forEach((track) => track.stop());
    }

    setRemoteStream(null);
    setPeer(null);
  }, [peer, remoteStream]);

  const contextValue = useMemo(
    () => ({
      peer,
      createOffer,
      CreateAnswer,
      setRemoteDescription,
      sendStream,
      remoteStream,
      handleEndCallResetAll,
    }),
    [
      peer,
      createOffer,
      CreateAnswer,
      setRemoteDescription,
      sendStream,
      remoteStream,
      handleEndCallResetAll,
    ]
  );

  return (
    <peerContext.Provider value={contextValue}>
      {children}
    </peerContext.Provider>
  );
};
