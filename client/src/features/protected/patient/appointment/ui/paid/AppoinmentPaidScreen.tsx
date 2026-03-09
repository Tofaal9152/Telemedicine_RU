import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import CallTabs from "./top-tab-sections/CallTabs";
import PrecriptionTab from "./top-tab-sections/PrecriptionTab";
import VideoCallTab from "./top-tab-sections/VideoCallTab";

const Tab = createMaterialTopTabNavigator();

const AppoinmentPaidScreen = () => {
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
        component={PrecriptionTab}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="document-text-outline" size={18} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Chat"
        component={CallTabs}
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
        component={VideoCallTab}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="videocam-outline" size={18} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppoinmentPaidScreen;
