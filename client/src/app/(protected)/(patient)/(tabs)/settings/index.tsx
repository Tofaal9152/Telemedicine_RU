import SettingScreen from "@/features/protected/patient/tabs/settings/ui/SettingScreen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsIndex() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SettingScreen />
    </SafeAreaView>
  );
}
