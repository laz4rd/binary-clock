// app/(tabs)/explore.tsx
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ExploreScreen() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>
        {time.toLocaleTimeString('en-GB', { hour12: false })}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 48,
    color: '#444',
    fontFamily: 'monospace',
  },
});
