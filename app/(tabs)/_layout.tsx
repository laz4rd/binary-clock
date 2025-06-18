// app/_layout.tsx
import { Ionicons } from '@expo/vector-icons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
import { createContext, useContext, useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

export const AppContext = createContext({
  landscapeMode: false,
  toggleLandscape: () => {},
});

export default function Layout() {
  const [landscapeMode, setLandscapeMode] = useState(false);

  const toggleLandscape = () => {
    setLandscapeMode((prev) => !prev);
  };

  return (
    <AppContext.Provider value={{ landscapeMode, toggleLandscape }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: { display: 'none' },
        }}
        tabBar={(props) => <CustomTabBar {...props} landscapeMode={landscapeMode} />}
      />
    </AppContext.Provider>
  );
}

function CustomTabBar({ state, descriptors, navigation, landscapeMode }: BottomTabBarProps & { landscapeMode: boolean }) {
  const { toggleLandscape } = useContext(AppContext);
  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(getCurrentTime()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <View style={[styles.wrapper, landscapeMode && styles.lsWrapper]}>
      {!landscapeMode && (
        <View style={styles.tabBar}>
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;
            const iconName = route.name === 'index' ? 'grid' : 'time';

            return (
              <Pressable
                key={index}
                onPress={() => navigation.navigate(route.name)}
                style={[styles.tabItem, isFocused && styles.activeTab]}
              >
                <Ionicons
                  name={iconName as any}
                  size={24}
                  color={isFocused ? '#fff' : '#aaa'}
                />
              </Pressable>
            );
          })}
        </View>
      )}

      {/* Always show middle landscape toggle button */}
      <Pressable
        onPress={toggleLandscape}
        style={[styles.middleButton, landscapeMode && styles.lsMiddleButton]}
      >
        <Ionicons name="contrast" size={24} color="#fff" />
      </Pressable>
    </View>
  );
}

function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 20,
    left: 40,
    right: 40,
    alignItems: 'center',
  },
  lsWrapper: {
    bottom: 40,
    right: 20,
    left: 'auto',
    alignItems: 'flex-end',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 40,
    padding: 10,
    width: '100%',
    elevation: 5,
  },
  tabItem: {
    padding: 10,
    borderRadius: 30,
  },
  activeTab: {
    backgroundColor: '#444',
  },
  middleButton: {
    position: 'absolute',
    top: -20,
    alignSelf: 'center',
    backgroundColor: '#444',
    borderRadius: 30,
    padding: 14,
    elevation: 6,
  },
  lsMiddleButton: {
    top: 0,
    position: 'relative',
    alignSelf: 'flex-end',
    backgroundColor: 'transparent',
    padding: 0,
    elevation: 0,
  },
});
