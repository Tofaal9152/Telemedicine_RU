import { AsyncStateWrapper } from "@/components/AsyncStateWrapper";
import { useGetAppointmentById } from "@/features/protected/doctor/appointment/services/appointmentById";
import ChatContent from "@/features/protected/shared/chat/ui/ChatContent";
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
      <ChatContent data={appointmentQuery?.data} />
    </AsyncStateWrapper>
  );
};

export default ChatTabs;
