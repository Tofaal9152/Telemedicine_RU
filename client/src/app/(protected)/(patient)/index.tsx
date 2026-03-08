import LogoutSample from "@/components/Signout";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function PatientLayout() {
  return (
    <ThemedView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <ThemedText>Patient Dashboard</ThemedText>
      <LogoutSample />
    </ThemedView>
  );
}
