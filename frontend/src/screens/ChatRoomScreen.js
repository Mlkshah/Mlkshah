import React, { useEffect, useState } from 'react';
import { Button, FlatList, Text, TextInput, View } from 'react-native';
import api from '../services/api';
import { socket } from '../services/socket';

export default function ChatRoomScreen({ route }) {
  const { conversationId } = route.params;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get(`/chat/messages/${conversationId}`);
      setMessages(data);
    };

    load();
    socket.connect();
    socket.emit('chat:join', conversationId);
    socket.on('chat:message', (message) => setMessages((prev) => [...prev, message]));

    return () => {
      socket.off('chat:message');
      socket.disconnect();
    };
  }, [conversationId]);

  const send = async () => {
    await api.post('/chat/messages', { conversationId, text });
    setText('');
  };

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <Text style={{ marginBottom: 6 }}>{item.sender?.username}: {item.text}</Text>}
      />
      <TextInput value={text} onChangeText={setText} placeholder="Message" style={{ borderWidth: 1, padding: 8 }} />
      <Button title="Send" onPress={send} />
    </View>
  );
}
