import React from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { C } from "../theme/colors";
import { ActionButton, Card, Heading, Label } from "../components/UI";
import { BeftSettings, useBeftState } from "../state/BeftState";

const tones = ["Pulse", "Beacon", "Chime"] as const;
const durations = [30, 60, 120] as const;
const sensitivities = ["Low", "Medium", "High"] as const;

export default function SettingsScreen() {
  const { settings, loading, storageError, updateSettings, resetSettings } =
    useBeftState();

  const save = async (patch: Partial<BeftSettings>) => {
    try {
      await updateSettings(patch);
    } catch {
      Alert.alert(
        "Could not save settings",
        "Check available device storage and try again.",
      );
    }
  };

  const choose = <T extends string | number>(
    title: string,
    options: readonly T[],
    selected: T,
    update: (value: T) => Partial<BeftSettings>,
  ) => {
    Alert.alert(title, "Choose an option", [
      ...options.map((value) => ({
        text: `${value}${value === selected ? "  ✓" : ""}`,
        onPress: () => {
          void save(update(value));
        },
      })),
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const confirmReset = () => {
    Alert.alert(
      "Reset settings?",
      "Your saved preferences will be removed from this phone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: () => {
            void resetSettings().catch(() =>
              Alert.alert("Could not reset settings", "Please try again."),
            );
          },
        },
      ],
    );
  };

  return (
    <View style={s.page}>
      <View style={s.header}>
        <Heading
          title="Settings"
          subtitle="Manage local preferences. Changes are saved on this phone."
        />
      </View>
      <ScrollView
        pointerEvents={loading ? "none" : "auto"}
        style={s.scroll}
        contentContainerStyle={s.content}
      >
        <Card>
          <Label>Alarm</Label>
          <PreferenceRow
            icon="musical-notes-outline"
            title="Alarm sound"
            detail={`${settings.alarmTone} · tone selection only`}
            onPress={() =>
              choose("Alarm sound", tones, settings.alarmTone, (value) => ({
                alarmTone: value,
              }))
            }
          />
          <View style={s.separator} />
          <View style={s.preference}>
            <Ionicons
              name="volume-medium-outline"
              size={21}
              color={C.secondary}
            />
            <View style={s.preferenceText}>
              <Text style={s.title}>Volume</Text>
              <Text style={s.description}>{settings.alarmVolume}%</Text>
            </View>
            <StepButton
              label="−"
              onPress={() =>
                void save({
                  alarmVolume: Math.max(0, settings.alarmVolume - 10),
                })
              }
            />
            <StepButton
              label="+"
              onPress={() =>
                void save({
                  alarmVolume: Math.min(100, settings.alarmVolume + 10),
                })
              }
            />
          </View>
          <View style={s.separator} />
          <PreferenceRow
            icon="timer-outline"
            title="Alarm duration"
            detail={`${settings.alarmDuration} seconds`}
            onPress={() =>
              choose(
                "Alarm duration",
                durations,
                settings.alarmDuration,
                (value) => ({ alarmDuration: value }),
              )
            }
          />
          <View style={s.separator} />
          <SwitchRow
            icon="pulse-outline"
            title="Vibration"
            detail="Save vibration preference"
            value={settings.vibrate}
            onChange={(value) => void save({ vibrate: value })}
          />
        </Card>

        <Card>
          <Label>Sound detection</Label>
          <SwitchRow
            icon="hand-left-outline"
            title="Clap detection"
            detail="Preference only; microphone monitoring is unavailable"
            value={settings.clapEnabled}
            onChange={(value) => void save({ clapEnabled: value })}
          />
          <View style={s.separator} />
          <SwitchRow
            icon="mic-outline"
            title="Whistle detection"
            detail="Preference only; microphone monitoring is unavailable"
            value={settings.whistleEnabled}
            onChange={(value) => void save({ whistleEnabled: value })}
          />
          <View style={s.separator} />
          <PreferenceRow
            icon="options-outline"
            title="Detection sensitivity"
            detail={settings.soundSensitivity}
            onPress={() =>
              choose(
                "Detection sensitivity",
                sensitivities,
                settings.soundSensitivity,
                (value) => ({ soundSensitivity: value }),
              )
            }
          />
          <Text style={s.note}>
            Sound is not recorded. Detection cannot run until a native
            microphone service is installed.
          </Text>
        </Card>

        <Card>
          <Label>Background & privacy</Label>
          <SwitchRow
            icon="battery-half-outline"
            title="Battery-friendly mode"
            detail="Preference saved locally; no background scan is running"
            value={settings.batteryFriendly}
            onChange={(value) => void save({ batteryFriendly: value })}
          />
          <View style={s.separator} />
          <View style={s.statusRow}>
            <Ionicons name="bluetooth-outline" size={21} color={C.warning} />
            <View style={s.preferenceText}>
              <Text style={s.title}>Bluetooth / Wi-Fi Direct</Text>
              <Text style={s.description}>
                Native discovery is not configured in this build
              </Text>
            </View>
            <Text style={s.status}>OFFLINE</Text>
          </View>
          <View style={s.separator} />
          <View style={s.privacy}>
            <Text style={s.title}>Privacy by design</Text>
            <Text style={s.description}>
              Preferences stay on this phone. This build has no account system
              or cloud backend.
            </Text>
          </View>
        </Card>

        {storageError && (
          <Card style={s.errorCard}>
            <Text style={s.errorTitle}>Local storage issue</Text>
            <Text style={s.description}>{storageError}</Text>
          </Card>
        )}
        {loading ? (
          <Text style={s.loading}>Loading saved preferences…</Text>
        ) : null}
        <ActionButton
          title="Reset preferences"
          secondary
          onPress={confirmReset}
        />
        <Text style={s.footer}>BEFT · Offline-first phone finder</Text>
      </ScrollView>
    </View>
  );
}

function PreferenceRow({
  icon,
  title,
  detail,
  onPress,
}: {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  title: string;
  detail: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.75}
      onPress={onPress}
      style={s.preference}
    >
      <Ionicons name={icon} size={21} color={C.secondary} />
      <View style={s.preferenceText}>
        <Text style={s.title}>{title}</Text>
        <Text style={s.description}>{detail}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={C.muted} />
    </TouchableOpacity>
  );
}

function SwitchRow({
  icon,
  title,
  detail,
  value,
  onChange,
}: {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  title: string;
  detail: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <View style={s.preference}>
      <Ionicons name={icon} size={21} color={C.secondary} />
      <View style={s.preferenceText}>
        <Text style={s.title}>{title}</Text>
        <Text style={s.description}>{detail}</Text>
      </View>
      <Switch
        accessibilityLabel={title}
        value={value}
        onValueChange={onChange}
        trackColor={{ false: "#465044", true: C.secondary }}
        thumbColor={C.text}
      />
    </View>
  );
}

function StepButton({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={label === "+" ? "Increase volume" : "Decrease volume"}
      onPress={onPress}
      style={s.stepButton}
    >
      <Text style={s.stepText}>{label}</Text>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  page: { flex: 1, backgroundColor: C.bg },
  header: { paddingHorizontal: 22, paddingTop: 34 },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 22, paddingBottom: 36 },
  preference: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 13,
  },
  preferenceText: { flex: 1 },
  title: { color: C.text, fontSize: 14, fontWeight: "700" },
  description: { color: C.muted, fontSize: 11, marginTop: 4, lineHeight: 17 },
  separator: { height: 1, backgroundColor: C.border },
  stepButton: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: "#303B2D",
    alignItems: "center",
    justifyContent: "center",
  },
  stepText: {
    color: C.primary,
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 24,
  },
  note: { color: C.warning, fontSize: 11, lineHeight: 17, marginTop: 8 },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 13,
  },
  status: {
    color: C.warning,
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  privacy: { paddingTop: 13 },
  errorCard: { borderColor: C.danger },
  errorTitle: {
    color: C.danger,
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 5,
  },
  loading: {
    color: C.muted,
    fontSize: 12,
    textAlign: "center",
    marginBottom: 10,
  },
  footer: {
    color: "#667260",
    textAlign: "center",
    fontSize: 10,
    marginTop: 16,
  },
});
