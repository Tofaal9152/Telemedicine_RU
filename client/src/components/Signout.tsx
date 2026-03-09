import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuthStore } from "../store/authStore";

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  button: {
    backgroundColor: "#FF3B30",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default function LogoutSample() {
  const { reset } = useAuthStore();
  // all querykey invalidate
  const queryClient = useQueryClient();

  const handleLogout = () => {
    reset(); // auth store reset
    queryClient.clear(); // react-query cache clear
  };

  const showLogoutAlert = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Log Out", style: "destructive", onPress: handleLogout },
      ],
      { cancelable: true },
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={showLogoutAlert}>
        <Text style={styles.text}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}
