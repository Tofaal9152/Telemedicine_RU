// import { AsyncStateWrapper } from "@/components/AsyncStateWrapper";
// import { useFetchData } from "@/hooks/useFetchData";
// import { FlashList } from "@shopify/flash-list";
// import React from "react";
// import { Text, View } from "react-native";

// type Post = { id: number; title: string; body: string };

// export default function PostsScreen() {
//   const q = useFetchData<Post[]>({
//     url: "/posts",
//     querykey: ["posts"],
//   });

//   return (
//     <AsyncStateWrapper
//       isLoading={q.isLoading}
//       isError={q.isError}
//       error={q.error}
//       loadingText="Posts loading..."
//       errorText="Failed to load posts"
//       onRetry={() => q.refetch()} // ✅ refetch button works
//     >
//       <View style={{ flex: 1 }}>
//         <FlashList
//           data={q.data ?? []}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={({ item, index }) => (
//             <View
//               style={{ padding: 16, borderBottomWidth: 1, borderColor: "#eee" }}
//             >
//               <Text style={{ fontWeight: "700", marginBottom: 6 }}>
//                 {index + 1}. {item.title}
//               </Text>
//               <Text>{item.body}</Text>
//             </View>
//           )}
//         />
//       </View>
//     </AsyncStateWrapper>
//   );
// }
