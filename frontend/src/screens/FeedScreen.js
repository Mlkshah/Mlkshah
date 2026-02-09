import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import PostComposer from '../components/PostComposer';
import api from '../services/api';

export default function FeedScreen() {
  const [posts, setPosts] = useState([]);

  const loadFeed = async () => {
    const { data } = await api.get('/posts/feed');
    setPosts(data);
  };

  useEffect(() => {
    loadFeed();
  }, []);

  const createPost = async (text) => {
    await api.post('/posts', { text });
    loadFeed();
  };

  return (
    <View style={{ flex: 1, padding: 12, gap: 12 }}>
      <PostComposer onSubmit={createPost} />
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{ padding: 12, borderWidth: 1, borderColor: '#eee', borderRadius: 10, marginBottom: 8 }}>
            <Text style={{ fontWeight: '700' }}>@{item.author?.username}</Text>
            <Text>{item.text}</Text>
          </View>
        )}
      />
    </View>
  );
}
