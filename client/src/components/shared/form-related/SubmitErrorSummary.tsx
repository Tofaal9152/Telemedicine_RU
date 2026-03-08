import { Text, View, StyleSheet } from "react-native";
import type { SubmitErrorItem } from "@/hooks/useZodTanstackForm";

type SubmitErrorSummaryProps = {
  errors: SubmitErrorItem[];
  title?: string;
};

export function SubmitErrorSummary({
  errors,
  title = "Please fix the following:",
}: SubmitErrorSummaryProps) {
  if (!errors?.length) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.list}>
        {errors.map((e) => (
          <View key={`${e.field}-${e.message}`} style={styles.row}>
            <Text style={styles.bullet}>•</Text>

            <Text style={styles.message}>
              <Text style={styles.label}>{e.label ?? e.field}: </Text>
              {e.message}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FECACA",
    backgroundColor: "#FEF2F2",
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    color: "#B91C1C",
  },
  list: {
    marginTop: 8,
    rowGap: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  bullet: {
    marginRight: 8,
    fontSize: 14,
    color: "#B91C1C",
    lineHeight: 20,
  },
  message: {
    flex: 1,
    fontSize: 14,
    color: "#B91C1C",
    lineHeight: 20,
  },
  label: {
    fontWeight: "500",
  },
});