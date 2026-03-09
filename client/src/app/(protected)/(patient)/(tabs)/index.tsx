import HomeScreen from "@/features/protected/patient/tabs/home/ui/HomeScreen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PatientHomeLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HomeScreen />
    </SafeAreaView>
  );
}
