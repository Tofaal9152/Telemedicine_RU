import PaymentRecordsScreen from "@/features/protected/doctor/invoices/ui/PaymentRecordsScreen";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
const PaymentRecordsIndex = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PaymentRecordsScreen />
    </SafeAreaView>
  );
};

export default PaymentRecordsIndex;
