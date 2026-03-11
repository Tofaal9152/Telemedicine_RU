import { AsyncStateWrapper } from "@/components/AsyncStateWrapper";
import { useGetAppointmentById } from "@/features/protected/doctor/appointment/services/appointmentById";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import CallTabsContent from "./CallTabsContent";

const CallTabs = () => {
  const { id: appointmentId } = useLocalSearchParams<{ id?: string }>();
  const appointmentQuery = useGetAppointmentById({
    appointmentId: appointmentId ?? "",
  });
  return (
    <AsyncStateWrapper
      isLoading={appointmentQuery.isLoading}
      isError={appointmentQuery.isError}
      error={appointmentQuery.error}
    >
      <CallTabsContent
        doctorId={appointmentQuery.data?.doctorId}
        patientId={appointmentQuery.data?.patientId}
      />
    </AsyncStateWrapper>
  );
};

export default CallTabs;
