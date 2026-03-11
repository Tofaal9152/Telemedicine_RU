import { AsyncStateWrapper } from "@/components/AsyncStateWrapper";
import { useGetAppointmentById } from "@/features/protected/doctor/appointment/services/appointmentById";
import Chat from "@/features/protected/shared/chat/ui/Chat";
import { useLocalSearchParams } from "expo-router";
import React from "react";

const ChatTabs = () => {
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
      <Chat data={appointmentQuery?.data} />
    </AsyncStateWrapper>
  );
};

export default ChatTabs;
