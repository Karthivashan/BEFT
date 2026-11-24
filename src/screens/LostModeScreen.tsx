import React from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { C } from "../theme/colors";
import { Card, Heading, Label } from "../components/UI";
import { BeftSettings, useBeftState } from "../state/BeftState";

export default function LostModeScreen() {
  const { settings, loading, updateSettings } = useBeftState();

  const save = async (patch: Partial<BeftSettings>) => {
    try {
      await updateSettings(patch);
    } catch {
      Alert.alert(
        "Could not save setting",
        "Check available device storage and try again.",
      );
    }
  };

  return (
    <View style={s.page}>
      <View style={s.header}>
        <Heading
          title="Lost Device Mode"
          subtitle="Save your preferences for when native background discovery is available."
        />
      </View>
      <ScrollView
        pointerEvents={loading ? "none" : "auto"}
        style={s.scroll}
        contentContainerStyle={s.content}
      >
        <Card>
          <View style={s.row}>
            <View style={s.copy}>
              <Label>Mode preference</Label>
              <Text style={s.title}>
                {settings.lostModeEnabled
                  ? "Lost Mode selected"
                  : "Lost Mode is off"}
              </Text>
              <Text style={s.body}>
                This build does not advertise over Bluetooth or receive remote
                commands.
              </Text>
            </View>
            <Switch
              accessibilityLabel="Lost Mode preference"
              value={settings.lostModeEnabled}
              onValueChange={(value) => void save({ lostModeEnabled: value })}
              trackColor={{ false: "#465044", true: C.secondary }}
              thumbColor={C.text}
            />
          </View>
          <View style={s.status}>
            <View style={s.statusDot} />
            <Text style={s.statusText}>BACKGROUND DISCOVERY NOT ACTIVE</Text>
          </View>
        </Card>

        <Text style={s.section}>Sound detection preferences</Text>
        <Card>
          <SoundToggle
            title="Clap detection"
            detail="Preference only; microphone monitoring is unavailable"
            value={settings.clapEnabled}
            onChange={(value) => void save({ clapEnabled: value })}
          />
          <View style={s.line} />
          <SoundToggle
            title="Whistle detection"
            detail="Preference only; microphone monitoring is unavailable"
            value={settings.whistleEnabled}
            onChange={(value) => void save({ whistleEnabled: value })}
          />
        </Card>

        <Card>
          <Label>Privacy & permissions</Label>
          <Text style={s.body}>
            BEFT does not record or upload audio. Microphone permission is not
            requested because sound monitoring is not implemented. A production
            monitor needs an explicit permission flow and a visible Android
            foreground service.
          </Text>
        </Card>
      </ScrollView>
    </View>
  );
}

function SoundToggle({
  title,
  detail,
  value,
  onChange,
}: {
  title: string;
  detail: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <View style={s.row}>
      <View style={s.copy}>
        <Text style={s.item}>{title}</Text>
        <Text style={s.body}>{detail}</Text>
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

const s = StyleSheet.create({
  page: { flex: 1, backgroundColor: C.bg },
  header: { paddingHorizontal: 22, paddingTop: 34 },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 22, paddingBottom: 36 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
  },
  copy: { flex: 1 },
  title: { fontSize: 19, color: C.text, fontWeight: "800" },
  body: { fontSize: 12, color: C.muted, lineHeight: 19, marginTop: 5 },
  section: { fontSize: 17, color: C.text, fontWeight: "800", marginBottom: 12 },
  item: { fontSize: 15, color: C.text, fontWeight: "700" },
  line: { height: 1, backgroundColor: C.border, marginVertical: 12 },
  status: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: C.border,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: C.warning,
  },
  statusText: {
    color: C.warning,
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
});
