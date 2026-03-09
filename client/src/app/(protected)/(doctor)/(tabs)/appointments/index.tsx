import AppointmentScreen from "@/features/protected/doctor/appointments/ui/AppointmentScreen";
import { SafeAreaView } from "react-native-safe-area-context";
export default function AppointmentsIndex() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppointmentScreen />
    </SafeAreaView>
  );
}
