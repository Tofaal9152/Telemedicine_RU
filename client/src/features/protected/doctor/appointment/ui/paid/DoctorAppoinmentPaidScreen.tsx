import CallTabs from "@/features/protected/shared/call/ui/CallTabs";
import ChatTabs from "@/features/protected/shared/chat/ui/ChatTabs";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import DoctorPrecriptionTab from "./top-tab-sections/PrescriptionTab/DoctorPrecriptionTab";

const Tab = createMaterialTopTabNavigator();

const DoctorAppoinmentPaidScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: "#233B4D" },
        tabBarLabelStyle: { fontWeight: "600", fontSize: 13 },
        tabBarActiveTintColor: "#233B4D",
        tabBarInactiveTintColor: "#7B8A97",
        tabBarShowIcon: true,
        tabBarItemStyle: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
        },
      }}
    >
      <Tab.Screen
        name="Prescription"
        component={DoctorPrecriptionTab}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="document-text-outline" size={18} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Chat"
        component={ChatTabs}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={18}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Video Call"
        component={CallTabs}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="videocam-outline" size={18} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default DoctorAppoinmentPaidScreen;
