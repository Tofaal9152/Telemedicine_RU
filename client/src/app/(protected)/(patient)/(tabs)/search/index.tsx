import SearchScreen from "@/features/protected/patient/tabs/search/ui/SearchScreen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchIndex() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SearchScreen />
    </SafeAreaView>
  );
}
