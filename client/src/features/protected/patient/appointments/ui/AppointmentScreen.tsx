import { AsyncStateWrapper } from "@/components/AsyncStateWrapper";
import { AppColors } from "@/theme/colors";
import React, { useMemo, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useGetAppointments } from "../services/appointments.servics";

type AppointmentItem = {
  id: string;
  patientId: string;
  doctorId: string;
  tranId: string;
  status: string;
  createdAt: string;
  doctor: {
    id: string;
    specialty: string;
    bio: string;
    experience: string;
    isApproved: boolean;
    visitFee: number;
    registrationNumber: string;
    user: {
      name: string;
      email: string;
      age: string;
      gender: string;
      createdAt: string;
    };
  };
};

const AppointmentScreen = () => {
  const [page, setPage] = useState(1);

  const userQuery = useGetAppointments({
    query: {
      page,
    },
  });

  const apiData = userQuery.data;

  const appointments: AppointmentItem[] = apiData?.results ?? [];
  const currentPage = apiData?.currentPage ?? 1;
  const totalPages = apiData?.totalPages ?? 1;
  const hasNextPage = currentPage < totalPages;

  const headerData = useMemo(() => {
    return {
      total: apiData?.count ?? 0,
      paid: appointments.filter((item) => item.status === "PAID").length,
      doctors: new Set(appointments.map((item) => item.doctor?.id)).size,
    };
  }, [apiData?.count, appointments]);

  const handleLoadMore = () => {
    if (!userQuery.isFetching && hasNextPage) {
      setPage((prev) => prev + 1);
    }
  };

  const renderAppointmentCard = ({ item }: { item: AppointmentItem }) => {
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
      </View>
    );
  };

  return (
    <AsyncStateWrapper
      isLoading={userQuery.isLoading}
      error={userQuery.error}
      isError={userQuery.isError}
    >
      <View style={styles.container}>
        <FlashList
          data={appointments}
          keyExtractor={(item) => item.id}
          renderItem={renderAppointmentCard}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.3}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.headerContainer}>
              <Text style={styles.screenTitle}>My Appointments</Text>
              <Text style={styles.screenSubtitle}>
                Track your booked consultations and doctor details.
              </Text>

              <View style={styles.summaryRow}>
                <View style={styles.summaryCard}>
                  <Text style={styles.summaryNumber}>{headerData.total}</Text>
                  <Text style={styles.summaryLabel}>Total</Text>
                </View>

                <View style={styles.summaryCard}>
                  <Text style={styles.summaryNumber}>{headerData.paid}</Text>
                  <Text style={styles.summaryLabel}>Paid</Text>
                </View>

                <View style={styles.summaryCard}>
                  <Text style={styles.summaryNumber}>{headerData.doctors}</Text>
                  <Text style={styles.summaryLabel}>Doctors</Text>
                </View>
              </View>
            </View>
          }
          ListFooterComponent={
            userQuery.isFetching && hasNextPage ? (
              <View style={styles.footerLoader}>
                <ActivityIndicator size="small" color={AppColors.primary} />
                <Text style={styles.footerText}>
                  Loading more appointments...
                </Text>
              </View>
            ) : (
              <View style={styles.footerSpace} />
            )
          }
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No appointments found</Text>
              <Text style={styles.emptySubtitle}>
                Your booked appointments will appear here.
              </Text>
            </View>
          }
          contentContainerStyle={styles.contentContainer}
        />
      </View>
    </AsyncStateWrapper>
  );
};

export default AppointmentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },

  contentContainer: {
    padding: 20,
    paddingBottom: 32,
  },

  headerContainer: {
    marginBottom: 22,
  },

  screenTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: AppColors.primary,
  },

  screenSubtitle: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
    color: AppColors.subtitleText,
  },

  summaryRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 18,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: AppColors.card,
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },

  summaryNumber: {
    fontSize: 22,
    fontWeight: "700",
    color: AppColors.primary,
  },

  summaryLabel: {
    marginTop: 6,
    fontSize: 13,
    color: AppColors.subtitleText,
  },

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

  footerLoader: {
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  footerText: {
    marginTop: 8,
    fontSize: 13,
    color: AppColors.subtitleText,
  },

  footerSpace: {
    height: 10,
  },

  emptyState: {
    backgroundColor: AppColors.card,
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    marginTop: 20,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: AppColors.primary,
  },

  emptySubtitle: {
    marginTop: 8,
    fontSize: 14,
    textAlign: "center",
    color: AppColors.subtitleText,
  },
});
