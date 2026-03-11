import PaymentRecordsScreen from "@/features/protected/doctor/tabs/invoices/ui/PaymentRecordsScreen";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
const PaymentRecordsIndex = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
      edges={["top"]}
    >
      <PaymentRecordsScreen />
    </SafeAreaView>
  );
};

export default PaymentRecordsIndex;
