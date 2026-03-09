import { Stack } from "expo-router";

export default function PatientLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen
        name="appointment/payment/index"
        options={{ headerShown: true, title: "Appointment Payment" }}
      />
      <Stack.Screen
        name="appointment/paid/[id]/index"
        options={{ headerShown: true, title: "Consultation" }}
      />
    </Stack>
  );
}
