import React from "react";
import { View, Text, ActivityIndicator, Alert, Pressable } from "react-native";

type Props = {
  isLoading: boolean;
  isError: boolean;
  error?: unknown;
  children: React.ReactNode;
  loadingText?: string;
  errorText?: string;
  onRetry?: () => void;
};

export function AsyncStateWrapper({
  isLoading,
  isError,
  error,
  children,
  loadingText = "Loading...",
  errorText = "Something went wrong",
  onRetry,
}: Props) {
  const msg =
    (error as any)?.message || (error as any)?.toString?.() || errorText;

  const onReloadPress = React.useCallback(() => {
    Alert.alert(
      errorText,
      msg,
      [
        { text: "Cancel", style: "cancel" },
        onRetry ? { text: "Reload", onPress: onRetry } : { text: "OK" },
      ],
      { cancelable: true },
    );
  }, [errorText, msg, onRetry]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>{loadingText}</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 16,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "700" }}>{errorText}</Text>
        <Text style={{ marginTop: 8, opacity: 0.8, textAlign: "center" }}>
          {msg}
        </Text>

        {onRetry ? (
          <Pressable
            onPress={onReloadPress}
            style={{
              marginTop: 14,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#ddd",
            }}
          >
            <Text style={{ fontWeight: "700" }}>Reload</Text>
          </Pressable>
        ) : null}
      </View>
    );
  }

  return <>{children}</>;
}
