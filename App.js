import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import CounterScreen from './screens/CounterScreen';
import TodoScreen from './screens/TodoScreen';
import FormScreen from './screens/FormScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

function TabIcon({ label, focused }) {
  const icons = {
    Home: '🏠',
    Counter: '🔢',
    Todo: '✅',
    Form: '📝',
    Profile: '👤',
  };
  return (
    <View style={styles.tabIconContainer}>
      <Text style={[styles.tabIcon, focused && styles.tabIconFocused]}>
        {icons[label] || '•'}
      </Text>
      <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>
        {label}
      </Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: true,
          headerStyle: { backgroundColor: '#6200ee' },
          headerTintColor: '#fff',
          tabBarIcon: ({ focused }) => <TabIcon label={route.name} focused={focused} />,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Counter" component={CounterScreen} />
        <Tab.Screen name="Todo" component={TodoScreen} />
        <Tab.Screen name="Form" component={FormScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    fontSize: 22,
    marginBottom: 4,
    opacity: 0.5,
  },
  tabIconFocused: {
    opacity: 1,
    transform: [{ scale: 1.1 }],
  },
  tabLabel: {
    fontSize: 11,
    color: '#666',
  },
  tabLabelFocused: {
    color: '#6200ee',
    fontWeight: 'bold',
  },
});
