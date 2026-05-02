import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';

const menuItems = [
  { icon: '📱', label: 'Device Info', value: 'Android 14 / Expo' },
  { icon: '🎨', label: 'Theme', value: 'System Default' },
  { icon: '🔔', label: 'Notifications', toggle: true },
  { icon: '🔒', label: 'Privacy', value: 'Public' },
  { icon: '📊', label: 'Storage Used', value: '12 MB' },
  { icon: 'ℹ️', label: 'Version', value: '1.0.0' },
];

export default function ProfileScreen() {
  const [theme, setTheme] = useState('light');
  const [notifEnabled, setNotifEnabled] = useState(true);
  const [pressedItem, setPressedItem] = useState(null);

  const toggleTheme = () => {
    setTheme(t => t === 'light' ? 'dark' : 'light');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>👨‍💻</Text>
        </View>
        <Text style={styles.name}>Demo User</Text>
        <Text style={styles.role}>React Native Developer</Text>
        <View style={styles.badgeRow}>
          <View style={[styles.badge, { backgroundColor: '#E3F2FD' }]}>
            <Text style={[styles.badgeText, { color: '#1976D2' }]}>Expo</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#E8F5E9' }]}>
            <Text style={[styles.badgeText, { color: '#388E3C' }]}>React</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#FFF3E0' }]}>
            <Text style={[styles.badgeText, { color: '#F57C00' }]}>Mobile</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsSection}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>128</Text>
          <Text style={styles.statLabel}>Commits</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>42</Text>
          <Text style={styles.statLabel}>PRs</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>⭐</Text>
          <Text style={styles.statLabel}>Stars</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Settings</Text>

      <View style={styles.menuCard}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.menuItem,
              index < menuItems.length - 1 && styles.menuItemBorder,
              pressedItem === index && styles.menuItemPressed,
            ]}
            activeOpacity={0.7}
            onPressIn={() => setPressedItem(index)}
            onPressOut={() => setPressedItem(null)}
            onPress={() => {
              if (item.label === 'Theme') toggleTheme();
            }}
          >
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <Text style={styles.menuLabel}>{item.label}</Text>
            {item.toggle ? (
              <Switch
                value={notifEnabled}
                onValueChange={setNotifEnabled}
                trackColor={{ false: '#ccc', true: '#6200ee' }}
              />
            ) : (
              <View style={styles.menuValueContainer}>
                <Text style={styles.menuValue}>
                  {item.label === 'Theme' ? theme : item.value}
                </Text>
                <Text style={styles.menuArrow}>›</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutBtn}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>Made with ❤️ using React Native</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  profileHeader: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 3,
    borderColor: '#6200ee',
  },
  avatarText: {
    fontSize: 36,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  role: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
    marginBottom: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statsSection: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e0e0e0',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    marginLeft: 4,
  },
  menuCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  menuItemPressed: {
    backgroundColor: '#f9f9f9',
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 12,
    width: 28,
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  menuValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuValue: {
    fontSize: 14,
    color: '#888',
    marginRight: 4,
  },
  menuArrow: {
    fontSize: 18,
    color: '#ccc',
  },
  logoutBtn: {
    backgroundColor: '#FFEBEE',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  logoutText: {
    color: '#D32F2F',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: '#bbb',
  },
});
