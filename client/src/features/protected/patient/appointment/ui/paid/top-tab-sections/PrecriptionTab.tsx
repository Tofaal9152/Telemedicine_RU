import { AsyncStateWrapper } from "@/components/AsyncStateWrapper";
import { AppColors } from "@/theme/colors";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useGetPrescription } from "../../../services/presciption.service";



const escapeHtml = (value?: string | number | null) => {
  if (value === null || value === undefined) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
};

const PrescriptionTab = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const appointmentId = Array.isArray(id) ? id[0] : id;

  const prescriptionQuery = useGetPrescription({
    appointmentId: appointmentId ?? "",
  });

  const prescription = prescriptionQuery.data?.result;

  const medications = useMemo(() => {
    return Array.isArray(prescription?.medications)
      ? prescription.medications
      : [];
  }, [prescription?.medications]);

  const handleDownloadPdf = async () => {
    try {
      if (!prescription) {
        Alert.alert("Unavailable", "No prescription found to export.");
        return;
      }

      const html = `
        <html>
          <head>
            <meta charset="utf-8" />
            <style>
              body {
                font-family: Arial, sans-serif;
                padding: 24px;
                color: #233B4D;
                line-height: 1.5;
              }
              h1, h2, h3 {
                margin-bottom: 8px;
              }
              .section {
                margin-top: 18px;
                margin-bottom: 18px;
              }
              .card {
                background: #F9FAFB;
                border: 1px solid #E2E8F0;
                border-radius: 10px;
                padding: 12px;
                margin-bottom: 10px;
              }
              .label {
                font-weight: bold;
              }
              .muted {
                color: #7B8A97;
              }
            </style>
          </head>
          <body>
            <h1>Medical Prescription</h1>

            <div class="section">
              <p><span class="label">Appointment ID:</span> ${escapeHtml(
                prescription.appointmentId
              )}</p>
              <p><span class="label">Doctor:</span> ${escapeHtml(
                prescription.doctor?.user?.name || "N/A"
              )}</p>
              <p><span class="label">Specialty:</span> ${escapeHtml(
                prescription.doctor?.specialty || "N/A"
              )}</p>
              <p><span class="label">Patient:</span> ${escapeHtml(
                prescription.patient?.user?.name || "N/A"
              )}</p>
              <p><span class="label">Patient Email:</span> ${escapeHtml(
                prescription.patient?.user?.email || "N/A"
              )}</p>
            </div>

            <div class="section">
              <h3>Symptoms</h3>
              <p>${escapeHtml(prescription.symptoms || "No symptoms provided")}</p>
            </div>

            <div class="section">
              <h3>Diagnosis</h3>
              <p>${escapeHtml(
                prescription.diagnosis || "No diagnosis provided"
              )}</p>
            </div>

            <div class="section">
              <h3>Medications</h3>
              ${
                medications.length > 0
                  ? medications
                      .map(
                        (med: any) => `
                          <div class="card">
                            <p><span class="label">Name:</span> ${escapeHtml(
                              med?.name || "N/A"
                            )}</p>
                            <p><span class="label">Dosage:</span> ${escapeHtml(
                              med?.dosage || "N/A"
                            )}</p>
                            <p><span class="label">Frequency:</span> ${escapeHtml(
                              med?.frequency || "N/A"
                            )}</p>
                            <p><span class="label">Duration:</span> ${escapeHtml(
                              med?.duration || "N/A"
                            )}</p>
                          </div>
                        `
                      )
                      .join("")
                  : `<p class="muted">No medications prescribed.</p>`
              }
            </div>

            <div class="section">
              <h3>Notes</h3>
              <p>${escapeHtml(prescription.notes || "No notes provided")}</p>
            </div>
          </body>
        </html>
      `;

      const file = await Print.printToFileAsync({ html });

      const isSharingAvailable = await Sharing.isAvailableAsync();

      if (!isSharingAvailable) {
        Alert.alert("Unavailable", "Sharing is not available on this device.");
        return;
      }

      await Sharing.shareAsync(file.uri, {
        mimeType: "application/pdf",
        dialogTitle: "Share Prescription PDF",
        UTI: "com.adobe.pdf",
      });
    } catch (error) {
      console.error("Failed to generate/share PDF:", error);
      Alert.alert("Error", "Failed to generate PDF");
    }
  };

  return (
    <AsyncStateWrapper
      isLoading={prescriptionQuery.isLoading}
      isError={prescriptionQuery.isError}
      error={prescriptionQuery.error}
    >
      {!prescription ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>🩺</Text>
            <Text style={styles.emptyTitle}>No Prescription Yet</Text>
            <Text style={styles.emptySubtitle}>
              The doctor has not issued a prescription for this consultation yet.
            </Text>
          </View>
        </View>
      ) : (
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerCard}>
            <Text style={styles.title}>Prescription</Text>
            <Text style={styles.subtitle}>
              Appointment ID: {prescription.appointmentId || "N/A"}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Doctor</Text>
            <Text style={styles.primaryText}>
              {prescription.doctor?.user?.name || "N/A"}
            </Text>
            <Text style={styles.secondaryText}>
              {prescription.doctor?.specialty || "No specialty provided"}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Patient</Text>
            <Text style={styles.primaryText}>
              {prescription.patient?.user?.name || "N/A"}
            </Text>
            <Text style={styles.secondaryText}>
              {prescription.patient?.user?.email || "No email provided"}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Symptoms</Text>
            <Text style={styles.value}>
              {prescription.symptoms || "No symptoms provided"}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Diagnosis</Text>
            <Text style={styles.value}>
              {prescription.diagnosis || "No diagnosis provided"}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Medications</Text>

            {medications.length > 0 ? (
              medications.map((med: any, index: number) => (
                <View key={`${med?.name || "med"}-${index}`} style={styles.medicationCard}>
                  <Text style={styles.medicationName}>{med?.name || "Unnamed medication"}</Text>
                  <Text style={styles.meta}>Dosage: {med?.dosage || "N/A"}</Text>
                  <Text style={styles.meta}>Frequency: {med?.frequency || "N/A"}</Text>
                  <Text style={styles.meta}>Duration: {med?.duration || "N/A"}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.emptyMedicationText}>No medications prescribed.</Text>
            )}
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <Text style={styles.value}>
              {prescription.notes || "No notes provided"}
            </Text>
          </View>

          <Pressable style={styles.downloadButton} onPress={handleDownloadPdf}>
            <Text style={styles.downloadButtonText}>Download PDF</Text>
          </Pressable>
        </ScrollView>
      )}
    </AsyncStateWrapper>
  );
};

export default PrescriptionTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },

  contentContainer: {
    padding: 16,
    paddingBottom: 30,
  },

  headerCard: {
    backgroundColor: AppColors.card,
    padding: 18,
    borderRadius: 18,
    marginBottom: 14,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: AppColors.primary,
  },

  subtitle: {
    fontSize: 13,
    color: AppColors.subtitleText,
    marginTop: 4,
  },

  card: {
    backgroundColor: AppColors.card,
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
    color: AppColors.primary,
  },

  primaryText: {
    fontSize: 15,
    fontWeight: "600",
    color: AppColors.primary,
  },

  secondaryText: {
    fontSize: 13,
    marginTop: 4,
    color: AppColors.subtitleText,
  },

  value: {
    fontSize: 14,
    color: AppColors.primary,
    lineHeight: 20,
  },

  medicationCard: {
    backgroundColor: AppColors.inputBackground,
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },

  medicationName: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 6,
    color: AppColors.primary,
  },

  meta: {
    fontSize: 13,
    color: AppColors.subtitleText,
    marginBottom: 2,
  },

  emptyMedicationText: {
    fontSize: 14,
    color: AppColors.subtitleText,
  },

  downloadButton: {
    backgroundColor: AppColors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  downloadButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: AppColors.background,
  },

  emptyCard: {
    backgroundColor: AppColors.card,
    borderRadius: 20,
    padding: 26,
    alignItems: "center",
    maxWidth: 360,
  },

  emptyIcon: {
    fontSize: 40,
    marginBottom: 10,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: AppColors.primary,
  },

  emptySubtitle: {
    fontSize: 14,
    color: AppColors.subtitleText,
    marginTop: 6,
    textAlign: "center",
    lineHeight: 20,
  },
});