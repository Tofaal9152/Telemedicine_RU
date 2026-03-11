import SettingScreen from "@/features/protected/doctor/tabs/settings/ui/SettingScreen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsIndex() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SettingScreen />
    </SafeAreaView>
  );
}
