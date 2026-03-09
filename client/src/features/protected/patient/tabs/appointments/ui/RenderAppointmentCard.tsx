import { AppColors } from "@/theme/colors";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const RenderAppointmentCard = ({ item }: { item: any }) => {
    const router = useRouter();
  const doctorName = item.doctor?.user?.name ?? "Unknown Doctor";
  const specialty = item.doctor?.specialty ?? "N/A";
  const visitFee = item.doctor?.visitFee ?? 0;
  const experience = item.doctor?.experience ?? "N/A";
  const createdDate = new Date(item.createdAt).toLocaleDateString();

  return (
    <View style={styles.card}>
      <View style={styles.cardTopRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {doctorName?.charAt(0)?.toUpperCase() || "D"}
          </Text>
        </View>

        <View style={styles.cardTopInfo}>
          <Text style={styles.doctorName}>{doctorName}</Text>
          <Text style={styles.specialty}>{specialty}</Text>
        </View>

        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.infoGrid}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Visit Fee</Text>
          <Text style={styles.infoValue}>৳ {visitFee}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Experience</Text>
          <Text style={styles.infoValue}>{experience}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Transaction ID</Text>
          <Text style={styles.infoValueSmall}>{item.tranId}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Booked On</Text>
          <Text style={styles.infoValue}>{createdDate}</Text>
        </View>
      </View>

      <View style={styles.bottomRow}>
        <Text style={styles.registrationText}>
          Reg: {item.doctor?.registrationNumber}
        </Text>

        <Text style={styles.approvedText}>
          {item.doctor?.isApproved ? "Approved Doctor" : "Pending Approval"}
        </Text>
      </View>
      <Pressable
        style={styles.detailsButton}
        onPress={() => router.push({
          pathname: "/appointment/paid/[id]",
          params: { id: item.id }
        })}
      >
        <Text style={styles.detailsButtonText}>View Details</Text>
      </Pressable>
    </View>
  );
};

export default RenderAppointmentCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.card,
    borderRadius: 22,
    padding: 18,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },

  cardTopRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: AppColors.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
  },

  cardTopInfo: {
    flex: 1,
    marginLeft: 12,
  },

  doctorName: {
    fontSize: 17,
    fontWeight: "700",
    color: AppColors.primary,
  },

  specialty: {
    marginTop: 4,
    fontSize: 13,
    color: AppColors.subtitleText,
  },

  statusBadge: {
    backgroundColor: AppColors.inputBackground,
    borderWidth: 1,
    borderColor: AppColors.inputBorder,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },

  statusText: {
    fontSize: 12,
    fontWeight: "700",
    color: AppColors.primary,
  },

  infoGrid: {
    marginTop: 18,
    gap: 12,
  },

  infoItem: {
    backgroundColor: AppColors.inputBackground,
    borderRadius: 14,
    padding: 12,
  },

  infoLabel: {
    fontSize: 12,
    color: AppColors.subtitleText,
    marginBottom: 4,
  },

  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: AppColors.primary,
  },

  infoValueSmall: {
    fontSize: 13,
    fontWeight: "600",
    color: AppColors.primary,
  },

  bottomRow: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  registrationText: {
    fontSize: 12,
    color: AppColors.subtitleText,
  },

  approvedText: {
    fontSize: 12,
    fontWeight: "600",
    color: AppColors.primary,
  },
  detailsButton: {
    marginTop: 14,
    backgroundColor: AppColors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },

  detailsButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});
