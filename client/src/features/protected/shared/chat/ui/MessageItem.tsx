import { View, Text, StyleSheet } from "react-native";

const MessageItem = ({
  msg,
  isOutgoing,
}: {
  msg: any;
  isOutgoing: boolean;
}) => {
  return (
    <View
      style={[
        styles.row,
        { justifyContent: isOutgoing ? "flex-end" : "flex-start" },
      ]}
    >
      <View
        style={[styles.bubble, isOutgoing ? styles.outgoing : styles.incoming]}
      >
        <Text
          style={
            isOutgoing ? styles.messageOutgoingText : styles.messageIncomingText
          }
        >
          {msg.content}
        </Text>
        <Text
          style={[styles.time, { textAlign: isOutgoing ? "right" : "left" }]}
        >
          {convertTimestamp(msg.timestamp)}
        </Text>
      </View>
    </View>
  );
};

export default MessageItem;

const styles = StyleSheet.create({
  row: {
    width: "100%",
    flexDirection: "row",
  },
  bubble: {
    maxWidth: "80%",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  outgoing: {
    backgroundColor: "#233B4D",
    color: "#F1F5F9",
  },
  incoming: {
    backgroundColor: "#F1F5F9",
  },
  messageOutgoingText: {
    color: "#F1F5F9",
  },
  messageIncomingText: {
    color: "#111827",
  },
  time: {
    marginTop: 4,
    fontSize: 10,
    color: "#6B7280",
  },
});
export const convertTimestamp = (timestamp: string) => {
  return (
    new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }) || "just now"
  );
};
