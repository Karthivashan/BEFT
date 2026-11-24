<<<<<<< HEAD
# BEFT — Offline Hybrid Phone Finder

A React Native + Expo Android starter application using your selected BEFT palette:

| Token | Hex |
|---|---|
| Background | `#111411` |
| Card | `#202820` |
| Primary | `#B6F23A` |
| Secondary | `#79D98C` |
| Text | `#F5F7F2` |

## Included in this starter

- Expo + React Native + TypeScript project foundation
- Android package ID: `com.beft.phonefinder`
- Dark UI with Home, Devices, Lost Device Mode and Settings tabs
- Radar-style finder dashboard
- Locally persisted alarm, vibration, sensitivity, detection, battery and Lost Mode preferences
- Input validation for persisted preferences and visible storage errors
- Offline-first product copy; no cloud backend or account system

## Current implementation status

This is a runnable **UI and local-preferences foundation**, not a complete phone-finder. Bluetooth scanning/advertising, secure QR pairing, device management, remote ringing, microphone-based clap/whistle detection, Wi-Fi Direct and actual alarm playback are not implemented. The app labels these features unavailable rather than showing simulated connections. Saved sound and Lost Mode switches are preferences only; they do not activate monitoring.

Completing the requested hardware features requires native Android implementations, permission and foreground-service handling, a mutually authenticated phone-to-phone protocol, and two-device testing. No user audio is recorded or uploaded by this build.

## Requirements

- Node.js LTS
- Android Studio and Android SDK
- Android phone with USB debugging for device testing

## Run

```bash
npm install
npx expo start
```

For a native Android development build:

```bash
npx expo prebuild --platform android
npx expo run:android
```

The native build commands require Android Studio/SDK and a configured Android device or emulator.

Type-check and verify the Android JavaScript bundle:

```bash
npm run typecheck
npx expo export --platform android
```

## Next engineering milestones

1. Implement BLE advertiser/scanner and GATT client/server in Kotlin, including Android-version-specific permissions.
2. Add QR pairing, random pairing secrets, Keystore-backed key storage and authenticated commands.
3. Implement incoming remote alarm/stop commands and RSSI smoothing for signal status.
4. Add a visible microphone foreground service and local clap/whistle signal processing only after permission.
5. Add Wi-Fi Direct peer discovery and authenticated sockets as an optional transport.
6. Add real device records and unpairing backed by the authenticated pairing protocol.
7. Run two-device acceptance tests across Android versions and manufacturers.

## Platform notes

Android permissions and background execution rules vary by OS release and manufacturer. BLE discovery is not precise distance measurement. Sound monitoring requires explicit microphone permission and a compliant foreground service; it cannot be guaranteed under every locked-screen or battery-optimisation condition.
=======
# BEFT
>>>>>>> db3baf7517006db9309b466793ab17ca6c8780d3
