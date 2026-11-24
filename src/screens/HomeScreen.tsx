
import React from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { C } from '../theme/colors';
import {
  ActionButton,
  Card,
  Heading,
  Label,
} from '../components/UI';

export default function HomeScreen() {
  const start = () => {
    Alert.alert(
      'Bluetooth discovery unavailable',
      'This build does not include the native BLE scanner. No devices are being searched for.'
    );
  };

  return (
    <View style={styles.page}>
      <View style={styles.top}>
        <View>
          
          <Text style={styles.brand}>
            BEFT
            <Text style={{ color: C.primary }}>.</Text>
          </Text>
          <Text style={styles.eyebrow}>
            OFFLINE PHONE FINDER
          </Text>

        </View>

        <View style={styles.pill}>
          <View style={styles.dot} />
          <Text style={styles.pillText}>LOCAL FIRST</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
      >
        <Heading
          title="Find your phone."
          subtitle="Your devices. Your signal. No cloud in the middle."
        />

        {/* Finder Status */}
        <Card style={styles.hero}>
          <View style={styles.radar}>
            <View style={[styles.ring, styles.ring1]} />
            <View style={[styles.ring, styles.ring2]} />
            <View style={[styles.ring, styles.ring3]} />

            <View style={styles.core}>
              <Ionicons
                name="phone-portrait"
                size={30}
                color={C.bg}
              />
            </View>
          </View>
   
          <Text style={styles.heroTitle}>
            Finder is not connected
          </Text>

          <Text style={styles.heroSub}>
            Native Bluetooth discovery is not configured
          </Text>

          <ActionButton
            title="Check discovery status"
            onPress={start}
          />
        </Card>

        {/* Quick Overview */}
        <View style={styles.row}>
          <Text style={styles.section}>Quick overview</Text>
          <Text style={styles.small}>YOUR BEFT</Text>
        </View>

        <View style={styles.stats}>
          <Card style={styles.stat}>
            <Ionicons
              name="phone-portrait-outline"
              size={21}
              color={C.secondary}
            />

            <Text style={styles.statNum}>0</Text>
            <Text style={styles.statLabel}>
              Paired devices
            </Text>
          </Card>

          <Card style={styles.stat}>
            <Ionicons
              name="bluetooth-outline"
              size={21}
              color={C.primary}
            />

            <Text style={styles.statNum}>—</Text>
            <Text style={styles.statLabel}>
              Signal strength
            </Text>
          </Card>
        </View>

        {/* Get Started */}
        <Card>
          <Label>Get started</Label>

          <Text style={styles.cardTitle}>
            Pair your second phone
          </Text>

          <Text style={styles.body}>
            Secure QR pairing and phone-to-phone communication
            require native BLE/Wi-Fi Direct support, which is
            not included in this build.
          </Text>

          <ActionButton
            title="View device setup"
            secondary
            onPress={() =>
              Alert.alert(
                'Pairing unavailable',
                'This build cannot scan pairing QR codes or establish a phone-to-phone connection.'
              )
            }
          />
        </Card>

        {/* Footer */}
        <Text style={styles.footer}>
          BEFT · Find Your Phone. No Internet Needed.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: C.bg,
  },

  scroll: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 22,
    paddingTop: 0,
    paddingBottom: 35,
  },

  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 22,
    paddingTop: 30,
  },

  eyebrow: {
    fontSize: 9,
    color: C.muted,
    fontWeight: '800',
    letterSpacing: 2,
  },

  brand: {
    fontSize: 28,
    color: C.text,
    fontWeight: '900',
    letterSpacing: 1,
  },

  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: '#263323',
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderRadius: 20,
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: C.secondary,
  },

  pillText: {
    fontSize: 9,
    color: C.secondary,
    fontWeight: '800',
    letterSpacing: 1,
  },

  hero: {
    alignItems: 'center',
    paddingVertical: 24,
  },

  radar: {
    height: 190,
    width: 190,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },

  ring: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#79D98C55',
    borderRadius: 200,
  },

  ring1: {
    width: 180,
    height: 180,
  },

  ring2: {
    width: 135,
    height: 135,
  },

  ring3: {
    width: 90,
    height: 90,
    backgroundColor: '#79D98C12',
  },

  core: {
    height: 58,
    width: 58,
    borderRadius: 30,
    backgroundColor: C.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  heroTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: C.text,
  },

  heroSub: {
    fontSize: 12,
    color: C.muted,
    marginTop: 6,
    marginBottom: 20,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  section: {
    color: C.text,
    fontSize: 17,
    fontWeight: '800',
  },

  small: {
    color: C.muted,
    fontSize: 9,
    letterSpacing: 1,
    fontWeight: '700',
  },

  stats: {
    flexDirection: 'row',
    gap: 12,
  },

  stat: {
    flex: 1,
  },

  statNum: {
    fontSize: 25,
    color: C.text,
    fontWeight: '800',
    marginTop: 10,
  },

  statLabel: {
    fontSize: 11,
    color: C.muted,
    marginTop: 2,
  },

  cardTitle: {
    fontSize: 17,
    color: C.text,
    fontWeight: '800',
    marginBottom: 8,
  },

  body: {
    fontSize: 13,
    color: C.muted,
    lineHeight: 20,
    marginBottom: 16,
  },

  footer: {
    color: '#667260',
    textAlign: 'center',
    fontSize: 10,
    marginTop: 12,
  },
});
