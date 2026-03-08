import LogoutSample from "@/components/Signout";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function DoctorLayout() {
  return (
    <ThemedView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <ThemedText>Doctor Dashboard</ThemedText>
      <LogoutSample />
    </ThemedView>
  );
}
