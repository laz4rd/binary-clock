import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

const toBinary = (num: number, padding: number) =>
  num.toString(2).padStart(padding, '0');

export default function HomeScreen() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const binaryTime = {
    hours: toBinary(time.getHours(), 5),
    minutes: toBinary(time.getMinutes(), 6),
    seconds: toBinary(time.getSeconds(), 6),
  };

  const renderDots = (binaryStr: string) => (
    <View style={styles.column}>
      {binaryStr.split('').map((bit, idx) => (
        <View
          key={idx}
          style={[
            styles.dot,
            bit === '1' ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.clock}>
        {renderDots(binaryTime.hours)}
        {renderDots(binaryTime.minutes)}
        {renderDots(binaryTime.seconds)}
      </View>
    </View>
  );
}

const dotSize = Dimensions.get('window').width * 0.08; // scalable

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clock: {
    flexDirection: 'row',
    gap: 16,
    padding: 16,
    //backgroundColor: '#ccc',
    //borderRadius: 12,
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
});
