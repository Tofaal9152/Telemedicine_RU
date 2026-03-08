import { View, Text, StyleSheet } from "react-native";
import { getErrorMessage } from "@/utils/getErrorMessage";

type Props = {
  isError: boolean;
  error: unknown;
  isSuccess: boolean;
  successTitle?: string;
  successMessage?: string;
  errorTitle?: string;
};

export function FormStatusAlert({
  isError,
  error,
  isSuccess,
  successTitle = "Success!",
  successMessage = "Saved successfully.",
  errorTitle = "Submission failed",
}: Props) {
  if (isError) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Text style={[styles.title, styles.errorText]}>
          {errorTitle}
        </Text>

        <Text style={[styles.message, styles.errorText]}>
          {getErrorMessage(error)}
        </Text>
      </View>
    );
  }

  if (isSuccess) {
    return (
      <View style={[styles.container, styles.successContainer]}>
        <Text style={[styles.title, styles.successText]}>
          {successTitle}
        </Text>

        <Text style={[styles.message, styles.successText]}>
          {successMessage}
        </Text>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 16,
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  errorContainer: {
    borderColor: "#FCA5A5",
    backgroundColor: "#FEF2F2",
  },
  successContainer: {
    borderColor: "#86EFAC",
    backgroundColor: "#F0FDF4",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  message: {
    marginTop: 4,
    fontSize: 14,
  },
  errorText: {
    color: "#B91C1C",
  },
  successText: {
    color: "#15803D",
  },
});