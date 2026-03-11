import * as React from "react";
import { useMemo } from "react";
import {
  Text,
  View,
  StyleSheet,
  type ViewProps,
  type TextProps,
} from "react-native";

type Orientation = "vertical" | "horizontal" | "responsive";

function getFieldOrientationStyle(orientation: Orientation = "vertical") {
  switch (orientation) {
    case "horizontal":
      return styles.fieldHorizontal;
    case "responsive":
      return styles.fieldVertical;
    case "vertical":
    default:
      return styles.fieldVertical;
  }
}

function FieldSet({ style, ...props }: ViewProps) {
  return <View style={[styles.fieldSet, style]} {...props} />;
}

function FieldLegend({
  style,
  variant = "legend",
  children,
  ...props
}: TextProps & {
  variant?: "legend" | "label";
  children?: React.ReactNode;
}) {
  return (
    <Text
      style={[
        styles.fieldLegend,
        variant === "legend" ? styles.fieldLegendText : styles.fieldLabelText,
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}

function FieldGroup({ style, ...props }: ViewProps) {
  return <View style={[styles.fieldGroup, style]} {...props} />;
}

function Field({
  style,
  orientation = "vertical",
  ...props
}: ViewProps & {
  orientation?: Orientation;
}) {
  return (
    <View
      style={[styles.field, getFieldOrientationStyle(orientation), style]}
      {...props}
    />
  );
}

function FieldContent({ style, ...props }: ViewProps) {
  return <View style={[styles.fieldContent, style]} {...props} />;
}

function FieldLabel({
  style,
  children,
  disabled,
  ...props
}: TextProps & {
  disabled?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <Text
      style={[styles.fieldLabel, disabled && styles.disabled, style]}
      {...props}
    >
      {children}
    </Text>
  );
}

function FieldTitle({
  style,
  children,
  disabled,
  ...props
}: TextProps & {
  disabled?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <Text
      style={[styles.fieldTitle, disabled && styles.disabled, style]}
      {...props}
    >
      {children}
    </Text>
  );
}

function FieldDescription({
  style,
  children,
  ...props
}: TextProps & {
  children?: React.ReactNode;
}) {
  return (
    <Text style={[styles.fieldDescription, style]} {...props}>
      {children}
    </Text>
  );
}

function FieldSeparator({
  children,
  style,
  ...props
}: ViewProps & {
  children?: React.ReactNode;
}) {
  return (
    <View style={[styles.separatorWrapper, style]} {...props}>
      {children ? (
        <View style={styles.separatorRow}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>{children}</Text>
          <View style={styles.separatorLine} />
        </View>
      ) : (
        <View style={styles.separatorLineOnly} />
      )}
    </View>
  );
}

function FieldError({
  style,
  children,
  errors,
  ...props
}: ViewProps & {
  children?: React.ReactNode;
  errors?: ({ message?: string } | undefined)[];
}) {
  const content = useMemo(() => {
    if (children) {
      return children;
    }

    if (!errors?.length) {
      return null;
    }

    const uniqueErrors = [
      ...new Map(errors.map((error) => [error?.message, error])).values(),
    ].filter((error) => error?.message);

    if (uniqueErrors.length === 0) {
      return null;
    }

    if (uniqueErrors.length === 1) {
      return uniqueErrors[0]?.message ?? null;
    }

    return (
      <View style={styles.errorList}>
        {uniqueErrors.map((error, index) => (
          <View key={index} style={styles.errorRow}>
            <Text style={styles.errorBullet}>•</Text>
            <Text style={styles.errorText}>{error?.message}</Text>
          </View>
        ))}
      </View>
    );
  }, [children, errors]);

  if (!content) {
    return null;
  }

  return (
    <View style={[styles.fieldErrorWrapper, style]} {...props}>
      {typeof content === "string" ? (
        <Text style={styles.fieldErrorText}>{content}</Text>
      ) : (
        content
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  fieldSet: {
    flexDirection: "column",
    rowGap: 24,
  },
  fieldLegend: {
    marginBottom: 12,
    fontWeight: "500",
    color: "#111827",
  },
  fieldLegendText: {
    fontSize: 16,
  },
  fieldLabelText: {
    fontSize: 14,
  },
  fieldGroup: {
    width: "100%",
    flexDirection: "column",
    rowGap: 28,
  },
  field: {
    width: "100%",
    rowGap: 12,
  },
  fieldVertical: {
    flexDirection: "column",
  },
  fieldHorizontal: {
    flexDirection: "row",
    alignItems: "flex-start",
    columnGap: 12,
  },
  fieldContent: {
    flex: 1,
    flexDirection: "column",
    rowGap: 6,
  },
  fieldLabel: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
    color: "#111827",
  },
  fieldTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
    color: "#111827",
  },
  fieldDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: "#6B7280",
  },
  disabled: {
    opacity: 0.5,
  },
  separatorWrapper: {
    marginVertical: 8,
  },
  separatorRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#D1D5DB",
  },
  separatorLineOnly: {
    height: 1,
    backgroundColor: "#D1D5DB",
  },
  separatorText: {
    marginHorizontal: 8,
    fontSize: 14,
    color: "#6B7280",
  },
  fieldErrorWrapper: {
    marginTop: 4,
  },
  fieldErrorText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#DC2626",
    lineHeight: 20,
  },
  errorList: {
    marginTop: 4,
    rowGap: 4,
  },
  errorRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  errorBullet: {
    marginRight: 8,
    fontSize: 14,
    color: "#DC2626",
    lineHeight: 20,
  },
  errorText: {
    flex: 1,
    fontSize: 14,
    color: "#DC2626",
    lineHeight: 20,
  },
});

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
};