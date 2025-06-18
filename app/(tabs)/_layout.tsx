import { Ionicons } from '@expo/vector-icons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';


export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { display: 'none' }, // Hides default bar
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    />
  );
}

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const iconName = route.name === 'index' ? 'ios-home' : 'ios-time';

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={index}
            onPress={onPress}
            style={[styles.tabItem, isFocused && styles.activeTab]}
          >
            <Ionicons
  name={route.name === 'index' ? 'grid' : 'time'}
  size={24}
  color={isFocused ? '#fff' : '#aaa'}
/>


          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 20,
    left: 40,
    right: 40,
    backgroundColor: '#222',
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
  },
  tabItem: {
    padding: 10,
    borderRadius: 30,
  },
  activeTab: {
    backgroundColor: '#444',
  },
});
