import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './src/screens/HomeScreen';
import DevicesScreen from './src/screens/DevicesScreen';
import LostModeScreen from './src/screens/LostModeScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { C } from './src/theme/colors';
import { BeftStateProvider } from './src/state/BeftState';

const Tab = createBottomTabNavigator();
const navTheme = { ...DarkTheme, colors: { ...DarkTheme.colors, background: C.bg, card: C.card, text: C.text, border: C.border, primary: C.primary } };

export default function App() {
  return <BeftStateProvider><NavigationContainer theme={navTheme}>
    <StatusBar style="light" />
    <Tab.Navigator screenOptions={({ route }) => ({
      headerShown: false, tabBarStyle: { backgroundColor: C.card, borderTopColor: C.border, height: 66, paddingTop: 8, paddingBottom: 8 },
      tabBarActiveTintColor: C.primary, tabBarInactiveTintColor: C.muted,
      tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      tabBarIcon: ({ color, size }) => {
        const icons: Record<string, keyof typeof Ionicons.glyphMap> = { Home: 'grid-outline', Devices: 'phone-portrait-outline', 'Lost Mode': 'shield-checkmark-outline', Settings: 'settings-outline' };
        return <Ionicons name={icons[route.name]} size={size} color={color} />;
      }
    })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Devices" component={DevicesScreen} />
      <Tab.Screen name="Lost Mode" component={LostModeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  </NavigationContainer></BeftStateProvider>;
}