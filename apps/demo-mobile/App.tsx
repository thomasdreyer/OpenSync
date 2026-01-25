import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TextInput } from 'react-native';
import { OpenSyncClient } from '@opensync/sdk-react-native';

const client = new OpenSyncClient('http://localhost:8080/api');

export default function App() {
  const [todos, setTodos] = useState<any[]>([]);
  const [text, setText] = useState('');

  async function login() {
    await client.register('test@test.com', 'password');
  }

  async function addTodo() {
    const todo = { id: Date.now(), text };
    setTodos([...todos, todo]);
    await client.push([{ collection: 'todos', data: todo }]);
    setText('');
  }

  async function sync() {
    const updates = await client.pull(0);
    console.log(updates);
  }

  useEffect(() => {
    login();
  }, []);

  return (
    <View style={{ padding: 40 }}>
      <Text>OpenSync Demo</Text>
      <TextInput value={text} onChangeText={setText} placeholder="New todo" />
      <Button title="Add Todo" onPress={addTodo} />
      <Button title="Sync" onPress={sync} />
      <FlatList
        data={todos}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <Text>{item.text}</Text>}
      />
    </View>
  );
}
