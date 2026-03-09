import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

import { AppColors } from "@/theme/colors";
import { PATIENT_APPOINTMENTS } from "../../../tabs/appointments/services/appointments.servics";

type PaymentMessageType = "success" | "failed" | "cancel" | "pending";

const AppointmentPaymentScreen = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { paymentUrl } = useLocalSearchParams<{ paymentUrl: string }>();

  const [paymentState, setPaymentState] =
    React.useState<PaymentMessageType | null>(null);
  const [countdown, setCountdown] = React.useState(5);

  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const hasHandledMessageRef = React.useRef(false);

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const navigateAfterDelay = (type: PaymentMessageType, tranId?: string) => {
    let nextCount = 5;
    setCountdown(nextCount);

    intervalRef.current = setInterval(() => {
      nextCount -= 1;
      setCountdown(nextCount);

      if (nextCount <= 0 && intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }, 1000);

    timeoutRef.current = setTimeout(() => {
      if (type === "success") {
        router.replace({
          pathname: "/appointments",
          params: {
            paymentStatus: "success",
            tranId: tranId || "",
          },
        });
        return;
      }

      if (type === "failed") {
        router.replace({
          pathname: "/search",
          params: {
            paymentStatus: "failed",
            tranId: tranId || "",
          },
        });
        return;
      }

      if (type === "cancel") {
        router.replace({
          pathname: "/search",
          params: {
            paymentStatus: "cancel",
            tranId: tranId || "",
          },
        });
        return;
      }

      if (type === "pending") {
        router.replace({
          pathname: "/search",
          params: {
            paymentStatus: "pending",
            tranId: tranId || "",
          },
        });
      }
    }, 5000);
  };

  const handleMessage = async (event: any) => {
    try {
      if (hasHandledMessageRef.current) return;

      const raw = event?.nativeEvent?.data;
      const data = JSON.parse(raw);

      const type = data?.type as PaymentMessageType | undefined;
      const tranId = data?.tranId as string | undefined;

      if (!type) return;

      hasHandledMessageRef.current = true;
      setPaymentState(type);

      if (type === "success") {
        await queryClient.invalidateQueries({
          queryKey: [PATIENT_APPOINTMENTS],
        });
      }

      navigateAfterDelay(type, tranId);
    } catch (error) {
      console.log("WebView message parse error", error);
    }
  };

  const getTitle = () => {
    if (paymentState === "success") return "Payment Successful";
    if (paymentState === "failed") return "Payment Failed";
    if (paymentState === "cancel") return "Payment Cancelled";
    if (paymentState === "pending") return "Payment Pending";
    return "Secure Payment";
  };

  const getSubtitle = () => {
    if (paymentState === "success") {
      return "Your appointment payment was completed successfully.";
    }
    if (paymentState === "failed") {
      return "We could not complete your payment.";
    }
    if (paymentState === "cancel") {
      return "You cancelled the payment process.";
    }
    if (paymentState === "pending") {
      return "Your payment is being verified.";
    }
    return "Connecting to payment gateway...";
  };

  const getIcon = () => {
    if (paymentState === "success") return "✅";
    if (paymentState === "failed") return "❌";
    if (paymentState === "cancel") return "⚠️";
    if (paymentState === "pending") return "⏳";
    return "🔒";
  };

  if (!paymentUrl) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Payment URL not found</Text>
        <Text style={styles.emptySubtitle}>
          Unable to open the payment gateway.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: paymentUrl }}
        onMessage={handleMessage}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        renderLoading={() => (
          <View style={styles.loaderContainer}>
            <View style={styles.loaderCard}>
              <Text style={styles.loaderIcon}>🔒</Text>
              <Text style={styles.loaderTitle}>Secure Payment</Text>
              <Text style={styles.loaderSubtitle}>
                Connecting to payment gateway...
              </Text>
              <ActivityIndicator
                size="large"
                color={AppColors.primary}
                style={styles.loaderSpinner}
              />
            </View>
          </View>
        )}
      />

      {paymentState && (
        <View style={styles.overlay}>
          <View style={styles.overlayCard}>
            <Text style={styles.overlayIcon}>{getIcon()}</Text>
            <Text style={styles.overlayTitle}>{getTitle()}</Text>
            <Text style={styles.overlaySubtitle}>{getSubtitle()}</Text>

            <View style={styles.countdownCircle}>
              <Text style={styles.countdownText}>{countdown}</Text>
            </View>

            <Text style={styles.redirectText}>
              Redirecting in {countdown} second{countdown === 1 ? "" : "s"}...
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default AppointmentPaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background || "#F5F7F9",
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppColors.background || "#F5F7F9",
    paddingHorizontal: 24,
  },

  loaderCard: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingVertical: 28,
    paddingHorizontal: 22,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },

  loaderIcon: {
    fontSize: 32,
    marginBottom: 12,
  },

  loaderTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: AppColors.primary,
    marginBottom: 8,
  },

  loaderSubtitle: {
    fontSize: 14,
    textAlign: "center",
    color: AppColors.subtitleText,
  },

  loaderSpinner: {
    marginTop: 20,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(35, 59, 77, 0.35)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  overlayCard: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingVertical: 28,
    paddingHorizontal: 22,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },

  overlayIcon: {
    fontSize: 34,
    marginBottom: 12,
  },

  overlayTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: AppColors.primary,
    marginBottom: 8,
    textAlign: "center",
  },

  overlaySubtitle: {
    fontSize: 14,
    color: AppColors.subtitleText,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 20,
  },

  countdownCircle: {
    width: 72,
    height: 72,
    borderRadius: 999,
    backgroundColor: AppColors.inputBackground,
    borderWidth: 1,
    borderColor: AppColors.inputBorder,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },

  countdownText: {
    fontSize: 28,
    fontWeight: "700",
    color: AppColors.primary,
  },

  redirectText: {
    fontSize: 14,
    color: AppColors.subtitleText,
    textAlign: "center",
  },

  emptyContainer: {
    flex: 1,
    backgroundColor: AppColors.background || "#F5F7F9",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: AppColors.primary,
    marginBottom: 8,
  },

  emptySubtitle: {
    fontSize: 14,
    color: AppColors.subtitleText,
    textAlign: "center",
  },
});
