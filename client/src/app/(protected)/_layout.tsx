import LogoutSample from "@/components/Signout";
import { useAuthStore } from "@/store/authStore";
import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function ProtectedLayout() {
  const role = useAuthStore((state) => state.role);

  const isPatient = role === "patient";
  return (
    <View style={styles.container}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Protected guard={isPatient}>
          <Stack.Screen name="(patient)" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={!isPatient}>
          <Stack.Screen name="(doctor)" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
});
