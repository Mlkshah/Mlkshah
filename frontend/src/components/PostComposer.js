import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';

export default function PostComposer({ onSubmit }) {
  const [text, setText] = useState('');

  return (
    <View style={{ gap: 8 }}>
      <TextInput
        placeholder="Share an update"
        value={text}
        onChangeText={setText}
        style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10 }}
      />
      <Button
        title="Post"
        onPress={() => {
          if (!text.trim()) return;
          onSubmit(text.trim());
          setText('');
        }}
      />
    </View>
  );
}
