import HomeScreen from "@/features/protected/doctor/home/ui/HomeScreen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DoctorLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HomeScreen />
    </SafeAreaView>
  );
}
