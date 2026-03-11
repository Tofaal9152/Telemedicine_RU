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
<meta charset="utf-8"/>
<style>

body{
font-family: Arial, sans-serif;
padding:30px;
color:#233B4D;
}

.title{
text-align:center;
font-size:28px;
font-weight:bold;
margin-bottom:20px;
}

.top{
display:flex;
justify-content:space-between;
margin-bottom:20px;
}

.section{
margin-top:20px;
}

.section h3{
margin-bottom:10px;
border-bottom:2px solid #E2E8F0;
padding-bottom:4px;
}

.grid{
display:grid;
grid-template-columns:1fr 1fr;
gap:12px 30px;
}

.label{
font-weight:bold;
}

.box{
border:1px solid #E2E8F0;
border-radius:6px;
padding:10px;
background:#F9FAFB;
}

table{
width:100%;
border-collapse:collapse;
margin-top:10px;
}

th,td{
border:1px solid #E2E8F0;
padding:8px;
text-align:left;
font-size:14px;
}

th{
background:#F1F5F9;
}

.muted{
color:#7B8A97;
}

</style>
</head>

<body>

<div class="title">Medical Prescription</div>

<div class="top">
<div>
<span class="label">Appointment ID:</span>
${escapeHtml(prescription.appointmentId)}
</div>

<div>
<span class="label">Doctor:</span>
${escapeHtml(prescription.doctor?.user?.name || "N/A")}
</div>
</div>


<div class="section">
<h3>Patient Information</h3>

<div class="grid">

<div>
<span class="label">Patient Name:</span><br/>
${escapeHtml(prescription.patient?.user?.name || "N/A")}
</div>

<div>
<span class="label">Patient Email:</span><br/>
${escapeHtml(prescription.patient?.user?.email || "N/A")}
</div>

<div>
<span class="label">Doctor Specialty:</span><br/>
${escapeHtml(prescription.doctor?.specialty || "N/A")}
</div>

</div>
</div>


<div class="section">
<h3>Symptoms</h3>

<div class="box">
${escapeHtml(prescription.symptoms || "No symptoms provided")}
</div>
</div>


<div class="section">
<h3>Diagnosis</h3>

<div class="box">
${escapeHtml(prescription.diagnosis || "No diagnosis provided")}
</div>
</div>


<div class="section">
<h3>Medications</h3>

${
medications.length > 0
? `
<table>
<thead>
<tr>
<th>Name</th>
<th>Dosage</th>
<th>Frequency</th>
<th>Duration</th>
</tr>
</thead>

<tbody>

${medications.map((med:any)=>`
<tr>
<td>${escapeHtml(med?.name || "N/A")}</td>
<td>${escapeHtml(med?.dosage || "N/A")}</td>
<td>${escapeHtml(med?.frequency || "N/A")}</td>
<td>${escapeHtml(med?.duration || "N/A")}</td>
</tr>
`).join("")}

</tbody>
</table>
`
: `<p class="muted">No medications prescribed.</p>`
}

</div>


<div class="section">
<h3>Notes</h3>

<div class="box">
${escapeHtml(prescription.notes || "No notes provided")}
</div>

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