import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function FormScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [experience, setExperience] = useState('junior');
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Validation Error', 'Name and Email are required!');
      return;
    }
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setBio('');
    setExperience('junior');
    setNotifications(true);
    setDarkMode(false);
    setSubmitted(false);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Registration Form</Text>

      <View style={styles.formCard}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="John Doe"
            placeholderTextColor="#aaa"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email *</Text>
          <TextInput
            style={styles.input}
            placeholder="john@example.com"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Tell us about yourself..."
            placeholderTextColor="#aaa"
            value={bio}
            onChangeText={setBio}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Experience Level</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={experience}
              onValueChange={setExperience}
              style={styles.picker}
            >
              <Picker.Item label="Junior (0-2 years)" value="junior" />
              <Picker.Item label="Middle (2-5 years)" value="middle" />
              <Picker.Item label="Senior (5+ years)" value="senior" />
              <Picker.Item label="Lead / Architect" value="lead" />
            </Picker>
          </View>
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Push Notifications</Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: '#ccc', true: '#6200ee' }}
            thumbColor={notifications ? '#fff' : '#f4f3f4'}
          />
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Dark Mode Preview</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#ccc', true: '#333' }}
            thumbColor={darkMode ? '#fff' : '#f4f3f4'}
          />
        </View>
      </View>

      {submitted && (
        <View style={styles.successCard}>
          <Text style={styles.successEmoji}>🎉</Text>
          <Text style={styles.successTitle}>Submitted!</Text>
          <Text style={styles.successText}>
            Name: {name}{"\n"}
            Email: {email}{"\n"}
            Experience: {experience}
          </Text>
        </View>
      )}

      <View style={styles.buttonsRow}>
        <TouchableOpacity style={[styles.button, styles.resetBtn]} onPress={handleReset}>
          <Text style={styles.resetBtnText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.submitBtn]} onPress={handleSubmit}>
          <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 6,
  },
  input: {
    height: 44,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 15,
    color: '#333',
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  textArea: {
    height: 80,
    paddingTop: 12,
  },
  pickerWrapper: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    overflow: 'hidden',
  },
  picker: {
    height: 44,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  switchLabel: {
    fontSize: 15,
    color: '#444',
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetBtn: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  resetBtnText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  submitBtn: {
    backgroundColor: '#6200ee',
    shadowColor: '#6200ee',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  successCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  successEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
  },
  successText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    lineHeight: 20,
  },
});
