import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { C } from "../theme/colors";

export function Card({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return <View style={[s.card, style]}>{children}</View>;
}
export function Heading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <View style={{ marginBottom: 22 }}>
      <Text style={s.heading}>{title}</Text>
      {!!subtitle && <Text style={s.sub}>{subtitle}</Text>}
    </View>
  );
}
export function ActionButton({
  title,
  onPress,
  secondary = false,
}: {
  title: string;
  onPress?: () => void;
  secondary?: boolean;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.82}
      onPress={onPress}
      style={[s.button, secondary && s.secondaryButton]}
    >
      <Text style={[s.buttonText, secondary && { color: C.primary }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
export function Label({ children }: { children: React.ReactNode }) {
  return <Text style={s.label}>{children}</Text>;
}
const s = StyleSheet.create({
  card: {
    backgroundColor: C.card,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: C.border,
    marginBottom: 14,
  },
  heading: {
    color: C.text,
    fontSize: 29,
    fontWeight: "800",
    letterSpacing: -0.7,
  },
  sub: { color: C.muted, fontSize: 14, marginTop: 6, lineHeight: 20 },
  button: {
    backgroundColor: C.primary,
    minHeight: 52,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: C.primary,
  },
  buttonText: { color: "#17200F", fontSize: 15, fontWeight: "800" },
  label: {
    color: C.muted,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 8,
  },
});
