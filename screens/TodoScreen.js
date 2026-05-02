import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function TodoScreen() {
  const [todos, setTodos] = useState([
    { id: '1', text: 'Welcome to Todo List', done: false },
    { id: '2', text: 'Tap checkbox to complete', done: true },
    { id: '3', text: 'Swipe left to delete (tap X)', done: false },
  ]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim() === '') return;
    setTodos([{ id: Date.now().toString(), text: input.trim(), done: false }, ...todos]);
    setInput('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const completedCount = todos.filter(t => t.done).length;
  const totalCount = todos.length;

  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>
      <TouchableOpacity style={styles.checkbox} onPress={() => toggleTodo(item.id)}>
        <View style={[styles.checkboxInner, item.done && styles.checkboxChecked]}>
          {item.done && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>

      <Text style={[styles.todoText, item.done && styles.todoTextDone]}>
        {item.text}
      </Text>

      <TouchableOpacity style={styles.deleteBtn} onPress={() => deleteTodo(item.id)}>
        <Text style={styles.deleteText}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Todo List</Text>
        <View style={styles.progress}>
          <Text style={styles.progressText}>
            {completedCount}/{totalCount} completed
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: totalCount > 0 ? `${(completedCount / totalCount) * 100}%` : '0%' },
              ]}
            />
          </View>
        </View>
      </View>

      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>📝</Text>
            <Text style={styles.emptyText}>No todos yet. Add one below!</Text>
          </View>
        }
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add new task..."
          placeholderTextColor="#999"
          value={input}
          onChangeText={setInput}
          onSubmitEditing={addTodo}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  progress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    marginRight: 12,
    minWidth: 90,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 3,
  },
  list: {
    padding: 16,
    paddingBottom: 100,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  checkbox: {
    marginRight: 12,
  },
  checkboxInner: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#6200ee',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  todoText: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  todoTextDone: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  deleteBtn: {
    padding: 6,
  },
  deleteText: {
    color: '#FF6B6B',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 16,
    paddingBottom: 24,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
    marginRight: 12,
  },
  addButton: {
    width: 48,
    height: 48,
    backgroundColor: '#6200ee',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6200ee',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
