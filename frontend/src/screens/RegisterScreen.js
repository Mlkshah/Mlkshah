import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function RegisterScreen() {
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', username: '', email: '', password: '' });

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20, gap: 10 }}>
      {['name', 'username', 'email', 'password'].map((k) => (
        <TextInput
          key={k}
          placeholder={k}
          secureTextEntry={k === 'password'}
          value={form[k]}
          onChangeText={(v) => setForm((prev) => ({ ...prev, [k]: v }))}
          style={{ borderWidth: 1, padding: 10 }}
        />
      ))}
      <Button title="Register" onPress={() => register(form)} />
    </View>
  );
}
