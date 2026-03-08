import * as React from "react";
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
} from "react-native";

type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"
  | "edit"
  | "view";

type ButtonSize =
  | "default"
  | "sm"
  | "lg"
  | "icon"
  | "icon-sm"
  | "icon-lg";

type ButtonProps = PressableProps & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const variantButtonStyles: Record<ButtonVariant, ViewStyle> = {
  default: {
    backgroundColor: "#2563EB",
  },
  destructive: {
    backgroundColor: "#DC2626",
  },
  outline: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  secondary: {
    backgroundColor: "#E5E7EB",
  },
  ghost: {
    backgroundColor: "transparent",
  },
  link: {
    backgroundColor: "transparent",
    paddingHorizontal: 0,
    paddingVertical: 0,
    minHeight: undefined,
  },
  edit: {
    backgroundColor: "#059669",
  },
  view: {
    backgroundColor: "#2563EB",
  },
};

const variantTextStyles: Record<ButtonVariant, TextStyle> = {
  default: {
    color: "#FFFFFF",
  },
  destructive: {
    color: "#FFFFFF",
  },
  outline: {
    color: "#111827",
  },
  secondary: {
    color: "#111827",
  },
  ghost: {
    color: "#111827",
  },
  link: {
    color: "#2563EB",
    textDecorationLine: "underline",
  },
  edit: {
    color: "#FFFFFF",
  },
  view: {
    color: "#FFFFFF",
  },
};

const sizeButtonStyles: Record<ButtonSize, ViewStyle> = {
  default: {
    minHeight: 36,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  sm: {
    minHeight: 32,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  lg: {
    minHeight: 40,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  icon: {
    height: 36,
    width: 36,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  "icon-sm": {
    height: 32,
    width: 32,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  "icon-lg": {
    height: 40,
    width: 40,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
};

export function Button({
  variant = "default",
  size = "default",
  disabled,
  children,
  style,
  textStyle,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        variantButtonStyles[variant],
        sizeButtonStyles[size],
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
      {...props}
    >
      {typeof children === "string" ? (
        <Text
          style={[
            styles.text,
            variantTextStyles[variant],
            textStyle,
          ]}
        >
          {children}
        </Text>
      ) : (
        <View style={styles.contentRow}>{children}</View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 8,
    borderRadius: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.8,
  },
});