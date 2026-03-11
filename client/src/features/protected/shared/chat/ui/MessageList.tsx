import { onboardingScreenImagePath } from "@/constants/imagePath";
import { useAuthStore } from "@/store/authStore";
import { Image, ScrollView, View } from "react-native";
import MessageItem from "./MessageItem";

const MessageList = ({ messages }: { messages: any[] }) => {
  const userId = useAuthStore((state) => state.userId);

  return (
    <View style={{ flex: 1, backgroundColor: "#ECE5DD" }}>
      <Image
        source={onboardingScreenImagePath.OnboardingImage}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: 0.1,
        }}
      />
      <ScrollView contentContainerStyle={{ padding: 12, gap: 12 }}>
        {messages.map((item, index) => (
          <MessageItem
            key={item.id?.toString() || index.toString()}
            msg={item}
            isOutgoing={item.userId === userId}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default MessageList;
