import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type AlarmTone = 'Pulse' | 'Beacon' | 'Chime';
export type SoundSensitivity = 'Low' | 'Medium' | 'High';

export type BeftSettings = {
  alarmTone: AlarmTone;
  alarmVolume: number;
  alarmDuration: number;
  vibrate: boolean;
  lostModeEnabled: boolean;
  clapEnabled: boolean;
  whistleEnabled: boolean;
  soundSensitivity: SoundSensitivity;
  batteryFriendly: boolean;
};

type BeftStateValue = {
  settings: BeftSettings;
  loading: boolean;
  storageError: string | null;
  updateSettings: (patch: Partial<BeftSettings>) => Promise<void>;
  resetSettings: () => Promise<void>;
};

const STORAGE_KEY = 'beft.settings.v1';

export const DEFAULT_SETTINGS: BeftSettings = {
  alarmTone: 'Pulse',
  alarmVolume: 80,
  alarmDuration: 60,
  vibrate: true,
  lostModeEnabled: false,
  clapEnabled: false,
  whistleEnabled: false,
  soundSensitivity: 'Medium',
  batteryFriendly: true
};

const BeftStateContext = createContext<BeftStateValue | null>(null);

function isOneOf<T extends string>(value: unknown, values: readonly T[]): value is T {
  return typeof value === 'string' && values.includes(value as T);
}

function parseSettings(value: string): BeftSettings {
  const saved: unknown = JSON.parse(value);
  if (!saved || typeof saved !== 'object' || Array.isArray(saved)) {
    throw new Error('Saved settings have an invalid format.');
  }
  const candidate = saved as Partial<BeftSettings>;
  const valid =
    isOneOf(candidate.alarmTone, ['Pulse', 'Beacon', 'Chime']) &&
    typeof candidate.alarmVolume === 'number' && candidate.alarmVolume >= 0 && candidate.alarmVolume <= 100 &&
    [30, 60, 120].includes(candidate.alarmDuration as number) &&
    typeof candidate.vibrate === 'boolean' &&
    typeof candidate.lostModeEnabled === 'boolean' &&
    typeof candidate.clapEnabled === 'boolean' &&
    typeof candidate.whistleEnabled === 'boolean' &&
    isOneOf(candidate.soundSensitivity, ['Low', 'Medium', 'High']) &&
    typeof candidate.batteryFriendly === 'boolean';

  if (!valid) throw new Error('Saved settings are incomplete or invalid.');
  return candidate as BeftSettings;
}

export function BeftStateProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [storageError, setStorageError] = useState<string | null>(null);
  const settingsRef = useRef(settings);
  const writeQueueRef = useRef<Promise<void>>(Promise.resolve());

  useEffect(() => {
    let active = true;
    const loadSettings = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved !== null) {
          const parsed = parseSettings(saved);
          if (active) {
            settingsRef.current = parsed;
            setSettings(parsed);
          }
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unable to read saved settings.';
        if (active) setStorageError(message);
      } finally {
        if (active) setLoading(false);
      }
    };
    void loadSettings();
    return () => { active = false; };
  }, []);

  const updateSettings = async (patch: Partial<BeftSettings>) => {
    if (loading) throw new Error('Settings are still loading.');
    const next = { ...settingsRef.current, ...patch };
    const serialized = JSON.stringify(next);
    settingsRef.current = next;
    setSettings(next);
    const write = writeQueueRef.current.catch(() => undefined).then(() => AsyncStorage.setItem(STORAGE_KEY, serialized));
    writeQueueRef.current = write;
    try {
      await write;
      setStorageError(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to save settings.';
      setStorageError(message);
      throw error;
    }
  };

  const resetSettings = async () => {
    try {
      await writeQueueRef.current;
      await AsyncStorage.removeItem(STORAGE_KEY);
      settingsRef.current = DEFAULT_SETTINGS;
      setSettings(DEFAULT_SETTINGS);
      setStorageError(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to reset settings.';
      setStorageError(message);
      throw error;
    }
  };

  return (
    <BeftStateContext.Provider value={{ settings, loading, storageError, updateSettings, resetSettings }}>
      {children}
    </BeftStateContext.Provider>
  );
}

export function useBeftState() {
  const value = useContext(BeftStateContext);
  if (!value) throw new Error('useBeftState must be used inside BeftStateProvider.');
  return value;
}
