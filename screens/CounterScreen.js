import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';

export default function CounterScreen() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const animate = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const increment = () => {
    setCount(c => c + 1);
    setHistory(h => [new Date().toLocaleTimeString(), ...h].slice(0, 5));
    animate();
  };

  const decrement = () => {
    setCount(c => c - 1);
    setHistory(h => [new Date().toLocaleTimeString(), ...h].slice(0, 5));
    animate();
  };

  const reset = () => {
    setCount(0);
    setHistory([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Counter Demo</Text>

      <View style={styles.counterContainer}>
        <Animated.Text style={[styles.counterValue, { transform: [{ scale: scaleAnim }] }]}>
          {count}
        </Animated.Text>
        <Text style={styles.counterLabel}>Current Value</Text>
      </View>

      <View style={styles.buttonsRow}>
        <TouchableOpacity style={[styles.button, styles.decrementBtn]} onPress={decrement}>
          <Text style={styles.buttonText}>−</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.resetBtn]} onPress={reset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.incrementBtn]} onPress={increment}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.historyCard}>
        <Text style={styles.historyTitle}>Recent Actions</Text>
        {history.length === 0 ? (
          <Text style={styles.emptyText}>No actions yet. Tap + or −!</Text>
        ) : (
          history.map((time, i) => (
            <View key={i} style={styles.historyItem}>
              <View style={[styles.dot, { backgroundColor: i % 2 === 0 ? '#4ECDC4' : '#FF6B6B' }]} />
              <Text style={styles.historyText}>Action at {time}</Text>
            </View>
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  counterContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 40,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  counterValue: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  counterLabel: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 24,
  },
  button: {
    minWidth: 70,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  incrementBtn: {
    backgroundColor: '#4CAF50',
  },
  decrementBtn: {
    backgroundColor: '#FF6B6B',
  },
  resetBtn: {
    backgroundColor: '#9E9E9E',
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  historyCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  historyText: {
    fontSize: 14,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    color: '#aaa',
    fontStyle: 'italic',
    marginTop: 20,
  },
});
