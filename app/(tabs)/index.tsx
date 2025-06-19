import React, { useContext, useEffect, useState } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import { AppContext } from './_layout';

const toBinary = (num: number, padding: number) =>
  num.toString(2).padStart(padding, '0');

export default function HomeScreen() {

  const [time, setTime] = useState(new Date());
  const { landscapeMode } = useContext(AppContext);
  const scaleAnim = useState(new Animated.Value(1))[0];
  const rotateAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: landscapeMode ? 1.6 : 1,
      duration: 400,
      useNativeDriver: true,
    }).start();

    Animated.timing(rotateAnim, {
      toValue: landscapeMode ? 1 : 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [landscapeMode]);

  const binaryTime = {
    hours: toBinary(time.getHours(), 5),
    minutes: toBinary(time.getMinutes(), 6),
    seconds: toBinary(time.getSeconds(), 6),
  };

  const digitalTime = time.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const renderDots = (binaryStr: string) => (
    <View style={styles.column}>
      {binaryStr.split('').map((bit, idx) => (
        <View
          key={idx}
          style={[
            styles.dot,
            bit === '1'
              ? landscapeMode
                ? styles.lsActiveDot
                : styles.activeDot
              : landscapeMode
              ? styles.lsInactiveDot
              : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  return (
    <View style={[styles.container, landscapeMode && styles.lsBackground]}>
      <Animated.View style={[styles.clock, { transform: [{ scale: scaleAnim }] }]}
      >
        {renderDots(binaryTime.hours)}
        {renderDots(binaryTime.minutes)}
        {renderDots(binaryTime.seconds)}
      </Animated.View>

      {landscapeMode && (
        <Animated.Text
          style={[styles.digitalClockOverlay, { transform: [{ rotate: rotation }] }]}
        >
          {digitalTime}
        </Animated.Text>
      )}
    </View>
  );
}

const dotSize = Dimensions.get('window').width * 0.08;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lsBackground: {
    backgroundColor: '#000',
  },
  clock: {
    flexDirection: 'row',
    gap: 16,
    padding: 16,
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
    gap: 8,
    alignItems: 'center',
  },
  dot: {
    width: dotSize,
    height: dotSize,
    borderRadius: dotSize / 2,
    borderWidth: 2,
  },
  activeDot: {
    backgroundColor: '#222',
    borderColor: '#222',
  },
  inactiveDot: {
    backgroundColor: 'transparent',
    borderColor: '#aaa',
  },
  lsActiveDot: {
    backgroundColor: '#fff',
    borderColor: '#fff',
  },
  lsInactiveDot: {
    backgroundColor: 'transparent',
    borderColor: '#fff',
  },
  digitalClockOverlay: {
    position: 'absolute',
    fontSize: 40,
    fontFamily: 'monospace',
    color: '#fff',
    bottom: 500,
    right: 0,
  },
});
