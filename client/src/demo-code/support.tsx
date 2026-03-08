// import { useFetchData } from "@/hooks/useFetchData";
// import { useMutationHandler } from "@/hooks/useMutationHandler";
// import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// import React, { useEffect, useRef, useState } from "react";
// import {
//   InteractionManager,
//   KeyboardAvoidingView,
//   Platform,
//   StyleSheet,
//   View,
// } from "react-native";
// import LoaderWrapper from "~/src/components/LoaderWrapper";
// import SupportMessageItem from "~/src/components/screens/tabs/account/support/SupportMessageItem";
// import { BackgroungImage } from "~/src/components/screens/tabs/chat/ChatThreadComponents";
// import { Button } from "~/src/components/ui/button";
// import { Input } from "~/src/components/ui/input";
// =

// import { FlashList, FlashList as FlashListType } from "~/src/lib/Flashlist";
// import { poster } from "~/src/lib/request";

// type Message = {
//   id: number | string;
// };

// const Support = () => {
//   const [inputText, setInputText] = useState("");
//   const listRef = useRef<FlashListType<Message>>(null);

//   const mutation = useMutationHandler({
//     mutationFn: (data: { message: string }) =>
//       poster("student/support-chat/", data),
//     invalidateKeys: [["posts"], ["support-chat-lists"]], // ✅ multiple queries invalidate
//     successMessage: {
//       title: "Message sent!",
//       description: "Your message has been sent to support.",
//     },
//     errorMessage: {
//       title: "Failed to send message",
//       description: "Please try again later.",
//     },
//   });

//   const handleSend = () => {
//     const text = inputText.trim();
//     if (!text) return;
//     mutation.mutate({ message: text });
//     setInputText("");
//   };

//   const { data, isLoading, isError, error } = useFetchData<{
//     results: Message[];
//   }>({
//     url: "student/support-chat/",
//     querykey: ["support-chat-lists"],
    
//   });

//   const messages = data?.results ?? [];

//   useEffect(() => {
//     if (!messages.length) return;

//     const run = () => {
//       requestAnimationFrame(() => {
//         listRef.current?.scrollToEnd({ animated: false });
//       });
//     };

//     const task = InteractionManager.runAfterInteractions(run);
//     return () => task.cancel();
//   }, [messages.length]);

//   return (
//     <View style={styles.container}>
//       <BackgroungImage />
//       <LoaderWrapper isLoading={isLoading} isError={isError} error={error}>
//         <KeyboardAvoidingView
//           style={styles.kav}
//           behavior={Platform.OS === "ios" ? "padding" : undefined}
//           keyboardVerticalOffset={90}
//         >
//           <FlashList
//             ref={listRef}
//             data={messages}
//             keyExtractor={(item) => String(item.id)}
//             renderItem={({ item }) => <SupportMessageItem item={item} />}
//             contentContainerStyle={styles.listContent}
//             showsVerticalScrollIndicator={false}
//             estimatedItemSize={80}
//             keyboardShouldPersistTaps="handled"
//           />

//           <View style={styles.inputRow}>
//             <Input
//               value={inputText}
//               onChangeText={setInputText}
//               placeholder="Type a message..."
//               onSubmitEditing={handleSend}
//               returnKeyType="send"
//               style={styles.input}
//               placeholderTextColor="#6B7280"
//               editable={!mutation.isPending}
//             />
//             <Button
//               onPress={handleSend}
//               disabled={!inputText.trim() || mutation.isPending}
//               size="icon"
//               style={styles.sendButton}
//             >
//               <MaterialCommunityIcons name="send" size={20} color="white" />
//             </Button>
//           </View>
//         </KeyboardAvoidingView>
//       </LoaderWrapper>
//     </View>
//   );
// };

// export default Support;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     position: "relative",
//     backgroundColor: "#FFFFFF",
//   },
//   kav: {
//     flex: 1,
//   },
//   listContent: {
//     padding: 16,
//     paddingBottom: 24,
//   },
//   inputRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 12,
//   },
//   input: {
//     flex: 1,
//     backgroundColor: "#F3F4F6", // gray-100
//     borderRadius: 9999,
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//     fontSize: 16,
//     color: "#111827",
//   },
//   sendButton: {
//     marginLeft: 8,
//     backgroundColor: "#4f3d80",
//     borderRadius: 9999,
//   },
// });
