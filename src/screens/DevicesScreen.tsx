import React from "react";
import { ScrollView, Text, View, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { C } from "../theme/colors";
import { ActionButton, Card, Heading, Label } from "../components/UI";

export default function DevicesScreen() {
  return (
    <ScrollView style={s.page} contentContainerStyle={s.content}>
      <Heading
        title="Your devices"
        subtitle="Phone-to-phone pairing is not available in this build."
      />
      <Card style={s.empty}>
        <View style={s.icon}>
          <Ionicons name="phone-portrait-outline" size={28} color={C.primary} />
        </View>
        <Text style={s.title}>No connected devices</Text>
        <Text style={s.body}>
          This app build has no BLE connection or QR pairing support, so it
          cannot discover, connect, or manage trusted phones.
        </Text>
        <ActionButton
          title="Set up this phone"
          onPress={() =>
            Alert.alert(
              "Set up this phone",
              "Secure QR pairing will be connected to the native BLE module in the next development milestone.",
            )
          }
        />
        <View style={{ height: 10 }} />
        <ActionButton
          title="Add an existing device"
          secondary
          onPress={() =>
            Alert.alert(
              "Add device",
              "QR scanning and mutual verification are not yet enabled in this UI foundation.",
            )
          }
        />
      </Card>
      <Card>
        <Label>Required for pairing</Label>
        {[
          "Install a native BEFT build on both phones",
          "Grant Bluetooth permissions when prompted",
          "Scan and mutually verify a pairing QR code",
          "Test the connection on both devices",
        ].map((t, i) => (
          <View style={s.check} key={t}>
            <Text style={s.number}>{`0${i + 1}`}</Text>
            <Text style={s.checkText}>{t}</Text>
          </View>
        ))}
      </Card>
    </ScrollView>
  );
}
const s = StyleSheet.create({
  page: { flex: 1, backgroundColor: C.bg },
  content: { padding: 22, paddingTop: 34 },
  empty: { alignItems: "center", paddingVertical: 28 },
  icon: {
    width: 64,
    height: 64,
    borderRadius: 22,
    backgroundColor: "#31402B",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: { fontSize: 19, color: C.text, fontWeight: "800" },
  body: {
    fontSize: 13,
    color: C.muted,
    textAlign: "center",
    lineHeight: 20,
    marginVertical: 10,
  },
  check: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  number: { color: C.primary, fontSize: 12, fontWeight: "800", width: 38 },
  checkText: { color: C.text, fontSize: 13 },
});
