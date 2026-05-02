import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const cards = [
  { title: 'Counter', desc: 'Interactive state demo with buttons', color: '#FF6B6B', icon: '🔢' },
  { title: 'Todo List', desc: 'FlatList with add/delete actions', color: '#4ECDC4', icon: '✅' },
  { title: 'Form', desc: 'Inputs, switches, pickers & validation', color: '#45B7D1', icon: '📝' },
  { title: 'Profile', desc: 'Settings, theme toggle, info cards', color: '#96CEB4', icon: '👤' },
];

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Demo App</Text>
        <Text style={styles.headerSubtitle}>React Native + Expo showcase</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: '#FFF3E0' }]}>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Screens</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#E3F2FD' }]}>
          <Text style={styles.statNumber}>4</Text>
          <Text style={styles.statLabel}>Features</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#E8F5E9' }]}>
          <Text style={styles.statNumber}>∞</Text>
          <Text style={styles.statLabel}>Possibilities</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Explore Features</Text>

      {cards.map((card, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.card, { borderLeftColor: card.color, borderLeftWidth: 5 }]}
          onPress={() => navigation.navigate(card.title)}
        >
          <View style={styles.cardIcon}>
            <Text style={{ fontSize: 28 }}>{card.icon}</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{card.title}</Text>
            <Text style={styles.cardDesc}>{card.desc}</Text>
          </View>
          <Text style={styles.cardArrow}>→</Text>
        </TouchableOpacity>
      ))}

      <View style={styles.footer}>
        <Text style={styles.footerText}>Built with React Native & Expo</Text>
        <Text style={styles.footerText}>GitHub Actions CI/CD ready</Text>
      </View>
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
  header: {
    marginBottom: 20,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardIcon: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    marginRight: 14,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 13,
    color: '#777',
  },
  cardArrow: {
    fontSize: 20,
    color: '#ccc',
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
    paddingVertical: 16,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
  },
});
