import AppointmentScreen from "@/features/protected/doctor/tabs/appointments/ui/AppointmentScreen";
import { SafeAreaView } from "react-native-safe-area-context";
export default function AppointmentsIndex() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
      edges={["top"]}
    >
      <AppointmentScreen />
    </SafeAreaView>
  );
}
