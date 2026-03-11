import { AsyncStateWrapper } from "@/components/AsyncStateWrapper";
import { onboardingScreenImagePath } from "@/constants/imagePath";
import { useAuthStore } from "@/store/authStore";
import { AppColors } from "@/theme/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import React, { useCallback, useMemo } from "react";
import { Image, StyleSheet } from "react-native";
import {
  Bubble,
  GiftedChat,
  IMessage,
  InputToolbar,
  Send,
} from "react-native-gifted-chat";
import { useChatMessages } from "../hooks/useChatMessages";

const ChatContent = ({ data }: { data: any }) => {
  const { doctorId, patientId } = data || {};
  const userId = useAuthStore((state) => state.userId);

  const room = doctorId && patientId ? `room-${doctorId}-${patientId}` : "";

  const { messages, handleSendMessage, PrevChat } = useChatMessages(
    room,
    doctorId,
    patientId,
  );

  const giftedMessages: IMessage[] = useMemo(() => {
    return [...messages]
      .map((item: any): IMessage => {
        const createdAt = item.timestamp
          ? new Date(item.timestamp)
          : new Date();

        return {
          _id:
            item.id ||
            item._id ||
            `${item.userId}-${item.timestamp}-${item.content}`,
          text: item.content ?? "",
          createdAt,
          user: {
            _id: item.userId,
            name: item.userId === userId ? "You" : "Other",
          },
        };
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  }, [messages, userId]);

  const onSend = useCallback(
    (newMessages: IMessage[] = []) => {
      const text = newMessages[0]?.text;
      if (!text) return;
      handleSendMessage(text);
    },
    [handleSendMessage],
  );
  const headerHeight = useHeaderHeight();
  return (
    <AsyncStateWrapper
      isLoading={PrevChat.isLoading}
      isError={PrevChat.isError}
      error={PrevChat.error}
    >
      <Image
        source={onboardingScreenImagePath.OnboardingImage}
        style={styles.bgImage}
      />
      <GiftedChat
        keyboardAvoidingViewProps={{
          keyboardVerticalOffset: headerHeight + 62,
        }}
        // keyboardProviderProps={{ enableResetScrollToCoords: false }}
        messages={giftedMessages}
        onSend={onSend}
        user={{ _id: userId as string }}
        renderBubble={renderBubble}
        renderSend={renderSend}
        isDayAnimationEnabled={false}
        isSendButtonAlwaysVisible
        textInputProps={textInputProps}
        isScrollToBottomEnabled
        scrollToBottomOffset={50}
        renderAvatar={null}
        renderInputToolbar={renderInputToolbar}
      />
    </AsyncStateWrapper>
  );
};

export default ChatContent;

const renderBubble = (props: any) => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: styles.rightBubble,
        left: styles.leftBubble,
      }}
      textStyle={{
        right: styles.rightText,
        left: styles.leftText,
      }}
    />
  );
};
const renderSend = (props: any) => {
  return (
    <Send
      {...props}
      containerStyle={styles.sendContainer}
      disabled={!props.text || !props.text.trim()}
    >
      <MaterialIcons name="send" size={24} color={AppColors.card} />
    </Send>
  );
};
const renderInputToolbar = (props: any) => {
  return (
    <InputToolbar
      {...props}
      containerStyle={styles.inputToolbar}
      primaryStyle={styles.inputToolbarPrimary}
    />
  );
};
const textInputProps = {
  placeholder: "Type a message...",
  placeholderTextColor: "#999",
  marginRight: 16,
};
const styles = StyleSheet.create({
  // bgimage
  wrapper: {
    flex: 1,
    backgroundColor: "#ECE5DD",
  },

  bgImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.1,
  },
  // bouble
  rightBubble: {
    backgroundColor: AppColors.primary,
  },
  leftBubble: {
    backgroundColor: "#FFFFFF",
  },
  rightText: {
    color: "#FFFFFF",
  },
  leftText: {
    color: "#000000",
  },
  // send
  sendContainer: {
    borderRadius: 24,
    backgroundColor: AppColors.primary,
    width: 40,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  // input toolbar
  inputToolbar: {
    marginHorizontal: 10,
    marginBottom: 10,
    borderTopWidth: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingHorizontal: 6,
    minHeight: 40,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    paddingVertical: 6,
  },

  inputToolbarPrimary: {
    alignItems: "center",
  },
});
