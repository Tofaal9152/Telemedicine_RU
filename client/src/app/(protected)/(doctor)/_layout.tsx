import { Stack } from "expo-router";

export default function DoctorLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="appointment/paid/[id]/index"
        options={{ headerShown: true, title: "Consultation" }}
      />
    </Stack>
  );
}
