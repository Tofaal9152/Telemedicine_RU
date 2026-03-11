import { AsyncStateWrapper } from "@/components/AsyncStateWrapper";
import { StyleSheet, View } from "react-native";
import { useChatMessages } from "../hooks/useChatMessages";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

const Chat = ({ data }: { data: any }) => {
  const { doctorId, patientId } = data;

  const room = `room-${doctorId}-${patientId}`;

  const { messages, message, setMessage, handleSendMessage, PrevChat } =
    useChatMessages(room, doctorId, patientId);

  return (
    <AsyncStateWrapper
      isLoading={PrevChat.isLoading}
      isError={PrevChat.isError}
      error={PrevChat.error}
    >
      <KeyboardAwareScrollView
        bottomOffset={62}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <MessageList messages={messages} />

          <MessageInput
            value={message}
            onChange={setMessage}
            handleSendMessage={handleSendMessage}
          />
        </View>
      </KeyboardAwareScrollView>
    </AsyncStateWrapper>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    backgroundColor: "#FFF",
    overflow: "hidden",
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#233B4D",
  },
  subtitle: {
    marginTop: 4,
    fontSize: 12,
    color: "#7B8A97",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
