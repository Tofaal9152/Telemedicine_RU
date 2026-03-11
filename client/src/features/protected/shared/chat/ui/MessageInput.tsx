import { View, TextInput, Pressable, Text, StyleSheet } from "react-native";

const MessageInput = ({
  value,
  onChange,
  handleSendMessage,
}: {
  value: string;
  onChange: (val: string) => void;
  handleSendMessage: () => void;
}) => {
  return (
    <View style={styles.wrapper}>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="Type your message..."
        style={styles.input}
        multiline={false}
        onSubmitEditing={handleSendMessage}
        returnKeyType="send"
      />

      <Pressable style={styles.button} onPress={handleSendMessage}>
        <Text style={styles.buttonText}>➤</Text>
      </Pressable>
    </View>
  );
};

export default MessageInput;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    gap: 8,
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    backgroundColor: "#FFF",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "#F9FAFB",
  },
  button: {
    backgroundColor: "#233B4D",
    borderRadius: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "600",
  },
});
