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
        options={{
          headerShown: true,
          title: "Appointment Payment",
          headerStyle: { backgroundColor: "#233B4D" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "600" },
        }}
      />
      <Stack.Screen
        name="appointment/paid/[id]/index"
        options={{
          headerShown: true,
          title: "Consultation",
          headerStyle: { backgroundColor: "#233B4D" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "600" },
        }}
      />
    </Stack>
  );
}
