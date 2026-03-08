import * as React from "react";
import { ActivityIndicator, Text, View } from "react-native";

import { Button } from "@/components/ui/button";

type SubmitButtonProps = {
  isLoading?: boolean;
  loadingText?: string;
  disabled?: boolean;
  children?: React.ReactNode;
} & React.ComponentProps<typeof Button>;

export function SubmitButton({
  isLoading = false,
  loadingText = "Submitting...",
  disabled,
  children = "Submit",
  variant = "default",
  ...props
}: SubmitButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <Button
      disabled={isDisabled}
      variant={variant}
      accessibilityRole="button"
      
      accessibilityState={{ disabled: isDisabled, busy: isLoading }}
      {...props}
    >
      {isLoading ? (
        <View style={{ flexDirection: "row", alignItems: "center", columnGap: 8 }}>
          <ActivityIndicator size="small" color="#FFFFFF" />
          <Text style={{ color: "#FFFFFF", fontWeight: "500", fontSize: 14 }}>
            {loadingText}
          </Text>
        </View>
      ) : typeof children === "string" ? (
        <Text style={{ color: "#FFFFFF", fontWeight: "500", fontSize: 14 }}>
          {children}
        </Text>
      ) : (
        children
      )}
    </Button>
  );
}