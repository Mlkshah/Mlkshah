import React, { useEffect, useState } from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import api from '../services/api';

export default function ChatListScreen({ navigation }) {
  const [conversations, setConversations] = useState([]);

  const load = async () => {
    const { data } = await api.get('/chat/conversations');
    setConversations(data);
  };

  useEffect(() => {
    load();
  }, []);

  const createSampleConversation = async () => {
    await api.post('/chat/conversations', { memberIds: [] });
    load();
  };

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <Button title="Create personal notes chat" onPress={createSampleConversation} />
      <FlatList
        data={conversations}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Text onPress={() => navigation.navigate('ChatRoom', { conversationId: item._id })} style={{ padding: 12 }}>
            {item.name || `Chat ${item._id.slice(-4)}`}
          </Text>
        )}
      />
    </View>
  );
}
