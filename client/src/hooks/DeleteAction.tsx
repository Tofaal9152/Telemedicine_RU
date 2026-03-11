import React from "react";
import { Alert } from "react-native";

import { SubmitButton } from "@/components/shared/form-related/SubmitButton";
import { useMutationHandler } from "@/hooks/useMutationHandler";
import { request } from "@/lib/request";

interface DeleteButtonProps {
  endPoint: string;
  queryKeys?: any[][];
  confirmMessage?: string;
  confirmDescription?: string;
  successMessage?: {
    title: string;
    description: string;
  };
  errorMessage?: {
    title: string;
    description: string;
  };
}

const DeleteAction = ({
  endPoint,
  queryKeys = [],
  successMessage = {
    title: "Deleted successfully!",
    description: "The item has been deleted.",
  },
  errorMessage,
  confirmMessage = "Are you absolutely sure?",
  confirmDescription = "This action cannot be undone.",
}: DeleteButtonProps) => {
  const { mutate, isPending } = useMutationHandler({
    mutationFn: () => request.delete(endPoint),
    invalidateKeys: queryKeys,
    successMessage,
    errorMessage,
  });

  const handleDelete = () => {
    Alert.alert(confirmMessage, confirmDescription, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => mutate({}),
      },
    ]);
  };

  return (
    <SubmitButton
      variant="destructive"
      disabled={isPending}
      onPress={handleDelete}
      isLoading={isPending}
      loadingText="Deleting..."
    >
        
      Delete
    </SubmitButton>
  );
};

export default DeleteAction;
