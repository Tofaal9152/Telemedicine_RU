import { NativeTabs } from "expo-router/unstable-native-tabs";

export default function DoctorLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="appointments/index">
        <NativeTabs.Trigger.Icon sf="calendar" md="event" />
        <NativeTabs.Trigger.Label>Appointments</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="payments/index">
        <NativeTabs.Trigger.Icon sf="doc.text" md="description" />
        <NativeTabs.Trigger.Label>Payments</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="settings/index">
        <NativeTabs.Trigger.Icon sf="gear" md="settings" />
        <NativeTabs.Trigger.Label>Settings</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
